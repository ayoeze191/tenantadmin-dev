<template>
  <div class="flex flex-col gap-1 w-full">
    <!-- Label -->
    <label
      v-if="label"
      class="text-[#1E1E1E] font-medium text-[13px] leading-[20px]"
      :for="name"
    >
      {{ label }}
    </label>

    <!-- Input Field -->
    <component
      :is="inputComponent"
      v-bind="inputProps"
      v-model:value="inputValue"
      :id="name"
      :placeholder="placeholder"
      class="w-full border-solid border-[0.8px] border-[#E1E1E1] rounded-[8px] focus:border-[#000130] focus:ring-0"
      :rows="type === 'textarea' ? rows : undefined"
      :disabled="disabled"
      @input="onInput"
    />

    <!-- Error Text -->
    <p v-if="error" class="text-red-500 text-[12px] mt-1">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Input } from "ant-design-vue";

// ✅ Props
const props = defineProps({
  modelValue: [String, Number],
  type: {
    type: String,
    default: "text", // can be text, email, tel, password, textarea
  },
  name: String,
  label: String,
  placeholder: String,
  error: String,
  rows: {
    type: Number,
    default: 4,
  },
  disabled: Boolean,
});

// ✅ Emits
const emit = defineEmits(["update:modelValue", "input"]);

// ✅ Computed component type
const inputComponent = computed(() =>
  props.type === "textarea" ? Input.TextArea : Input
);

// ✅ Bind input props
const inputProps = computed(() => ({
  type: props.type !== "textarea" ? props.type : undefined,
  placeholder: props.placeholder,
  disabled: props.disabled,
}));

// ✅ Two-way binding
const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const onInput = (e) => emit("input", e.target.value);
</script>

<style scoped>
.ant-input,
.ant-input-textarea {
  border-radius: 8px !important;
  font-size: 14px;
  padding: 10px 12px;
}
</style>
