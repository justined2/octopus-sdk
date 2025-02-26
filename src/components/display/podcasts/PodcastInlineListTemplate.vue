<template>
  <div class="podcast-inline-container">
    <div class="d-flex align-items-center" :class="podcastId ? 'mb-4' : 'mb-2'">
      <component :is="titleTag" class="mb-0">
        {{ title }}
      </component>
    </div>
    <div v-if="!podcastId" class="d-flex justify-content-between">
      <div class="d-flex">
        <button
          class="btn btn-underline"
          :class="{ active: !popularSort }"
          @click="sortChrono()"
        >
          {{ $t("Last added") }}
        </button>
        <button
          class="btn btn-underline"
          :class="{ active: popularSort }"
          @click="sortPopular()"
        >
          {{ $t("Most popular") }}
        </button>
      </div>
      <div v-if="displayArrow" class="hide-phone">
        <button
          class="btn admin-button m-1 saooti-left"
          :class="{ disabled: !previousAvailable }"
          :title="$t('Display previous')"
          @click="displayPrevious()"
        />
        <button
          class="btn admin-button m-1 saooti-right"
          :class="{ disabled: !nextAvailable }"
          :title="$t('Display next')"
          @click="displayNext()"
        />
      </div>
    </div>
    <slot name="list-inline" />
    <router-link
      v-if="buttonText"
      class="btn btn-primary align-self-center width-fit-content m-4"
      :to="refTo"
      @click="handleSeeMoreButton"
    >
      {{ buttonText }}
      <div v-if="buttonPlus" class="ms-1 saooti-more" />
    </router-link>
  </div>
</template>

<script lang="ts">
import { rubriquesFilterComputed } from "../../mixins/routeParam/rubriquesFilterComputed";
import { rubriquesFilterParam } from "../../mixins/routeParam/rubriquesFilterParam";
import { RubriquageFilter } from "@/stores/class/rubrique/rubriquageFilter";
import { defineComponent } from "vue";
import { RouteLocationRaw } from "vue-router";
import { useFilterStore } from "../../../stores/FilterStore";
import { mapState } from "pinia";
import { Rubrique } from "@/stores/class/rubrique/rubrique";
export default defineComponent({
  name: "PodcastInlineListTemplate",

  mixins: [rubriquesFilterParam, rubriquesFilterComputed],

  props: {
    displayArrow: { default: true, type: Boolean },
    previousAvailable: { default: false, type: Boolean },
    nextAvailable: { default: false, type: Boolean },
    popularSort: { default: false, type: Boolean },
    buttonText: { default: undefined, type: String },
    buttonPlus: { default: false, type: Boolean },
    title: { default: "", type: String },
    href: { default: undefined, type: String },
    iabId: { default: undefined, type: Number },
    rubriqueId: { default: () => [], type: Array as () => Array<number> },
    noRubriquageId: { default: () => [], type: Array as () => Array<number> },
    podcastId: { default: undefined, type: Number },
    titleTag: { default: "h2", type: String },
  },
  emits: ["sortChrono", "sortPopular", "displayPrevious", "displayNext"],
  data() {
    return {};
  },

  computed: {
    ...mapState(useFilterStore, ["filterIab", "filterRubriquage"]),
    refTo(): string | RouteLocationRaw {
      if (this.href) return this.href;
      if (this.iabId) {
        return {
          name: "category",
          params: { iabId: this.iabId },
        };
      }
      return {
        name: "podcasts",
        query: {
          iabId: this.filterIab?.id,
          rubriquesId: this.rubriqueQueryParam,
        },
      };
    },
  },

  methods: {
    sortChrono(): void {
      this.$emit("sortChrono");
    },
    sortPopular(): void {
      this.$emit("sortPopular");
    },
    displayPrevious(): void {
      this.$emit("displayPrevious");
    },
    displayNext(): void {
      this.$emit("displayNext");
    },
    handleSeeMoreButton(event: { preventDefault: () => void }) {
      if (
        !this.rubriqueId ||
        0 === this.rubriqueId.length ||
        this.noRubriquageId.length
      ) {
        return;
      }
      event.preventDefault();
      const rubriqueChosenId = this.rubriqueId.at(-1);
      let filterToAdd: RubriquageFilter = {
        rubriquageId: 0,
        rubriqueId: rubriqueChosenId,
        nameRubriquage: "",
        nameRubrique: "",
      };
      if (this.filterRubriquage.length) {
        for (let i = 0, len = this.filterRubriquage.length; i < len; i++) {
          const rubriqueChosen = this.filterRubriquage[i].rubriques.find(
            (element: Rubrique) => element.rubriqueId === rubriqueChosenId,
          );
          if (rubriqueChosen) {
            filterToAdd = {
              rubriquageId: this.filterRubriquage[i].rubriquageId ?? 0,
              rubriqueId: rubriqueChosenId,
              nameRubriquage: this.filterRubriquage[i].title,
              nameRubrique: rubriqueChosen.name,
            };
            break;
          }
        }
      }
      this.modifyRubriquesFilter((a) => {
        a.push(filterToAdd);
        return a;
      });
    },
  },
});
</script>
<style lang="scss">
.octopus-app .podcast-inline-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  @media (max-width: 450px) {
    padding: 1rem 0;
  }
}
</style>
