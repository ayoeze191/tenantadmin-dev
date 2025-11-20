<template>
  <div class="px-4 font-inter h-full">
    <div
      class="rounded-[16px] mt-4 h-full font-inter border-[#36363633] border-[0.75px] border-solid"
    >
      <div class="flex gap-2.5 items-center">
        <table-header :total-item-count="totalItemCount" title="Tenants">
          <div class="flex gap-[10px]">
            <a-button
              class="bg-[#000130] text-white flex items-center justify-center py-[12px]"
            >
              Add Tenant
            </a-button>
            <filter-button />
          </div>
        </table-header>
      </div>

      <div class="w-full mt-4 h-full">
        <table-component
          :title="tenants"
          :columns="headers"
          :data-source="landlordList"
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
              <a-button
                class="bg-[#000130] bg-inherit text-black cursor-pointer"
                >View Info</a-button
              >
            </div>
          </template>
        </table-component>
        <BasePagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          :total="total"
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
import { FetchTenants, SignUpLandlord, VerifyLandlord } from "@/api/auth";
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

const showPopover = ref(false);
const popoverRecord = ref(null);

// Position of teleport card
const popX = ref(0);
const popY = ref(0);

const openPopover = (event, record) => {
  const rect = event.target.getBoundingClientRect();

  popX.value = rect.left + window.scrollX;
  popY.value = rect.bottom + window.scrollY + 8; // small offset

  popoverRecord.value = record;
  showPopover.value = true;
};

const closePopover = () => {
  showPopover.value = false;
};
export default {
  components: {
    "table-component": V2Table,
    "table-header": TableHeader,
    "edit-icon": IconEdit,
    BasePagination: BasePagination,
    BaseInput: BaseInput,
    FilterButton,
    UniversalButton,
  },
  created() {
    this.handleFetchLandlords();
  },
  data() {
    return {
      sendingmailtoteneant: false,
      messages: [
        "Your lease Would Expire Soon",
        "A noise complain has b...",
        "Your service request has been sorted",
        "Your rent is still unpaid",
        "Kindly pay your rent please",
      ],
      form: { email: "", message: "" },
      showModal: false,
      totalItemCount: 0,
      currentPage: 1,
      pageSize: 9,
      selectedTenant: null,
      headers: [
        {
          title: "Name",
          dataIndex: "name",
          align: "left",
        },
        {
          title: "Property",
          dataIndex: "properties",
          className: "properties",
          align: "left",
        },
        {
          title: "email",
          className: "email",
          dataIndex: "email",
          align: "center",
        },
        {
          title: "verified",
          dataIndex: "isVerified",
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
    onPageChange(page) {
      this.currentPage = page;
      // You can trigger API call or data refresh here
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
    handleFetchLandlords(page = 1) {
      const query = {
        size: this.pageSize,
        page: page,
        query: "",
      };
      FetchTenants(query).then((response) => {
        if (response.accountList) {
          this.landlordList = response.accountList.items.map(
            (landlord) =>
              landlord && {
                name: landlord.firstname + " " + landlord.lastname,
                email: landlord.emailAddress,
                isVerified: landlord.isVerified ? "Yes" : "No",
                lastLoginDate: this.formatDate(landlord.lastLoginDate),
                accountId: landlord.accountId,
              }
          );
          this.totalItemCount = response.accountList.totalItemCount;
        } else handleError(response);
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
          this.handleFetchLandlords(this.currentPage);
        } else handleError(response);
      });
    },
  },
};
</script>
<style></style>
