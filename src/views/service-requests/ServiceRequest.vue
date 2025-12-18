<template>
  <div class="px-4 h-full font-inter">
    <div
      class="rounded-[16px] h-full mt-4 font-inter border-[#36363633] border-[0.75px] border-solid"
    >
      <div class="flex justify-between">
        <table-header
          :total-item-count="totalItemCount || 0"
          title="All Requests"
        >
          <div class="flex justify-between">
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
            <DropdownButton
              :label="serviceLiterals[selectedStatus]"
              :options="[
                { label: 'Pending', value: '1' },
                { label: 'Completed', value: '3' },
                { label: 'All', value: 'All' },
              ]"
              @select="handleSelect"
            />
          </div>
          <!-- <button
            class="border-solid border-[1px] px-[12px] py-[8px] text-[#000000B2] leading-[24px] font-inter rounded-[8px]"
          >
            See all requests
          </button> -->
        </table-header>
      </div>
      <div class="w-full mt-4">
        <table-component
          title="Service Requests"
          :columns="headers"
          :data-source="computedData"
          :loading="fetching"
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
          <template #status="{ text, record }">
            {{ console.log(record) }}
            <div class="flex justify-center">
              <StatusButton
                v-if="record"
                :service-status="record.serviceStatus"
              />
            </div>
          </template>
        </table-component>
        <Pagination
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
      <div>
        <img
          class="w-[34px] h-[34px] rounded-[6px]"
          :src="selectedTenant.imageUrls[0]"
        />
      </div>
      <div class="h-full">
        <p class="m-0 p-0 text-[#000000] font-inter font-medium leading-[100%]">
          {{ selectedTenant.tenant || "Frank Thomas" }}
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
        <span class="text-[#00000099] p-0 m-0">Apartment: </span
        >{{
          selectedTenant.accommodationName ||
          "Thistlebrook Lane, Mistwood, Ontario, K8N 3P5"
        }}
      </p>
      <p>
        <span class="text-[#00000099] p-0 m-0">Category:</span
        >{{ selectedTenant.serviceType }}
      </p>
      <p>
        <span class="text-[#00000099] p-0 m-0">Description:</span
        >{{
          selectedTenant.description ||
          "The faucet in the kitchen is leaking and needs immediate repair."
        }}
      </p>
      <p>
        <span class="text-[#00000099] p-0 m-0">Issue:</span>The faucet in the
        kitchen is leaking and needs immediate repair.
      </p>
      <p>
        <span class="text-[#00000099] p-0 m-0">Urgency:</span>
      </p>
      <p>
        <span class="text-[#00000099] p-0 m-0 mr-[15px]"
          >Service Requests Status:</span
        >
        <!-- <StatusButton :service-status="selectedTenant.serviceStatus" /> -->
        <a-dropdown>
          <template #overlay>
            <a-menu>
              <a-menu-item
                v-for="(status, index) in serviceLiterals"
                :key="index"
                @click="() => HandleUpdateServiceRequest(index)"
                >{{ status }}
              </a-menu-item>
            </a-menu>
          </template>
          <button
            class="bg-[#C38201] px-2 py-[4px] rounded-[4px] text-white font-inter leading-[100%] font-[500] text-[10px]"
          >
            {{ selectedTenant.serviceStatus }}
          </button>
        </a-dropdown>
      </p>
      <p>
        <span class="text-[#00000099] p-0 m-0 mr-[15px]">Image</span>:
        <img
          :src="selectedTenant.imageUrls[0]"
          class="w-[146px] h-[117px] rounded-[4px] bg-cover"
        />
      </p>
      <div>
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
      <!-- <button
        @click="() => HandleUpdateServiceRequest(3)"
        v-if="selectedTenant.serviceStatus == 'Pending'"
        class="bg-[#000130] py-[8px] flex font-inter items-center justify-center text-white w-full mt-4 rounded-[8px]"
      >
        Set to Completed
      </button> -->
      <!-- <div v-if="selectedTenant.serviceStatus == 'Terminate'"></div> -->
      <div class="flex w-full gap-2.5">
        <!-- <button
          @click="() => HandleUpdateServiceRequest(2)"
          class="bg-[#000130] py-[8px] flex font-inter items-center justify-center text-white w-full mt-4 rounded-[8px]"
        >
          Revert to Pending
        </button> -->
        <UniversalButton
          @click="handleSendEmail"
          :loading="sendingmailtoteneant"
          class="bg-[#000130] py-[8px] flex font-inter items-center justify-center text-white w-full mt-4 rounded-[8px]"
        >
          Send Message
        </UniversalButton>
      </div>
    </div>
  </a-modal>
