<template>
  <div
    v-if="(filterOrgaId || organisationId) && radio.length"
    class="d-flex flex-column align-items-start mt-3"
  >
    <h2 class="mb-0 big-h2 mb-3">
      {{ $t("Radio") }}
    </h2>
    <template v-if="radio.length">
      <RadioItem
        v-for="radioItem in radio"
        :key="radioItem.id"
        :radio="radioItem"
      />
    </template>
  </div>
</template>

<script lang="ts">
import RadioItem from "./RadioItem.vue";
import { handle403 } from "../../mixins/handle403";
import classicApi from "../../../api/classicApi";
import { useFilterStore } from "../../../stores/FilterStore";
import { mapState } from "pinia";
import { Canal } from "@/stores/class/radio/canal";
import { defineComponent } from "vue";
import { AxiosError } from "axios";
export default defineComponent({
  name: "Ecbd98d979bd4312Ad5eFc7c1c4a191c",
  components: {
    RadioItem,
  },

  mixins: [handle403],

  props: {
    organisationId: { default: undefined, type: String },
  },
  data() {
    return {
      radio: [] as Array<Canal>,
    };
  },

  computed: {
    ...mapState(useFilterStore, ["filterOrgaId"]),
    filterOrgaUsed(): string | undefined {
      return this.filterOrgaId ? this.filterOrgaId : this.organisationId;
    },
  },
  watch: {
    filterOrgaUsed: {
      async handler(): Promise<void> {
        this.fetchContent();
      },
      immediate: true,
    },
  },
  methods: {
    async fetchContent(): Promise<void> {
      this.radio.length = 0;
      if (!this.filterOrgaUsed) {
        return;
      }
      try {
        this.radio = await classicApi.fetchData<Array<Canal>>({
          api: 14,
          path: "canal/orga/" + this.filterOrgaUsed + "/",
        });
      } catch (error) {
        this.handle403(error as AxiosError);
      }
    },
  },
});
</script>
