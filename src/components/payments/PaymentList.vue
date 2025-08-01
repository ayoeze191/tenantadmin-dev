<template>
  <div class="">
    <div
      class="text-[#808097] text-[18px] border-b mb-4 border-solid border-[#C7C7C7] pb-[12px]"
    >
      All Payment Due
    </div>
    <div v-for="(group, month) in groupedPayments" :key="month" class="mb-4">
      <h3
        class="text-[14px] font-[500] text-[#808097] font-sf mb-5 uppercase px-[25px]"
      >
        {{ month }}
      </h3>
      <div
        v-for="payment in group"
        :key="payment.id"
        class="flex items-center justify-between rounded-lg shadow-sm px-5 py-3 mb-3"
        style="background: rgba(248, 248, 248, 1)"
      >
        <div>
          <div class="font-bold text-[18px] flex gap-3 mb-2 text-[#404164]">
            {{ payment.tenantName }}
            <span class="text-gray-500 font-normal">{{ payment.unit }}</span>
          </div>
          <div class="text-gray-400 text-[16px] leading-[100%]">
            Due:
            <span class="text-[#404164] text-[16px] leading-[100%] font-sf">{{
              payment.dueDate
            }}</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex flex-col items-end">
            <span
              class="font-semibold text-lg mb-1"
              style="color: rgba(160, 0, 0, 1)"
              >${{ payment.amount }}</span
            >
            <PaymentBadge :type="payment.type" class="mb-1" />
          </div>
          <a-dropdown placement="bottomRight" :trigger="['click']">
            <span
              class="ant-dropdown-link cursor-pointer text-xl px-2 flex items-center justify-center"
              @click.prevent
            >
              <IconMoreVertical style="width: 22px; height: 22px" />
            </span>

            <template #overlay>
              <a-menu>
                <a-menu-item @click="$emit('notify', payment)"
                  >Notify Tenants</a-menu-item
                >
                <a-menu-item @click="$emit('confirm', payment)"
                  >Confirm Payment</a-menu-item
                >
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconMoreVertical from "../icons/IconMoreVertical.vue";
import PaymentBadge from "./PaymentBadge.vue";
export default {
  props: {
    payments: Array,
    paymentType: String,
    showInvoiceLink: Boolean,
  },
  components: { PaymentBadge, IconMoreVertical },
  computed: {
    groupedPayments() {
      // Group by month (e.g., 'August 2024')
      const groups = {};
      this.payments.forEach((payment) => {
        const month = this.formatMonth(payment.dueDate);
        if (!groups[month]) groups[month] = [];
        groups[month].push(payment);
      });
      return groups;
    },
  },
  methods: {
    formatMonth(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleString("default", { month: "long", year: "numeric" });
    },
    onNotify(payment) {
      this.$emit("notify", payment);
    },
    onConfirm(payment) {
      this.$emit("confirm", payment);
    },
  },
};
</script>
