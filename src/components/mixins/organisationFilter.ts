import { handle403 } from "../mixins/handle403";
import { Rubriquage } from "@/stores/class/rubrique/rubriquage";
import classicApi from "../../api/classicApi";
import { useFilterStore } from "../../stores/FilterStore";
import { mapActions } from "pinia";
import { defineComponent } from "vue";
import { AxiosError } from "axios";
import { state } from "../../stores/ParamSdkStore";
import { useSaveFetchStore } from "../../stores/SaveFetchStore";
export default defineComponent({
  mixins: [handle403],
  methods: {
    ...mapActions(useSaveFetchStore, ["getOrgaLiveEnabled", "getOrgaData"]),
    ...mapActions(useFilterStore, ["filterUpdateOrga"]),
    async selectOrganisation(organisationId: string): Promise<void> {
      try {
        const response = await this.getOrgaData(organisationId);
        const data = await classicApi.fetchData<Array<Rubriquage>>({
          api: 0,
          path:"rubriquage/find/" + organisationId,
          parameters:{
            sort: "HOMEPAGEORDER",
            homePageOrder: true,
          },
          specialTreatement:true
        });
        const isLive = await this.getOrgaLiveEnabled(organisationId);
        this.filterUpdateOrga({
          orgaId: organisationId,
          imgUrl: response.imageUrl,
          name: response.name,
          rubriquageArray: data.filter((element: Rubriquage) => {
            return element.rubriques.length;
          }),
          isLive: isLive,
        });
        if(!state.generalParameters.podcastmaker){
          const queries = this.$route.query;
          this.$router.push({
            query: { ...queries, ...{ productor: organisationId, o:undefined } },
          });
        }
      } catch (error) {
        this.handle403(error as AxiosError);
      }
    },
    removeSelectedOrga(): void {
      if (this.$route.query.productor) {
        this.$router.push({
          query: { ...this.$route.query, ...{ productor: undefined } },
        });
      }
      this.filterUpdateOrga({ orgaId: undefined });
    },
  },
});
