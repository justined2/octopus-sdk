<template>
  <ListPaginate
    id="playlistListPaginate"
    v-model:first="dfirst"
    v-model:rows-per-page="dsize"
    v-model:is-mobile="isMobile"
    :text-count="
      displayCount > 1
        ? `${$t('Number playlists', { nb: displayCount })}`
        : undefined
    "
    :total-count="totalCount"
    :loading="loading"
    :loading-text="loading ? $t('Loading content ...') : undefined"
    :player-responsive="true"
  >
    <template #list>
      <div class="emission-list two-emissions">
        <ClassicLazy
          v-for="p in displayArray"
          :key="p.playlistId"
          :min-height="250"
        >
          <PlaylistItem v-if="0 !== p.playlistId" :playlist="p" />
          <template #preview>
            <router-link
              :to="{
                name: 'playlist',
                params: { playlistId: p.playlistId },
              }"
              :title="$t('Playlist name page', { name: p.title })"
            >
              {{ p.title }}
            </router-link>
          </template>
        </ClassicLazy>
      </div>
    </template>
  </ListPaginate>
</template>

<script lang="ts">
import ClassicLazy from "../../misc/ClassicLazy.vue";
import ListPaginate from "../list/ListPaginate.vue";
import { handle403 } from "../../mixins/handle403";
import classicApi from "../../../api/classicApi";
import PlaylistItem from "./PlaylistItem.vue";
import { Playlist, emptyPlaylistData } from "@/stores/class/general/playlist";
import { useFilterStore } from "../../../stores/FilterStore";
import { mapState } from "pinia";
import { defineComponent } from "vue";
import { AxiosError } from "axios";
import { ListClassicReturn } from "@/stores/class/general/listReturn";
export default defineComponent({
  name: "PlaylistList",

  components: {
    PlaylistItem,
    ListPaginate,
    ClassicLazy,
  },

  mixins: [handle403],

  props: {
    first: { default: 0, type: Number },
    size: { default: 30, type: Number },
    query: { default: undefined, type: String },
    organisationId: { default: undefined, type: String },
  },

  data() {
    return {
      loading: true as boolean,
      dfirst: this.first,
      dsize: this.size,
      totalCount: 0 as number,
      displayCount: 0 as number,
      playlists: [] as Array<Playlist>,
      isMobile: false as boolean,
    };
  },

  computed: {
    ...mapState(useFilterStore, ["filterOrgaId"]),
    displayArray(): Array<Playlist> {
      if (this.isMobile) {
        return this.playlists;
      }
      return this.playlists.slice(
        this.dfirst,
        Math.min(this.dfirst + this.dsize, this.totalCount),
      );
    },
    changed(): string {
      return `${this.organisationId}|${this.query}`;
    },
    changePaginate(): string {
      return `${this.first}|${this.size}`;
    },
    sort(): string {
      return !this.query ? "NAME" : "SCORE";
    },
    organisation(): string | undefined {
      return this.organisationId ? this.organisationId : this.filterOrgaId;
    },
  },
  watch: {
    changePaginate() {
      this.dfirst = this.first;
      this.dsize = this.size;
    },
    changed(): void {
      this.reloadList();
    },
    dsize(): void {
      this.reloadList();
    },
    dfirst(): void {
      if (
        !this.playlists[this.dfirst] ||
        0 === this.playlists[this.dfirst].playlistId
      ) {
        this.fetchContent(false);
      }
    },
  },

  mounted() {
    this.fetchContent(true);
  },
  methods: {
    reloadList() {
      this.dfirst = 0;
      this.fetchContent(true);
    },
    async fetchContent(reset: boolean): Promise<void> {
      this.loading = true;
      const param = {
        first: this.dfirst,
        size: this.dsize,
        query: this.query,
        organisationId: this.organisation,
        type: "NONE",
        sort: this.sort,
      };
      try {
        const data = await classicApi.fetchData<ListClassicReturn<Playlist>>({
          api: 0,
          path: "playlist/search",
          parameters: param,
          specialTreatement: true,
        });
        this.afterFetching(reset, data);
      } catch (error) {
        this.handle403(error as AxiosError);
      }
    },
    afterFetching(
      reset: boolean,
      data: { count: number; result: Array<Playlist>; sort: string },
    ): void {
      if (reset) {
        this.playlists.length = 0;
      }
      if (this.dfirst > this.playlists.length) {
        for (
          let i = this.playlists.length - 1, len = this.dfirst + this.dsize;
          i < len;
          i++
        ) {
          this.playlists.push(emptyPlaylistData());
        }
      }
      this.displayCount = data.count;
      const responsePlaylists = data.result.filter((e: Playlist | null) => {
        if (null === e) {
          this.displayCount--;
        }
        return null !== e;
      });
      this.playlists = this.playlists
        .slice(0, this.dfirst)
        .concat(responsePlaylists)
        .concat(
          this.playlists.slice(this.dfirst + this.dsize, this.playlists.length),
        );
      this.totalCount = data.count;
      this.loading = false;
    },
    displayMore(): void {
      this.fetchContent(false);
    },
  },
});
</script>
