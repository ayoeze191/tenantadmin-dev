<template>
  <div class="px-4 font-inter w-full relative">
    <div
      class="rounded-[16px] w-full mt-4 relative font-inter border-[#36363633] border-[0.75px] border-solid " 
    >
      <div class="flex justify-between">
        <table-header
          :total-item-count="totalItemCount || 0"
          title="Approval Requests"
        >
          <button
            class="border-solid border-[1px] px-[12px] py-[8px] text-[#000000B2] leading-[24px] font-inter rounded-[8px]"
          >
            See all requests
          </button>
        </table-header>
      </div>
    <div
  class="w-full px-2.5 pb-2.5 mt-4 flex gap-2.5 overflow-x-auto scrollbar-hide"
>
  <TenantCard
    v-for="value in waitingLeases.slice(0, 5)"
    :key="value.id"
    :lease="value"
    @view="() => console.log('Sure')"
  />
</div>

    </div>
    <div
      class="rounded-[16px] w-full h-full mt-4 font-inter border-[#36363633] border-[0.75px] border-solid"
    >
      <div class="flex justify-between">
        <table-header
          :total-item-count="totalItemCount || 0"
          title="Lease Management"
        >
          <FilterButton />
          <!-- <button
            class="border-solid border-[1px] px-[12px] py-[8px] text-[#000000B2] leading-[24px] font-inter rounded-[8px]"
          >
            See all requests
          </button> -->
        </table-header>
      </div>
      <div class="w-full mt-4 h-full">
        <table-component
          title="lease"
          :columns="headers"
          :data-source="PaginatedItem"
        >
          <template #action="{ record }">
            <div class="relative flex justify-center items-center group">
              <!-- Hidden div -->
              <a-button
                @click="
                  () => {
                    showModal = true;
                    selectedTenant = record;
                  }
                "
                class="bg-[#000130] bg-inherit text-black cursor-pointer"
                >view details</a-button
              >
            </div>
          </template>
        </table-component>
      </div>
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        :total="data.length"
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
        <span class="font-redwing text-2 leading-[100%] font-medium"
          >Lease Details</span
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
        <p class="m-0 p-0 text-[#000000] font-inter font-medium leading-[100%]">
          {{ selectedTenant.name || "Frank Thomas" }}
        </p>
        <p
          class="m-0 p-0 text-[#00000066] text-[10px] font-inter font-medium leading-[100%] mt-[4px]"
        >
          franktho37@gmail.com
        </p>
      </div>
    </div>
    <div class="flex flex-col mt-4">
      <p class="p-0 m-0 mb-[10px]">
        <span class="text-[#00000099] p-0 m-0">Apartment: </span
        >{{
          selectedTenant.accommodataionName ||
          "Thistlebrook Lane, Mistwood, Ontario, K8N 3P5"
        }}
      </p>
      <p class="p-0 m-0 mb-[10px]">
        <span class="text-[#00000099] p-0 m-0">Number:</span
        >{{ selectedTenant.apartmentNumber || "nill" }}
      </p>
      <p class="p-0 m-0 mb-[10px]">
        <span class="text-[#00000099] p-0 m-0">Issue:</span>The faucet in the
        kitchen is leaking and needs immediate repair.
      </p>
      <p class="p-0 m-0 mb-[10px]">
        <span class="text-[#00000099] p-0 m-0">Urgency:</span>
      </p>
      <p class="p-0 m-0 mb-[10px]">
        <span class="text-[#00000099] p-0 m-0 mr-[15px]">Lease Status:</span>
        <!-- <StatusButton :service-status="selectedTenant.serviceStatus" /> -->
        {{ selectedTenant.serviceStatus }}
      </p>
      <p class="p-0 m-0 mb-[10px]">
        <span class="text-[#00000099] p-0 m-0 mr-[15px]">Documents:</span>
        <div class="bg-[#F9F9F9] flex flex-col  py-4 w-full justify-center  gap-4 items-center rounded-[10px]">
          <DocumentIcon />
          Contract Doc
        </div>
      </p>
      <div v-if="selectedTenant.serviceStatus == 'Completed'">
        <p
          class="m-0 p-0 text-[#000000] text-[14px] font-inter font-medium leading-[100%] mt-4 mb-3"
        >
          Send Notification
        </p>
        <div>
          <BaseInput v-model="form.message" placeholder="Enter Message" />
        </div>
        <p class="m-0 p-0 mt-4 mb-3">Choose saved messages</p>

        <div class="flex flex-wrap gap-2.5">
          <a-button
            @click="form.message = value"
            v-for="value in messages"
            class="py-[12px] flex rounded-[100px] items-center hover:bg-[#F0F0F0] bg-[#FFFFFF] px-[15px] font-inter font-medium text-[12px]"
          >
            {{ value }}
          </a-button>
        </div>
      </div>
    </div>
    <div class="border-t-[0.75px] border-[#36363533] mt-4 flex">
      <a-button
        @click="() => updateServiceRequest(1)"
        v-if="selectedTenant.serviceStatus == 'Pending'"
        class="bg-[#000130] py-[8px] flex font-inter items-center justify-center text-white w-full mt-4 rounded-[8px]"
      >
        Set to Completed
      </a-button>
      <a-button
        v-if="selectedTenant.serviceStatus == 'Terminate'"
        class="bg-[#000130] py-[8px] flex font-inter items-center justify-center text-white w-full mt-4 rounded-[8px]"
      >
        Renew Request
      </a-button>
      <div class="flex" v-else>
        <a-button
          class="bg-[#000130] py-[8px] flex font-inter items-center justify-center text-white w-full mt-4 rounded-[8px]"
        >
          Revert to Pending
        </a-button>
        <a-button
          class="bg-[#000130] py-[8px] flex font-inter items-center justify-center text-white w-full mt-4 rounded-[8px]"
        >
          Send Message
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script>
import TenantCard from "@/components/TenantCard.vue";
import TableHeader from "@/components/TableHeader.vue";
import V2Table from "@/components/V2Table.vue";
import V2ServiceRequestsDropDown from "@/components/V2ServiceRequestsDropDown.vue";
import FilterButton from "@/components/icons/FilterButton.vue";
import { FetchLeases, fetchWaitingLeases } from "@/api/lease";
import { useUserStore } from "@/store";
import DocumentIcon from "@/components/icons/DocumentIcon.vue";
export default {
  components: {
    "table-component": V2Table,
    DropdownButton: V2ServiceRequestsDropDown,
    "table-header": TableHeader,
    FilterButton,
    DocumentIcon,
    TenantCard,
  },
  created() {
    this.fetchData();
  },
  methods: {
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
    fetchData() {
      const query = {
        size: 50,
        page: 1,
        query: "",
      };

      FetchLeases(this.store.userProfile.referenceID).then((response) => {
        console.log(response, "resposne");
        if (response.responseCode == "00") {
          this.data = response.agreements.map((lease) => ({
            name: lease.tenantName || "nill",
            accommodataionName: lease.accommodataionName || "nill",
            unitType: lease.unitType || "nill",
            rentRate: lease.rentRate || "nill",
            due: lease.endDate || "nill",
            startDate: lease.startDate || "nill",
            serviceStatus: lease.leaseStatus || "nill",
          }));
        } else handleError(response);
      });

      fetchWaitingLeases(this.store.userProfile.referenceID, query).then(
        (response) => {
          if (response.responseCode == "00") {
            this.waitingLeases = response.serviceRequests.items;
          } else handleError(response);
        }
      );
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.data.length / this.pageSize);
    },
    PaginatedItem() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.data.slice(start, end);
    },
  },
  data() {
    return {
      waitingLeases: [],
      currentPage: 1,
      pageSize: 6,
      showModal: false,
      selectedStatus: "status",
      data: [],
      store: useUserStore(),
      headers: [
        {
          title: "Name",
          dataIndex: "name",
          align: "left",
        },
        {
          title: "Property",
          dataIndex: "accommodataionName",
          className: "accommodataionName",
          align: "left",
        },
        {
          title: "Unit",
          className: "unitType",
          dataIndex: "unitType",
          align: "center",
        },
        {
          title: "Rate",
          dataIndex: "rentRate",
          align: "center",
        },
        {
          title: "Lease Expires",
          dataIndex: "due",
          align: "center",
        },
        {
          title: "",
          dataIndex: "action",
          align: "center",
        },
      ],
    };
  },
};
</script>

<!-- <script>
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
</script> -->

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
