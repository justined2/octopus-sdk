<template>
  <ProgressBar
    v-if="!playerError"
    :main-progress="percentProgress"
    :secondary-progress="percentLiveProgress"
    :alert-bar="displayAlertBar ? durationLivePosition : undefined"
    :class="classProgress"
    :in-player="true"
    @mouseup="seekTo"
  />
  <CommentPlayer v-if="showComments" />
</template>

<script lang="ts">
import { usePlayerStore } from "../../../../stores/PlayerStore";
import { mapState, mapActions } from "pinia";
import ProgressBar from "../../ProgressBar.vue";
import { defineComponent, defineAsyncComponent } from "vue";
const CommentPlayer = defineAsyncComponent(
  () => import("../../../display/comments/CommentPlayer.vue"),
);
export default defineComponent({
  name: "PodcastProgressBar",

  components: {
    CommentPlayer,
    ProgressBar,
  },
  props: {
    classProgress: { default: "", type: String },
    showComments: { default: false, type: Boolean },
    displayAlertBar: { default: false, type: Boolean },
    percentLiveProgress: { default: 0, type: Number },
    durationLivePosition: { default: 0, type: Number },
    playerError: { default: false, type: Boolean },
    listenTime: { default: 0, type: Number },
  },

  computed: {
    ...mapState(usePlayerStore, [
      "playerElapsed",
      "playerTotal",
      "playerPodcast",
      "playerLive",
    ]),
    percentProgress(): number {
      if (!this.playerElapsed) {
        return 0;
      }
      return this.playerElapsed * 100;
    },
  },

  methods: {
    ...mapActions(usePlayerStore, ["playerUpdateSeekTime"]),
    seekTo(event: MouseEvent): void {
      const audioPlayer: HTMLAudioElement | null =
        document.querySelector("#audio-player");
      if (!audioPlayer || null === event.currentTarget) {
        return;
      }
      const rect = (event.currentTarget as Element).getBoundingClientRect();
      const barWidth = (event.currentTarget as Element).clientWidth;
      const x = event.clientX - rect.left;
      const percentPosition = x / barWidth;
      if (percentPosition * 100 >= this.percentLiveProgress) return;
      const seekTime = this.playerTotal * percentPosition;
      this.isSeekTo(audioPlayer, seekTime);
    },
    isSeekTo(audioPlayer: HTMLAudioElement, seekTime: number): void {
      if (this.playerPodcast || this.playerLive) {
        this.playerUpdateSeekTime(seekTime);
      } else {
        audioPlayer.currentTime = seekTime;
      }
    },
  },
});
</script>
