<template>
  <div class="bg-neutral py-5 px-4 w-full min-h-screen">
    <a-card class="!bg-white !rounded-2xl !border-0 max-w-5xl mx-auto">
      <div class="pb-2 border-b border-gray-100 mb-4">
        <span class="flex items-center text-base font-medium">
          Pending Service Requests
          <a-badge
            :count="pendingCount"
            class="bg-gray-100 text-[#23234a] rounded-md text-xs font-medium px-2 ml-1"
          />
        </span>
      </div>
      <div>
        <a-spin
          v-if="loading"
          size="large"
          class="flex justify-center items-center min-h-[300px]"
        />
        <template v-else-if="pendingRequests.length > 0">
          <div class="grid gap-4">
            <a-card
              v-for="service in pendingRequests"
              :key="service.serviceRequestId"
              class="!rounded-xl !border !border-gray-100 !shadow-sm"
              :bodyStyle="{ padding: '1.25rem' }"
            >
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-3">
                  <a-avatar
                    :src="getServiceImage(service)"
                    shape="square"
                    size="large"
                    class="!w-16 !h-16 !rounded-lg !bg-gray-200 object-cover"
                  />
                  <div>
                    <div class="text-base font-semibold text-[#23234a]">
                      {{ service.subject }}
                    </div>
                    <div class="text-xs text-gray-400">
                      {{ service.tenant }}
                    </div>
                  </div>
                </div>
                <a-select
                  v-model:value="service.serviceStatus"
                  class="w-36"
                  :options="statusOptions"
                  :dropdownMatchSelectWidth="false"
                  @change="
                    (val) => onStatusChange(service, statusLiterals[val])
                  "
                  :suffixIcon="dropdownIcon()"
                  :disabled="
                    updatingStatusLoading &&
                    updatingStatusId === service.serviceRequestId
                  "
                >
                  <template #option="{ value, label }">
                    <a-tag :color="statusTagColor(value)" class="capitalize">{{
                      label
                    }}</a-tag>
                  </template>
                  <template #tagRender="{ label, value }">
                    <a-tag :color="statusTagColor(value)" class="capitalize">{{
                      label
                    }}</a-tag>
                  </template>
                </a-select>
              </div>
              <div class="flex items-center gap-2 mb-2">
                <a-tag
                  :color="statusTagColor(service.serviceStatus)"
                  class="capitalize"
                  >{{ getStatusLabel(service) }}</a-tag
                >
              </div>
              <div class="text-sm text-[#6b6b8a] mb-2">
                {{ service.description }}
              </div>
              <div class="flex items-center gap-2">
                <a-button
                  type="link"
                  class="p-0 text-primary underline text-xs"
                  @click="openModal(service)"
                  >View full details</a-button
                >
              </div>
            </a-card>
          </div>
        </template>
        <a-empty
          v-else
          description="No pending service requests found"
          class="my-10"
        />
      </div>
    </a-card>

    <a-modal
      ref="viewRequestModal"
      v-model:visible="modalVisible"
      :title="modalTitle"
      :footer="null"
      :width="800"
      :centered="true"
      class="!rounded-2xl"
      @cancel="onModalClose"
    >
      <div class="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
        <!-- Header Section -->
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <div class="flex items-center gap-4">
            <a-avatar
              :src="getServiceImage(selected_Request)"
              shape="square"
              size="large"
              class="!w-20 !h-20 !rounded-xl !bg-gray-200 object-cover"
            />
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-[#23234a] mb-1">
                {{ selected_Request.subject || "N/A" }}
              </h3>
              <p class="text-sm text-gray-500 mb-2">
                {{ selected_Request.tenant || "N/A" }}
              </p>
              <a-tag
                :color="statusTagColor(selected_Request.serviceStatus)"
                class="capitalize text-sm font-medium"
                >{{ getStatusLabel(selected_Request) }}</a-tag
              >
            </div>
          </div>
        </div>

        <!-- Details Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Left Column -->
          <div class="space-y-4">
            <div class="bg-white border border-gray-100 rounded-lg p-4">
              <h4
                class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"
              >
                <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                Basic Information
              </h4>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 font-medium"
                    >Reference:</span
                  >
                  <span class="text-sm text-[#23234a] font-semibold">
                    {{ selected_Request.serviceReference || "N/A" }}
                  </span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 font-medium">Type:</span>
                  <span class="text-sm text-[#23234a]">{{
                    selected_Request.serviceType || "N/A"
                  }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 font-medium"
                    >Unit Type:</span
                  >
                  <span class="text-sm text-[#23234a]">{{
                    selected_Request.unitType || "N/A"
                  }}</span>
                </div>
              </div>
            </div>

            <div class="bg-white border border-gray-100 rounded-lg p-4">
              <h4
                class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"
              >
                <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                Contact Information
              </h4>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 font-medium"
                    >Tenant(s):</span
                  >
                  <span class="text-sm text-[#23234a]">{{
                    selected_Request.tenant || "N/A"
                  }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 font-medium"
                    >Professional:</span
                  >
                  <span class="text-sm text-[#23234a]">
                    {{
                      selected_Request.professional &&
                      selected_Request.professional.trim()
                        ? selected_Request.professional
                        : "N/A"
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-4">
            <div class="bg-white border border-gray-100 rounded-lg p-4">
              <h4
                class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"
              >
                <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
                Timeline
              </h4>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 font-medium"
                    >Created:</span
                  >
                  <span class="text-sm text-[#23234a]">{{
                    formatDate(selected_Request.dateCreated)
                  }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 font-medium"
                    >Updated:</span
                  >
                  <span class="text-sm text-[#23234a]">{{
                    formatDate(selected_Request.dateUpdated)
                  }}</span>
                </div>
              </div>
            </div>

            <div class="bg-white border border-gray-100 rounded-lg p-4">
              <h4
                class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"
              >
                <span class="w-2 h-2 bg-orange-500 rounded-full"></span>
                Current Status
              </h4>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 font-medium">Status:</span>
                <a-tag
                  :color="statusTagColor(selected_Request.serviceStatus)"
                  class="capitalize text-sm font-medium"
                  >{{ getStatusLabel(selected_Request) }}</a-tag
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Description Section -->
        <div class="bg-white border border-gray-100 rounded-lg p-4">
          <h4
            class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"
          >
            <span class="w-2 h-2 bg-red-500 rounded-full"></span>
            Description
          </h4>
          <p class="text-sm text-[#23234a] leading-relaxed">
            {{ selected_Request.description || "No description provided" }}
          </p>
        </div>

        <!-- Images Section -->
        <div class="bg-white border border-gray-100 rounded-lg p-4">
          <h4
            class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"
          >
            <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
            Attached Images
          </h4>
          <div class="flex gap-3 flex-wrap">
            <template
              v-if="
                selected_Request.imageUrls &&
                selected_Request.imageUrls.filter((img) => img).length
              "
            >
              <div
                v-for="(img, idx) in selected_Request.imageUrls"
                :key="idx"
                v-if="img"
                class="relative group"
              >
                <img
                  :src="img"
                  class="w-24 h-24 object-cover rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
                  @click="previewImage(img)"
                />
                <div
                  class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center"
                >
                  <span
                    class="text-white opacity-0 group-hover:opacity-100 text-xs font-medium"
                  >
                    Click to view
                  </span>
                </div>
              </div>
            </template>
            <div v-else class="flex items-center justify-center w-full py-8">
              <div class="text-center">
                <div
                  class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2"
                >
                  <svg
                    class="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <p class="text-sm text-gray-500">No images attached</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Notification Section (for completed requests) -->
        <div
          v-if="selected_Request.serviceStatus == 3"
          class="bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <h4
            class="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2"
          >
            <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
            Send Notification
          </h4>
          <div class="space-y-3">
            <a-textarea
              v-model:value="notificationMessage"
              rows="3"
              class="w-full text-sm"
              placeholder="Enter notification message..."
            />
            <div class="flex gap-3">
              <a-button
                type="primary"
                class="px-6"
                :loading="updatingStatusLoading"
                :disabled="updatingStatusLoading"
              >
                Send notification
              </a-button>
              <a-button
                class="border-blue-300 text-blue-700 px-6"
                :disabled="updatingStatusLoading"
              >
                Send to unit
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { updateServiceRequest } from "@/api/serviceRequest";
import { useServiceRequestStore } from "@/stores/serviceRequests";
import { DownOutlined, ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Empty,
  Input,
  Modal,
  Select,
  Spin,
  Tag,
} from "ant-design-vue";
import { h } from "vue";

export default {
  data() {
    return {
      selected_Request: {},
      notificationMessage: "",
      modalVisible: false,
      updatingStatusId: null,
      updatingStatusLoading: false,
      serviceLiterals: [
        "Requested",
        "Pending",
        "Ongoing",
        "Completed",
        "Terminate",
      ],
    };
  },
  components: {
    "a-card": Card,
    "a-badge": Badge,
    "a-button": Button,
    "a-empty": Empty,
    "a-avatar": Avatar,
    "a-modal": Modal,
    "a-textarea": Input.TextArea,
    "a-select": Select,
    "a-tag": Tag,
    "a-spin": Spin,
    "down-outlined": DownOutlined,
    "exclamation-circle-outlined": ExclamationCircleOutlined,
  },
  computed: {
    store() {
      return useServiceRequestStore();
    },
    loading() {
      return this.store.loading;
    },
    pendingRequests() {
      return this.store.getByStatus("Pending", this.serviceLiterals);
    },
    pendingCount() {
      return this.pendingRequests.length;
    },
    modalTitle() {
      return this.selected_Request && this.selected_Request.propertyName
        ? this.selected_Request.propertyName
        : "Service Request Details";
    },
    statusOptions() {
      return this.serviceLiterals.map((label, value) => ({ label, value }));
    },
    statusLiterals() {
      return this.serviceLiterals;
    },
  },
  created() {
    // Only fetch if we don't have data or if we don't have pending data
    if (
      !this.store.hasData() ||
      !this.store.hasStatusData("Pending", this.serviceLiterals)
    ) {
      this.store.fetchRequests();
    }
  },
  methods: {
    getStatusLabel(service) {
      return this.serviceLiterals[service.serviceStatus];
    },
    openModal(request) {
      this.modalVisible = true;
      this.selected_Request = request;
    },
    onModalClose() {
      this.modalVisible = false;
    },
    onStatusChange(service, newStatus) {
      const oldStatusIndex = service.serviceStatus;
      const oldStatusLabel = this.serviceLiterals[oldStatusIndex];
      const newStatusIndex = this.serviceLiterals.indexOf(newStatus);
      const self = this;
      Modal.confirm({
        title: "Update Service Request Status",
        icon: h(ExclamationCircleOutlined),
        content: `Are you sure you want to change the status to "${newStatus}"?`,
        okText: "Yes",
        okType: "primary",
        cancelText: "No",
        centered: true,
        async onOk() {
          self.updatingStatusId = service.serviceRequestId;
          self.updatingStatusLoading = true;
          try {
            const response = await updateServiceRequest({
              serviceRequestId: service.serviceRequestId,
              status: newStatusIndex,
            });

            if (response && response.responseCode === "00") {
              // Update in Pinia store with proper reactivity
              const req = self.store.requests.find(
                (r) => r.serviceRequestId === service.serviceRequestId
              );

              if (req) {
                // Use Vue.set or direct assignment to ensure reactivity
                req.serviceStatus = newStatusIndex;
                // Force reactivity by updating the entire requests array
                self.store.requests = [...self.store.requests];
              }
              // Also update the local service object
              service.serviceStatus = newStatusIndex;
              message.success("Service request status updated!");

              // Remove from UI if status is no longer pending
              if (newStatus !== "Pending") {
                const index = self.store.requests.findIndex(
                  (r) => r.serviceRequestId === service.serviceRequestId
                );
                if (index > -1) {
                  self.store.requests.splice(index, 1);
                  // Force reactivity
                  self.store.requests = [...self.store.requests];
                }
              }
            } else {
              message.error(
                response?.responseDescription || "Failed to update status"
              );
              // Revert to the previous status index
              service.serviceStatus = oldStatusIndex;
            }
          } catch (error) {
            message.error("Network error occurred");
            service.serviceStatus = oldStatusIndex;
          } finally {
            self.updatingStatusId = null;
            self.updatingStatusLoading = false;
          }
        },
        onCancel() {
          // revert dropdown to previous value
          service.serviceStatus = oldStatusIndex;
        },
      });
    },
    formatDate(date) {
      if (!date || date.startsWith("0001")) return "N/A";
      return new Date(date).toLocaleString();
    },
    getServiceImage(service) {
      if (service.imageUrls && service.imageUrls.length) {
        const img = service.imageUrls.find((url) => url && url.trim());
        if (img) return img;
      }
      return "https://via.placeholder.com/64x64?text=No+Image";
    },
    statusTagColor(status) {
      // Map status index to Ant Design tag color
      const colors = ["default", "blue", "orange", "green", "red"];
      return colors[status] || "default";
    },
    dropdownIcon() {
      return h(DownOutlined);
    },
    previewImage(imageUrl) {
      // You can implement image preview functionality here
      // For now, we'll just open the image in a new tab
      window.open(imageUrl, "_blank");
    },
  },
};
</script>

<style>
/* Reduce gap between Ant Design tabs if needed */
</style>
