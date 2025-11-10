<template>
  <div class="p-3 h-[100%]">
    <div
      class="flex flex-col border-sleek text-primary size-full page box-border"
    >
      <div class="flex w-full justify-between p-3 text-[14px]">
        <div class="flex gap-3">
          <span
            class="size-[40px] border-sleek flex justify-center items-center"
          >
            <service-req-icon class="icon" />
          </span>
          <div class="flex flex-col justify-center gap-1">
            <p class="font-medium text-[1rem] m-0">All Requests</p>

            <p class="text-secondary m-0">
              Total Number of Tenants:
              <span class="text-primary">{{ serviceRequests.length }}</span>
            </p>
          </div>
        </div>
        <div class="flex gap-3 items-center text-[1rem] max-w-[470px] flex-1">
          <div
            class="border-sleek flex w-full h-[40px] items-center px-2 gap-2"
          >
            <search-icon class="icon" />
            <input class="h-full" type="text" placeholder="search" />
          </div>
          <a-select
            v-model="selectedFilter"
            class="service-req-filter"
            :disabled="!serviceRequests.length"
            :onChange="handleFilterSelected"
            defaultValue="all"
            :options="[
              { label: 'All', value: 'all' },
              { label: 'Completed', value: 'completed' },
              { label: 'Pending', value: 'pending' },
            ]"
          />
        </div>
      </div>

      <Table
        v-if="serviceRequests.length > 0"
        :headers="serviceRequestHeaders"
        :data="serviceRequestsFiltered"
      />

      <div v-else class="size-full flex justify-center items-center">
        <div class="size-fit flex flex-col gap-4 justify-center items-center">
          <span
            class="size-[45px] border-sleek flex justify-center items-center"
          >
            <service-req-icon class="icon" />
          </span>
          <p class="flex flex-col items-center gap-1 text-[1rem]">
            You have no Service Requests
            <span class="text-14px text-secondary"
              >You have nothing to view</span
            >
          </p>
        </div>
      </div>
    </div>
  </div>

  <modal-component
    ref="viewRequestModal"
    title="B-29 Brina Apartments"
    @close="onModalClose"
    :button_label="'Save Changes'"
    @submit="handleSubmit"
  >
    <ul class="grid grid-cols-2 gap-11 w-full max-w-[691px] mx-auto">
      <li>
        <div class="flex gap-2">
          <p class="text-secondary font-medium leading-7">Tenant(s):</p>
          <p class="text-txt_dark leading-7">{{ selected_Request.tenant }}</p>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-2">
          <p class="text-secondary font-medium leading-7">Category</p>
          <p class="text-txt_dark leading-7">
            {{ selected_Request.serviceType }}
          </p>
        </div>
      </li>

      <li>
        <div class="flex gap-2">
          <p class="text-secondary font-medium leading-7">Issue:</p>
          <p class="text-txt_dark leading-7">{{ selected_Request.subject }}</p>
        </div>
      </li>
      <li>
        <div class="flex gap-2">
          <p class="text-secondary font-medium leading-7">Urgency:</p>
          <p class="text-txt_dark leading-7">
            {{ urgencyLevel[selected_Request] || urgencyLevel[0] }} -
            {{
              Math.floor(
                (new Date() - new Date(selected_Request.dateCreated)) /
                  (1000 * 60 * 60 * 24)
              )
            }}
            days
          </p>
        </div>
      </li>
      <li>
        <StatusDropdown
          :modelValue="getStatusLabel(selected_Request)"
          @update:modelValue="(newStatus) => onStatusChangeModal(newStatus)"
          append-to-body
        />
      </li>

      <li class="w-full">
        <div class="flex gap-2">
          <p class="text-secondary font-medium leading-7">Description(s):</p>
          <p class="text-txt_dark leading-7">
            {{ selected_Request.description }}
          </p>
        </div>
      </li>

      <li>
        <div class="flex gap-2">
          <p class="text-secondary font-medium leading-7">Image:</p>
=======
  <div class="px-4 font-inter">
    <div
      class="rounded-[16px] p-2.5 mt-4 font-inter border-[#36363633] border-[0.75px] border-solid"
    >
      <div class="flex justify-between">
        <div class="flex gap-2.5 items-center">
