<template>
  <div class="mb-6 font-sf">
    <div
      class="flex flex-wrap bg-white p-6 rounded-[4px] justify-between shadow-sm"
    >
      <div v-for="stat in statsList" :key="stat.label" class="">
        <div class="">
          <div class="flex flex-col gap-1">
            <span
              class="text-[#404164] font-semibold text-[24px] font-sf leading-[25px]"
              >{{ stat.count }}</span
            >
            <span :class="stat.color + ' text-[16px] '">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      required: true,
    },
  },
  computed: {
    statsList() {
      return [
        { label: "Payment Due", count: this.stats.due, color: "text-primary" },
        {
          label: "Utility",
          count: this.stats.utility,
          color: "text-yellow-500",
        },
        {
          label: "Security Deposit",
          count: this.stats.deposit,
          color: "text-green-600",
        },
        {
          label: "Maintenance Fee",
          count: this.stats.maintenance,
          color: "text-pink-500",
        },
        {
          label: "Rent Payment",
          count: this.stats.rent,
          color: "text-purple-600",
        },
      ];
    },
  },
};
</script>
