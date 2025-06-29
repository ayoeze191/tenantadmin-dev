<template>
  <li
    class="px-3 py-2 rounded"
    :class="{ 'bg-light_grey2': isCurrentRoute(path) }"
  >
    <router-link :to="{ name }">
      <p class="ml-6 leading-5 text-subtle">{{ label }}</p>
    </router-link>
  </li>
</template>

<script setup>
import { useRoute } from "vue-router";
defineProps(["name", "label", "path"]);
const route = useRoute();
const isCurrentRoute = (path) => route.path === path;
</script>
