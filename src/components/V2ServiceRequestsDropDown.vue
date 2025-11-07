<template>
  <a-dropdown :trigger="['click']">
    <a-button type="default" class="flex items-center gap-2">
      {{ label }}
      <DownOutlined />
    </a-button>

    <template #overlay>
      <a-menu @click="onSelect">
        <a-menu-item
          v-for="(item, index) in options"
          :key="index"
          :disabled="item.disabled"
        >
          {{ item.label }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup>
import { DownOutlined } from "@ant-design/icons-vue";

const props = defineProps({
  label: {
    type: String,
    default: "Select Option",
  },
  options: {
    type: Array,
    required: true,
    // Example:
    // [{ label: 'Edit', value: 'edit' }, { label: 'Delete', value: 'delete' }]
  },
});

const emit = defineEmits(["select"]);

function onSelect({ key }) {
  const selected = props.options[key];
  emit("select", selected);
}
</script>

<style scoped>
/* Optional styling */
.ant-btn {
  border-radius: 8px;
  font-weight: 500;
  background-color: #f4f4f4;
  font-size: 14px;
  font-family: "Inter", sans-serif;

  padding: 8px 12px;
}
</style>
