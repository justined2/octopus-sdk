<template>
  <div v-if="podcast" class="d-flex align-items-center mt-1">
    <button
      class="btn btn-round-light saooti-download ms-2"
      :title="$t('Download')"
      @click="downloadPodcast"
    />
    <!-- <template v-else>
      <button
        id="download-podcast-or-video"
        class="btn btn-round-light saooti-download ms-2"
        :title="$t('Download')"
      />
      <ClassicPopover
        target="download-podcast-or-video"
        relative-class="page-element"
        :is-fixed="true"
        :only-click="true"
      >
        <button
          class="octopus-dropdown-item btn-transparent"
          @mousedown="downloadPodcast"
        >
            {{ $t("Download audio") }}
        </button>
        <button
          class="octopus-dropdown-item btn-transparent"
          @mousedown="downloadVideo"
        >
            {{ $t("Download video") }}
        </button>
      </ClassicPopover>
    </template> -->
  </div>
</template>

<script lang="ts">
import { Podcast } from "@/stores/class/general/podcast";
import download from "../../mixins/download";
import { defineComponent } from "vue";
/* const ClassicPopover = defineAsyncComponent(
  () => import("../../misc/ClassicPopover.vue"),
); */
export default defineComponent({
  name: "DownloadPodcastButton",
  components: {
    /* ClassicPopover, */
  },

  mixins: [download],

  props: {
    podcast: { default: undefined, type: Object as () => Podcast },
  },
  computed: {
    videoId(): string | undefined {
      return this.podcast?.video?.videoId;
    },
  },

  methods: {
    downloadPodcast() {
      this.onDownload(
        "/download/podcast/" + this.podcast?.podcastId,
        this.podcast?.title + ".mp3",
        false,
      );
    },
  },
});
</script>
