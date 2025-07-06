<template>
  <a-modal
    :visible="visible"
    :footer="footer"
    @ok="onOk"
    @cancel="onCancel"
    :width="480"
  >
    <div>
      <div v-if="modalType === 'notify'">
        <div class="text-xl font-bold text-gray-900 mb-1">
          Send Notification
        </div>
        <div
          v-if="payment?.tenantName"
          class="text-base font-medium text-primary mb-6"
        >
          {{ payment.tenantName }}
        </div>
      </div>
      <div v-else-if="modalType === 'confirm'">
        <div class="text-xl font-bold text-gray-900 mb-1">
          Payment Confirmation
        </div>
        <div class="text-sm text-gray-500 mb-6">
          You are about to confirm a payment made, please ensure the details are
          accurate before proceeding.
        </div>
      </div>
      <slot />
    </div>
  </a-modal>
</template>
<script>
export default {
  props: {
    visible: Boolean,
    modalType: String, // 'notify' or 'confirm'
    payment: Object,
    savedMessages: Array,
  },
  computed: {
    footer() {
      return this.$slots.footer ? this.$slots.footer() : undefined;
    },
  },
  methods: {
    onOk() {
      this.$emit("ok");
    },
    onCancel() {
      this.$emit("cancel");
    },
  },
};
</script>
