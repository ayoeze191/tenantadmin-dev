<template>
  <div class="px-4 font-inter h-full">
    <div
      class="rounded-[16px] mt-4 h-full font-inter border-[#36363633] border-[0.75px] border-solid"
    >
      <div class="flex gap-2.5 items-center">
        <TableHeader :total-item-count="totalItemCount" title="Audit Logs">
          <div class="flex gap-[10px]">
            <FilterButton />
          </div>
        </TableHeader>
      </div>
    </div>
    <div class="w-full mt-4 h-full">
      <v2-table
        :title="tenants"
        :columns="headers"
        :data-source="filteredLogs"
        :loading="isFetching"
      >
        <template #action="{ record }">
          <div class="relative flex justify-center items-center group">
            <!-- Hidden div -->
            <div
              class="absolute z-[50] text-[12px] right-2 top-0 p-5 border-[0.75px] border-solid rounded-[16px] bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
            >
              <div
                class="flex items-center gap-[8px] p-[10px] rounded-[10px] border-[0.75px] border-solid border-[#36363633]"
              >
                <div class="flex h-[34px] w-[34px]">
                  <img src="/src/assets/TenantImage.svg" />
                </div>
                <div>
                  <p class="m-0 p-0">
                    {{ record.name }}
                  </p>
                  <p class="m-0 p-0 mt-[2px]">{{ record.email }}</p>
                </div>
              </div>
              <!-- asa -->
              <div class="mt-4 m-0">
                <p class="text-[#000000]">
                  <span
                    class="text-[#00000099] text-[12px] font-medium leading-[20px]"
                    >Apartment:</span
                  >
                  {{ record.properties || "nill" }}
                </p>
                <p>
                  <span class="text-[#00000099]">Rent Amount:</span> ${{
                    record.bills
                  }}
                </p>
                <p>
                  <span class="text-[#00000099]">Rent Due:</span>
                  {{ record.due || "nill" }}
                </p>
                <p>
                  <span class="text-[#00000099]">Lease Expires:</span>
                  {{ record.rent || "nill" }}
                </p>
                <div>
                  <span class="text-[#00000099]">Lease:</span> View Tenant
                </div>
              </div>

              <UniversalButton
                label="Send notification to Tenant"
                @click="
                  () => {
                    selectedTenant = record;
                    showModal = true;
                    form.email = record.email;
                  }
                "
                customClass="py-[8px] w-full flex items-center justify-center bg-[#000130] text-white mt-6 text-[14px] rounded-[8px]"
              />
            </div>
            <a-button class="bg-[#000130] bg-inherit text-black cursor-pointer"
              >View Info</a-button
            >
          </div>
        </template>
      </v2-table>
      <BasePagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        :total="totalItemCount"
        :pageSize="pageSize"
        @prev="onPrev"
        @next="onNext"
        @change="onPageChange"
      />
    </div>
    <!-- 
    <a-table
      :columns="columns"
      :data-source="filteredLogs"
      :loading="loading"
      :pagination="pagination"
      @change="handleTableChange"
      row-key="id"
      bordered
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <span
            class="px-2 py-1 rounded text-white text-sm"
            :class="{
              'bg-green-500': record.function === 'LOGIN',
              'bg-yellow-500': record.function === 'UPDATE',
              'bg-red-500': record.function === 'DELETE',
              'bg-blue-500': record.function === 'CREATE',
            }"
          >
            {{ record.function }}
          </span>
        </template>
        <template v-else>
          {{ record[column.dataIndex] }}
        </template>
      </template>
    </a-table> -->
  </div>
</template>

<script setup>
import FilterButton from "@/components/icons/FilterButton.vue";
import { ref, computed, onMounted } from "vue";
import { message } from "ant-design-vue";
import axios from "axios";
import { audit_mock } from "./data";
import { auditsLogs } from "@/api/audits";
import TableHeader from "@/components/TableHeader.vue";
import V2Table from "@/components/V2Table.vue";
const logs = ref([]);
const search = ref("");
const dateRange = ref([]);
const loading = ref(false);
const isFetching = ref(false);
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: false,
});

const columns = [
  { title: "User", dataIndex: "userId" },
  { title: "Date", dataIndex: "createDate" },
  { title: "function", dataIndex: "function" },
  { title: "Description", dataIndex: "description" },
];
const headers = [
  {
    title: "User",
    dataIndex: "userId",
    align: "left",
  },
  {
    title: "Date",
    dataIndex: "createDate",
    className: "createDate",
    align: "left",
  },
  {
    title: "Function",
    className: "function",
    dataIndex: "function",
    align: "center",
  },
  {
    title: "Description",
    dataIndex: "description",
    align: "center",
  },
  {
    title: "Last Login",
    dataIndex: "lastLoginDate",
    align: "center",
  },
  {
    title: "action",
    dataIndex: "action",
    align: "center",
    slotName: "action",
  },
];

const handleTableChange = async (paginationInfo) => {
  pagination.value.current = paginationInfo.current;
  fetchLogs();
};

const fetchLogs = async () => {
  try {
    loading.value = true;
    auditsLogs(pagination.value.current).then((data) => {
      logs.value = data.items;
      pagination.value.total = data.totalItemCount;
    });
  } catch (err) {
    message.error("Failed to fetch logs");
  } finally {
    loading.value = false;
  }
};

const filteredLogs = computed(() => {
  return logs.value.filter((log) =>
    // log.userId.toLowerCase().includes(search.value.toLowerCase()) ||
    log.function.toLowerCase().includes(search.value.toLowerCase())
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
