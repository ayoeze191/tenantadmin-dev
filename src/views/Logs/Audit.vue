<template>
  <div class="px-4 font-inter h-full">
    <div
      class="rounded-[16px] mt-4 h-full font-inter border-[#36363633] border-[0.75px] border-solid"
    >
      <div class="flex gap-2.5 items-center">
        <table-header :total-item-count="totalItemCount" title="Audit Logs">
          <div class="flex gap-[10px]">
            <a-input
              v-model:value="searchQuery"
              placeholder="Search by name, gender, age.."
              class="py-[9px] border-[#D0D5DD] mr-[10px] border-[1px] rounded-[8px] w-[338px] border-solid"
            >
              <template #prefix>
                <SearchOutlined class="text-[#BEC1C6] text-[20px]" />
              </template>
            </a-input>
            <a-date-picker
              v-model:value="selectedDate"
              placeholder="Date"
              class="w-[80px]"
            />
          </div>
        </table-header>
      </div>
      <div class="w-full mt-4 h-full">
        <table-component
          :title="'Audits'"
          :columns="headers"
          :data-source="auditLists"
          :loading="isFetching"
        >
        </table-component>
      </div>
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

    <a-modal
      :footer="null"
      width="437px"
      :visible="showModal"
      centered
      :bodyStyle="{ padding: '0' }"
      class=""
      :closable="false"
    >
      <template #title>
        <div class="flex items-center justify-between py-[12px]">
          <span class="font-redwing text-2 leading-[100%] font-medium"
            >Tenant information</span
          >
          <span
            @click="
              () => {
                form.email = '';
                form.message = '';
                showModal = false;
              }
            "
            class="cursor-pointer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                fill="#323232"
              />
            </svg>
          </span>
        </div>
      </template>
      <div
        class="border-[#36363633] border-[0.75px] bg-[#FFFFFF] py-[10px] gap-2.5 flex items-center rounded-[16px] border-solid border-b-[0.75px] px-[14px]"
      >
        <div><img src="/src/assets/TenantImage.svg" /></div>
        <div class="h-full">
          <p
            class="m-0 p-0 text-[#000000] font-inter font-medium leading-[100%]"
          >
            {{ selectedTenant?.name }}
          </p>
          <p
            class="m-0 p-0 text-[#00000066] text-[10px] font-inter font-medium leading-[100%] mt-[4px]"
          >
            Thristlebrook Lane, Mistwood, Ontario, K8N 3P5
          </p>
        </div>
      </div>
      <p
        class="m-0 p-0 text-[#000000] text-[14px] font-inter font-medium leading-[100%] mt-4 mb-3"
      >
        Send Notification
      </p>
      <div>
        <BaseInput
          v-model="form.email"
          type="email"
          placeholder="Email address"
        />
      </div>
      <div class="mt-4">
        <BaseInput
          v-model="form.message"
          type="textarea"
          placeholder="Enter Message"
          :rows="5"
        />
      </div>
      <div class="flex flex-wrap gap-2.5 mt-3">
        <a-button
          @click="form.message = value"
          v-for="value in messages"
          class="py-[12px] flex rounded-[100px] items-center hover:bg-[#F0F0F0] bg-[#FFFFFF] px-[15px] font-inter font-medium text-[12px]"
        >
          {{ value }}
        </a-button>
      </div>
      <div
        class="pt-[16px] border-t-[0.75px] text-[14px] flex gap-[10px] mt-[16px]"
      >
        <a-button
          :loading="sendingmailtoteneant"
          @click="handleSendEmail"
          class="w-full py-[8px] flex items-center bg-[#000130] text-white justify-center rounded-[8px]"
        >
          Send to Tenant
        </a-button>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { SignUpLandlord, VerifyLandlord } from "@/api/auth";
