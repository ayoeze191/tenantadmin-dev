<template>
  <div class="bg-neutral py-5 px-10 w-full min-h-screen pb-40">
    <PaymentStatsCard :stats="paymentStats" />
    <h2 class="text-2xl font-semibold text-gray-800 mb-8">MAINTENANCE FEE</h2>
    <div>
      <div v-for="(group, month) in groupedPayments" :key="month" class="mb-8">
        <h3 class="text-base font-semibold text-gray-500 mb-2 uppercase">
          {{ month }}
        </h3>
        <div
          v-for="payment in group"
          :key="payment.id"
          class="flex items-center justify-between bg-white rounded-lg shadow-sm px-6 py-4 mb-3"
        >
          <div>
            <div class="font-medium text-gray-900">
              {{ payment.tenantName }}
              <span class="text-gray-500 font-normal">{{ payment.unit }}</span>
            </div>
          </div>
          <div class="flex items-center gap-6">
            <span class="font-semibold text-lg text-primary"
              >${{ payment.amount }}</span
            >
            <span class="text-gray-400 text-xs">{{
              formatDate(payment.dueDate)
            }}</span>
            <a
              :href="payment.invoiceUrl"
              class="text-blue-600 underline text-xs flex items-center gap-1"
              target="_blank"
            >
              <i class="anticon anticon-file-pdf"></i> {{ payment.invoiceUrl }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PaymentStatsCard from "@/components/payments/PaymentStatsCard.vue";
export default {
  components: { PaymentStatsCard },
  data() {
    return {
      payments: [
        {
          id: 1,
          tenantName: "Courtney Henry",
          unit: "Apt B-29, Brina Apartments",
          dueDate: "2024-08-29",
          amount: 700,
          type: "Maintenance Fee",
          invoiceUrl: "Invoice-11658345-211212.pdf",
        },
        {
          id: 2,
          tenantName: "Albert Flores",
          unit: "Apt B-29, Brina Apartments",
          dueDate: "2024-07-29",
          amount: 800,
          type: "Maintenance Fee",
          invoiceUrl: "Invoice-11658345-211212.pdf",
        },
        {
          id: 3,
          tenantName: "Jenny Bass",
          unit: "Apt B-29, Brina Apartments",
          dueDate: "2024-07-29",
          amount: 1000,
          type: "Maintenance Fee",
          invoiceUrl: "Invoice-11658345-211212.pdf",
        },
      ],
    };
  },
  computed: {
    paymentStats() {
      return {
        due: this.payments.length,
        utility: 0,
        deposit: 0,
        maintenance: this.payments.length,
        rent: 0,
      };
    },
    groupedPayments() {
      const groups = {};
      this.payments.forEach((payment) => {
        if (payment.type !== "Maintenance Fee") return;
        const date = new Date(payment.dueDate);
        const month = date
          .toLocaleString("default", { month: "long", year: "numeric" })
          .toUpperCase();
        if (!groups[month]) groups[month] = [];
        groups[month].push(payment);
      });
      return groups;
    },
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-GB");
    },
  },
};
</script>
