<template>
  <div
    class="bg-neutral py-[50px] px-10 w-full overflow-y-scroll h-screen pb-40"
  >
    <p class="text-txt_dark font-semibold text-[24px] leading-[100%] uppercase">
      Lease Management
    </p>
    <div class="flex justify-between w-full">
      <p
        class="mb-5 text-[#808097] text-[18px] font-[600] text-lg leading-[25px] uppercase font-sf"
      >
        Approval Requests ({{ waitingLeases.length }})
      </p>
      <router-link to="/tenants/lease/pending">
        <p class="text-txt_dark flex gap-1 font-medium text-sm cursor-pointer">
          See all
          <span class="my-auto">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8.5026L4 8.5026M8.66667 5.16927L12 8.5026L8.66667 5.16927ZM12 8.5026L8.66667 11.8359L12 8.5026Z"
                stroke="#404164"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </p>
      </router-link>
    </div>
    <ul class="flex w-full gap-3 largeTablet:flex-wrap">
      <li
        v-for="lease in waitingLeases"
        class="bg-white py-2.5 px-4 rounded-lg w-[350px] min-h-[108px] flex flex-col justify-between"
      >
        <div class="flex justify-between">
          <div>
            <p class="font-medium text-txt_dark">B-29, Brina Apartments</p>
            <p class="font-medium text-secondary text-xs leading-5">
              Tenant: {{ lease.tenant.firstname + " " + lease.tenant.lastname }}
            </p>
          </div>
          <p
            class="py-1 px-2.5 font-medium text-xs leading-3 text-pnd bg-pending h-5 rounded-2xl"
          >
            {{ lease.requestTypeName }}
          </p>
        </div>
        <a
          class="text-sm leading-6 text-txt_dark cursor-pointer underline"
          @click="openModal({})"
          >View full details</a
        >
      </li>

      <li class="my-auto cursor-pointer">
        <svg
          width="33"
          height="32"
          viewBox="0 0 33 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" width="32" height="32" rx="16" fill="#EDEDED" />
          <g clip-path="url(#clip0_4249_16179)">
            <path
              d="M12.4219 10.7493L17.6752 16.0026L12.4219 21.2559L13.8352 22.6693L20.5019 16.0026L13.8352 9.33594L12.4219 10.7493Z"
              fill="#323232"
            />
          </g>
          <defs>
            <clipPath id="clip0_4249_16179">
              <rect
                width="16"
                height="16"
                fill="white"
                transform="translate(8.5 8)"
              />
            </clipPath>
          </defs>
        </svg>
      </li>
    </ul>

    <section class="list_container mt-10">
      <div class="flex w-full justify-between border-b border-br1 pb-3 mb-4">
        <p class="font-medium text-base text-secondary mr-0.5">All Leases</p>

        <!-- <status-select
          :label="'Filter By:'"
          :mode="'filter'"
          :filterOptions="filterOptions"
        ></status-select> -->
      </div>
      <ul>
        <li
          v-if="leaseList.length > 0"
          v-for="req in leaseList"
          class="w-full rounded-md px-4 py-2 bg-grey mb-4"
        >
          <section class="flex w-full justify-between">
            <p class="font-medium text-lg leading-6 text-[#404164]">
              {{ req.tenantName }}
              <span class="text-secondary">Apt T-69, Sean Apartments </span>
            </p>

            <div class="flex gap-2 items-center">
              <span
                class="font-sf font-semibold text-[18px] text-[#808097] leading-[17px] tracking-[0.5px] capitalize"
              >
                Lease Expires
                <span
                  class="text-[#404164] leading-[17px] tracking-[0.5px] text-base bg-[#EDEDED] rounded-[26px] px-[8px] py-[2px]"
                >
                  {{
                    new Date(req.endDate).getDate() +
                    "/" +
                    new Date(req.endDate).getMonth() +
                    "/" +
                    new Date(req.endDate).getFullYear()
                  }}
                </span>
              </span>
            </div>
          </section>
          <a
            class="text-sm leading-6 text-txt_dark cursor-pointer underline"
            @click="openModal(req)"
            >View lease</a
          >
        </li>
        <div v-else>Lease is empty</div>
      </ul>
    </section>
  </div>

  <a-modal
    title=""
    :bodyStyle="{ padding: '0' }"
    :footer="null"
    :visible="true"
    :closable="false"
    :width="768"
  >
    <template #title>
      <div>Header</div>
    </template>
    <div class="grid grid-cols-2 gap-y-12">
      <div class="flex gap-[2px]">
        <span class="text-[#808097] font-sf font-semibold">Tenant: </span
        ><span class="text-[#404164] font-sf font-semibold">Steph Orkuma</span>
      </div>
      <div class="flex gap-[2px]">
        <span class="text-[#808097] font-sf font-semibold">Current Rent: </span
        ><span class="text-[#404164] font-sf font-semibold">$1200</span>
      </div>
      <div class="flex gap-[2px]">
        <span class="text-[#808097] font-sf font-semibold">Email Address: </span
        ><span class="text-[#404164] font-sf font-semibold"
          >stefnyorkuma@gmail.com</span
        >
      </div>
      <div class="flex gap-[2px]">
        <span class="text-[#808097] font-sf font-semibold">Number: </span
        ><span class="text-[#404164] font-sf font-semibold">1-22-333-4444</span>
      </div>
      <div class="flex gap-[2px]">
        <span class="text-[#808097] font-sf font-semibold"
          >Name of Other Applicant: </span
        ><span class="text-[#404164] font-sf font-semibold">Derek Jones</span>
      </div>
      <div class="flex gap-[2px]">
        <span class="text-[#808097] font-sf font-semibold"
          >Email of applicant: </span
        ><span class="text-[#404164] font-sf font-semibold"
          >Derek@Jones.com</span
        >
      </div>
    </div>
    <div class="mt-[80px]">
      <p class="text-[#808097] font-sf font-semibold uppercase">DOCUMENTS</p>
      <div class="flex justify-between">
        <div class="text-[#808097] font-sf font-semibold">
          <span>Bank Statement</span>
        </div>
        <div class="text-[#808097] font-sf font-semibold">
          <span>Valid ID</span>
        </div>
      </div>
    </div>
  </a-modal>
  <modal-component
    ref="viewRequestModal"
    :title="selected_lease.tenantName"
    @close="onModalClose"
    :button_label="'Save Changes'"
  >
    <div>
      <div class="flex justify-between">
        <p
          class="font-sf font-medium text-[20px] leading-[25px] tracking-[0.5px] font-variant-small-caps text-[#808097]"
        >
          LEASE DETAILS
        </p>
        <p
          class="font-sf font-normal text-base leading-7 underline text-[#A00000]"
        >
          Terminate Lease
        </p>
      </div>
    </div>
  </modal-component>
