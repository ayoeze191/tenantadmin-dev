<template>
  <div class="px-4 font-inter">
    <div
      class="rounded-[16px] mt-4 font-inter border-[#36363633] border-[0.75px] border-solid"
    >
      <div class="flex gap-2.5 p-2.5 items-center">
        <table-header :total-item-count="totalItemCount" title="Tenants">
          <div class="flex gap-[10px]">
            <a-button
              class="bg-[#000130] text-white flex items-center justify-center py-[12px]"
            >
              Add Tenant
            </a-button>
            <a-button
              class="bg-[#FFFFFF] border-[0.75px] border-solid border-[#000130] text-[#000130] flex items-center justify-center py-[12px]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 4.66406H4"
                  stroke="black"
                  stroke-opacity="0.7"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2 11.3359H6"
                  stroke="black"
                  stroke-opacity="0.7"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 11.3359H14"
                  stroke="black"
                  stroke-opacity="0.7"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 4.66406H14"
                  stroke="black"
                  stroke-opacity="0.7"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4 4.66406C4 4.04281 4 3.73218 4.10149 3.48715C4.23682 3.16045 4.49639 2.90088 4.82309 2.76556C5.06812 2.66406 5.37875 2.66406 6 2.66406C6.62125 2.66406 6.93187 2.66406 7.17693 2.76556C7.5036 2.90088 7.7632 3.16045 7.89853 3.48715C8 3.73218 8 4.04281 8 4.66406C8 5.28532 8 5.59594 7.89853 5.84098C7.7632 6.16768 7.5036 6.42724 7.17693 6.56257C6.93187 6.66406 6.62125 6.66406 6 6.66406C5.37875 6.66406 5.06812 6.66406 4.82309 6.56257C4.49639 6.42724 4.23682 6.16768 4.10149 5.84098C4 5.59594 4 5.28532 4 4.66406Z"
                  stroke="black"
                  stroke-opacity="0.7"
                  stroke-width="1.5"
                />
                <path
                  d="M8 11.3359C8 10.7147 8 10.4041 8.10147 10.159C8.2368 9.83234 8.4964 9.57274 8.82307 9.4374C9.06813 9.33594 9.37873 9.33594 10 9.33594C10.6213 9.33594 10.9319 9.33594 11.1769 9.4374C11.5036 9.57274 11.7632 9.83234 11.8985 10.159C12 10.4041 12 10.7147 12 11.3359C12 11.9572 12 12.2678 11.8985 12.5129C11.7632 12.8395 11.5036 13.0991 11.1769 13.2345C10.9319 13.3359 10.6213 13.3359 10 13.3359C9.37873 13.3359 9.06813 13.3359 8.82307 13.2345C8.4964 13.0991 8.2368 12.8395 8.10147 12.5129C8 12.2678 8 11.9572 8 11.3359Z"
                  stroke="black"
                  stroke-opacity="0.7"
                  stroke-width="1.5"
                />
              </svg>
              Filter
            </a-button>
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
                class="absolute text-[12px] z-10 right-2 top-0 p-5 border-[0.75px] border-solid rounded-[16px] bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
              >
                <div
                  class="flex items-center gap-[8px] p-[10px] rounded-[10px] border-[0.75px] border-solid border-[#36363633]"
                >
                  <div class="flex h-[34px] w-[34px]">
                    <img src="/src/assets/TenantImage.svg" />
                  </div>
                  <div>
                    <p class="m-0 p-0 text-[]">
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

                <a-button
                  @click="
                    () => {
                      selectedTenant = record;
                      showModal = true;
                    }
                  "
                  class="py-[8px] w-full flex items-center justify-center bg-[#000130] text-white mt-6 text-[14px] rounded-[8px]"
                >
                  Send notification to Tenant
                </a-button>
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
          <span @click="showModal = false" class="cursor-pointer">
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
          class="w-full py-[8px] flex items-center justify-center bg-[#000130] text-white rounded-[8px]"
        >
          Send to Unit
        </a-button>
        <a-button
          class="w-full py-[8px] flex items-center justify-center text-black rounded-[8px]"
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
import Table from "@/components/Table.vue";
import V2Table from "@/components/V2Table.vue";
import handleError from "@/utils/handleError";
import { handleToast } from "@/utils/helper";
import dayjs from "dayjs";
import TableHeader from "@/components/TableHeader.vue";
import BasePagination from "@/components/BasePagination.vue";
import BaseInput from "@/components/BaseInput.vue";
import { h } from "vue";
import { message } from "ant-design-vue";
export default {
  components: {
    "table-component": V2Table,
    "table-header": TableHeader,
    "edit-icon": IconEdit,
    BasePagination: BasePagination,
    BaseInput: BaseInput,
  },
  created() {
    this.handleFetchLandlords();
  },
  data() {
    return {
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
        },
        {
          title: "Properties",
          dataIndex: "properties",
          className: "properties",
        },
        {
          title: "email",
          className: "email",
          dataIndex: "email",
        },
        {
          title: "verified",
          dataIndex: "isVerified",
        },
        {
          title: "Last Login",
          dataIndex: "lastLoginDate",
        },
        { title: "action", dataIndex: "action", slotName: "action" },
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
