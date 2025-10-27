<template>
  <!-- Header -->
  <div class="grid grid-cols-6">
    <div
      v-for="value in headers"
      class="text-[#00000080] text-center py-[12px] px-[24px] bg-[#F9F9F9] border-solid border-[#36363633] border-r-[0.75px] border-b-[0.75px] font-inter text-sm leading-[20px] font-medium"
    >
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: "dashboardTable",
  props: {
    headers: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      default: "",
    },
  },
};
</script>
