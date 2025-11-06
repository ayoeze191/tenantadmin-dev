<template>
  <a-table
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
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  dataSource: {
    type: Array,
    required: true,
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
