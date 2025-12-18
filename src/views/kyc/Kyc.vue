<template>
  <div class="px-4 font-inter h-full">
    <div
      class="rounded-[16px] mt-4 h-full font-inter border-[#36363633] border-[0.75px] border-solid"
    >
      <div class="flex gap-2.5 items-center">
        <table-header
          :total-item-count="landlordList.length"
          title="KYC Verification"
        >
          <div class="flex gap-[10px]">
            <filter-button />
          </div>
        </table-header>
      </div>

      <div class="w-full mt-4 h-full">
        <table-component
          :title="tenants"
          :columns="headers"
          :data-source="landlordList"
          :loading="isFetching"
        >
          <template #action="{ record }">
            <div class="relative flex justify-center items-center group">
              <!-- Hidden div -->
              <a-button
                @click="
                  () => {
                    selectedKYC = record;
                    showModal = true;
                    stage = 0;
                  }
                "
                class="bg-[#000130] bg-inherit text-black cursor-pointer"
                >View Details</a-button
              >
            </div>
          </template>
          <template #status="{ record }">
            <div class="relative flex justify-center items-center group">
              <!-- Hidden div -->
              <a-button
                :class="{
                  'bg-red-500 text-white': record.status === 'Reject',
                  'bg-green-500 text-white': record.status === 'Completed',
                  'bg-yellow-500 text-white':
                    record.status !== 'Reject' && record.status !== 'Completed',
                }"
                >{{ record.status }}</a-button
              >
            </div>
          </template>
        </table-component>
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
          <span class="font-redwing text-2 leading-[100%] font-medium">{{
            modalTitles[stage]
          }}</span>
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
      <div v-if="stage == 0">
        <div
          class="border-[#36363633] border-[0.75px] bg-[#FFFFFF] py-[10px] gap-2.5 flex items-center rounded-[16px] border-solid border-b-[0.75px] px-[14px]"
        >
          <div><img src="/src/assets/TenantImage.svg" /></div>
          <div class="h-full">
            <p
              class="m-0 p-0 text-[14px] text-[#000000] font-inter font-medium leading-[100%]"
            >
              {{ selectedKYC?.name }}
            </p>
            <p
              class="m-0 p-0 text-[#00000066] text-[12px] font-inter font-medium leading-[100%] mt-[4px]"
            >
              {{ selectedKYC.emailAddress }}
            </p>
          </div>
        </div>

        <div
          class="bg-[#F7F7F7] flex flex-col gap-[2px] px-[12px] py-[8.5px] mt-4 rounded-[8px]"
        >
          <span class="text-[#00000066] text-[10px] font-inter leading-[100%]"
            >Country of Residence</span
          >
          <span
            class="text-[14px] mt-[2px] leading-[100%] font-medium font-inter text-[#000000]"
            >Canada</span
          >
        </div>

        <div
          class="border-[0.75px] grid grid-cols-2 gap-4 mt-4 border-[#36363626] border-solid rounded-[12px] p-4"
        >
          <div v-for="value in kycModalDetails" class="flex flex-col gap-[4px]">
            <p
              class="text-[#000000] p-0 m-0 text-[12px] font-inter leading-[20px] font-semibold"
            >
              {{ value.label }}
            </p>
            <span v-if="value.keys == 'status'">
              {{ selectedKYC[value.keys] }}
            </span>

            <p class="m-0 p-0 text-[#00000099] text-[12px]" v-else>
              {{ selectedKYC[value.keys] || "nill" }}
            </p>
          </div>
        </div>
        <p
          class="p-0 m-0 mt-6 mb-3 font-redwing text-[14px] leading-[20px] font-medium"
        >
          UPLOADED IMAGES
        </p>
        <div class="flex gap-3">
          <a
            class="py-4 px-4 bg-[#F9F9F9]"
            :href="selectedKYC?.idFrontPg"
            target="_blank"
          >
            <DocumentIcon />
            front.png
          </a>
          <a
            class="py-4 px-4 bg-[#F9F9F9]"
            :href="selectedKYC.idBackPg"
            target="_blank"
          >
            <DocumentIcon />
            back.png
          </a>
        </div>
        <button
          @click="stage = 1"
          v-if="
            selectedKYC?.status !== 'Completed' ||
            selectedKYC?.status !== 'Reject'
          "
          class="bg-[#A00000] mt-6 rounded-[8px] text-white py-[6px] px-[12px]"
        >
          Decline
        </button>
        <button
          v-if="
            selectedKYC?.status !== 'Completed' ||
            selectedKYC?.status !== 'Reject'
          "
          @click="() => handleApproveKYC(true)"
          class="bg-[#000130] ml-3 rounded-[8px] text-white py-[6px] px-[12px]"
        >
          Approve
        </button>
      </div>
      <div v-else>
        <div class="flex flex-wrap gap-2.5 mt-3">
          <a-button
            @click="form.message = value"
            v-for="value in messages"
            class="py-[12px] text-[#000000] flex rounded-[100px] items-center hover:bg-[#F0F0F0] bg-[#FFFFFF] px-[15px] font-inter font-medium text-[12px]"
          >
            {{ value }}
          </a-button>
        </div>
        <div class="mt-4">
          <span
            class="text-[#000000] text-[12px] font-semibold leading-[20px] font-inter"
            >Other Message</span
          >
          <BaseInput
            v-model="form.message"
            type="textarea"
            placeholder="Enter Message"
            :rows="5"
          />
        </div>
        <div
          class="pt-[16px] border-t-[0.75px] text-[14px] flex gap-[10px] mt-[16px]"
        >
          <UniversalButton
            :loading="sendingmailtoteneant"
            @click="handleApproveKYC(false)"
            class="w-full py-[8px] flex items-center bg-[#000130] text-white justify-center rounded-[8px]"
          >
            Send
          </UniversalButton>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { SignUpLandlord, VerifyLandlord } from "@/api/auth";
