<template>
  <div class="px-4 font-inter h-full">
    <div
      class="rounded-[16px] mt-4 h-full font-inter border-[#36363633] border-[0.75px] border-solid"
    >
      <div class="flex gap-2.5 items-center">
        <table-header :total-item-count="totalItemCount" title="Notifications">
          <div class="flex gap-[10px]">
            <a-input
              @change="handleSearch"
              v-model:value="searchQuery"
              placeholder="Search by name, gender, age.."
              class="py-[9px] border-[#D0D5DD] mr-[10px] border-[1px] rounded-[8px] w-[338px] border-solid"
            >
              <template #prefix>
                <SearchOutlined class="text-[#BEC1C6] text-[20px]" />
              </template>
            </a-input>
          </div>
        </table-header>
      </div>

      <div class="w-full mt-4 h-full">
        <Notification
          @click="
            () => {
              showModal = true;
              selectedTenant = value;
            }
          "
          v-for="value in computedData"
          :value="value"
        />
        <BasePagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          :total="computedData.length"
          :pageSize="pageSize"
          @prev="handlePrev"
          @next="handleNext"
          @change="handlePageChange"
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
            >Notification</span
          >
          <span @click="showModal = false" class="cursor-pointer">
            <CloseOutlined />
          </span>
        </div>
      </template>
      <div
        class="bg-[#FFFFFF] gap-2.5 flex items-center rounded-[16px] mb-[24px]"
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
        class="m-0 p-0 text-[14px] font-redwing leading-[20px] font-medium uppercase"
      >
        APPLICATION UNDER REVIEW
      </p>
      <p
        class="m-0 p-0 mt-1 text-[#00000066] text-[12px] leading-[100%] font-inter"
      >
        {{ formatDate(selectedTenant.sendDate) }}
      </p>
      <div
        class="bg-[#F7F7F7] text-[#000000B2] font-semibold font-inter text-[12px] rounded-[12px] p-2.5 mt-2.5"
      >
        <span>{{ selectedTenant.message }}</span>
      </div>
      <div class="flex gap-2.5 mt-4 ml-auto w-fit">
        <a-button class="text-[#121212] text-[14px]"> Mark as Read </a-button
        ><a-button
          class="ml-2.5 bg-[#000130] leading-[24px] text-[14px] text-white flex items-center font-medium font-inter px-[12px] py-[6px]"
        >
          View Listings
        </a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { SignUpLandlord, VerifyLandlord } from "@/api/auth";
import { fetchNotifications } from "@/api/notifications";
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
import Notification from "@/components/Notification.vue";
import Loader from "@/components/Loader.vue";
export default {
  components: {
    "table-component": V2Table,
    "table-header": TableHeader,
    "edit-icon": IconEdit,
    BasePagination: BasePagination,
    BaseInput: BaseInput,
    Notification,
    UniversalButton,
    Loader,
  },
  async created() {
    this.handleFetchNotification();
    this.store.setisLoading(false);
  },
  computed: {
    totalPages() {
      return Math.ceil(this.notificationlist.length / this.pageSize);
    },
    computedData() {
      // let filtered = this.searchRequests(
      //   this.notificationlist,
      //   this.searchQuery
      // );
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      // console.log(filtered, "filtered");
      return this.notificationlist.slice(start, end);
    },
  },
  data() {
    return {
      searchQuery: "",
      handleSearch: "",
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
      notificationlist: [],
      tableDropdown: "",
    };
  },
  methods: {
    // searchRequests() {
    //   if (!this.searchQuery) return this.data;
    //   const lower = this.searchQuery.toLowerCase();
    //   return this.notificationlist.filter((item) => {
    //     return (
    //       item.subject?.toString().toLowerCase().includes(lower) ||
    //       item.message?.toLowerCase().includes(lower)
    //     );
    //   });
    // },
    handlePrev() {
      if (this.currentPage > 1) this.currentPage--;
    },
    handleNext() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    handleSelect(option) {
      this.selectedStatus = option.value;
      // console.log("Selected:", option);
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
    async handleFetchNotification(page = 1) {
      const query = {
        size: this.pageSize,
        page: page,
        query: "",
      };
      this.isFetching = true;
      fetchNotifications()
        .then((response) => {
          this.isFetching = false;
          if (response) {
            this.notificationlist = response;
            this.totalItemCount = response.length;
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
      this.handleFetchNotification(page);
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
          this.handleFetchNotification(this.currentPage);
        } else handleError(response);
      });
    },
  },
};
</script>
<style></style>
