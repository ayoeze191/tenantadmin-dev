<template>
  <div class="bg-neutral py-5 px-10 w-full overflow-y-scroll h-screen pb-40">
    <h1 class="text-[24px] font-semibold text-txt_dark font-sf">ALL REQUEST</h1>
    <section class="list_container mt-[20px] text-secondary" style="color: red">
      <div
        class="flex w-full justify-between text-secondary border-b border-br1 pb-3 mb-4"
        style="color: red"
      >
        <p
          class="font-medium text-[20px] text-secondary mr-0.5"
          style="color: #808097 !important"
        >
          {{ selected_tab == "all" ? "All" : selected_tab }} Service Requests
          <span
            class="text-primary font-semibold text-[18px]"
            style="color: #404164 !important"
            >({{
              selected_tab == "all"
                ? serviceRequests.length
                : serviceRequests.filter(
                    (serv) =>
                      serviceLiterals[serv.serviceStatus] == selected_tab
                  ).length
            }})</span
          >
        </p>
        <aside class="flex gap-3.5">
          <search-icon />
          <div class="pl-3.5 flex border-l border-br1">
            <!-- <status-select :label="'Update All:'"></status-select> -->
          </div>
        </aside>
      </div>
      <ul
        v-if="
          selected_tab == 'all'
            ? serviceRequests.length > 0
            : serviceRequests.filter(
                (serv) => serviceLiterals[serv.serviceStatus] == selected_tab
              ).length
        "
      >
        <li
          class="w-full rounded-md px-4 py-2 bg-grey mb-4"
          v-for="service in selected_tab == 'all'
            ? serviceRequests
            : serviceRequests.filter(
                (serv) => serviceLiterals[serv.serviceStatus] == selected_tab
              )"
        >
          <section class="flex w-full justify-between mb-4">
            <p class="font-medium leading-6 text-txt_dark font-sf">
              {{ service.subject }}
              <!-- <span class="text-secondary ml-1">{{service.properties[0].name || 'nill' }} </span>  -->
            </p>

            <StatusDropdown
              :modelValue="getStatusLabel(service)"
              @update:modelValue="
                (newStatus) => onStatusChange(service, newStatus)
              "
            />
          </section>
          <a
            class="text-sm leading-6 text-txt_dark cursor-pointer underline"
            @click="openModal(service)"
            >View full details</a
          >
        </li>

        <!-- <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
                <section class="flex w-full justify-between mb-4">
                    <p class="font-medium leading-6 text-txt_dark">Broken Toilet <span class="text-secondary ml-1">Apt T-69, Sean Apartments </span> </p>
                    <status-select
                     :label="'Update Status:'"
                    ></status-select>

                </section>
                <a class="text-sm leading-6 text-txt_dark cursor-pointer underline" @click="openModal({})">View full details</a>
                
            </li>
            <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
                <section class="flex w-full justify-between mb-4">
                    <p class="font-medium leading-6 text-txt_dark">Broken Toilet <span class="text-secondary ml-1">Apt T-69, Sean Apartments </span> </p>
                    <status-select
                     :label="'Update Status:'"
                    ></status-select>

                </section>
                <a class="text-sm leading-6 text-txt_dark cursor-pointer underline" @click="openModal({})">View full details</a>
                
            </li>
            <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
                <section class="flex w-full justify-between mb-4">
                    <p class="font-medium leading-6 text-txt_dark">Broken Toilet <span class="text-secondary ml-1">Apt T-69, Sean Apartments </span> </p>
                    <status-select
                     :label="'Update Status:'"
                    ></status-select>

                </section>
                <a class="text-sm leading-6 text-txt_dark cursor-pointer underline" @click="openModal({})">View full details</a>
                
            </li>
            <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
                <section class="flex w-full justify-between mb-4">
                    <p class="font-medium leading-6 text-txt_dark">Broken Toilet <span class="text-secondary ml-1">Apt T-69, Sean Apartments </span> </p>
                    <status-select
                     :label="'Update Status:'"
                    ></status-select>

                </section>
                <a class="text-sm leading-6 text-txt_dark cursor-pointer underline" @click="openModal({})">View full details</a>
                
            </li> -->
      </ul>
      <div v-else class="mx-auto">
        <p class="text-black w-fit mx-auto">
          No service request has been made yet
        </p>
      </div>
    </section>
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
import StatusDropdown from "@/components/StatusDropdown.vue";
import IconSearch from "../../components/icons/IconSearch.vue";
import Modal from "@/components/Modal.vue";
import { useToast } from "vue-toast-notification";

export default {
  data() {
    return {
      selected_tab: "all",
      userSelectedOption: "",
      selected_Request: {},
      serviceRequests: [],
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
    "status-select": StatusSelect,
    "modal-component": Modal,
    StatusDropdown,
  },
  created() {
    this.handleFetchServiceRequest();
  },

  methods: {
    getStatusLabel(service) {
      return this.serviceLiterals[service.serviceStatus];
    },
    handleFetchServiceRequest() {
      FetchServiceRequests().then((response) => {
        console.log(response);
        if (response.responseCode == "00") {
          this.serviceRequests = response.serviceRequests;
        } else handleError(response);
      });
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

<style></style>
