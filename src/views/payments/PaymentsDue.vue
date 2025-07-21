<template>
  <div
    class="bg-neutral py-[40px] px-4 sm:px-6 md:px-8 lg:px-[24px] w-full min-h-screen"
  >
    <div class="mx-auto">
      <PaymentStatsCard :stats="paymentStats" />
      <div class="flex justify-between items-center mb-5">
        <h2 class="text-2xl font-semibold text-gray-800 m-0">PAYMENT DUE</h2>
        <div class="flex items-center gap-4">
          <a-select
            v-model:value="filterType"
            class="w-40"
            placeholder="Filter by type"
          >
            <a-select-option value="all">Show all</a-select-option>
            <a-select-option value="Rent">Rent</a-select-option>
            <a-select-option value="Utility">Utility</a-select-option>
            <a-select-option value="Security Deposit"
              >Security Deposit</a-select-option
            >
            <a-select-option value="Maintenance Fee"
              >Maintenance Fee</a-select-option
            >
          </a-select>
        </div>
      </div>
      <div class="rounded-xl border-none py-[14px] px-[28px] bg-[#FFFFFF]">
        <PaymentList
          :payments="filteredPayments"
          :showInvoiceLink="true"
          @notify="openNotifyModal"
          @confirm="openConfirmModal"
        />
      </div>
      <PaymentModal
        :visible="notifyModalVisible"
        modalType="notify"
        :payment="selectedPayment"
        :savedMessages="savedMessages"
        @ok="sendNotification"
        @cancel="closeNotifyModal"
      >
        <div class="space-y-3 max-w-md mx-auto">
          <a-form-item
            :validate-status="notifyErrors.title ? 'error' : ''"
            :help="notifyErrors.title"
          >
            <a-input
              v-model:value="notifyTitle"
              placeholder="Enter Title"
              class="mb-1 rounded-md"
              size="large"
            />
          </a-form-item>
          <a-form-item
            :validate-status="notifyErrors.message ? 'error' : ''"
            :help="notifyErrors.message"
          >
            <a-textarea
              v-model:value="notifyMessage"
              placeholder="Enter message"
              rows="4"
              class="rounded-md"
            />
          </a-form-item>
          <div>
            <div class="mb-1 text-xs text-gray-400 font-medium">
              Choose saved messages
            </div>
            <div class="flex flex-wrap gap-2 mb-1">
              <a-tag
                v-for="msg in savedMessages"
                :key="msg"
                @click="notifyMessage = msg"
                class="cursor-pointer bg-gray-100 hover:bg-primary/10 border-none text-gray-700"
                >{{ msg.length > 30 ? msg.slice(0, 30) + "..." : msg }}</a-tag
              >
            </div>
          </div>
        </div>
        <template #footer>
          <div class="flex gap-2 justify-end items-center">
            <a-button
              type="primary"
              :disabled="!notifyTitle.trim() || !notifyMessage.trim()"
              :loading="notifyLoading"
              @click="sendNotification"
              class="rounded-md px-3 py-1.5 flex items-center"
              >Send notification to tenant</a-button
            >
            <a-button
              :disabled="!notifyTitle.trim() || !notifyMessage.trim()"
              @click="sendNotificationToUnit"
              class="rounded-md px-3 py-1.5 flex items-center"
              >Send notification to unit</a-button
            >
          </div>
        </template>
      </PaymentModal>
      <PaymentModal
        :visible="confirmModalVisible"
        modalType="confirm"
        :payment="selectedPayment"
        @ok="confirmPayment"
        @cancel="closeConfirmModal"
      >
        <div class="space-y-3 max-w-md mx-auto">
          <div>
            <div class="text-xs text-gray-400 mb-1">Tenant</div>
            <div class="font-semibold text-lg text-gray-900 mb-1">
              {{ selectedPayment?.tenantName }}
            </div>
          </div>
          <div>
            <div class="text-xs text-gray-400 mb-1">Amount</div>
            <div class="font-bold text-2xl" style="color: rgba(160, 0, 0, 1)">
              ${{ selectedPayment?.amount }}
            </div>
          </div>
          <div class="text-xs text-gray-400 mt-1">
            Once confirmed, this payment will be marked as received and updated
            in the tenant's account.
          </div>
        </div>
        <template #footer>
          <div class="flex gap-2 justify-end items-center">
            <a-button
              type="primary"
              @click="confirmPayment"
              class="rounded-md px-3 py-1.5 flex items-center"
              >Confirm Payment</a-button
            >
            <a-button
              @click="closeConfirmModal"
              class="rounded-md px-3 py-1.5 flex items-center"
              >Cancel</a-button
            >
          </div>
        </template>
      </PaymentModal>
    </div>
  </div>
