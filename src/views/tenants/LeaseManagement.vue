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
    <div class="overflow-x-scroll w-full overflow-scroll">
      <ul class="flex w-full gap-3">
        <li
          v-for="lease in waitingLeases"
          class="bg-white py-2.5 px-4 rounded-lg flex flex-col justify-between"
        >
          <div class="flex justify-between">
            <div>
              <p class="font-medium text-txt_dark">{{ lease.apartmentName }}</p>
              <p class="font-medium text-secondary text-xs leading-5">
                Tenant:
                {{ lease.tenant.firstname + " " + lease.tenant.lastname }}
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
            @click="openRequestsModal(lease)"
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
    </div>
    <section class="list_container mt-10">
      <div class="flex w-full justify-between border-b border-br1 pb-3 mb-4">
        <p class="font-medium text-base text-secondary mr-0.5">All Leases</p>
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
    :bodyStyle="{ padding: '0' }"
    :footer="null"
    :visible="showRequestsModal"
    :closable="false"
    :width="768"
  >
    <template #title>
      <div
        class="flex justify-between border-[#C7C7C7] border-b border-solid items-center pb-[26px]"
      >
        <div class="cursor-pointer" @click="onCloseRequestModal">
          <ArrowLeftOutlined class="text-[18px] m-0" />
        </div>
        <span class="text-[32px] font-sf text-[#404164] leading-[28px]">
          {{ selected_requests_lease.apartmentName }}</span
        >
        <span
          class="bg-[#ECFDF3] text-[#05603A] rounded-[17px] px-[22px] py-[11px] font-sf font-medium"
        >
          {{
            ContractRequestType[selected_requests_lease.requestType - 1]
          }}</span
        >
      </div>
    </template>
    <div class="grid grid-cols-2 gap-y-12 mt-[37px]">
      <div class="flex gap-[2px]">
        <span class="text-[#808097] font-sf font-semibold">Tenant: </span
        ><span class="text-[#404164] font-sf font-semibold"
          >{{ selected_requests_lease.tenant?.firstname || "" }}
          {{ selected_requests_lease.tenant?.lastname || "" }}
        </span>
      </div>
      <div class="flex gap-[2px] text-right justify-end">
        <span class="text-[#808097] font-sf font-semibold">Current Rent: </span
        ><span class="text-[#404164] font-sf font-semibold">{{
          selected_requests_lease.contract?.rentRate
        }}</span>
      </div>
      <div class="flex gap-[2px]">
        <span class="text-[#808097] font-sf font-semibold">Email Address: </span
        ><span class="text-[#404164] font-sf font-semibold">{{
          selected_requests_lease.tenant?.emailAddress
        }}</span>
      </div>
      <div class="flex gap-[2px] text-right justify-end">
        <span class="text-[#808097] font-sf font-semibold">Number: </span
        ><span class="text-[#404164] font-sf font-semibold">1-22-333-4444</span>
      </div>
      <div class="flex gap-[2px]">
        <span class="text-[#808097] font-sf font-semibold"
          >Name of Other Applicant: </span
        ><span class="text-[#404164] font-sf font-semibold">nil</span>
      </div>
      <div class="flex gap-[2px] text-right justify-end">
        <span class="text-[#808097] font-sf font-semibold"
          >Email of applicant: </span
        ><span class="text-[#404164] font-sf font-semibold">{{
          selected_requests_lease.tenant?.emailAddress
        }}</span>
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
    <div class="mt-[50px] flex flex-col items-center">
      <router-link to="/" class="text-[14px] font-sf font-medium underline"
        >See Tenant Info</router-link
      >
      <div class="flex gap-2 mt-[30px]">
        <button
          @click="
            () => {
              showRequestsModal = false;
              showApproveSuccessModal = true;
            }
          "
          class="border-[#29C354] text-[#29C354] text-[20px] px-[76px] py-[13px] rounded-[5px] bg-[#EDFFF7] border-[1px] border-solid"
        >
          Approve
        </button>
        <button
          @click="handleApproveLease"
          class="border-[#F47B7B] text-[#F47B7B] text-[20px] px-[76px] py-[13px] rounded-[5px] bg-[#FFEDED] border-[1px] border-solid"
        >
          Decline
        </button>
      </div>
    </div>
  </a-modal>
  <modal-component
    ref="viewRequestModal"
    :title="selected_lease.tenantName"
    @close="onModalClose"
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
      <div
        class="font-sf font-[500] leading-[25px] text-[#808097] text-center mt-[38px]"
      >
        <p class="font-sf font-[500] leading-[25px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam eveniet
          aliquid ducimus dolor minus, alias nihil itaque enim deleniti
          cupiditate placeat labore, quae ab consequatur sed tempora maiores
          beatae temporibus!
        </p>
        <p class="font-sf font-[500] leading-[25px]">
          Ultrices iaculis quis lectus gravida quam. Elementum non mauris vitae
          gravida nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Enim adipiscing tincidunt
        </p>
        <p class="font-sf font-[500] leading-[25px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim
          adipiscing tincidunt ornare sodales ullamcorper. Tincidunt lorem
          elementum sit enim. At accumsan, a, lectus in sed nisl. Pulvinar
          tincidunt a dictum amet, mauris fermentum orci. Eleifend erat ipsum
          nullam sit.
        </p>
        <p class="font-sf font-[500] leading-[25px]">
          Ultrices iaculis quis lectus gravida quam. Elementum non mauris vitae
          gravida nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Enim adipiscing tincidunt
        </p>
        <p class="font-sf font-[500] leading-[25px] tracking-[0.5px]">
          Ultrices iaculis quis lectus gravida quam. Elementum non mauris vitae
          gravida nibh. Tincidunt lorem elementum sit enim. At accumsan, a,
          lectus in sed nisl.
        </p>
      </div>
    </div>
  </modal-component>

  <a-modal
    :visible="showApproveSuccessModal"
    :footer="null"
    width="768px"
    :closable="false"
  >
    <template #title>
      <div
        class="flex items-center justify-between border-b border-[#C7C7C7] py-[12px]"
      >
        <div
          class="cursor-pointer flex items-center gap-[8px] text-txt_dark text-[18px] font-medium"
        >
          <ArrowLeftOutlined
            @click="
              () => {
                showApproveSuccessModal = false;
                showRequestsModal = true;
              }
            "
            class="text-[18px]"
          />
        </div>
        <span class="modal-title">Steph Orkuma</span>
        <span></span>
      </div>
    </template>
    <div class="flex items-center flex-col mx-auto">
      <p class="text-[#404164] text-[20px] font-sf text-center mt-[57px]">
        You have approved this application and a notification will be sent to
        the user.
      </p>
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="100" fill="black" fill-opacity="0.25" />
        <ellipse
          cx="99.9137"
          cy="99.4012"
          rx="86.5231"
          ry="83.948"
          fill="black"
          fill-opacity="0.25"
        />
        <path
          d="M162.18 99.9962C162.18 134.305 134.367 162.117 100.059 162.117C65.7501 162.117 37.9375 134.305 37.9375 99.9962C37.9375 65.6876 65.7501 37.875 100.059 37.875C134.367 37.875 162.18 65.6876 162.18 99.9962Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M100.001 172.728C140.167 172.728 172.728 140.167 172.728 100.001C172.728 59.8345 140.167 27.2734 100.001 27.2734C59.8345 27.2734 27.2734 59.8345 27.2734 100.001C27.2734 140.167 59.8345 172.728 100.001 172.728ZM137.452 80.0262C139.809 77.1977 139.427 72.9939 136.598 70.6368C133.77 68.2797 129.566 68.6619 127.209 71.4904L96.1517 108.759C93.8403 111.533 92.5408 113.068 91.5034 114.012L91.4637 114.048L91.421 114.016C90.3024 113.17 88.8693 111.758 86.3162 109.205L72.3978 95.2867C69.7943 92.6832 65.5732 92.6832 62.9697 95.2867C60.3662 97.8902 60.3662 102.111 62.9697 104.715L76.8881 118.633L77.1603 118.905C79.3369 121.083 81.4309 123.178 83.3791 124.651C85.5616 126.301 88.4197 127.853 92.0824 127.687C95.7451 127.521 98.451 125.716 100.475 123.875C102.282 122.232 104.178 119.956 106.148 117.59L106.395 117.295L137.452 80.0262ZM90.8821 114.508C90.8821 114.508 90.8852 114.506 90.8913 114.503C90.8851 114.506 90.882 114.508 90.8821 114.508ZM92.075 114.449C92.0813 114.452 92.0846 114.453 92.0847 114.453C92.0847 114.453 92.0815 114.452 92.075 114.449Z"
          fill="#000130"
        />
      </svg>
    </div>
    <p
      class="text-[#808097] text-[18px] font-sf font-medium text-center mt-[24px]"
    >
      Generate a lease now to be signed by applicant
    </p>
    <div class="flex items-center justify-center mt-[64px]">
      <button
        @click="HandleGenerateLease"
        class="bg-[#000130] rounded-[4px] w-[229px] h-[51px] text-white mx-auto"
      >
        Generate Lease
      </button>
    </div>
  </a-modal>