import { fetchKYC, ApproveORejectKYCRequest } from "@/api/kyc";
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
import { comment } from "postcss";
import DocumentIcon from "@/components/icons/DocumentIcon.vue";
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
    DocumentIcon,
  },
  async created() {
    this.handleFetchKycs();
    this.store.setisLoading(false);
  },
  data() {
    return {
      modalTitles: ["KYC Details", "Why do you want to decline"],
      stage: 0,
      kycModalDetails: [
        { keys: ["dob"], label: "Date Of Birth" },
        { keys: ["city"], label: "City" },
        { keys: ["socialInsuranceNumber"], label: "Social Security Number" },
        { keys: ["postalCode"], label: "Postal Code" },
        { keys: ["idType"], label: "Id Type" },
        { keys: ["status"], label: "Status" },
      ],
      statusLiteral: [
        "Pending",
        "Review In Progress",
        "Need Correction",
        "Completed",
        "Reject",
      ],
      sendingmailtoteneant: false,
      isFetching: false,
      messages: [
        "Different names",
        "Expired document",
        "Document too old",
        "Wrong document type",
        "Address doesn’t match",
      ],
      form: { email: "", message: "" },
      store: useUserStore(),
      showModal: false,
      totalItemCount: 0,
      currentPage: 1,
      pageSize: 8,
      selectedKYC: null,
      headers: [
        {
          title: "Name",
          dataIndex: "name",
          align: "left",
        },
        {
          title: "email",
          className: "email",
          dataIndex: "email",
          align: "center",
        },
        {
          title: "Home Address",
          dataIndex: "homeAddress",
          className: "properties",
          align: "left",
        },
        {
          title: "Status",
          dataIndex: "status",
          align: "center",
          slotName: "status",
        },
        {
          title: "",
          dataIndex: "action",
          align: "center",
          slotName: "action",
        },
      ],
      landlordList: [],
      tableDropdown: "",
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItemCount / this.pageSize);
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
    handleApproveKYC(status) {
      const payload = {
        requestId: this.selectedKYC.id,
        isCompleted: status,
        comment: this.form.message || "",
      };
      ApproveORejectKYCRequest(payload).then((response) => {
        if (response.responseCode == "00") {
          handleToast("KYC Updated Successfully", "success");
          this.showModal = false;
          this.handleFetchKycs(this.currentPage);
        } else handleError(response);
      });
    },
    handleSendEmail() {
      this.sendingmailtoteneant = true;
      const body = {
        tenantId: this.selectedKYC.accountId,
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
    async handleFetchKycs(page = 1) {
      const query = {
        size: this.pageSize,
        page: page,
        query: "",
      };
      this.isFetching = true;
      fetchKYC(query)
        .then((response) => {
          this.isFetching = false;
          console.log("KYC RESPONSE", response);
          if (response.accountKYCs) {
            this.landlordList = response.accountKYCs.items.map((kyc) => {
              return (
                kyc && {
                  ...kyc,
                  name: `${kyc.tenant?.firstname || ""} ${
                    kyc.tenant?.lastname || ""
                  }`,
                  email: kyc.tenant?.emailAddress || "Nill",
                  status: this.statusLiteral[kyc.status],
                }
              );
            });
            // this.totalItemCount = response.accountList.totalItemCount;
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
      this.handleFetchKycs(page);
    },
    handleSignUpLandlord(landlord) {
      SignUpLandlord(landlord.accountId).then((response) => {
        if (response.result.responseCode == "00") {
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
        if (response.result.responseCode == "00") {
          handleToast("Landlord Verified Successfully", "success");
          this.handleFetchKycs(this.currentPage);
        } else handleError(response);
      });
    },
  },
};
</script>
<style></style>
