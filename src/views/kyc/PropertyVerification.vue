<template>
  <div class="px-4 font-inter h-full">
    <div
      class="rounded-[16px] mt-4 h-full font-inter border-[#36363633] border-[0.75px] border-solid"
    >
      <div class="flex gap-2.5 items-center">
        <table-header
          :total-item-count="propertyList.length"
          title="Property Verification"
        >
        </table-header>
      </div>
      <div class="w-full mt-4 h-full">
        <table-component
          :title="tenants"
          :columns="headers"
          :data-source="propertyList"
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
      width="657px"
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
              Property Owner
            </p>
          </div>
        </div>
        <div class="flex">
          <div class="w-[50%]">
            <div>
              <p
                class="text-[14px] font-medium font-redwing leading-[20px] text-black mt-4"
              >
                BASIC INFORMATION
              </p>
              <div class="flex flex-col gap-3 mt-[10px] rounded-[12px]">
                <div
                  v-for="value in ModalBasicinfo"
                  class="flex bg-[#F7F7F7] flex-col px-[12px] py-[8.5px] rounded-[8px]"
                >
                  <p
                    class="text-[#00000066] p-0 m-0 text-[10px] font-inter leading-[20px] font-normal"
                  >
                    {{ value.label }}
                  </p>
                  <span v-if="value.keys == 'status'">
                    {{ selectedKYC[value.keys] }}
                  </span>
                  <p
                    class="m-0 p-0 text-[#000000] font-medium text-[14px]"
                    v-else
                  >
                    {{ selectedKYC[value.keys] || "nill" }}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4 mt-4 rounded-[12px]">
                <div
                  v-for="value in SecondBasicinfo"
                  class="flex bg-[#F7F7F7] flex-col gap-[2px] px-[12px] py-[8.5px] rounded-[8px]"
                >
                  <p
                    class="text-[#00000066] p-0 m-0 text-[12px] font-inter leading-[20px] font-normal"
                  >
                    {{ value.label }}
                  </p>
                  <span v-if="value.keys == 'status'">
                    {{ selectedKYC[value.keys] }}
                  </span>
                  <p
                    class="m-0 p-0 text-[#000000] font-medium text-[14px]"
                    v-else
                  >
                    {{ selectedKYC[value.keys] || "nill" }}
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-6">
              <p class="text-[14px] font-medium font-redwing leading-[20px]">
                REQUIRED DOCUMENT
              </p>
              <div
                class="rounded-[12px] border-[0.75px] border-solid border-[#36363626] p-4"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <CheckOutlined class="text-[#3ACB85]" />
                    <p
                      class="m-0 p-0 text-[#000000] text-[12px] font-inter font-medium leading-[20px]"
                    >
                      Certificate of Ownership.doc
                    </p>
                  </div>
                  <a
                    class="m-0 p-0 text-[#001045] text-[12px] font-medium leading-[18px] underline"
                    >View</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="w-1/2">
            <p
              class="m-0 pl-4 mt-4 p-0 font-redwing text-[14px] leading-[20px] font-medium"
            >
              PROPERTY IMAGES
            </p>
            <div class="mt-2.5 ml-4 w-full">
              <img src="/src/assets/propertyImage.svg" class="w-full" />
            </div>

            <p
              class="m-0 pl-4 mt-4 p-0 font-redwing text-[14px] leading-[20px] font-medium"
            >
              AMENITIES PROVIDED
            </p>
            <div></div>

            <p
              class="text-[14px] ml-4 mt-4 font-medium font-redwing leading-[20px]"
            >
              DESCRIPTION
            </p>
            <div
              class="rounded-[12px] text-[12px] font-inter font-medium ml-4 border-[0.75px] border-solid border-[#36363626] p-4"
            >
              Discover the height of luxury living at Luxe Heights Apartments,
              an exclusive residential development nestled in the serene,
              tree-lined streets of New Brunswick, Canada.
            </div>
          </div>
        </div>
        <UniversalButton
          :loading="requesting"
          @click="stage = 1"
          v-if="
            selectedKYC?.status !== 'Completed' ||
            selectedKYC?.status !== 'Reject'
          "
          class="bg-[#A00000] mt-6 rounded-[8px] text-white py-[6px] px-[12px]"
        >
          Decline
        </UniversalButton>
        <UniversalButton
          :loading="requesting"
          v-if="
            selectedKYC?.status !== 'Completed' ||
            selectedKYC?.status !== 'Reject'
          "
          @click="() => handleApproveProperty(true)"
          class="bg-[#000130] ml-3 rounded-[8px] text-white py-[6px] px-[12px]"
        >
          Approve
        </UniversalButton>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { SignUpLandlord, VerifyLandlord } from "@/api/auth";
import {
  fetchKYC,
  ApproveORejectKYCRequest,
  newlyCreatedProperty,
  approveOrdeclinedProperperty,
} from "@/api/kyc";
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
import { useUserStore } from "@/store";
import Loader from "@/components/Loader.vue";
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
    this.handleFetchPropertyKycs();
    this.store.setisLoading(false);
  },
  data() {
    return {
      modalTitles: ["Property Verification"],
      stage: 0,
      ModalBasicinfo: [
        { keys: ["propertyType"], label: "Property Type" },
        { keys: ["name"], label: "Property Title" },
        { keys: ["address"], label: "Address" },
        { keys: ["province"], label: "Province" },
      ],
      SecondBasicinfo: [
        { keys: ["bedroom"], label: "No of Bedrooms" },
        { keys: ["bathroom"], label: "No of Bathrooms" },
        { keys: ["Availability"], label: "Availability Date" },
        { keys: ["occupancyStatus"], label: "Occupancy Status" },
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
      requesting: false,
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
          dataIndex: "address",
          className: "properties",
          align: "left",
        },
        {
          title: "Status",
          dataIndex: "status",
          align: "center",
        },
        {
          title: "Date Submitted",
          dataIndex: "dateCreated",
          align: "center",
        },
        {
          title: "",
          dataIndex: "action",
          align: "center",
          slotName: "action",
        },
      ],
      propertyList: [],
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
    handleApproveProperty(status) {
      this.requesting = true;
      const payload = {
        accommodationId: this.selectedKYC.accommodationId,
        verificationStatus: status,
        comment: this.form.message || "",
      };
      ApproveORejectKYCRequest(payload).then((response) => {
        this.requesting = false;
        if (response.responseCode == "00") {
          handleToast("KYC Updated Successfully", "success");
          this.showModal = false;
          this.handleFetchPropertyKycs(this.currentPage);
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
    async handleFetchPropertyKycs(page = 1) {
      const query = {
        size: this.pageSize,
        page: page,
        query: "",
      };
      this.isFetching = true;
      newlyCreatedProperty(query)
        .then((response) => {
          this.isFetching = false;
          if (response) {
            this.propertyList = response.propertyRecords.items.map((prop) => {
              console.log(this.statusLiteral[prop.verificationStatus]);
              return (
                prop && {
                  ...prop,
                  dateCreated: prop.dateCreated
                    ? this.formatDate(prop.dateCreated)
                    : "Nill",
                  status: this.statusLiteral[prop.verificationStatus],
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
      this.handleFetchPropertyKycs(page);
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
          this.handleFetchPropertyKycs(this.currentPage);
        } else handleError(response);
      });
    },
  },
};
</script>
<style></style>
