<template>
  <div class="flex flex-wrap gap-3 mb-6">
    <div
      v-for="stat in statsList"
      :key="stat.label"
      class="flex-1 min-w-[160px]"
    >
      <a-card :body-style="{ padding: '18px 20px' }" class="shadow-sm">
        <div class="flex flex-col gap-1">
          <span class="text-primary font-semibold text-lg">{{
            stat.count
          }}</span>
          <span :class="stat.color + ' text-xs font-medium uppercase'">{{
            stat.label
          }}</span>
        </div>
      </a-card>
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
        { label: "Payment Due", count: this.stats.due, color: "text-blue-600" },
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