import IconEdit from "@/components/icons/IconEdit.vue";
import V2Table from "@/components/V2Table.vue";
import handleError from "@/utils/handleError";
import { handleToast } from "@/utils/helper";
import dayjs from "dayjs";
import TableHeader from "@/components/TableHeader.vue";
import BasePagination from "@/components/BasePagination.vue";
import BaseInput from "@/components/BaseInput.vue";
import { h } from "vue";
import { sendEmailToTenant } from "@/api/tenancy";
import FilterButton from "@/components/icons/FilterButton.vue";
import UniversalButton from "@/components/Button/UniversalButton.vue";
import { ref } from "vue";
import { useUserStore } from "@/store";
import Loader from "@/components/Loader.vue";
import { auditsLogs } from "@/api/audits";
export default {
  components: {
    "table-component": V2Table,
    "table-header": TableHeader,
    "edit-icon": IconEdit,
    BasePagination: BasePagination,
    BaseInput: BaseInput,
    FilterButton,
    UniversalButton,
    Loader,
  },
  async created() {
    this.handleFetchLandlords();
    this.store.setisLoading(false);
  },
  watch: {
    searchQuery() {
      this.currentPage = 1;
      this.handleFetchLandlords(1);
    },
    selectedDate() {
      this.currentPage = 1;
      this.handleFetchLandlords(1);
    },
  },
  data() {
    return {
      value1: null,
      searchQuery: "",
      selectedDate: "",
      sendingmailtoteneant: false,
      isFetching: false,
      messages: [
        "Your lease Would Expire Soon",
        "A noise complain has b...",
        "Your service request has been sorted",
        "Your rent is still unpaid",
        "Kindly pay your rent please",
      ],
      form: { email: "", message: "" },
      store: useUserStore(),
      showModal: false,
      totalItemCount: 0,
      currentPage: 1,
      pageSize: 8,
      selectedTenant: null,
      headers: [
        {
          title: "Name",
          dataIndex: "userId",
          align: "left",
        },
        {
          title: "Description",
          dataIndex: "description",
          className: "description",
          align: "left",
        },
        {
          title: "Function",
          className: "function",
          dataIndex: "function",
          align: "center",
        },
        {
          title: "Date",
          dataIndex: "createDate",
          align: "center",
        },
      ],
      auditLists: [],
      tableDropdown: "",
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItemCount / this.pageSize);
    },
    filteredAuditLists() {
      let data = this.auditLists;

      // 🔍 Text search
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        data = data.filter(
          (item) =>
            item.userId?.toLowerCase().includes(q) ||
            item.function?.toLowerCase().includes(q) ||
            item.description?.toLowerCase().includes(q)
        );
      }

      // 📅 Date filter
      if (this.value1) {
        const selectedDate = dayjs(this.value1).format("YYYY-MM-DD");
        data = data.filter(
          (item) => dayjs(item.createDate).format("YYYY-MM-DD") === selectedDate
        );
      }

      return data;
    },
  },
  methods: {
    onPrev() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.onPageChange(this.currentPage);
      }
    },
    onNext() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.onPageChange(this.currentPage);
      }
    },

    isActive(data) {
      if (this.tableDropdown == data) {
        return true;
      } else return false;
    },
    toggleTableDropdown(data) {
      if (this.isActive(data)) {
        this.tableDropdown = "";
      } else this.tableDropdown = data;
    },
    handleSendEmail() {
      this.sendingmailtoteneant = true;
      const body = {
        tenantId: this.selectedTenant.accountId,
        subject: "Notification from Property Management",
        body: this.form.message,
        sendEmail: true,
        sendPush: true,
      };
      sendEmailToTenant(body).then((response) => {
        this.sendingmailtoteneant = false;
        if (response.success == true) {
          handleToast("Email Sent Successfully", "success");
          this.form.email = "";
          this.form.message = "";
          this.showModal = false;
        } else handleError(response);
      });
    },
    async handleFetchLandlords(page = 1) {
      const params = {
        page,
        size: this.pageSize,
        userId: this.searchQuery || null,
        fxn: null,
        dateFrom: this.selectedDate
          ? dayjs(this.selectedDate).startOf("day").toISOString()
          : null,
        dateTo: this.selectedDate
          ? dayjs(this.selectedDate).endOf("day").toISOString()
          : null,
      };
      this.isFetching = true;
      auditsLogs(params)
        .then((response) => {
          this.isFetching = false;
          if (response) {
            this.auditLists = response.items.map((item) => ({
              ...item,
              createDate: this.formatDate(item.createDate),
            }));
            this.totalItemCount = response.totalItemCount;
          } else handleError(response);
        })
        .finally(() => {
          // this.store.setisLoading(false);
        });
    },
    formatDate(date) {
      return dayjs(date).format("DD MMM,YYYY");
    },
    editLandlord(item) {
      this.$router.push({ name: "edit-users-landlord", query: item });
    },
    itemRender(current, type, originalElement) {
      if (type === "prev") {
        return h("a", "Previous");
      }
      if (type === "next") {
        return h("a", "Next");
      }
      return originalElement;
    },
    onPageChange(page) {
      this.currentPage = page;
      this.handleFetchLandlords(page);
    },
    handleSignUpLandlord(landlord) {
      SignUpLandlord(landlord.accountId).then((response) => {
        if (response.responseCode == "00") {
          handleToast("Success", "success");
          this.toggleTableDropdown("");
        } else handleError(response);
      });
    },
    handleVerifyLandlord(accountId) {
      const payload = {
        AdminUserID: accountId,
      };
      VerifyLandlord(payload).then((response) => {
        if (response.responseCode == "00") {
          handleToast("Landlord Verified Successfully", "success");
          this.handleFetchLandlords(this.currentPage);
        } else handleError(response);
      });
    },
  },
};
</script>
<style></style>
