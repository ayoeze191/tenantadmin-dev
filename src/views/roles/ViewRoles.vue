<template>
  <div class="px-4 font-inter h-full">
    <div
      class="rounded-[16px] mt-4 h-full font-inter border-[#36363633] border-[0.75px] border-solid"
    >
      <div class="flex gap-2.5 items-center">
        <table-header :total-item-count="totalItemCount" title="User Roles">
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
              <!-- <a-button
                @click=""
                class="bg-[#000130] border-[0.75px] border-solid border-[#36363633] bg-inherit text-[#000000] text-[12px] leading-[100%] font-medium cursor-pointer"
                >Edit</a-button
              > -->
              <a-dropdown>
                <a class="ant-dropdown-link" @click.prevent>
                  <a-button
                    @click=""
                    class="bg-[#000130] border-[0.75px] border-solid border-[#36363633] bg-inherit text-[#000000] text-[12px] leading-[100%] font-medium cursor-pointer"
                    >Edit</a-button
                  >
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <a-button @click="showModal = true"
                        >Edit Permission</a-button
                      >
                    </a-menu-item>
                    <a-menu-item>
                      <a href="javascript:;">Disble User</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a
                        href="javascript:;"
                        class="text-[#A10404] font-inter font-medium text-[14px]"
                        >Delete role</a
                      >
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
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
          <span class="font-redwing text-[24px] leading-[100%] font-medium"
            >User Permissions</span
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
      <div class="bg-[#FFFFFF] gap-2.5 flex items-center rounded-[16px]">
        <div><img src="/src/assets/TenantImage.svg" /></div>
        <div class="h-full">
          <p
            class="m-0 p-0 text-[#000000] font-inter font-medium leading-[100%]"
          >
            {{ "Jordan Tiller" }}
          </p>
          <p
            class="m-0 p-0 text-[#000000B2] text-[10px] font-inter font-medium leading-[100%] mt-[4px]"
          >
            ordantiller@yourmail.com
          </p>
        </div>
        <div></div>
      </div>

      <div
        class="bg-[#C382011A] font-semibold font-inter leading-[20px] text-[#854D0F] text-[12px] rounded-[10px] mt-4 p-[8px]"
      >
        <ExclamationCircleOutlined />
        The permission list will be updated when roles are modified.
      </div>
      <div>
        <p
          class="m-0 p-0 font-redwing text-[14px] leading-[20px] font-medium mt-4"
        >
          PERMISSIONS
        </p>
        <div></div>
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
    this.handleFetchLandlords();
    this.store.setisLoading(false);
  },
  data() {
    return {
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
          title: "Roles",
          dataIndex: "AccountType",
          align: "center",
        },
        {
          title: "Status",
          dataIndex: "status",
          align: "center",
        },
        {
          title: "Last Login",
          dataIndex: "LastLoginDate",
          align: "center",
        },
        {
          title: "Date Created",
          dataIndex: "dateCreated",
          align: "center",
        },
        {
          title: "",
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
      const query = {
        size: this.pageSize,
        page: page,
        query: "",
      };
      this.isFetching = true;
      FetchTenants(query)
        .then((response) => {
          this.isFetching = false;
          if (response.accountList) {
            this.landlordList = response.accountList.items.map(
              (landlord) =>
                landlord && {
                  name: landlord.firstname + " " + landlord.lastname,
                  email: landlord.emailAddress,
                  isVerified: landlord.isVerified ? "Yes" : "No",
                  lastLoginDate: this.formatDate(landlord.lastLoginDate),
                  accountId: landlord.accountId,
                  status: landlord.status,
                  dateCreated: landlord.dateCreated
                    ? this.formatDate(landlord.dateCreated)
                    : "Nill",
                }
            );
            this.totalItemCount = response.accountList.totalItemCount;
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