</template>

<script>
import TenantCard from "@/components/TenantCard.vue";
import { sendEmailToTenant } from "@/api/tenancy";
import TableHeader from "@/components/TableHeader.vue";
import V2Table from "@/components/V2Table.vue";
import V2ServiceRequestsDropDown from "@/components/V2ServiceRequestsDropDown.vue";
import {
  FetchServiceRequests,
  updateServiceRequest,
} from "@/api/serviceRequest";
import { handleToast } from "@/utils/helper";
import { useUserStore } from "@/store";
import BasePagination from "@/components/BasePagination.vue";
import StatusButton from "@/components/icons/StatusBadge.vue";
import BaseInput from "@/components/BaseInput.vue";
import { useToast } from "vue-toast-notification";
import UniversalButton from "@/components/Button/UniversalButton.vue";
export default {
  components: {
    "table-component": V2Table,
    DropdownButton: V2ServiceRequestsDropDown,
    "table-header": TableHeader,
    BaseInput,
    TenantCard,
    StatusButton,
    Pagination: BasePagination,
  },
  created() {
    this.fetchData();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.data.length / this.pageSize);
    },
    computedData() {
      // STEP 1: apply search
      let filtered = this.searchRequests(this.data, this.searchQuery);
      // STEP 2: apply status filter
      if (this.selectedStatus !== "All") {
        filtered = filtered.filter(
          (item) => item.serviceStatus === this.selectedStatus
        );
      }
      // STEP 3: apply pagination
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;

      return filtered.slice(start, end);
    },
  },
  methods: {
    searchRequests() {
      if (!this.searchQuery) return this.data;
      const lower = this.searchQuery.toLowerCase();
      return this.data.filter((item) => {
        return (
          item.serviceRequestId?.toString().toLowerCase().includes(lower) ||
          item.tenant?.toLowerCase().includes(lower) ||
          item.accommodationName?.toLowerCase().includes(lower) ||
          item.unitId?.toString().toLowerCase().includes(lower) ||
          item.serviceType?.toLowerCase().includes(lower) ||
          item.description?.toLowerCase().includes(lower) ||
          item.serviceStatus?.toLowerCase().includes(lower)
        );
      });
    },
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
      this.fetching = true;
      FetchServiceRequests(this.store.userProfile.referenceID)
        .then((response) => {
          this.fetching = false;
          console.log("Service Requests Response:", response);
          this.data = response.serviceRequests.map((request) => {
            return {
              serviceRequestId: request.serviceRequestId,
              tenant: request.tenant,
              tenantId: request.tenantId,
              accommodationName: request.accommodationName,
              unitId: request.unitId,
              serviceType: request.serviceType,
              imageUrls: [...request.imageUrls],
              description: request.description,
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
    handleSendEmail() {
      this.sendingmailtoteneant = true;
      console.log(this.selectedTenant.tenantId);
      const body = {
        tenantId: this.selectedTenant.tenantId,
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
    HandleUpdateServiceRequest(toType) {
      const body = {
        serviceRequestId: this.selectedTenant.serviceRequestId,
        status: toType,
      };
      updateServiceRequest(body)
        .then((res) => {
          if (res.responseCode == "00") {
            this.toast.success("Successfully updated");
            this.selectedTenant["serviceStatus"] = this.serviceLiterals[toType];
          }
        })
        .catch();
    },
  },
  data() {
    return {
      sendingmailtoteneant: false,
      toast: useToast(),
      searchQuery: "",
      currentPage: 1,
      pageSize: 8,
      messages: ["Your service request has been sorted"],
      store: useUserStore(),
      showModal: false,
      selectedStatus: "All",
      form: {
        message: "",
      },
      data: [],
      fetching: false,
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
          align: "left",
        },
        {
          title: "Property",
          dataIndex: "accommodationName",
          className: "accommodationName",
          align: "left",
        },
        {
          title: "Unit Number",
          className: "unitId",
          dataIndex: "unitId",
          align: "center",
        },
        {
          title: "Status",
          dataIndex: "serviceStatus",
          slotName: "status",
          align: "center",
        },
        {
          title: "Service Type",
          dataIndex: "serviceType",
          className: "serviceType",
          align: "center",
        },
        { title: "", dataIndex: "action", slotName: "action" },
      ],
    };
  },
};
</script>
