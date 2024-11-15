<template>
  <div class="page-box">
    <h1>{{ $t("Site map") }}</h1>
    <div class="d-flex flex-column align-items-center">
      <div>
        <template v-for="linkItem in siteMap" :key="linkItem.title">
          <ul v-if="linkItem.condition" class="my-1">
            <li class="my-1">
              <router-link class="text-dark" :to="linkItem.href">{{
                linkItem.title
              }}</router-link>
              <template v-for="subLink in linkItem.links" :key="subLink.title">
                <ul v-if="subLink.condition">
                  <li class="my-1">
                    <router-link class="text-dark" :to="subLink.href">{{
                      subLink.title
                    }}</router-link>
                  </li>
                </ul>
              </template>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from "pinia";
import { useAuthStore } from "../../stores/AuthStore";
import { useFilterStore } from "../../stores/FilterStore";
import { useGeneralStore } from "../../stores/GeneralStore";
import { state } from "../../stores/ParamSdkStore";
import { defineComponent } from "vue";
import { Organisation } from "@/stores/class/general/organisation";
export default defineComponent({
  props: {
    isEducation: { default: false, type: Boolean },
  },

  data() {
    return {
      studioAuthorized: true as boolean,
      radioAuthorized: true as boolean,
    };
  },
  computed: {
    ...mapState(useGeneralStore, ["platformEducation"]),
    ...mapState(useFilterStore, ["filterOrgaId"]),
    ...mapState(useAuthStore, [
      "authProfile",
      "authOrgaId",
      "authOrganisation",
      "isRoleAdmin",
      "isRoleAnimator",
      "isRoleUsers",
      "isRoleLive",
      "isRoleContribution",
      "isRoleComments",
      "isRoleEditor",
      "isRoleAnalytics",
      "isRoleAdvertising",
      "isRoleOrganisation",
      "isRoleRadio",
      "isGarRole",
    ]),
    isAuthenticated(): boolean {
      return undefined !== this.authProfile?.userId;
    },
    isStudioAuth(): boolean {
      return (
        (this.isRoleLive || this.isRoleContribution) && this.studioAuthorized
      );
    },
    isPodcastmaker(): boolean {
      return state.generalParameters.podcastmaker as boolean;
    },
    organisationsAvailable(): Array<Organisation> {
      return this.authProfile?.organisations ?? [];
    },
    siteMap() {
      return [
        ...this.contentSection,
        ...this.userLinks,
        this.adminSection,
        ...this.footerLinks,
      ];
    },
    contentSection() {
      return [
        {
          title: this.$t("Radio & Live"),
          href: "/main/pub/lives",
          condition: true,
        },
        {
          title: this.$t("Podcasts"),
          href: "/main/pub/podcasts",
          condition: true,
        },
        {
          title: this.$t("Emissions"),
          href: "/main/pub/emissions",
          condition: true,
        },
        {
          title: this.$t("Speakers"),
          href: "/main/pub/participants",
          condition: true,
        },
        {
          title: this.$t("Playlists"),
          href: "/main/pub/playlists",
          condition: true,
        },
        {
          title: this.$t("Productors"),
          href: "/main/pub/productors",
          condition:
            !this.isPodcastmaker && (!this.filterOrgaId || this.isEducation),
        },
      ];
    },
    userLinks() {
      return [
        {
          title: this.$t("Edit my profile"),
          href: "/main/priv/edit/profile",
          condition: !this.isPodcastmaker && this.isAuthenticated,
        },
        {
          title: this.$t("Edit my organisation"),
          href: "/main/priv/edit/organisation",
          condition:
            !this.isPodcastmaker &&
            this.isAuthenticated &&
            (this.isRoleOrganisation || 1 < this.organisationsAvailable.length),
        },
      ];
    },
    footerLinks() {
      if (this.isPodcastmaker || this.isGarRole) {
        return [];
      }
      return [
        {
          title: this.$t("Contact"),
          href: "/main/pub/contact",
          condition: true,
        },
        {
          title: this.$t("Term of use"),
          href: "/main/pub/cgu",
          condition: true,
        },
        {
          title: this.$t("Used libraries"),
          href: "/main/pub/libraries",
          condition: true,
        },
      ];
    },
    adminSection() {
      if (this.isPodcastmaker) {
        return;
      }
      return {
        title: this.$t("Welcome in the Backoffice"),
        href: "/main/priv/backoffice",
        condition: this.isAuthenticated,
        links: [
          {
            title: this.$t("Upload"),
            href: "/main/priv/upload",
            condition: this.isRoleContribution,
          },
          {
            title: this.$t("Media library"),
            href: "/main/priv/media",
            condition: this.isStudioAuth,
          },
          {
            title: this.$t("Studio"),
            href: "/main/priv/records",
            condition: this.isStudioAuth,
          },
          {
            title: this.$t("Radio planning"),
            href: "/main/priv/radio/",
            condition: this.isRoleRadio && this.radioAuthorized,
          },
          {
            title: this.$t("Edit / Delete episodes"),
            href: "/main/pub/podcasts",
            condition: true,
          },
          {
            title: this.$t("Handle my players"),
            href: "/main/priv/players",
            condition: this.isRoleEditor,
          },
          {
            title: this.$t("Monetization"),
            href: "/main/priv/edit/adserv",
            condition: this.isRoleAdvertising && !this.platformEducation,
          },
          {
            title: this.$t("Handle FTP"),
            href: "/main/priv/edit/ftp",
            condition: this.isRoleEditor,
          },
          {
            title: this.$t("Rubrics and topics"),
            href: "/main/priv/edit/rubrics",
            condition: this.isRoleEditor,
          },
          {
            title: this.$t("Handle RSS"),
            href: "/main/priv/edit/rss",
            condition: this.isRoleEditor,
          },
          {
            title: this.$t("Handle my participants"),
            href: "/main/priv/participants/handle",
            condition: this.isRoleEditor,
          },
          {
            title: this.$t("Handle comments"),
            href: "/main/priv/comments",
            condition: this.isRoleComments,
          },
          {
            title: this.$t("See my statistics"),
            href: "/main/priv/show/stats",
            condition: this.isRoleAnalytics,
          },
          {
            title: this.$t("Organisations management"),
            href: "/main/priv/edit/contract",
            condition: this.isRoleAdmin,
          },
          {
            title: this.$t("My account"),
            href: "/main/priv/account",
            condition: true,
          },
          {
            title: this.$t("Handle my users"),
            href: "/main/priv/user/handle",
            condition: this.isRoleUsers,
          },
        ],
      };
    },
  },
  created() {
    this.studioAuthorized = this.checkOrgaAttribute("studio.active");
    this.radioAuthorized = this.checkOrgaAttribute("radio.active");
  },
  methods: {
    checkOrgaAttribute(attribute: string): boolean {
      return (
        "true" == this.authOrganisation.attributes?.[attribute]?.toString()
      );
    },
  },
});
</script>