</template>

<script>
import StatusSelect from "@/components/StatusSelect.vue";
import IconSearch from "../../components/icons/IconSearch.vue";
import Modal from "@/components/Modal.vue";
import { useUserStore } from "@/store";
import { FetchLeases, fetchWaitingLeases } from "@/api/landlord";
export default {
  data() {
    return {
      selected_tab: "tenants",
      selected_lease: {},
      filterOptions: ["Show All"],
      store: useUserStore(),
      leaseList: [],
      waitingLeases: [],
      ContractRequestType: ["Renewal", "Termination", "Sublease"],
      ContractRequestStatus: {
        Pending: 1,
        Approved: 2,
        Rejected: 3,
        Terminated: 4,
      },
    };
  },
  created() {
    this.handleFetchLeases();
    this.handleFetchWailtingLeases();
  },
  components: {
    "search-icon": IconSearch,
    "status-select": StatusSelect,
    "modal-component": Modal,
  },
  methods: {
    toggleTabs(value) {
      this.selected_tab = value;
    },
    openModal(request) {
      this.$refs.viewRequestModal.openModal();
      this.selected_lease = request;
    },
    onModalClose() {
      console.log("Modal was closed");
    },
    handleFetchLeases() {
      const query = {
        size: 50,
        page: 1,
        query: "",
      };

      FetchLeases(this.store.userProfile.referenceID, query).then(
        (response) => {
          console.log(response, "resposne");
          if (response.responseCode == "00") {
            this.leaseList = response.agreements;
          } else handleError(response);
        }
      );
    },

    handleFetchWailtingLeases() {
      const query = {
        size: 50,
        page: 1,
        query: "",
      };

      fetchWaitingLeases(this.store.userProfile.referenceID, query).then(
        (response) => {
          if (response.responseCode == "00") {
            this.waitingLeases = response.serviceRequests.items;
          } else handleError(response);
        }
      );
    },
  },
};
</script>

<style></style>
