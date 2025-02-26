<template>
  <div class="top-bar-grid" :class="{ scrolled: titleIsDisplayed }">
    <router-link
      class="top-bar-logo d-flex align-items-center"
      :to="{
        name: 'home',
        query: {
          iabId: filterIab?.id,
          rubriquesId: rubriqueQueryParam,
        },
      }"
      :title="$t('Home')"
    >
      <img
        v-if="!filterOrgaId || '' === imgUrl"
        :src="logoUrl"
        role="presentation"
        width="140"
        height="50"
        :class="isEducation ? 'educationLogo' : 'octopusLogo'"
      />
      <img
        v-else
        :src="proxyImageUrl(imgUrl, '', '80')"
        role="presentation"
        class="client-logo"
        :class="isEducation ? 'educationLogo' : ''"
      />
    </router-link>
    <h1 v-if="titleIsDisplayed" class="text-truncate m-0 align-self-center">
      {{ titleDisplay }}
    </h1>
    <div
      class="d-flex"
      :class="[
        inContentDisplayPage || isPhone
          ? 'flex-row-reverse align-items-center'
          : 'flex-column align-items-end',
      ]"
    >
      <template v-if="filterOrgaId && '' !== imgUrl">
        <img
          v-if="isGarRole"
          :src="logoUrl"
          aria-hidden="true"
          width="100"
          height="29"
          class="ms-2"
          :class="isEducation ? 'educationLogo' : 'octopusLogo'"
        />
        <a
          v-else
          href="https://www.saooti.com/"
          target="_blank"
          rel="noopener"
          title="Saooti"
        >
          <img
            :src="logoUrl"
            aria-hidden="true"
            width="100"
            height="29"
            class="ms-2"
            :class="isEducation ? 'educationLogo' : 'octopusLogo'"
          />
        </a>
      </template>
      <div class="d-flex align-items-center justify-content-end flex-grow-1">
        <template v-for="link in routerLinkArray" :key="link.routeName">
          <router-link
            v-show="!isPhone"
            v-if="link.condition"
            :to="{
              name: link.routeName,
              query: getQueriesRouter(link.routeName),
            }"
            class="link-hover py-2 px-3"
          >
            {{ link.title }}
          </router-link>
        </template>
        <button
          v-show="!isPhone && !inContentDisplayPage"
          id="more-dropdown"
          :title="$t('More')"
          class="d-flex-column flex-nowrap align-items-center btn-transparent py-2 px-3 text-white"
        >
          <div class="link-hover">
            {{ $t("More") }}
          </div>
          <div class="ms-1 saooti-down" />
        </button>
        <ClassicPopover
          target="more-dropdown"
          :only-click="true"
          :is-fixed="true"
          :left-pos="true"
        >
          <div class="d-flex flex-column">
            <template
              v-for="link in routerLinkInsideArray"
              :key="link.routeName"
            >
              <router-link
                v-if="link.condition"
                :to="{
                  name: link.routeName,
                  query: getQueriesRouter(link.routeName),
                }"
                class="p-1 octopus-dropdown-item"
              >
                {{ link.title }}
              </router-link>
            </template>
          </div>
        </ClassicPopover>
        <MobileMenu
          :is-education="isEducation"
          :show="mobileMenuDisplay"
          :not-podcast-and-emission="inContentDisplayPage && !scrolled"
          :scrolled="scrolled"
        />
        <HomeDropdown
          :is-education="isEducation"
          :mobile-menu-display="mobileMenuDisplay"
          :scrolled="scrolled"
        />
        <router-link
          v-show="!isPhone && !inContentDisplayPage"
          :title="$t('Search')"
          :to="{
            name: 'podcasts',
          }"
          class="btn admin-button m-1 saooti-search text-blue-octopus"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { rubriquesFilterComputed } from "../mixins/routeParam/rubriquesFilterComputed";
