<template>
  <div
    class="bg-neutral py-5 px-10 w-full overflow-y-scroll h-screen pb-40 font-sf"
  >
    <section class="flex justify-between w-full border-b border-br1">
      <p class="text-[#808097] font-[500] font-sf text-[18px]">
        All Applications (8)
      </p>
    </section>
    <div class="mt-4 flex justify-between w-full items-center">
      <a-input
        v-model:value="searchQuery"
        placeholder="Search by name, gender, age.."
        class="py-[9px] max-w-[451px] border-none"
      >
        <template #prefix>
          <SearchOutlined class="text-[#BEC1C6] text-[20px]" />
        </template>
      </a-input>
      <div class="flex justify-between gap-[14px]">
        <a-dropdown>
          <template #overlay>
            <a-menu
              @click="handleMenuClick"
              class="p-0"
              style="padding: 0 !important; border-radius: 8px !important"
            >
              <a-menu-item
                key="Completed"
                class="bg-white border-b-[1px]"
                style="border-radius: 0px !important; padding: 16px !important"
              >
                Completed
              </a-menu-item>
              <a-menu-item
                key="Pending"
                class="bg-white border-b-[1px]"
                style="border-radius: 0px !important; padding: 16px !important"
              >
                Pending
              </a-menu-item>
              <a-menu-item
                key="Declined"
                class="bg-white border-b-[1px]"
                style="border-radius: 0px !important; padding: 16px !important"
              >
                Declined
              </a-menu-item>
            </a-menu>
          </template>

          <a-button
            class="flex gap-[14px] items-center text-[1rem] leading-[140%] font-sf text-[#404164]"
            style="background: none"
          >
            <span>
              {{ selectedStatus }}
            </span>
            <svg
              width="12"
              height="20"
              viewBox="0 0 12 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.031 13.97C11.1008 14.0396 11.1561 14.1223 11.1938 14.2134C11.2316 14.3044 11.251 14.402 11.251 14.5006C11.251 14.5992 11.2316 14.6967 11.1938 14.7878C11.1561 14.8788 11.1008 14.9616 11.031 15.0312L6.53104 19.5312C6.46139 19.6009 6.37867 19.6563 6.28762 19.694C6.19657 19.7318 6.09898 19.7512 6.00042 19.7512C5.90186 19.7512 5.80426 19.7318 5.71321 19.694C5.62216 19.6563 5.53945 19.6009 5.46979 19.5312L0.969792 15.0312C0.829061 14.8905 0.75 14.6996 0.75 14.5006C0.75 14.3016 0.829061 14.1107 0.969792 13.97C1.11052 13.8292 1.30139 13.7502 1.50042 13.7502C1.69944 13.7502 1.89031 13.8292 2.03104 13.97L6.00042 17.9403L9.96979 13.97C10.0394 13.9002 10.1222 13.8449 10.2132 13.8072C10.3043 13.7694 10.4019 13.75 10.5004 13.75C10.599 13.75 10.6966 13.7694 10.7876 13.8072C10.8787 13.8449 10.9614 13.9002 11.031 13.97ZM2.03104 6.03122L6.00042 2.0609L9.96979 6.03122C10.1105 6.17195 10.3014 6.25101 10.5004 6.25101C10.6994 6.25101 10.8903 6.17195 11.031 6.03122C11.1718 5.89048 11.2508 5.69961 11.2508 5.50059C11.2508 5.30157 11.1718 5.1107 11.031 4.96996L6.53104 0.469965C6.46139 0.400233 6.37867 0.344913 6.28762 0.30717C6.19657 0.269427 6.09898 0.25 6.00042 0.25C5.90186 0.25 5.80426 0.269427 5.71321 0.30717C5.62216 0.344913 5.53945 0.400233 5.46979 0.469965L0.969792 4.96996C0.829061 5.1107 0.75 5.30157 0.75 5.50059C0.75 5.69961 0.829062 5.89048 0.969792 6.03121C1.11052 6.17195 1.30139 6.25101 1.50042 6.25101C1.69944 6.25101 1.89031 6.17195 2.03104 6.03122Z"
                fill="#404164"
              />
            </svg>
          </a-button>
        </a-dropdown>

        <a-dropdown>
          <template #overlay>
            <a-menu
              @click="handleMenuViewType"
              class="p-0"
              style="padding: 0 !important; border-radius: 8px !important"
            >
              <a-menu-item
                key="Grid"
                class="bg-white border-b-[1px]"
                style="border-radius: 0px !important; padding: 16px !important"
              >
                Grid
              </a-menu-item>
              <a-menu-item
                key="List"
                class="bg-white border-b-[1px]"
                style="border-radius: 0px !important; padding: 16px !important"
              >
                List
              </a-menu-item>
            </a-menu>
          </template>

          <a-button
            class="flex gap-[14px] items-center text-[1rem] leading-[140%] font-sf text-[#404164]"
            style="background: none"
          >
            <span>
              {{ selectedListType }}
            </span>
            <svg
              width="12"
              height="20"
              viewBox="0 0 12 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.031 13.97C11.1008 14.0396 11.1561 14.1223 11.1938 14.2134C11.2316 14.3044 11.251 14.402 11.251 14.5006C11.251 14.5992 11.2316 14.6967 11.1938 14.7878C11.1561 14.8788 11.1008 14.9616 11.031 15.0312L6.53104 19.5312C6.46139 19.6009 6.37867 19.6563 6.28762 19.694C6.19657 19.7318 6.09898 19.7512 6.00042 19.7512C5.90186 19.7512 5.80426 19.7318 5.71321 19.694C5.62216 19.6563 5.53945 19.6009 5.46979 19.5312L0.969792 15.0312C0.829061 14.8905 0.75 14.6996 0.75 14.5006C0.75 14.3016 0.829061 14.1107 0.969792 13.97C1.11052 13.8292 1.30139 13.7502 1.50042 13.7502C1.69944 13.7502 1.89031 13.8292 2.03104 13.97L6.00042 17.9403L9.96979 13.97C10.0394 13.9002 10.1222 13.8449 10.2132 13.8072C10.3043 13.7694 10.4019 13.75 10.5004 13.75C10.599 13.75 10.6966 13.7694 10.7876 13.8072C10.8787 13.8449 10.9614 13.9002 11.031 13.97ZM2.03104 6.03122L6.00042 2.0609L9.96979 6.03122C10.1105 6.17195 10.3014 6.25101 10.5004 6.25101C10.6994 6.25101 10.8903 6.17195 11.031 6.03122C11.1718 5.89048 11.2508 5.69961 11.2508 5.50059C11.2508 5.30157 11.1718 5.1107 11.031 4.96996L6.53104 0.469965C6.46139 0.400233 6.37867 0.344913 6.28762 0.30717C6.19657 0.269427 6.09898 0.25 6.00042 0.25C5.90186 0.25 5.80426 0.269427 5.71321 0.30717C5.62216 0.344913 5.53945 0.400233 5.46979 0.469965L0.969792 4.96996C0.829061 5.1107 0.75 5.30157 0.75 5.50059C0.75 5.69961 0.829062 5.89048 0.969792 6.03121C1.11052 6.17195 1.30139 6.25101 1.50042 6.25101C1.69944 6.25101 1.89031 6.17195 2.03104 6.03122Z"
                fill="#404164"
              />
            </svg>
          </a-button>
        </a-dropdown>
      </div>
    </div>
    <div
      v-if="selectedListType == 'List'"
      class="grid grid-cols-7 mt-[44px] bg-[#FAFCFF] rounded-t-[10px] border-b-[#f1f0f0] border-b-[1px]"
    >
      <span class="text-[#404164] font-bold font-sf py-[10px] px-[24px]"
        >NAME</span
      >
      <span class="text-[#404164] font-bold font-sf py-[10px] px-[24px]"
        >GENDER</span
      >
      <span class="text-[#404164] font-bold font-sf py-[10px] px-[24px]"
        >AGE</span
      >
      <span class="text-[#404164] font-bold font-sf py-[10px] px-[24px]"
        >EMAIL</span
      >
      <span class="text-[#404164] font-bold font-sf py-[10px] px-[24px]"
        >PHONE NO.</span
      >
      <span class="text-[#404164] font-bold font-sf py-[10px] px-[24px]"
        >STATUS</span
      >
      <span class="text-[#404164] font-bold font-sf py-[10px] px-[24px]"
        >VIEW DETAILS</span
      >
    </div>
    <ul
      class="w-full font-sf"
      :class="{
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6':
          selectedListType === 'Grid',
        'flex flex-col': selectedListType === 'List',
      }"
    >
      <li
        v-if="filteredApplications.length > 0 && selectedListType === 'Grid'"
        v-for="(items, index) in selectedStatus == 'Status'
          ? filteredApplications
          : filteredApplications.filter(
              (app) => app.statusName == selectedStatus
            )"
        :key="items.id || index"
        class="py-3.5 px-2.5 border mt-[44px] border-br1 bg-neutral_light rounded-[5px] w-full flex flex-col gap-[25px] text-center"
      >
        <img
          v-if="!items.profileImage"
          class="w-16 h-16 mx-auto rounded-full object-cover"
          src="https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D"
        />
        <img
          v-else
          class="w-16 h-16 mx-auto rounded-full object-cover"
          :src="items.profileImage"
          alt="user profile"
        />
        <p class="font-medium text-xl leading-6 text-txt_dark">
          {{ items.applicantName }} <br />
          <span class="text-secondary"
            >{{ items.gender || "nil" }}, {{ items.age || "nil" }}</span
          >
        </p>
        <ul class="w-full flex flex-col gap-[18px]">
          <li class="flex justify-between">
            <p class="text-primary text-xs leading-3.5 font-medium">Email</p>
            <p class="text-txt_dark text-xs leading-3.5">
              {{ items.email || "nill" }}
            </p>
          </li>
          <li class="flex justify-between">
            <p class="text-primary text-xs leading-3.5 font-medium">Phone No</p>
            <p class="text-txt_dark text-xs leading-3.5">
              {{ items.phone | "nill" }}
            </p>
          </li>
          <li class="flex justify-between">
            <p class="text-primary text-xs leading-3.5 font-medium">
              Nationality
            </p>
            <p class="text-txt_dark text-xs leading-3.5">
              {{ items.nationality || "nill" }}
            </p>
          </li>
        </ul>
        <button
          class="btn btn_primary text-base py-[9px] rounded-md"
          :class="{
            'bg-green-600': items.statusName == 'Completed',
            'bg-red-600': items.statusName == 'Declined',
          }"
          @click="() => goto(items)"
        >
          {{
            items.statusName == "Completed"
              ? "Approved"
              : items.statusName == "Declined"
              ? "Declined"
              : "View Full Details"
          }}
        </button>
      </li>
      <li v-else>No application atm</li>

      <div
        v-if="filteredApplications.length > 0 && selectedListType === 'List'"
        class="grid grid-cols-7"
        v-for="(value, index) in selectedStatus == 'Status'
          ? filteredApplications
          : filteredApplications.filter(
              (app) => app.statusName == selectedStatus
            )"
      >
        <span
          class="bg-[#FFFFFF] text-[#404164] border-gray-100 border-y-[1px] px-[24px] py-[24px]"
        >
          {{ value.applicantName || "nil" }}
        </span>
        <span
          class="bg-[#FFFFFF] text-[#404164] border-gray-100 border-y-[1px] px-[24px] py-[24px]"
        >
          {{ value.gender || "nil" }}
        </span>
        <span
          class="bg-[#FFFFFF] text-[#404164] border-gray-100 border-y-[1px] px-[24px] py-[24px]"
          >{{ value.age || "nil" }}</span
        >
        <span
          class="bg-[#FFFFFF] text-[#404164] border-gray-100 border-y-[1px] px-[24px] py-[24px]"
        >
          {{ value.email || "nil" }}
        </span>
        <span
          class="bg-[#FFFFFF] text-[#404164] border-gray-100 border-y-[1px] px-[24px] py-[24px]"
        >
          {{ value.phone || "nil" }}
        </span>
        <span
          class="bg-[#FFFFFF] border-gray-100 border-y-[1px] px-[24px] py-[24px]"
          :class="{
            'text-[#404164]': value.statusName == 'Pending',
            'text-red-700': value.statusName == 'Declined',
            'text-green-500': value.statusName == 'Completed',
          }"
        >
          {{ value.statusName || "nil" }}
        </span>
        <button
          @click="() => goto(value)"
          class="bg-[#FFFFFF] flex justify-start text-[#404164] border-gray-100 border-y-[1px] px-[24px] py-[24px]"
        >
          <EyeOutlined @click="() => goto(value)" />
        </button>
      </div>
      <li v-else>No application atm</li>
    </ul>
    <div class="flex justify-center mt-8 mb-4">
      <!-- <a-pagination
        :current="currentPage"
        :pageSize="pageSize"
        :total="total"
        @change="onPageChange"
        :itemRender="itemRender"
      /> -->
    </div>
  </div>