>>>>>>> main
          <div
            class="border-solid border-[0.75px] border-[#36363633] rounded-[8px] p-2.5 w-fit"
          ></div>
          <p class="m-0 p-0 text-[#000000]">Approval Request</p>
        </div>
        <button
          class="border-solid border-[1px] px-[12px] py-[8px] text-[#000000B2] leading-[24px] font-inter rounded-[8px]"
        >
          See all requests
        </button>
      </div>
      <div class="flex gap-[10px]">
        <div
          class="mt-4 w-fit bg-[#F6F6F6] flex flex-col gap-4 rounded-[16px] border-solid border-[0.75px]"
        >
          <div
            class="border-[#F6F6F6] bg-[#FFFFFF] py-[10px] gap-2.5 flex items-center rounded-[16px] border-solid border-b-[0.75px] px-[14px]"
          >
            <div><img src="/src/assets/TenantImage.svg" /></div>
            <div class="h-full">
              <p
                class="m-0 p-0 text-[#000000] font-inter font-medium leading-[100%]"
              >
                Steph soibim
              </p>
              <p
                class="m-0 p-0 text-[#464646] text-[10px] font-inter font-medium leading-[100%] mt-[4px]"
              >
                Thristlebrook Lane, Mistwood, Ontario, K8N 3P5
              </p>
            </div>
            <button
              class="bg-[#31A057] text-[#FFFFFF] py-[4px] px-2 rounded-[4px]"
            >
              Renewal
            </button>
          </div>

          <div class="flex justify-between px-[10px] items-center pb-4">
            <div class="text-[#00000099] font-inter text-[12px] font-medium">
              View Requests
            </div>
            <div
              class="text-[#000000] font-inter font-medium bg-[#FFFFFF] border-[0.75px] border-solid rounded-[6px] px-[10px] py-[6px]"
            >
              View
            </div>
          </div>
        </div>
        <div
          class="mt-4 w-fit bg-[#F6F6F6] flex flex-col gap-4 rounded-[16px] border-solid border-[0.75px]"
        >
          <div
            class="border-[#F6F6F6] bg-[#FFFFFF] py-[10px] gap-2.5 flex items-center rounded-[16px] border-solid border-b-[0.75px] px-[14px]"
          >
            <div><img src="/src/assets/TenantImage.svg" /></div>
            <div class="h-full">
              <p
                class="m-0 p-0 text-[#000000] font-inter font-medium leading-[100%]"
              >
                Steph soibim
              </p>
              <p
                class="m-0 p-0 text-[#464646] text-[10px] font-inter font-medium leading-[100%] mt-[4px]"
              >
                Thristlebrook Lane, Mistwood, Ontario, K8N 3P5
              </p>
            </div>
            <button
              class="bg-[#31A057] text-[#FFFFFF] py-[4px] px-2 rounded-[4px]"
            >
              Renewal
            </button>
          </div>

          <div class="flex justify-between px-[10px] items-center pb-4">
            <div class="text-[#00000099] font-inter text-[12px] font-medium">
              View Requests
            </div>
            <div
              class="text-[#000000] font-inter font-medium bg-[#FFFFFF] border-[0.75px] border-solid rounded-[6px] px-[10px] py-[6px]"
            >
              View
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="rounded-[16px] p-2.5 mt-4 font-inter border-[#36363633] border-[0.75px] border-solid"
    >
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
            All Requests
          </p>
          <p
            class="m-0 p-0 text-[#25262899] font-medium text-[12px] leading-[100%]"
          >
            Total Number of Tenants: 25
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TenantCard from "@/components/TenantCard.vue";
import TableHeader from "@/components/TableHeader.vue";
import V2Table from "@/components/V2Table.vue";
import V2ServiceRequestsDropDown from "@/components/V2ServiceRequestsDropDown.vue";
import { FetchServiceRequests } from "@/api/serviceRequest";
import { useUserStore } from "@/store";

import Button from "@/components/Button/Button.vue";
import Table from "@/components/Table/Table.vue";

