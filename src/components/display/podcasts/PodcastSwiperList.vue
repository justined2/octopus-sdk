<template>
  <PodcastInlineListTemplate
    v-if="loading || (!loading && 0 !== allPodcasts.length)"
    :display-arrow="false"
    :popular-sort="popularSort"
    :button-text="buttonText"
    :button-plus="buttonPlus"
    :title="title"
    :href="href"
    :iab-id="iabId"
    :rubrique-id="rubriqueId"
    :no-rubriquage-id="noRubriquageId"
    :title-tag="titleTag"
    @sort-chrono="sortChrono"
    @sort-popular="sortPopular"
  >
    <template #list-inline>
      <ClassicLoading
        class="loading-size"
        :loading-text="loading ? $t('Loading podcasts ...') : undefined"
      />
      <SwiperList v-if="!loading" :list-object="allPodcasts">
        <template #octopusSlide="{ option }">
          <PodcastItem
            class="flex-shrink-0 item-phone-margin"
            :podcast="option"
          />
        </template>
      </SwiperList>
    </template>
  </PodcastInlineListTemplate>
</template>

<script lang="ts">
import dayjs from "dayjs";
import PodcastInlineListTemplate from "./PodcastInlineListTemplate.vue";
import classicApi from "../../../api/classicApi";
import PodcastItem from "./PodcastItem.vue";
import ClassicLoading from "../../form/ClassicLoading.vue";
import SwiperList from "../list/SwiperList.vue";
import { useFilterStore } from "../../../stores/FilterStore";
import { mapState } from "pinia";
import { Podcast } from "@/stores/class/general/podcast";
import { defineComponent } from "vue";
import { ListClassicReturn } from "@/stores/class/general/listReturn";
export default defineComponent({
  name: "PodcastSwiperList",

  components: {
    PodcastInlineListTemplate,
    PodcastItem,
    ClassicLoading,
    SwiperList,
  },

  props: {
    organisationId: { default: () => [], type: Array as () => Array<string> },
    emissionId: { default: undefined, type: Number },
    iabId: { default: undefined, type: Number },
    title: { default: "", type: String },
    href: { default: undefined, type: String },
    buttonText: { default: undefined, type: String },
    isArrow: { default: false, type: Boolean },
    requirePopularSort: { default: undefined, type: Boolean },
    buttonPlus: { default: false, type: Boolean },
    rubriqueId: { default: () => [], type: Array as () => Array<number> },
    rubriquageId: { default: () => [], type: Array as () => Array<number> },
    noRubriquageId: { default: () => [], type: Array as () => Array<number> },
    query: { default: undefined, type: String },
    lastThreeMonths: { default: false, type: Boolean },
    titleTag: { default: "h2", type: String },
  },
  emits: ["update:isArrow"],

  data() {
    return {
      loading: true as boolean,
      popularSort: false as boolean,
      allPodcasts: [] as Array<Podcast>,
    };
  },
  computed: {
    ...mapState(useFilterStore, ["filterOrgaId"]),
    organisation(): Array<string> {
      if (this.organisationId.length) {
        return this.organisationId;
      }
      return this.filterOrgaId ? [this.filterOrgaId] : [];
    },
    watchVariable(): string {
      return `${this.emissionId}|${this.organisationId}|${this.filterOrgaId}|${this.iabId}|${this.rubriqueId}|${this.rubriquageId}|${this.query}`;
    },
  },
  watch: {
    watchVariable(): void {
      this.fetchNext();
    },
  },

  created() {
    if (undefined !== this.requirePopularSort) {
      this.popularSort = this.requirePopularSort;
    }
    if (undefined !== this.isArrow) {
      this.$emit("update:isArrow", true);
    }
  },
  mounted() {
    this.fetchNext();
  },
  methods: {
    async fetchNext(): Promise<void> {
      const data = await classicApi.fetchData<ListClassicReturn<Podcast>>({
        api: 0,
        path: "podcast/search",
        parameters: {
          first: 0,
          size: 10,
          organisationId: this.organisation,
          emissionId: this.emissionId,
          iabId: this.iabId,
          rubriqueId: this.rubriqueId.length ? this.rubriqueId : undefined,
          rubriquageId: this.rubriquageId.length
            ? this.rubriquageId
            : undefined,
          noRubriquageId: this.noRubriquageId.length
            ? this.noRubriquageId
            : undefined,
          sort: this.popularSort ? "POPULARITY" : "DATE",
          query: this.query,
          includeStatus: ["READY", "PROCESSING"],
          after:
            this.popularSort && this.lastThreeMonths
              ? dayjs().subtract(3, "months").toISOString()
              : undefined,
        },
        specialTreatement: true,
      });
      this.loading = true;
      this.allPodcasts = data.result.filter(
        (pod: Podcast | null) => null !== pod,
      );
      this.loading = false;
    },
    sortPopular(): void {
      if (this.popularSort) return;
      this.popularSort = true;
      this.fetchNext();
    },
    sortChrono(): void {
      if (!this.popularSort) return;
      this.popularSort = false;
      this.fetchNext();
    },
  },
});
</script>
