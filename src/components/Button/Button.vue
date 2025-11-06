<template>
  <button
    :class="[
      'btn',
      {
        btn_grow: size == 'grow',
        btn_primary: type == 'primary',
        btn_secondary: type == 'secondary',
        btn_dng: type == 'danger',
        disabled,
      },
    ]"
    :disabled="disabled || loading"
    :role="role"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "Button",
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
      default: () => null,
    },
    type: {
      type: String,
      default: "primary",
    },
    role: {
      type: String,
      default: "submit",
    },
    size: {
      type: String,
      default: "fit",
    },
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
