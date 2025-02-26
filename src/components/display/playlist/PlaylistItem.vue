<template>
  <div class="emission-item-container">
    <router-link
      :to="{
        name: 'playlist',
        params: { playlistId: playlist.playlistId },
      }"
      :title="$t('Playlist name page', { name: name })"
      class="d-flex flex-grow-1 text-dark"
    >
      <div class="emission-item-text">
        <div v-if="!activePlaylist" class="sticker-empty-ressource">
          {{ $t("Empty playlist") }}
        </div>
        <div class="d-flex align-items-center emission-name">
          {{ name }}
        </div>
        <div
          ref="descriptionPlaylistContainer"
          class="emission-description html-wysiwyg-content"
        >
          <!-- eslint-disable vue/no-v-html -->
          <div ref="descriptionPlaylist" v-html="urlify(description)" />
          <!-- eslint-enable -->
        </div>
        <router-link
          v-if="!isPodcastmaker && playlist.organisation"
          :to="{
            name: 'productor',
            params: { productorId: playlist.organisation.id },
          }"
          class="text-dark mt-auto py-1"
        >
          © {{ playlist.organisation.name }}
        </router-link>
      </div>
      <img
        v-lazy="proxyImageUrl(playlist.imageUrl, '250')"
        width="250"
        height="250"
        role="presentation"
        :title="$t('Playlist name image', { name: name })"
        class="img-box"
      />
    </router-link>
  </div>
</template>

<script lang="ts">
import { Playlist } from "@/stores/class/general/playlist";
import { state } from "../../../stores/ParamSdkStore";
import imageProxy from "../../mixins/imageProxy";
import displayMethods from "../../mixins/displayMethods";
import { defineComponent } from "vue";
export default defineComponent({
  name: "PlaylistItem",

  mixins: [displayMethods, imageProxy],

  props: {
    playlist: { default: () => ({}), type: Object as () => Playlist },
  },

  computed: {
    isPodcastmaker(): boolean {
      return state.generalParameters.podcastmaker as boolean;
    },
    organisation(): string {
      return this.playlist?.publisher?.organisation?.name ?? "";
    },
    description(): string {
      return this.playlist.description ?? "";
    },
    name(): string {
      return this.playlist.title;
    },
    activePlaylist(): boolean {
      return 0 !== Object.keys(this.playlist.samplingViews ?? []).length;
    },
  },
  mounted() {
    const playlistDesc = this.$refs.descriptionPlaylist as HTMLElement;
    const playlistDescContainer = this.$refs
      .descriptionPlaylistContainer as HTMLElement;
    if (playlistDesc?.clientHeight > playlistDescContainer?.clientHeight) {
      playlistDescContainer.classList.add("after-emission-description");
    }
  },
});
</script>
