<template>
  <div
    class="podcast-item-container"
    :data-pubdate="displayDate"
    :data-count="podcast.downloadCount"
  >
    <PodcastImage
      :podcast="podcast"
      :hide-play="hoverDesc && 0 !== description.length"
      :display-description="0 !== description.length"
      :arrow-direction="arrowDirection"
      :fetch-conference="fetchConference"
      @hide-description="hideDescription"
      @show-description="showDescription"
    />
    <div
      v-if="hoverDesc"
      ref="descriptionPodcastContainer"
      class="description-podcast-item html-wysiwyg-content"
      :class="[
        isMobile ? 'mobile-description-podcast-item' : '',
        hoverDesc && '' !== description ? 'visible' : 'invisible',
        isDescriptionBig ? 'after-podcast-description' : '',
      ]"
    >
      <!-- eslint-disable vue/no-v-html -->
      <div ref="descriptionPodcast" v-html="description" />
      <!-- eslint-enable -->
    </div>
    <div
      @mouseenter="debounceShowDescriptionEvent"
      @mouseleave="debounceHideDescriptionEvent"
    >
      <PodcastItemInfo
        :podcast-id="podcast.podcastId"
        :title="podcast.title"
        :pub-date="podcast.pubDate"
        :podcast-organisation-id="podcast.organisation.id"
        :podcast-organisation-name="podcast.organisation.name"
        :duration="podcast.duration"
        :animators="podcast.animators"
      />
    </div>
  </div>
</template>

<script lang="ts">
import debounce from "../../mixins/debounce";
import PodcastItemInfo from "./PodcastItemInfo.vue";
import PodcastImage from "./PodcastImage.vue";
import dayjs from "dayjs";
import { Podcast } from "@/stores/class/general/podcast";
import { defineComponent } from "vue";
import { Conference } from "@/stores/class/conference/conference";
export default defineComponent({
  name: "PodcastItem",

  components: {
    PodcastItemInfo,
    PodcastImage,
  },

  props: {
    podcast: { default: () => ({}), type: Object as () => Podcast },
    fetchConference: { default: undefined, type: Object as () => Conference },
  },

  data() {
    return {
      firstDisplayDesc: false as boolean,
      hoverDesc: false as boolean,
      arrowDirection: "up" as string,
      isDescriptionBig: false as boolean,
      debounceShowDescriptionEvent: undefined as undefined | (() => void),
      debounceHideDescriptionEvent: undefined as undefined | (() => void),
    };
  },

  computed: {
    displayDate(): string {
      return dayjs(this.podcast.pubDate).format();
    },
    description(): string {
      return this.podcast.description ?? "";
    },
    isMobile(): boolean {
      return window.matchMedia("(hover: none)").matches;
    },
  },
  created() {
    this.debounceShowDescriptionEvent = debounce(this.showDescription, 100);
    this.debounceHideDescriptionEvent = debounce(this.hideDescription, 100);
  },

  methods: {
    initDescription(): void {
      if (this.firstDisplayDesc /* || this.isMobile */) {
        return;
      }
      const podcastDesc = this.$refs.descriptionPodcast as HTMLElement;
      const podcastDescContainer = this.$refs
        .descriptionPodcastContainer as HTMLElement;
      if (podcastDesc?.clientHeight > podcastDescContainer?.clientHeight) {
        this.isDescriptionBig = true;
      }
      this.firstDisplayDesc = true;
    },
    showDescription(): void {
      this.arrowDirection = "down";
      this.hoverDesc = true;
      this.$nextTick(() => {
        this.initDescription();
      });
    },
    hideDescription(): void {
      this.arrowDirection = "up";
      this.hoverDesc = false;
    },
  },
});
</script>

<style lang="scss">
@use "@scss/variables" as octopusVariables;
.octopus-app {
  .podcast-item-container {
    border-radius: octopusVariables.$octopus-borderradius;
    list-style: none;
    position: relative;
    width: octopusVariables.$octopus-item-podcast-size;
    height: 20.5rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-align: left;
    background: #fff;
    flex-shrink: 0;
    border: 2px solid #eee;

    .description-podcast-item {
      padding: 1rem;
      color: #333;
      background-color: rgba(255, 255, 255, 0.92);
      height: octopusVariables.$octopus-item-podcast-size;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.9em;
      position: absolute;
      width: octopusVariables.$octopus-item-podcast-size;
      word-break: break-word;
      &:not(.mobile-description-podcast-item).after-podcast-description:after {
        content: "...";
        position: absolute;
        padding-left: 1rem;
        right: 0;
        bottom: 0;
        width: 100%;
        font-size: 1rem;
        font-weight: bolder;
        text-align: center;
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0),
          #fff 40%
        );
      }
      &.mobile-description-podcast-item {
        overflow: auto;
      }
    }
    @media (max-width: 960px) {
      margin: 0.5rem !important;
    }
    @media (max-width: 450px) {
      width: octopusVariables.$octopus-mobile-item-size;
      height: 18.8rem;
      .description-podcast-item {
        height: octopusVariables.$octopus-mobile-item-size;
        width: octopusVariables.$octopus-mobile-item-size;
      }
    }
  }
}
</style>
