<template>
  <div class="bg-neutral py-5 px-2 w-full min-h-screen">
    <div class="max-w-5xl mx-auto">
      <PaymentStatsCard :stats="paymentStats" />
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">RENT PAYMENT</h2>
      <a-card class="border-none rounded-xl">
        <div>
          <div
            v-for="(group, month) in groupedPayments"
            :key="month"
            class="mb-4"
          >
            <h3 class="text-base font-semibold text-gray-500 mb-2 uppercase">
              {{ month }}
            </h3>
            <div
              v-for="payment in group"
              :key="payment.id"
              class="flex items-start justify-between rounded-lg shadow-sm px-4 py-3 mb-3"
              style="background: rgba(248, 248, 248, 1)"
            >
              <div>
                <div class="font-bold text-gray-900">
                  {{ payment.tenantName }}
                  <span class="text-gray-500 font-normal ml-3">{{
                    payment.unit
                  }}</span>
                </div>
                <a
                  :href="payment.invoiceUrl"
                  class="text-blue-600 underline text-xs flex items-center gap-1 mt-2"
                  target="_blank"
                >
                  <span class="text-red-500 font-bold">PDF</span>
                  {{ payment.invoiceUrl }}
                </a>
              </div>
              <div class="flex flex-col items-end gap-1">
                <span
                  class="font-semibold text-lg"
                  style="color: rgba(160, 0, 0, 1)"
                  >${{ payment.amount }}</span
                >
                <span class="text-gray-400 text-xs">{{
                  formatDate(payment.dueDate)
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </a-card>
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
        // Example data, replace with API/store
        {
          id: 1,
          tenantName: "Steph Orkuma",
          unit: "Apt B-29, Brina Apartments",
          dueDate: "2024-08-29",
          amount: 1200,
          type: "Rent",
          invoiceUrl: "Invoice-11658345-211212.pdf",
        },
        {
          id: 2,
          tenantName: "Darrell Steward",
          unit: "Apt B-29, Brina Apartments",
          dueDate: "2024-08-29",
          amount: 1200,
          type: "Rent",
          invoiceUrl: "Invoice-11658345-211212.pdf",
        },
        {
          id: 3,
          tenantName: "Oliva Pope",
          unit: "Apt B-29, Brina Apartments",
          dueDate: "2024-08-29",
          amount: 1200,
          type: "Rent",
          invoiceUrl: "Invoice-11658345-211212.pdf",
        },
        {
          id: 4,
          tenantName: "Courtney Henry",
          unit: "Apt B-29, Brina Apartments",
          dueDate: "2024-08-20",
          amount: 1000,
          type: "Rent",
          invoiceUrl: "Invoice-11658345-211212.pdf",
        },
        {
          id: 5,
          tenantName: "Albert Flores",
          unit: "Apt B-29, Brina Apartments",
          dueDate: "2024-07-29",
          amount: 700,
          type: "Rent",
          invoiceUrl: "Invoice-11658345-211212.pdf",
        },
        {
          id: 6,
          tenantName: "Jenny Bass",
          unit: "Apt B-29, Brina Apartments",
          dueDate: "2024-07-29",
          amount: 1000,
          type: "Rent",
          invoiceUrl: "Invoice-11658345-211212.pdf",
        },
        {
          id: 7,
          tenantName: "Jacob Jones",
          unit: "Apt B-29, Brina Apartments",
          dueDate: "2024-07-29",
          amount: 1200,
          type: "Rent",
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
        maintenance: 0,
        rent: this.payments.length,
      };
    },
    groupedPayments() {
      // Group by month (e.g., 'August 2024')
      const groups = {};
      this.payments.forEach((payment) => {
        if (payment.type !== "Rent") return;
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