</template>

<script>
import StatusSelect from "@/components/StatusSelect.vue";
import IconSearch from "../../components/icons/IconSearch.vue";
import Modal from "@/components/Modal.vue";
import { useRouter } from "vue-router";
import { FetchTenant, ApproveTenant } from "@/api/tenancy";
import { openDB } from "idb";
import { useUserStore } from "@/store";

import { useRoute } from "vue-router";
export default {
  name: "Applications",
  data() {
    return {
      store: useUserStore(),
      selected_tab: "pending",
      selected_Request: {},
      status: "Status",
      computedData: [],
      router: useRouter(),
      selectedStatus: "Status",
      selectedListType: "List",
      currentPage: 1,
      searchQuery: "",
      total: 0,
      pageSize: 16,
      dummyList: [
        "https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1667053508464-eb11b394df83?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1683792384436-167313660657?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
        "https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1667053508464-eb11b394df83?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1683792384436-167313660657?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
      ],
      Applications: [],
    };
  },
  computed: {
    filteredApplications() {
      if (!this.searchQuery) return this.Applications;
      const q = this.searchQuery.toLowerCase();
      return this.Applications.filter(
        (app) =>
          (app.applicantName && app.applicantName.toLowerCase().includes(q)) ||
          (app.email && app.email.toLowerCase().includes(q)) ||
          (app.statusName && app.statusName.toLowerCase().includes(q)) ||
          (app.unitName && app.unitName.toLowerCase().includes(q)) ||
          (app.gender && app.gender.toLowerCase().includes(q))
      );
    },
  },
  components: {
    "search-icon": IconSearch,
    "status-select": StatusSelect,
    "modal-component": Modal,
  },
  methods: {
    handleMenuClick(e) {
      this.selectedStatus = e.key;
    },
    handleMenuViewType(e) {
      this.selectedListType = e.key;
    },
    async goto(application) {
      const db = await openDB("application-db", 1, {
        upgrade(db) {
          db.createObjectStore("applications", {
            keyPath: "applicationId",
            autoIncrement: true,
          });
        },
      });
      const plainApplication = JSON.parse(JSON.stringify(application));
      await db.put("applications", plainApplication); // put will add or replace by key
      this.router.push(`/applications/${application.applicationId}`);
    },
    toggleTabs(value) {
      this.selected_tab = value;
    },
    openModal(request) {
      this.$refs.viewRequestModal.openModal();
      this.selected_Request = request;
    },
    onModalClose() {
      console.log("Modal was closed");
    },
    onPageChange(page) {
      this.currentPage = page;
      this.fetchData(page);
    },
    fetchData(page = this.currentPage) {
      const query = {
        size: this.pageSize,
        page: page,
        query: "",
      };
      FetchTenant(query, this.store.userProfile.referenceID).then(
        (response) => {
          if (response.responseCode == "00") {
            this.Applications = response.applications.items;
            this.currentPage = response.page || page;
            this.total = response.totalItemCount || 0;
            this.computedData = response.applications.items;
            console.log("fetching", response.applications.items);
          }
        }
      );
    },

    handleSearch(value) {},
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
:deep(.ant-pagination-item) {
  background: #000130 !important;
  color: white !important;
}
</style>