</template>

<script>
import StatusSelect from "@/components/StatusSelect.vue";
import IconSearch from "../../components/icons/IconSearch.vue";
import Modal from "@/components/Modal.vue";
import { useUserStore } from "@/store";
import {
  FetchLeases,
  fetchWaitingLeases,
  ApproveDeclineLease,
} from "@/api/landlord";
export default {
  data() {
    return {
      selected_tab: "tenants",
      selected_lease: {},
      selected_requests_lease: {},
      filterOptions: ["Show All"],
      store: useUserStore(),
      leaseList: [],
      showRequestsModal: false,
      waitingLeases: [],
      ContractRequestType: ["Renewal", "Termination", "Sublease"],
      ContractRequestStatus: {
        Pending: 1,
        Approved: 2,
        Rejected: 3,
        Terminated: 4,
      },
      showApproveSuccessModal: false,
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
    openRequestsModal(req) {
      this.showRequestsModal = true;
      this.selected_requests_lease = { ...req };
    },
    onCloseRequestModal() {
      (this.showRequestsModal = false), (this.selected_requests_lease = {});
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
    handleApproveLease() {
      const body = {
        requestId: this.selected_requests_lease.contractRequestId,
        status: this.selected_requests_lease.status,
      };
      ApproveDeclineLease(body).then((response) => {
        console.log(response);
      });
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

<style>
.renewal {
  color: #05603a;
  background: #ecfdf3;
}
.sublease {
  color: #8e6306;
  background: #fdeece;
}

.renewal-modal {
  color: #05603a;
  background: #ecfdf3;
  border: solid 1px #05603a;
}
.sublease-modal {
  color: #8e6306;
  background: #fdeece;
  border: 1px solid #8e6306;
}
</style>
