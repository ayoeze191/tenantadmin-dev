<template>
  <a-table
    :columns="columns"
    :data-source="data"
    bordered
    :pagination="{ pageSize: 12 }"
    rowKey="id"
    class="border-border_lightgray h-full"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key !== 'action'">
        <span class="">
          {{ record[column.dataIndex] }}
        </span>
      </template>

      <template v-else>
        <button class="">
          {{ button_label }}
        </button>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  headers: { type: Array, required: true },
  data: { type: Array, required: true },
  button_label: { type: String, default: "View Details" },
});
const dataAttributes = ["id", "name", "property", "unitNumber", "status"];

// Convert headers into AntD column definitions
const columns = computed(() => [
  ...props.headers.map((header, i) => ({
    title: header,
    dataIndex: dataAttributes[i],
    key: header,
  })),
  {
    title: "",
    key: "action",
  },
]);
</script>
