<template>
  <div class="module-box overflow-visible">
    <h2 class="mb-3">
      {{ $t("Embed") }}
    </h2>
    <div class="d-flex">
      <iframe
        id="miniplayerIframeRadio"
        title="Miniplayer"
        :src="iFrameSrc"
        width="100%"
        height="140px"
        style="overflow: hidden"
        allow="clipboard-read; clipboard-write; autoplay"
        class="max-iframe mx-3 flex-grow-1"
      />
      <div class="d-flex flex-column">
        <SharePlayerColors v-model:color="color" v-model:theme="theme" />
        <div class="h4 mb-2 mt-3">{{ $t("player parameters") }}</div>
        <PlayerCommonParameters
          v-if="displayInsertCode"
          v-model:insert-code="insertCode"
        />
        <ShareModalPlayer
          v-if="isShareModal"
          :embed-link="iFrame"
          :embedly-link="iFrameSrc"
          @close="isShareModal = false"
        />
        <button
          class="btn btn-primary width-fit-content mt-3"
          @click="isShareModal = true"
        >
          {{ $t("Share the player") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useSaveFetchStore } from "../../../stores/SaveFetchStore";
import { useApiStore } from "../../../stores/ApiStore";
import { useAuthStore } from "../../../stores/AuthStore";
import { mapState, mapActions } from "pinia";
import { defineComponent, defineAsyncComponent } from "vue";
import { Canal } from "@/stores/class/radio/canal";
const ShareModalPlayer = defineAsyncComponent(
  () => import("../../misc/modal/ShareModalPlayer.vue"),
);
const SharePlayerColors = defineAsyncComponent(
  () => import("./SharePlayerColors.vue"),
);
const PlayerCommonParameters = defineAsyncComponent(
  () => import("./PlayerCommonParameters.vue"),
);
export default defineComponent({
  components: {
    ShareModalPlayer,
    SharePlayerColors,
    PlayerCommonParameters,
  },
  props: {
    canal: { default: undefined, type: Object as () => Canal },
    organisationId: { default: undefined, type: String },
  },

  data() {
    return {
      isShareModal: false as boolean,
      color: "#40a372" as string,
      theme: "#000000" as string,
      orgaAttributes: undefined as
        | { [key: string]: string | number | boolean | undefined }
        | undefined,
      insertCode: false as boolean,
    };
  },

  computed: {
    ...mapState(useAuthStore, ["authOrgaId"]),
    ...mapState(useApiStore, ["miniplayerUrl"]),
    displayInsertCode(): boolean {
      return this.canal?.organisationId === this.authOrgaId;
    },
    iFrameSrc(): string {
      let url = `${this.miniplayerUrl}miniplayer/radio/${
        this.canal?.id
      }?distributorId=${this.organisationId}&color=${this.color.substring(
        1,
      )}&theme=${this.theme.substring(1)}`;
      if (this.insertCode) {
        url += "&insertCode=true";
      }
      return url;
    },
    iFrame(): string {
      return `<iframe src="${this.iFrameSrc}" width="100%" height="140px" scrolling="no" allow="clipboard-read; clipboard-write; autoplay" frameborder="0"></iframe>`;
    },
  },
  created() {
    this.initSharePlayer();
  },
  methods: {
    ...mapActions(useSaveFetchStore, ["getOrgaAttributes"]),
    async initSharePlayer() {
      this.orgaAttributes = await this.getOrgaAttributes(this.authOrgaId ?? "");
      this.initColor();
    },
    initColor(): void {
      if (!this.orgaAttributes) {
        return;
      }
      this.color = Object.hasOwn(this.orgaAttributes, "COLOR")
        ? (this.orgaAttributes.COLOR as string)
        : "#40a372";
      this.theme = Object.hasOwn(this.orgaAttributes, "THEME")
        ? (this.orgaAttributes.THEME as string)
        : "#000000";
    },
  },
});
</script>

<style lang="scss">
@use "../../../assets/iframe";
</style>
