<template>
  <a-table
    v-if="dataSource.length"
    :columns="computedColumns"
    :data-source="dataSource"
    bordered
    :pagination="false"
    rowKey="id"
  >
    <template #bodyCell="{ column, text, record, index }">
      <!-- Auto Serial Number -->
      <template v-if="column.dataIndex === 'serial'">
        <div class="text-center">
          {{ index + 1 }}
        </div>
      </template>

      <!-- Regular text columns -->
      <template v-else-if="!column.slotName && column.dataIndex !== 'action'">
        <div class="text-center mx-auto">
          {{ text || "—" }}
        </div>
      </template>

      <!-- Custom slot for flexible content -->
      <template v-else-if="column.slotName">
        <slot :name="column.slotName" :text="text" :record="record" />
      </template>

      <!-- Action column (if you have one) -->
      <template v-else-if="column.dataIndex === 'action'">
        <slot name="action" :record="record" />
      </template>
    </template>
  </a-table>

  <div v-else>
    <IsEmpty :title="title" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import IsEmpty from "./IsEmpty.vue";

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  dataSource: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
});

defineEmits(["edit", "verify"]);

// 👇 Prepend S/N column automatically
const computedColumns = computed(() => {
  return [
    {
      title: "S/N",
      dataIndex: "serial",
      align: "center",
      width: 70,
    },
    ...props.columns,
  ];
});
</script>

<style scoped>
:deep(.ant-table-thead) > tr > th {
  text-align: center !important;
  color: #00000080 !important;
  font-family: "Inter", sans-serif !important;
  font-weight: 500 !important;
  font-size: 14px !important;
  line-height: 20px !important;
}
:deep(.ant-table) {
  height: 100% !important;
}
</style>
