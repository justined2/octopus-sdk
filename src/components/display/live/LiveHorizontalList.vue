<template>
  <div v-if="notEmpty">
    <h3 class="mb-0 mt-3">
      {{ $t("All live emission button") }}
    </h3>
    <ListPaginate
      id="liveListPaginate"
      v-model:first="dfirst"
      v-model:rows-per-page="dsize"
      v-model:is-mobile="isMobile"
      :total-count="totalCount"
      :loading="false"
      :player-responsive="true"
    >
      <template #list>
        <div class="podcast-list">
          <template v-for="p in displayArray" :key="p.podcastId">
            <PodcastItem v-if="0 !== p.podcastId" :podcast="p" />
          </template>
        </div>
      </template>
    </ListPaginate>
  </div>
</template>

<script lang="ts">
import ListPaginate from "../list/ListPaginate.vue";
import classicApi from "../../../api/classicApi";
import PodcastItem from "../podcasts/PodcastItem.vue";
import { Podcast, emptyPodcastData } from "@/stores/class/general/podcast";
import { defineComponent } from "vue";
import { ListClassicReturn } from "@/stores/class/general/listReturn";
export default defineComponent({
  name: "LiveHorizontalList",

  components: {
    PodcastItem,
    ListPaginate,
  },

  props: {
    first: { default: 0, type: Number },
    size: { default: 30, type: Number },
    emissionId: { default: undefined, type: Number },
  },

  data() {
    return {
      dfirst: this.first,
      dsize: this.size,
      totalCount: 0 as number,
      lives: [] as Array<Podcast>,
      notEmpty: false as boolean,
      inFetching: false as boolean,
      isMobile: false as boolean,
    };
  },

  computed: {
    displayArray(): Array<Podcast> {
      if (this.isMobile) {
        return this.lives;
      }
      return this.lives.slice(
        this.dfirst,
        Math.min(this.dfirst + this.dsize, this.totalCount),
      );
    },
  },
  watch: {
    dsize(): void {
      this.reloadList();
    },
    dfirst(): void {
      if (!this.lives[this.dfirst] || 0 === this.lives[this.dfirst].podcastId) {
        this.fetchContent(false);
      }
    },
  },

  created() {
    this.fetchContent(true);
  },
  methods: {
    reloadList() {
      this.dfirst = 0;
      this.fetchContent(true);
    },
    async fetchContent(reset: boolean): Promise<void> {
      this.inFetching = true;
      if (reset) {
        this.notEmpty = false;
      }
      const data = await classicApi.fetchData<ListClassicReturn<Podcast>>({
        api: 0,
        path: "podcast/search",
        parameters: {
          first: this.dfirst,
          size: this.dsize,
          emissionId: this.emissionId,
          sort: "DATE",
          includeStatus: "READY_TO_RECORD",
        },
        specialTreatement: true,
      });
      this.afterFetching(reset, data);
    },
    afterFetching(
      reset: boolean,
      data: { count: number; result: Array<Podcast>; sort: string },
    ): void {
      if (reset) {
        this.lives.length = 0;
      }
      if (this.dfirst > this.lives.length) {
        for (
          let i = this.lives.length - 1, len = this.dfirst + this.dsize;
          i < len;
          i++
        ) {
          this.lives.push(emptyPodcastData());
        }
      }
      const responseLives = data.result.filter((l: Podcast | null) => {
        return null !== l;
      });
      this.lives = this.lives
        .slice(0, this.dfirst)
        .concat(responseLives)
        .concat(this.lives.slice(this.dfirst + this.dsize, this.lives.length));
      this.totalCount = data.count;
      if (0 !== this.lives.length) {
        this.notEmpty = true;
      }
      this.inFetching = false;
    },
  },
});
</script>
