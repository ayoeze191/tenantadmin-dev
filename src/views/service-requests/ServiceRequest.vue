<template>
  <div class="p-3 h-[100%]">
    <div
      class="flex flex-col border-sleek text-primary size-full overflow-hidden page box-border"
    >
      <div class="flex w-full justify-between p-3 text-[14px]">
        <div class="flex gap-3">
          <span
            class="size-[45px] border-sleek flex justify-center items-center"
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
            class="border-sleek flex w-full h-[45px] items-center px-2 gap-2"
          >
            <search-icon class="icon" />
            <input class="h-full" type="text" placeholder="search" />
          </div>
          <select
            class="border-sleek h-[45px] py-3"
            name="service-req-filter text[.75rem]"
            id="service-req-filter"
            :disabled="!serviceRequests.length"
          >
            <option
              value=""
              :selected="!serviceRequests.length"
              disabled
              hidden
            >
              Status
            </option>
            <option value="all" :selected="serviceRequests.length">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <Table
        v-if="serviceRequests.length > 0"
        :headers="serviceRequestHeaders"
        :data="serviceRequests"
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

          <StatusBadge label="Success" type="pending" />
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
          <div
            class="rounded-md py-1.5 px-5 bg-bg1 flex gap-2 justify-center"
            v-if="selected_Request.imageUrls"
          >
            <img :src="selected_Request.imageUrls || ''" />
          </div>
        </div>
      </li>
    </ul>
    <div class="mt-6" v-if="selected_Request.serviceStatus == 3">
      <div class="flex gap-2 flex-col">
        <!-- <input type="text" v-model="" placeholder="Enter Message"/> -->
        <label for="message" class="text-[#404164] text-xl"
          >Send Notification</label
        >
        <textarea
          id="message"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary"
          placeholder="Enter Message"
        ></textarea>
      </div>
      <div class="flex gap-[24px]">
        <button class="bg-[#000130] text-white px-4 py-2 rounded-[4px] mt-3">
          Send notification
        </button>
        <button
          class="border-[#000130] border-[1px] text-[#404164] px-4 py-2 rounded-[4px] mt-3"
        >
          Send notification to unit
        </button>
      </div>
    </div>
  </modal-component>
</template>

<script>
import StatusSelect from "@/components/StatusSelect.vue";
import {
  FetchServiceRequests,
  updateServiceRequest,
} from "@/api/serviceRequest";
import StatusBadge from "@/components/StatusBadge/StatusBadge.vue";
import StatusDropdown from "@/components/StatusDropdown.vue";
import IconSearch from "../../components/icons/IconSearch.vue";
import IconServiceRequests from "@/components/icons/IconServiceRequests2.vue";
import Modal from "@/components/Modal.vue";
import { useToast } from "vue-toast-notification";
import { useUserStore } from "@/store";

import Button from "@/components/Button/Button.vue";
import Table from "@/components/Table/Table.vue";

export default {
  data() {
    return {
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
    StatusBadge,
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
      FetchServiceRequests(this.store.userProfile.referenceID).then(
        (response) => {
          console.log(response);
          if (response.responseCode == "00") {
            this.serviceRequests = response.serviceRequests;
          } else handleError(response);
        }
      );
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
          console.log("successfull");
          toast.success("Successfull");
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
          console.log("successfull");
          toast.success("Successfull");
        } else {
          toast.error(response.responseDescription);
        }
        console.log(response);
      });
    },
  },
};
</script>

<style>
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
