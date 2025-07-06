<template>
  <span :class="badgeClass">{{ typeLabel }}</span>
</template>
<script>
export default {
  props: { type: String },
  computed: {
    badgeClass() {
      switch (this.type) {
        case "Rent":
          return "bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs";
        case "Utility":
          return "bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs";
        case "Security Deposit":
          return "bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs";
        case "Maintenance Fee":
          return "bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs";
        default:
          return "bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs";
      }
    },
    typeLabel() {
      switch (this.type) {
        case "Rent":
          return "Rent";
        case "Utility":
          return "Utility";
        case "Security Deposit":
          return "Security Deposit";
        case "Maintenance Fee":
          return "Maintenance Fee";
        default:
          return this.type;
      }
    },
  },
};
</script>
