<template>
  <ClassicModal
    id-modal="clipboard-modal"
    :title-modal="$t('RSS Link')"
    @close="closePopup"
  >
    <template #body>
      <p class="d-flex justify-content-between align-items-center">
        {{ $t("Rss feed:") }}
        <span id="LINK">{{ link }}</span>
        <button class="btn btn-primary" @click="onCopyCode(link, afterCopy)">
          {{ $t("Copy") }}
        </button>
      </p>
      <RssSection
        v-if="emission && undefined !== authOrgaId"
        :emission="emission"
      />
    </template>
  </ClassicModal>
</template>

<script lang="ts">
import ClassicModal from "../modal/ClassicModal.vue";
import { Emission } from "@/stores/class/general/emission";
import displayMethods from "../../mixins/displayMethods";
import { defineComponent, defineAsyncComponent } from "vue";
import { useAuthStore } from "../../../stores/AuthStore";
import { mapState } from "pinia";
const RssSection = defineAsyncComponent(
  () => import("@/components/display/aggregator/RssSection.vue"),
);
export default defineComponent({
  name: "ClipboardModal",
  components: {
    RssSection,
    ClassicModal,
  },
  mixins: [displayMethods],

  props: {
    link: { default: "", type: String },
    emission: { default: undefined, type: Object as () => Emission },
  },
  emits: ["close", "copy"],
  computed: {
    ...mapState(useAuthStore, ["authOrgaId"]),
  },
  methods: {
    closePopup(): void {
      this.$emit("close");
    },
    afterCopy(): void {
      this.$emit("copy");
    },
  },
});
</script>
