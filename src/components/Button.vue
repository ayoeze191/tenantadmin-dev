<template>
  <button
    :class="['btn', { 'btn_primary': type == 'primary', 'btn_secondary': type == 'secondary', disabled }]"
    :disabled="disabled || loading"
    :role="role"
    @click="handleClick"

  >
    <!-- <span v-if="loading">
        <svg class="w-5 h-5 text-primary animate-spin mx-auto" fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"></path>
        </svg>
    </span> -->
    <span>{{ label }}</span>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    label: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      default: ()=>null,
    },
    type: {
        type: String,
        default: "primary"
    },
    role: {
        type: String,
        default: 'submit'
    }
  },
  methods: {
    handleClick() {
      if (!this.disabled && !this.loading) {
        this.onClick();
      }
    },
  },
};
</script>

<style scoped>
.btn.disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>