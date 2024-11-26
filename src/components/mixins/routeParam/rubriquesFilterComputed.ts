import { RubriquageFilter } from "@/stores/class/rubrique/rubriquageFilter";
import { useFilterStore } from "../../../stores/FilterStore";
import { mapState } from 'pinia';
import { defineComponent } from 'vue';
export const rubriquesFilterComputed = defineComponent({
  computed:{
    ...mapState(useFilterStore, [
      "filterRubrique",
    ]),
    rubriqueQueryParam(): string | undefined {
      if (this.filterRubrique?.length) {
        return this.filterRubrique
          .map(
            (value: RubriquageFilter) =>
              value.rubriquageId + ":" + value.rubriqueId,
          )
          .join();
      }
      return undefined;
    },
  },
});