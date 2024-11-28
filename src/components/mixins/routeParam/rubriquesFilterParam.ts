import { routeParams } from "./routeParams";
import { RubriquageFilter } from "@/stores/class/rubrique/rubriquageFilter";
import { useFilterStore } from "../../../stores/FilterStore";
import { mapState } from 'pinia';
import { defineComponent } from 'vue';
export const rubriquesFilterParam = defineComponent({
  mixins:[routeParams],
  computed:{
    ...mapState(useFilterStore, [
      "filterRubrique",
    ]),
  },
  methods: {
    stringifyRubriquesFilter(filter :Array<RubriquageFilter>|undefined): string{
      if(!filter){
        return "";
      }
      return filter
        .map((value) => value.rubriquageId + ":" + value.rubriqueId)
        .join();
    },
    modifyRubriquesFilter(modifyFunction: (a: Array<RubriquageFilter>)=> Array<RubriquageFilter>){
      const newFilter = modifyFunction( Array.from(this.filterRubrique));
      const queryString = this.stringifyRubriquesFilter(newFilter);
      const valToUpdate = "" !== queryString ? queryString : undefined;
      this.updateFiltersParam({ rubriquesId: valToUpdate }, {r: valToUpdate});
    }
  },
});