export default {
  components: {
    "table-component": V2Table,
    DropdownButton: V2ServiceRequestsDropDown,
    "table-header": TableHeader,
    BaseInput,
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
  },
  data() {
    return {
      messages: ["Your service request has been sorted"],
      store: useUserStore(),
      selected_tab: "all",
      userSelectedOption: "",
      selected_Request: {},
      serviceRequests: [
        {
          id: 1,
          name: "Steph Sobim",
          property: "Thistlebrook Lane, Mistwood, Ontario, K8N 3P5",
          unitNumber: 12,
          status: "Completed",
        },
        {
          id: 2,
          name: "John Doe",
          property:
            "Harborview Drive, Westport Falls, British Columbia, V6Z 1R2",
          unitNumber: 98,
          status: "Completed",
        },
        {
          id: 3,
          name: "Francesa Dublin",
          property: "Snowberry Crescent, Pinefield, Nova Scotia, B3H 2M9",
          unitNumber: 77,
          status: "Pending",
        },
        {
          id: 4,
          name: "Marvelous Jin",
          property: "Lot 14, 9 Boreal Path, Northreach, Saskatchewan, S7K 4V1",
          unitNumber: 14,
          status: "Completed",
        },
        {
          id: 5,
          name: "Chukwuemeka Daniel",
          property: "Lighthouse Way, Argent Isle, Newfoundland and Labrador",
          unitNumber: 24,
          status: "Pending",
        },
        {
          id: 6,
          name: "Marvelous Jin",
          property: "Lighthouse Way, Argent Isle, Newfoundland and Labrador",
          unitNumber: 24,
          status: "Completed",
        },
        {
          id: 7,
          name: "Francesa Dublin",
          property: "Snowberry Crescent, Pinefield, Nova Scotia, B3H 2M9",
          unitNumber: 11,
          status: "Pending",
        },
        {
          id: 8,
          name: "Marvelous Jin",
          property: "Lot 14, 9 Boreal Path, Northreach, Saskatchewan, S7K 4V1",
          unitNumber: 11,
          status: "Completed",
        },
        {
          id: 9,
          name: "Francesa Dublin",
          property: "Snowberry Crescent, Pinefield, Nova Scotia, B3H 2M9",
          unitNumber: 52,
          status: "Pending",
        },
        {
          id: 10,
          name: "Chukwuemeka Daniel",
          property: "Lot 14, 9 Boreal Path, Northreach, Saskatchewan, S7K 4V1",
          unitNumber: 30,
          status: "Pending",
        },
        {
          id: 11,
          name: "John Doe",
          property: "Thistlebrook Lane, Mistwood, Ontario, K8N 3P5",
          unitNumber: 1,
          status: "Completed",
        },
        {
          id: 12,
          name: "Gaal Dornick",
          property: "Lighthouse Way, Argent Isle, Newfoundland and Labrador",
          unitNumber: 1,
          status: "Completed",
        },
        {
          id: 13,
          name: "Chukwuemeka Daniel",
          property:
            "Harborview Drive, Westport Falls, British Columbia, V6Z 1R2",
          unitNumber: 24,
          status: "Pending",
        },
        {
          id: 14,
          name: "Gaal Dornick",
          property:
            "Prairie Gate, Sunset Plains, Prince Edward Island, C1A 4L6",
          unitNumber: 33,
          status: "Completed",
        },
        {
          id: 15,
          name: "Steph Sobim",
          property: "Thistlebrook Lane, Mistwood, Ontario, K8N 3P5",
          unitNumber: 12,
          status: "Completed",
        },
      ],
      serviceRequestsFiltered: [],
      serviceRequestHeaders: [
        "S/N",
        "Name",
        "Property",
        "Unit Number",
        "Status",
      ],
      serviceLiterals: [
        "Requested",
        "Pending",
        "Ongoing",
        "Completed",
        "Terminate",
      ],
      urgencyLevel: ["Low", "Medium", "High", "Emergency"],
      statusToIndex: {
        // Maps status strings to their numeric values
        Requested: 0,
        Pending: 1,
        Ongoing: 2,
        Completed: 3,
        Terminate: 4,
      },
    };
  },
  components: {
    "search-icon": IconSearch,
    "service-req-icon": IconServiceRequests,
    btn: Button,
    "status-select": StatusSelect,
    "modal-component": Modal,
    StatusDropdown,
    Table,
  },
  created() {
    this.handleFetchServiceRequest();
  },

  methods: {
    getStatusLabel(service) {
      return this.serviceLiterals[service.serviceStatus];
    },
    handleFetchServiceRequest() {
      this.serviceRequestsFiltered = this.serviceRequests;
      // FetchServiceRequests(this.store.userProfile.referenceID).then(
      //   (response) => {
      //     console.log(response);
      //     if (response.responseCode == "00") {
      //       this.serviceRequests = response.serviceRequests;
      //     } else handleError(response);
      //   }
      // );
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
    onStatusChangeModal(newStatus) {
      this.selected_Request = {
        ...this.selected_Request,
        serviceStatus: this.statusToIndex[newStatus],
      };
    },

    handleSubmit() {
      const toast = useToast({ position: "top-right" });
      console.log(this.selected_Request);
      updateServiceRequest({
        serviceRequestId: this.selected_Request.serviceRequestId,
        status: this.selected_Request.serviceStatus,
      }).then((response) => {
        console.log(response, "reciprocal");
        if (response.responseCode == "00") {
          console.log("successful");
          toast.success("Successful");
        }
      });
    },
    onStatusChange(service, newStatus) {
      const index = this.serviceLiterals.indexOf(newStatus);
      console.log(index);
      const toast = useToast({ position: "top-right" });
      service.serviceStatus = index;
      console.log(service);
      updateServiceRequest({
        serviceRequestId: service.serviceRequestId,
        status: index,
      }).then((response) => {
        console.log(response, "reciprocal");
        if (response.responseCode == "00") {
          console.log("successful");
          toast.success("Successful");
        } else {
          toast.error(response.responseDescription);
        }
        console.log(response);
      });
    },
    handleFilterSelected(val, option) {
      if(val=="all")
        return this.serviceRequestsFiltered = this.serviceRequests;
      console.log(val)
      return this.serviceRequestsFiltered = this.serviceRequests.filter((req) => {
        console.log(req.status, option)
        return req.status == option.label
    })
    }
  },
};
</script>

<style scoped>
/* TODO: see if we can move this to index.css */
.border-sleek {
  border: 0.75px solid rgba(54, 54, 54, 0.2);
  border-radius: 0.75rem;
}

.page {
  background-color: white;
}

.icon {
  width: 25px;
  height: fit-content;
}
</style>
=======
>>>>>>> main
