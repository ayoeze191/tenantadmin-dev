<template>
  <div class="py-5 px-4 w-full overflow-y-scroll h-screen pb-40">
    <div
      class="rounded-[16px] mt-4 font-inter border-[#36363633] border-[0.75px] border-solid"
    >
      <div class="flex justify-between p-2.5">
        <div class="flex gap-2.5 items-center">
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
            <p class="m-0 p-0 text-[#000000] font-medium text-[14px]">
              All Landlords
            </p>
            <p
              class="m-0 p-0 text-[#25262899] font-medium text-[12px] leading-[100%]"
            >
              Total Number of Landlords: <span>{{ totalItemCount }}</span>
            </p>
          </div>
        </div>
        <button
          class="border-solid border-[1px] px-[12px] py-[8px] text-[#000000B2] leading-[24px] font-inter rounded-[8px]"
        >
          See all requests
        </button>
      </div>
      <div class="w-full mt-4">
        <!-- Table Header -->
        <div class="grid grid-cols-5 bg-[#F8F8F8] w-full">
          <span
            v-for="header in headers"
            class="text-[#808097] uppercase py-[14px] px-[24px]"
          >
            {{ header }}
          </span>
        </div>
        <!-- End Table Header -->

        <!-- Table Body -->
        <div>
          <div
            class="grid grid-cols-5 p-6 border-b border-[#E2EAEB]"
            v-for="landlord in landlordList"
          >
            <div class="flex items-center text-[#585858] text-[14px] font-sf">
              {{ landlord.firstname }} {{ landlord.lastname }}
            </div>
            <div class="flex items-center text-[#585858] text-[14px] font-sf">
              {{ landlord.emailAddress }}
            </div>
            <div
              class="flex items-center text-[#585858] justify-center text-[14px] font-sf w-fit px-[6px] py-[2px] rounded-[5px]"
              :class="{
                status_overdue: !landlord.isVerified,
                status_due: landlord.isVerified,
              }"
            >
              {{ landlord.isVerified ? "Yes" : "No" }}
            </div>
            <div
              class="flex items-center text-[#585858] text-[14px] font-sf pl-7"
            >
              {{ formatDate(landlord.lastLoginDate) }}
            </div>

            <div>
              <a-dropdown :trigger="['click']">
                <a
                  class="ant-dropdown-link cursor-pointer text-[#808097] flex items-center gap-[4px] pl-7"
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
                        @click="VerifyLandlord(landlord)"
                      >
                        Verify Landlord
                      </li>
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item key="1">
                      <li
                        class="cursor-pointer font-medium text-[#808097] text-base leading-5 py-[16px] px-[8px]"
                        @click="editLandlord(landlord)"
                      >
                        Edit Email
                      </li>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-3 justify-end mt-2.5">
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
    <!-- Table -->
    <!-- <div class="rounded-lg w-full relative">
            <table-component :headers="headers" :data="landlordList">
                <template #column0="{ entity }">
                {{ entity.firstname }} {{ entity.lastname }}
                </template>
                <template #column1="{ entity }">
                {{ entity.emailAddress }}
                </template>
                <template #column2="{ entity }">
                    <div class="status_mini w-20" :class="{'status_overdue': entity.status === 0, 'status_due': entity.status === 1}">
                        {{ entity.status ? 'Active' : 'Inactive' }}
                    </div>
                </template>
                <template #column3="{ entity }">
                {{ formatDate(entity.lastLoginDate) }}
                </template>
                <template #column4="{ entity }">
                    <div class="absolute">
                        <div class="flex gap-20">
                            <div class="flex gap-1 cursor-pointer">
                                <edit-icon class="my-auto"></edit-icon>
                                <p class="text-secondary text-sm">Edit</p>
                            </div>
                            <div class="cursor-pointer w-4" @click="toggleTableDropdown(entity)">
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6.5L8 10.5L12 6.5" stroke="#404164" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                        <ul class="bg-white w-48 z-50 py-3.5 absolute -right-10" v-if="tableDropdown == entity">
                            <li class="py-4 px-2 border-b border-b-br3 font-medium text-secondary cursor-pointer text-base leading-5" @click="handleSignUpLandlord(entity)">Sign up as Admin</li>
                            <li class="py-4 px-2 cursor-pointer font-medium text-secondary text-base leading-5" @click="editLandlord(entity)">Edit Email</li>
                        </ul>
                    </div>
                </template>
            </table-component>
        </div> -->
  </div>
</template>

<script>
// import { DownOutlined } from '@ant-design/icons-vue';

import { FetchLandlords, SignUpLandlord, VerifyLandlord } from "@/api/auth";
import IconEdit from "@/components/icons/IconEdit.vue";
import Table from "@/components/Table.vue";
import handleError from "@/utils/handleError";
import { handleToast } from "@/utils/helper";
import dayjs from "dayjs";

import { h } from "vue";

export default {
  components: {
    "table-component": Table,
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
      headers: ["name", "email", "verified", "last login", "action"],
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
      FetchLandlords(query).then((response) => {
        if (response.accountList) {
          this.landlordList = response.accountList.items;
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
    handleVerifyLandlord(landlord) {
      const payload = {
        userId: landlord.accountId,
      };
      VerifyLandlord(payload).then((response) => {
        if (response.result.responseCode == "00") {
          handleToast("Landlord Verified Successfully", "success");
          this.handleFetchLandlords();
        } else handleError(response);
      });
    },
  },
};
</script>

<style scoped>
.ant-dropdown .ant-dropdown-menu {
  padding: 0 !important;

  margin: 0 !important;
  /* background-color: red !important; */
}
:deep(.ant-dropdown-menu-item) {
  padding: 0 !important;
  /* background-color: red !important; */
}
</style>
