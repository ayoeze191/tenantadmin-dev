<template>
  <div class="px-4 h-full font-inter">
    <div
      class="rounded-[16px] h-full p-2.5 mt-4 font-inter border-[#36363633] border-[0.75px] border-solid"
    >
      <div class="flex justify-between">
        <table-header
          :total-item-count="totalItemCount || 0"
          title="All Requests"
        >
          <DropdownButton
            :label="serviceLiterals[selectedStatus]"
            :options="[
              { label: 'Pending', value: '1' },
              { label: 'Completed', value: '3' },
              { label: 'All', value: 'All' },
            ]"
            @select="handleSelect"
          />
          <!-- <button
            class="border-solid border-[1px] px-[12px] py-[8px] text-[#000000B2] leading-[24px] font-inter rounded-[8px]"
          >
            See all requests
          </button> -->
        </table-header>
      </div>
      <div class="w-full mt-4 h-full">
        <table-component
          title="Service Requests"
          :columns="headers"
          :data-source="computedData"
        >
          <template #action="{ record }">
            <div class="relative flex justify-center items-center group">
              <!-- Hidden div -->
              <a-button
                @click="showModal = true"
                class="bg-[#000130] bg-inherit text-black cursor-pointer"
                >view details</a-button
              >
            </div>
          </template>
          <template #status="{ text, record }">
            <div class="flex justify-center">
              <button
                :class="{
                  'bg-[#C38201] text-[#FFFFFF]': text === 'Pending',
                  'bg-[#31A057] text-[#FFFFFF]': text === 'Completed',
                  'bg-[#E5F6FF] text-[#FFFFFF]': text === 'Ongoing',
                  'bg-[#5f16a4] text-[#FFFFFF]': text === 'Requested',
                  'bg-[#9f0f0f] text-[#FFFFFF]': text === 'Terminate',
                }"
                class="px-3 py-1 rounded-[8px] text-[12px] font-medium"
              >
                {{ text }}
              </button>
            </div>
          </template>
        </table-component>
        <!-- <BasePagination 
        
        /> -->
      </div>
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
          >Service Request Details</span
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
          {{ selectedTenant?.tenant || "Frank Thomas" }}
        </p>
        <p
          class="m-0 p-0 text-[#00000066] text-[10px] font-inter font-medium leading-[100%] mt-[4px]"
        >
          franktho37@gmail.com
        </p>
      </div>
    </div>
    <div class="flex flex-col mt-4">
      <p>
        <span class="text-[#00000099] p-0 m-0">Apartment</span>:Thistlebrook
        Lane, Mistwood, Ontario, K8N 3P5
      </p>
      <p><span class="text-[#00000099] p-0 m-0">Category:</span>Plumbing</p>
      <p>
        <span class="text-[#00000099] p-0 m-0">Description:</span>The faucet in
        the kitchen is leaking and needs immediate repair.
      </p>
      <p>
        <span class="text-[#00000099] p-0 m-0">Issue:</span>The faucet in the
        kitchen is leaking and needs immediate repair.
      </p>
      <p>
        <span class="text-[#00000099] p-0 m-0">Urgency:</span
        ><button>Pending</button>
      </p>
    </div>
    <div>
      <a-button
        class="bg-[#000130] py-[8px] flex font-inter items-center justify-center text-white w-full mt-4 rounded-[8px]"
      >
        Set to Completed
      </a-button>
    </div>
  </a-modal>
</template>

<script>
import TenantCard from "@/components/TenantCard.vue";
import TableHeader from "@/components/TableHeader.vue";
import V2Table from "@/components/V2Table.vue";
import V2ServiceRequestsDropDown from "@/components/V2ServiceRequestsDropDown.vue";
import { FetchServiceRequests } from "@/api/serviceRequest";
import { useUserStore } from "@/store";
import BasePagination from "@/components/BasePagination.vue";

export default {
  components: {
    "table-component": V2Table,
    DropdownButton: V2ServiceRequestsDropDown,
    "table-header": TableHeader,
    TenantCard,
  },
  created() {
    this.fetchData();
  },
  computed: {
    computedData() {
      return this.selectedStatus == "All"
        ? this.data
        : this.data.filter(
            (item) => item.serviceStatus === this.selectedStatus
          );
    },
  },
  methods: {
    handleSelect(option) {
      this.selectedStatus = option.value;
      // console.log("Selected:", option);
    },
    fetchData() {
      FetchServiceRequests(this.store.userProfile.referenceID)
        .then((response) => {
          console.log("Service Requests Response:", response);
          this.data = response.serviceRequests.map((request) => {
            return {
              tenant: request.tenant,
              accommodationName: request.accommodationName,
              unitId: request.unitId,
              serviceType: request.serviceType,
              serviceStatus:
                this.serviceLiterals[request.serviceStatus] || "Unknown",
              action: request, // Pass the entire request object for action slot
            };
          });
        })
        .catch((error) => {
          console.error("Error fetching service requests:", error);
        });
    },
  },
  data() {
    return {
      store: useUserStore(),
      showModal: false,
      selectedStatus: "All",
      data: [],
      selectedTenant: {},
      serviceLiterals: [
        "Requested",
        "Pending",
        "Ongoing",
        "Completed",
        "Terminate",
      ],
      headers: [
        {
          title: "Tenant Name",
          dataIndex: "tenant",
        },
        {
          title: "Property",
          dataIndex: "accommodationName",
          className: "accommodationName",
        },
        {
          title: "Unit Number",
          className: "unitId",
          dataIndex: "unitId",
        },
        {
          title: "Status",
          dataIndex: "serviceStatus",
          slotName: "status",
        },
        {
          title: "Service Type",
          dataIndex: "serviceType",
          className: "serviceType",
        },
        { title: "", dataIndex: "action", slotName: "action" },
      ],
    };
  },
};
</script>
