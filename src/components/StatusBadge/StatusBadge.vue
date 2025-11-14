<template>
    <span class='badge'>{{ label }}</span>
</template>


<script>
export default {
  name: "StatusBadge",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
</style>