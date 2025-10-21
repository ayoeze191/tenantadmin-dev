<template>
  <div class="bg-neutral py-5 px-10 w-full overflow-y-scroll h-screen pb-40">
    <p class="text-txt_dark font-semibold text-2xl leading-7 uppercase mb-10">
      Landlord
    </p>
    <!-- Table -->
    <div class="bg-white w-full">
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
                      @click="handleSignUpLandlord(landlord)"
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
      headers: ["name", "email", "verified", "last login", "action"],
      landlordList: [],
      tableDropdown: "",
    };
  },
  methods: {
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
    handleFetchLandlords() {
      const query = {
        size: 50,
        page: 1,
        query: "",
      };
      FetchLandlords(query).then((response) => {
        if (response.accountList) {
          this.landlordList = response.accountList.items;
        } else handleError(response);
      });
    },
    formatDate(date) {
      return dayjs(date).format("DD MMM,YYYY");
    },
    editLandlord(item) {
      this.$router.push({ name: "edit-users-landlord", query: item });
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
