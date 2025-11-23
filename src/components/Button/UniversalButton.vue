<template>
  <button
    :class="[
      baseClass,
      customClass,
      loading ? 'opacity-50 cursor-not-allowed' : '',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading">Loading...</span>
    <span v-else>
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<script>
export default {
  name: "UniversalButton",
  props: {
    label: String,
    customClass: String,
    loading: Boolean,
    disabled: Boolean,
  },
  computed: {
    baseClass() {
      return "py-[6px] rounded-[6px] font-inter font-medium";
    },
  },
  methods: {
    handleClick() {
      if (this.disabled || this.loading) return;
      // Always emit a standard click
      this.$emit("click");
    },
  },
};
</script>
