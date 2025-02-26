<template>
  <div class="d-flex align-items-center">
    <select
      v-model="rubriquageId"
      class="ms-2 mb-0 c-hand"
      :title="$t('Topics')"
      @change="onRubriquageSelected"
    >
      <option
        v-for="rubriquage in rubriquageDisplay"
        :key="rubriquage.rubriquageId"
        :value="rubriquage.rubriquageId"
      >
        {{ rubriquage.title }}
      </option>
    </select>
    <template v-if="rubriquageId">
      <div class="ms-3 flex-shrink-0">
        {{ $t("By rubric") }}
      </div>
      <RubriqueChooser
        v-if="getRubriquesLength(rubriquageId)"
        class="ms-2"
        :multiple="false"
        :rubriquage-id="rubriquageId"
        :rubrique-selected="
          0 !== rubriqueIdSelected ? rubriqueIdSelected : undefined
        "
        :all-rubriques="getRubriques(rubriquageId)"
        :defaultanswer="$t('No rubric filter')"
        :reset="reset"
        :without-rubrique="true"
        @selected="onRubriqueSelected"
      />
    </template>
    <button
      v-if="index"
      class="btn admin-button ms-1 saooti-bin"
      title="delete"
      @click="deleteRubriquage"
    />
  </div>
</template>

<script lang="ts">
import { Rubriquage } from "@/stores/class/rubrique/rubriquage";
import { Rubrique } from "@/stores/class/rubrique/rubrique";
import { defineComponent, defineAsyncComponent } from "vue";
const RubriqueChooser = defineAsyncComponent(
  () => import("../rubriques/RubriqueChooser.vue"),
);
export default defineComponent({
  components: {
    RubriqueChooser,
  },
  props: {
    rubriquageDisplay: {
      default: () => [],
      type: Array as () => Array<Rubriquage>,
    },
    rubriquageIdSelected: { default: 0, type: Number },
    rubriqueIdSelected: { default: 0, type: Number },
    index: { default: 0, type: Number },
  },
  emits: ["deleteRubriqueChoice", "updateRubrique", "updateRubriquage"],

  data() {
    return {
      rubriquageId: undefined as number | undefined,
      rubriqueId: undefined as number | undefined,
      reset: false as boolean,
    };
  },
  watch: {
    rubriquageIdSelected() {
      this.initRubriquage();
    },
    rubriqueIdSelected() {
      this.initRubriquage();
    },
  },

  created() {
    this.initRubriquage();
  },

  methods: {
    initRubriquage() {
      this.rubriquageId = this.rubriquageIdSelected;
    },
    deleteRubriquage() {
      this.$emit("deleteRubriqueChoice");
    },
    getRubriquesLength(rubriquageId: number): number {
      return this.getRubriques(rubriquageId).length;
    },
    getRubriques(rubriquageId: number): Array<Rubrique> {
      const topicIndex = this.rubriquageDisplay.findIndex(
        (element: Rubriquage) => element.rubriquageId === rubriquageId,
      );
      return -1 !== topicIndex
        ? this.rubriquageDisplay[topicIndex].rubriques
        : [];
    },
    onRubriqueSelected(rubrique: Rubrique): void {
      if (rubrique.rubriqueId === this.rubriqueId) return;
      this.rubriqueId = rubrique.rubriqueId;
      this.$emit("updateRubrique", {
        rubriqueId: rubrique.rubriqueId,
        index: this.index,
      });
    },
    onRubriquageSelected(): void {
      this.reset = !this.reset;
      this.rubriqueId = 0;
      this.$emit("updateRubriquage", {
        rubriquageId: this.rubriquageId,
        index: this.index,
      });
    },
  },
});
</script>
