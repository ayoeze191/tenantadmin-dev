<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-800">Audit Logs</h2>
      <div class="flex gap-3">
        <a-input
          v-model="search"
          placeholder="Search by user or action"
          class="w-64"
          @change="fetchLogs"
        />
        <a-range-picker v-model="dateRange" @change="fetchLogs" />
      </div>
    </div>

    <a-table
      :columns="columns"
      :data-source="filteredLogs"
      :loading="loading"
      :pagination="pagination"
      row-key="id"
      bordered
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <span
            class="px-2 py-1 rounded text-white text-sm"
            :class="{
              'bg-green-500': record.action === 'LOGIN',
              'bg-yellow-500': record.action === 'UPDATE',
              'bg-red-500': record.action === 'DELETE',
              'bg-blue-500': record.action === 'CREATE',
            }"
          >
            {{ record.action }}
          </span>
        </template>
        <template v-else>
          {{ record[column.dataIndex] }}
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { message } from "ant-design-vue";
import axios from "axios";
import { audit_mock } from "./data";
import { auditsLogs } from "@/api/audits";

const logs = ref([...audit_mock]);
const loading = ref(false);
const search = ref("");
const dateRange = ref([]);
const pagination = ref({ current: 1, pageSize: 10 });

const columns = [
  { title: "User", dataIndex: "user" },
  { title: "Action", dataIndex: "action" },
  { title: "Description", dataIndex: "description" },
  { title: "IP Address", dataIndex: "ip" },
  { title: "Date", dataIndex: "timestamp" },
];

const fetchLogs = async () => {
  try {
    loading.value = false;
    auditsLogs().then((data) => {
      logs.value = data.items;
    });
  } catch (err) {
    message.error("Failed to fetch logs");
  } finally {
    loading.value = false;
  }
};

const filteredLogs = computed(() => {
  return logs.value.filter(
    (log) =>
      log.user.toLowerCase().includes(search.value.toLowerCase()) ||
      log.action.toLowerCase().includes(search.value.toLowerCase())
  );
});

onMounted(fetchLogs);
</script>

<style scoped>
.ant-table {
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
}
</style>