import { state } from "../../stores/ParamSdkStore";
import HomeDropdown from "./HomeDropdown.vue";
import imageProxy from "../mixins/imageProxy";
import { useFilterStore } from "../../stores/FilterStore";
import { useAuthStore } from "../../stores/AuthStore";
import { mapState } from "pinia";
import ClassicPopover from "../misc/ClassicPopover.vue";
import { defineComponent, defineAsyncComponent } from "vue";
const MobileMenu = defineAsyncComponent(() => import("./MobileMenu.vue"));
export default defineComponent({
  name: "TopBarMainContent",
  components: {
    HomeDropdown,
    ClassicPopover,
    MobileMenu,
  },
  mixins: [imageProxy, rubriquesFilterComputed],
  props: {
    isEducation: { default: false, type: Boolean },
    isPhone: { default: false, type: Boolean },
    titleDisplay: { default: "", type: String },
    scrolled: { default: false, type: Boolean },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(useFilterStore, [
      "filterLive",
      "filterOrgaId",
      "filterImgUrl",
      "filterIab",
      "filterName",
    ]),
    ...mapState(useAuthStore, ["isGarRole"]),
    mobileMenuDisplay(): boolean {
      return this.isPhone || this.inContentDisplayPage;
    },
    titleIsDisplayed(): boolean {
      return this.inContentDisplayPage && this.scrolled && !this.isPhone;
    },
    inContentDisplayPage(): boolean {
      return 0 !== this.titleDisplay.length;
    },
    routerLinkArray() {
      return [
        {
          title: this.$t("Radio & Live"),
          routeName: "lives",
          condition:
            !this.inContentDisplayPage &&
            (state.generalParameters.isLiveTab as boolean) &&
            ((this.filterOrgaId && this.filterLive) || !this.filterOrgaId),
        },
        {
          title: this.$t("Podcasts"),
          routeName: "podcasts",
          condition:
            !this.inContentDisplayPage ||
            (this.inContentDisplayPage && !this.scrolled),
        },
        {
          title: this.$t("Emissions"),
          routeName: "emissions",
          condition:
            !this.inContentDisplayPage ||
            (this.inContentDisplayPage && !this.scrolled),
        },
      ];
    },
    routerLinkInsideArray() {
      return [
        {
          title: this.$t("Speakers"),
          routeName: "participants",
          condition: true,
        },
        {
          title: this.$t("Playlists"),
          routeName: "playlists",
          condition: true,
        },
        {
          title: this.$t("Productors"),
          routeName: "productors",
          condition:
            !this.isPodcastmaker && (!this.filterOrgaId || this.isEducation),
        },
      ];
    },
    logoUrl(): string {
      if (this.isEducation) {
        return "/img/logo_education_white.svg";
      }
      return this.isPhone
        ? "/img/logo_octopus_bubble.svg"
        : "/img/logo_saooti_play_white.svg";
    },
    isPodcastmaker(): boolean {
      return state.generalParameters.podcastmaker as boolean;
    },
    imgUrl(): string {
      if (!this.filterImgUrl?.includes("emptypodcast"))
        return `${this.filterImgUrl}`;
      return "";
    },
  },
  methods: {
    getQueriesRouter(routeName: string) {
      if ("podcasts" !== routeName && "emissions" !== routeName) {
        return { productor: this.filterOrgaId };
      }
      return {
        productor: this.filterOrgaId,
        iabId: this.filterIab?.id,
        rubriquesId: this.rubriqueQueryParam,
      };
    },
  },
});
</script>

<style lang="scss">
@use "@scss/variables" as octopusVariables;
.octopus-app {
  .top-bar-grid {
    display: grid;
    grid-template-columns: 1fr 5fr;
    margin-top: 0.5rem;
    padding: 0 1rem;
    &.scrolled {
      grid-template-columns: 1fr 2fr 1fr;
    }
    @media (max-width: 450px) {
      padding: 0 0.5rem;
    }

    .link-hover {
      color: white;
      font-weight: bold;
      font-size: 0.93rem;
      &.link-hover:hover,
      &.link-hover.router-link-exact-active.router-link-active {
        color: white;
        text-decoration: underline;
        text-underline-offset: 8px;
      }
    }
    .client-logo {
      border-radius: octopusVariables.$octopus-borderradius;
    }
    .top-bar-logo img {
      max-width: 140px !important;
      max-height: 4rem;
      height: 4rem;
      &.educationLogo {
        height: auto;
      }
      @media (max-width: 650px) {
        max-height: 2rem;
      }
    }
    .octopusLogo {
      @media (max-width: 960px) {
        max-width: 30px !important;
      }
    }
  }
}
</style>
