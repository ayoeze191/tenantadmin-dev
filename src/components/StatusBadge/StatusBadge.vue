<template>
    <span :class="['badge', `badge-${type}`]">{{ label }}</span>
</template>


<script>
export default {
  name: "StatusBadge",
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "success",
    },
  },
};
</script>

<style>
</style>