</template>

<script>
import PaymentList from "@/components/payments/PaymentList.vue";
import PaymentModal from "@/components/payments/PaymentModal.vue";
import PaymentStatsCard from "@/components/payments/PaymentStatsCard.vue";
export default {
  components: { PaymentList, PaymentModal, PaymentStatsCard },
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
          amount: 700,
          type: "Utility",
          invoiceUrl: "Invoice-11658345-211212.pdf",
        },
        {
          id: 3,
          tenantName: "Courtney Henry",
          unit: "Apt B-29, Brina Apartments",
          dueDate: "2024-08-29",
          amount: 700,
          type: "Maintenance Fee",
          invoiceUrl: "Invoice-11658345-211212.pdf",
        },
        {
          id: 4,
          tenantName: "Albert Flores",
          unit: "Apt B-29, Brina Apartments",
          dueDate: "2024-07-29",
          amount: 800,
          type: "Maintenance Fee",
          invoiceUrl: "Invoice-11658345-211212.pdf",
        },
        {
          id: 5,
          tenantName: "Jacob Jones",
          unit: "Apt B-29, Brina Apartments",
          dueDate: "2024-07-29",
          amount: 900,
          type: "Utility",
          invoiceUrl: "Invoice-11658345-211212.pdf",
        },
        {
          id: 6,
          tenantName: "Olivia Pope",
          unit: "Apt B-29, Brina Apartments",
          dueDate: "2024-07-29",
          amount: 900,
          type: "Security Deposit",
          invoiceUrl: "Invoice-11658345-211212.pdf",
        },
        {
          id: 7,
          tenantName: "Jenny Bass",
          unit: "Apt B-29, Brina Apartments",
          dueDate: "2024-07-29",
          amount: 1000,
          type: "Maintenance Fee",
          invoiceUrl: "Invoice-11658345-211212.pdf",
        },
      ],
      filterType: "all",
      notifyModalVisible: false,
      confirmModalVisible: false,
      selectedPayment: null,
      notifyTitle: "",
      notifyMessage: "",
      notifyErrors: {
        title: "",
        message: "",
      },
      notifyLoading: false,
      savedMessages: [
        "A noise complaint has been received.",
        "Your rent is still unpaid. Kindly settle as soon as possible.",
        "Your rent is still unpaid. Kindly...",
      ],
    };
  },
  computed: {
    filteredPayments() {
      if (this.filterType === "all") return this.payments;
      return this.payments.filter((p) => p.type === this.filterType);
    },
    paymentStats() {
      return {
        due: this.payments.length,
        utility: this.payments.filter((p) => p.type === "Utility").length,
        deposit: this.payments.filter((p) => p.type === "Security Deposit")
          .length,
        maintenance: this.payments.filter((p) => p.type === "Maintenance Fee")
          .length,
        rent: this.payments.filter((p) => p.type === "Rent").length,
      };
    },
  },
  methods: {
    openNotifyModal(payment) {
      this.selectedPayment = payment;
      this.notifyModalVisible = true;
    },
    closeNotifyModal() {
      this.notifyModalVisible = false;
      this.selectedPayment = null;
      this.notifyTitle = "";
      this.notifyMessage = "";
    },
    openConfirmModal(payment) {
      this.selectedPayment = payment;
      this.confirmModalVisible = true;
    },
    closeConfirmModal() {
      this.confirmModalVisible = false;
      this.selectedPayment = null;
    },
    sendNotification() {
      this.notifyErrors.title = this.notifyTitle.trim()
        ? ""
        : "Title is required";
      this.notifyErrors.message = this.notifyMessage.trim()
        ? ""
        : "Message is required";
      if (this.notifyErrors.title || this.notifyErrors.message) return;
      this.notifyLoading = true;
      setTimeout(() => {
        // Simulate async
        this.notifyLoading = false;
        this.closeNotifyModal();
      }, 1000);
    },
    sendNotificationToUnit() {
      // Implement notification to unit logic
      this.closeNotifyModal();
    },
    confirmPayment() {
      // Implement confirm payment logic
      this.closeConfirmModal();
    },
  },
};
</script>

<style></style>
