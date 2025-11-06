<template>
  <div class="px-4 font-inter">
    <a-modal :visible="true" :width="334">
      <div class="p-4">
        <div>
          <div>
            <p class="m-0 p-0">Seph Soibim</p>
            <p class="m-0 p-0 mt-[2px]">stephsoibim@mail.com</p>
          </div>
        </div>
      </div>
    </a-modal>
    <div
      class="rounded-[16px] mt-4 font-inter border-[#36363633] border-[0.75px] border-solid"
    >
      <div class="flex gap-2.5 p-2.5 items-center">
        <div
          class="border-solid border-[0.75px] border-[#36363633] rounded-[8px] p-2.5 w-fit"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5013 8.33073C9.34225 8.33073 10.8346 6.83835 10.8346 4.9974C10.8346 3.15645 9.34225 1.66406 7.5013 1.66406C5.66035 1.66406 4.16797 3.15645 4.16797 4.9974C4.16797 6.83835 5.66035 8.33073 7.5013 8.33073Z"
              stroke="#1C274C"
              stroke-width="1.5"
            />
            <path
              d="M12.5 7.5C13.8808 7.5 15 6.38071 15 5C15 3.61929 13.8808 2.5 12.5 2.5"
              stroke="#1C274C"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M7.5013 17.5026C10.723 17.5026 13.3346 16.0102 13.3346 14.1693C13.3346 12.3283 10.723 10.8359 7.5013 10.8359C4.27964 10.8359 1.66797 12.3283 1.66797 14.1693C1.66797 16.0102 4.27964 17.5026 7.5013 17.5026Z"
              stroke="#1C274C"
              stroke-width="1.5"
            />
            <path
              d="M15 11.6641C16.4618 11.9846 17.5 12.7965 17.5 13.7474C17.5 14.6051 16.6552 15.3498 15.4167 15.7227"
              stroke="#1C274C"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div>
          <p class="m-0 p-0 text-[#000000] font-medium text-[14px]">Tenants</p>
          <p
            class="m-0 p-0 text-[#25262899] font-medium text-[12px] leading-[100%]"
          >
            Total Number of Tenants: {{ totalItemCount }}
          </p>
        </div>
      </div>

      <div class="w-full mt-4">
        <table-component :columns="headers" :data-source="landlordList">
          <template #action="{ record }">
            <a-dropdown :trigger="['click']">
              <a
                class="ant-dropdown-link cursor-pointer text-[#808097] flex items-center gap-[4px]"
                @click.prevent
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.0625 4.16667H2.39583C2.04221 4.16667 1.70307 4.30714 1.45302 4.55719C1.20298 4.80724 1.0625 5.14638 1.0625 5.5V11.5C1.0625 11.8536 1.20298 12.1928 1.45302 12.4428C1.70307 12.6929 2.04221 12.8333 2.39583 12.8333H8.39583C8.74946 12.8333 9.08859 12.6929 9.33864 12.4428C9.58869 12.1928 9.72917 11.8536 9.72917 11.5V10.8333M9.0625 2.83333L11.0625 4.83333M11.9858 3.89007C12.2484 3.62751 12.3959 3.27139 12.3959 2.90007C12.3959 2.52875 12.2484 2.17264 11.9858 1.91007C11.7233 1.64751 11.3672 1.5 10.9958 1.5C10.6245 1.5 10.2684 1.64751 10.0058 1.91007L4.39583 7.50007V9.50007H6.39583L11.9858 3.89007Z"
                    stroke="#808097"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Edit
                <DownOutlined />
              </a>

              <template #overlay>
                <a-menu>
                  <a-menu-item key="0">
                    <li
                      class="font-medium text-[#808097] cursor-pointer text-base leading-5 py-[16px] px-[8px]"
                      @click="() => handleVerifyLandlord(record.accountId)"
                    >
                      Verify Landlord
                    </li>
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="1">
                    <li
                      class="cursor-pointer font-medium text-[#808097] text-base leading-5 py-[16px] px-[8px]"
                      @click="editLandlord(record.accountId)"
                    >
                      Edit Email
                    </li>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </table-component>
        <div class="flex items-center gap-3 justify-end p-2.5">
          <span
            class="text-[#000000] font-inter font-semibold text-[12px] leading-[20px]"
            >{{ currentPage }} of {{ totalPages }} pages</span
          >

          <button
            class="px-3 py-2 border rounded-lg text-[#1E1E1E] disabled:text-[#1E1E1E4D] disabled:opacity-50"
            :disabled="currentPage === 1"
            @click="onPrev"
          >
            Previous
          </button>

          <button
            class="px-3 py-2 border rounded-lg text-[#1E1E1E] disabled:text-[#1E1E1E4D] disabled:opacity-50"
            :disabled="currentPage === totalPages"
            @click="onNext"
          >
            Next
          </button>

          <!-- Hidden pagination to keep Ant's logic if you still want it -->
          <a-pagination
            v-show="false"
            :current="currentPage"
            :pageSize="pageSize"
            :total="total"
            @change="onPageChange"
          />
        </div>
      </div>
    </div>
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

import { h } from "vue";
export default {
  components: {
    "table-component": V2Table,
    "edit-icon": IconEdit,
  },
  created() {
    this.handleFetchLandlords();
  },
  data() {
    return {
      totalItemCount: 0,
      currentPage: 1,
      pageSize: 9,
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
                name: landlord.firstname + landlord.lastname,
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

<style scoped>
:deep(.ant-table-thead) > tr > th {
  text-align: center !important;
}
</style>
