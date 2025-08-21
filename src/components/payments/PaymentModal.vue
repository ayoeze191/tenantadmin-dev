<template>
  <a-modal
    :visible="visible"
    :footer="footer"
    @ok="onOk"
    @cancel="onCancel"
    :width="768"
  >
    <template #title>
      <div
        class="flex items-center justify-between border-b border-[#C7C7C7] py-[12px]"
      >
        <div
          class="cursor-pointer flex items-center gap-[8px] text-txt_dark text-[18px] font-medium"
        >
          <ArrowLeftOutlined
            @click="
              () => {
                showApproveSuccessModal = false;
                showRequestsModal = true;
              }
            "
            class="text-[18px]"
          />
        </div>
        <span class="text-[32px] leading-[28px] font-[500] font-sf">
          {{ payment.tenantName }}</span
        >
        <span></span>
      </div>
    </template>
    <div>
      <div v-if="modalType === 'notify'">
        <div
          class="text-xl mt-[24px] mb-[32px] font-sf font-medium text-gray-900"
        >
          Send Notification
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
