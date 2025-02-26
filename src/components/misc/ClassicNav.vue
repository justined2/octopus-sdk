<template>
  <ul class="octopus-nav" :class="light ? 'light' : ''">
    <li
      v-for="index in tabNumber"
      v-show="hasSlot(index - 1)"
      :key="index - 1"
      class="octopus-nav-item"
    >
      <button
        class="octopus-nav-link"
        :class="activeTab === index - 1 ? 'active' : ''"
        @click="$emit('update:activeTab', index - 1)"
      >
        <slot :name="index - 1" />
      </button>
    </li>
  </ul>
  <div
    :class="
      transparent
        ? 'd-flex flex-grow-1 classic-nav-tab-container'
        : 'octopus-tab-content'
    "
  >
    <div
      v-for="index in tabNumber"
      v-show="hasSlot('tab' + (index - 1))"
      :key="index - 1"
      class="octopus-tab-pane"
      :class="activeTab === index - 1 ? 'active' : ''"
    >
      <slot :name="'tab' + (index - 1)" :is-active="activeTab === index - 1" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ClassicNav",
  props: {
    tabNumber: { default: 0, type: Number },
    activeTab: { default: 0, type: Number },
    transparent: { default: false, type: Boolean },
    light: { default: false, type: Boolean },
  },
  emits: ["update:activeTab"],
  methods: {
    hasSlot(name = "default") {
      return !!this.$slots[name];
    },
  },
});
</script>

<style lang="scss">
@use "@scss/variables" as octopusVariables;
.octopus-app {
  .octopus-nav {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    margin-top: 0;
    list-style: none;
    border-bottom: 0.05rem solid #ddd;
    &.light {
      border: 0;
    }
  }
  .octopus-nav-item {
    border-right: solid 1px rgb(222, 226, 230);
    border-left: solid 1px rgb(222, 226, 230);
    border-top: solid 1px rgb(222, 226, 230);
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    cursor: pointer;
    display: flex;
    flex-grow: 1;
    text-align: center;
  }
  .octopus-nav.light .octopus-nav-item {
    border: 0;
    flex-grow: 0;
  }
  .octopus-nav-link {
    display: block;
    background: transparent;
    flex-grow: 1;
    padding: 0.5rem 1rem;
    text-decoration: none;
    transition:
      color 0.15s ease-in-out,
      background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out;
    border: 0.1rem solid transparent;
    &:hover {
      border-color: #dee2e6;
      border-bottom-color: octopusVariables.$octopus-primary-color;
      color: octopusVariables.$octopus-primary-color;
    }
    &.active {
      border-color: octopusVariables.$octopus-primary-color;
      background: octopusVariables.$octopus-primary-color;
      color: white;
    }
  }
  .octopus-nav.light .octopus-nav-link {
    border-top: 0 !important;
    border-right: 0 !important;
    border-left: 0 !important;
    font-weight: bold;
  }
  .octopus-tab-content {
    border-right: solid 1px rgb(222, 226, 230);
    border-left: solid 1px rgb(222, 226, 230);
    border-bottom: solid 1px rgb(222, 226, 230);
    background-color: #f8fafc;
  }
  .octopus-tab-pane {
    display: none;
    &.active {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem;
      flex-grow: 1;
    }
  }
}
</style>
