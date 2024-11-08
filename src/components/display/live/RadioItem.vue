<template>
  <div v-if="radio" class="d-flex border w-100 p-3">
    <RadioImage :radio="radio" />
    <router-link
      :to="{
        name: 'radio',
        params: { canalId: radio.id },
      }"
      class="text-dark emission-item-text"
      :title="$t('Radio name page', {name:radio.name})"
    >
      <div class="emission-name mb-2">
        {{ radio.name }}
      </div>
      <div v-if="radio.description" class="ten-line-clamp">
        {{ radio.description }}
      </div>
      <RadioCurrently :radio="radio" />
    </router-link>
  </div>
</template>

<script lang="ts">
import imageProxy from "../../mixins/imageProxy";
import RadioImage from "./RadioImage.vue";
import RadioCurrently from "./RadioCurrently.vue";
import { defineComponent } from "vue";
import { Canal } from "@/stores/class/radio/canal";
export default defineComponent({
  name: "RadioItem",

  components: {
    RadioCurrently,
    RadioImage,
  },
  mixins: [imageProxy],

  props: {
    radio: { default: undefined, type: Object as () => Canal },
  },
});
</script>
