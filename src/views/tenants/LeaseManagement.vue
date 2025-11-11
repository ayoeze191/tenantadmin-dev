<template>
  <div class="px-4 font-inter w-full relative">
    <!-- Approval Requests Section -->
    <div
      class="rounded-[16px] w-full mt-4 relative font-inter border-[#36363633] border-[0.75px] border-solid"
    >
      <div class="flex items-center justify-between">
        <table-header
          :total-item-count="waitingLeases.length || 0"
          title="Approval Requests"
        >
          <button
            class="border-solid border-[1px] px-[12px] py-[8px] text-[#000000B2] leading-[24px] font-inter rounded-[8px]"
          >
            See all requests
          </button>
        </table-header>
      </div>

      <!-- Scrollable Tenant Cards Container -->
      <div
        class="w-full px-2.5 pb-2.5 mt-4 flex gap-2.5 overflow-x-auto scrollbar-hide"
      >
        <!-- <TenantCard
          v-for="value in waitingLeases"
          :key="value.id"
          :lease="value"
          @view="() => console.log('Sure')"
        /> -->

        <!-- Optional: Show message when no cards -->
        <div
          v-if="waitingLeases.length === 0"
          class="flex items-center justify-center w-full py-8 text-gray-500"
        >
          No approval requests pending
        </div>
      </div>
    </div>

    <!-- Lease Management Section -->
    <div
      class="rounded-[16px] w-full mt-4 font-inter border-[#36363633] border-[0.75px] border-solid"
    >
      <div class="flex justify-between">
        <table-header
          :total-item-count="totalItemCount || 0"
          title="Lease Management"
        >
          <FilterButton />
        </table-header>
      </div>

      <!-- Table Container with proper width constraint -->
      <div class="w-full mt-4 overflow-x-auto">
        <table-component
          title="lease"
          :columns="headers"
          :data-source="PaginatedItem"
          class="min-w-full"
        >
          <template #action="{ record }">
            <div class="relative flex justify-center items-center group">
              <a-button
                @click="
                  () => {
                    showModal = true;
                    selectedTenant = record;
                  }
                "
                class="bg-inherit text-black cursor-pointer hover:bg-gray-100 px-3 py-1 border border-gray-300 rounded"
              >
                view details
              </a-button>
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

    <!-- Modal remains the same -->
    <a-modal
      :footer="null"
      width="437px"
      :visible="showModal"
      centered
      :bodyStyle="{ padding: '0' }"
      class=""
      :closable="false"
    >
      <!-- ... modal content remains the same ... -->
    </a-modal>
  </div>
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
