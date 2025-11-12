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
   <slot>
    {{ label }}
   </slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    label: {
      type: String,
      default: "",
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
    handleClick(e) {
      if (!this.disabled && !this.loading) {
        this.$emit('click', e);
        // this.onClick(e);
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
