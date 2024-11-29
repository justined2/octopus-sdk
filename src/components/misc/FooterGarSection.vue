<template>
  <div class="d-flex align-items-center justify-content-between">
    <ContractPreviewModal
      v-if="contractToDisplay"
      :selected-contract="contractToDisplay"
      @download="downloadContract"
      @close="contractToDisplay = undefined"
    />
    <button
      v-for="contract in contracts"
      :key="contract.id"
      class="btn-transparent link-hover my-1 special-select-align-magic-trick p-0"
      @click="contractToDisplay = contract"
    >
      {{ contract.name }}
    </button>
  </div>
</template>

<script lang="ts">
import download from "../mixins/download";
import classicApi from "../../api/classicApi";
import { Contract } from "../../stores/class/contract/contract";
import { defineAsyncComponent, defineComponent } from "vue";
import { useApiStore } from "../../stores/ApiStore";
import { mapState } from "pinia";
const ContractPreviewModal = defineAsyncComponent(
  () => import("./modal/ContractPreviewModal.vue"),
);
export default defineComponent({
  name: "FooterGarSection",
  components: {
    ContractPreviewModal,
  },
  mixins: [download],
  props: {
    authOrgaId: { default: undefined, type: String },
  },

  data() {
    return {
      contracts: [] as Array<Contract>,
      contractToDisplay: undefined as Contract | undefined,
    };
  },
  computed: {
    ...mapState(useApiStore, ["keycloakUrl"]),
  },
  created() {
    this.fetchContracts();
  },
  methods: {
    async fetchContracts() {
      if (!this.authOrgaId) {
        return;
      }
      this.contracts = await classicApi.fetchData({
        api: 3,
        path: `contract/query/organisation/${this.authOrgaId}?signedStatus=SIGNED`,
      });
    },
    downloadContract(contract: Contract) {
      if (contract) {
        const url = this.keycloakUrl + "contract/" + contract.id;
        this.onDownload(url, "download" + contract.name + ".pdf");
      }
    },
  },
});
</script>
