<template>
  <div class="bg-neutral w-full px-8 py-10">
    <!-- Header -->
    <div>
      {{ console.log(property, "property valyue") }}
      <section class="w-full mx-auto flex justify-between items-center mb-4">
        <router-link to="/properties" class="pt-3">
          <a-button
            type="text"
            class="flex items-center gap-2 text-base font-medium text-gray-600 bg-gray-100 hover:text-primary rounded-full px-4 py-2 transition-all"
          >
            <template #icon>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
                  fill="#404164"
                />
              </svg>
            </template>
            Back
          </a-button>
        </router-link>
        <div class="flex gap-3 items-center">
          <div class="flex gap-3 items-center flex-wrap">
            <button
              :disabled="true"
              :class="[
                'text-txt_dark px-[33px] py-2 h-fit rounded-[4px] border-[#000130] border-[1px] w-fit font-semibold font-sf leading-[28px] min-w-[120px] transition-all sm:px-6 sm:py-2 sm:text-base xs:px-3 xs:py-2 xs:text-sm xs:min-w-[90px]',
                true
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'hover:bg-primary hover:text-white bg-inherit',
              ]"
              @click="onEdit"
            >
              Edit Property
            </button>
            <button
              @click="
                () => {
                  showAddTenantModal = true;
                  tenantForm.unitId = activeKey;
                }
              "
              :disabled="activeKey == 1"
              :class="[
                'h-fit flex items-center gap-[12px] font-medium rounded-[4px] border-[1px] px-[33px] py-2 w-fit leading-[28px] min-w-[120px] transition-all sm:px-6 sm:py-2 sm:text-base xs:px-3 xs:py-2 xs:text-sm xs:min-w-[90px]',
                activeKey == 1
                  ? 'bg-gray-300  cursor-not-allowed text-txt_dark font-sf font-semibold border-[#000130] border-[1px] w-fit leading-[28px]'
                  : 'bg-[#000130] text-white hover:bg-[#1a1a40]',
              ]"
            >
              <div>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 5.5V19.5M5 12.5H19"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <span class="">Add Tenant</span>
            </button>
          </div>
        </div>
      </section>
      <!-- Main Card -->
      <div class="bg-white px-[50px] py-[26px] rounded-2xl w-full mx-auto">
        <a-spin :spinning="loading">
          <template v-if="error">
            <a-result status="404" :title="'Not Found'" :sub-title="error" />
          </template>
          <template v-else-if="property">
            <div>
              <div class="flex h-[300px]">
                <!-- Images Carousel with Ant Design Preview -->
                <div
                  class="relative w-full rounded-xl h-full flex gap-2 items-center justify-center"
                >
                  <a-image-preview-group v-if="images && images.length">
                    <a-image
                      :src="images[currentImageIndex]"
                      :width="'100%'"
                      :height="'100%'"
                      class="w-full h-full object-cover rounded-xl cursor-pointer"
                      :preview="{ visible: false }"
                      @click="showPreview(currentImageIndex)"
                    />
                    <!-- Hidden images for preview group -->
                    <template v-for="(img, idx) in images" :key="idx">
                      <a-image
                        v-if="idx !== currentImageIndex"
                        :src="img"
                        style="display: none"
                      />
                    </template>
                    <!-- Prev Button -->
                    <button
                      v-if="images.length > 1"
                      @click="prevImage"
                      class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow rounded-full p-1 z-10"
                      aria-label="Previous image"
                    >
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M15 6l-6 6 6 6"
                          stroke="#23234a"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    <!-- Next Button -->
                    <button
                      v-if="images.length > 1"
                      @click="nextImage"
                      class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow rounded-full p-1 z-10"
                      aria-label="Next image"
                    >
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9 6l6 6-6 6"
                          stroke="#23234a"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    <!-- +N Remaining Images Indicator -->
                    <div
                      v-if="images.length > 1"
                      class="absolute top-2 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full z-10"
                    >
                      +{{ images.length - 1 }}
                    </div>
                  </a-image-preview-group>
                  <template v-else>
                    <img
                      src="/placeholder.png"
                      class="w-full h-full object-cover rounded-xl"
                      alt="No Image"
                    />
                  </template>
                </div>
                <div class="flex ml-2 flex-col gap-[8px] overflow-y-scroll">
                  <img
                    :src="img"
                    v-for="img in images"
                    class="h-[128px] w-[145px] rounded-lg"
                  />
                </div>
              </div>
              <div class="tabs">
                <a-tabs
                  v-model:activeKey="activeKey"
                  :destroyInactiveTabPane="true"
                  @change="fetchCurrentAmenities(activeKey)"
                >
                  <a-tab-pane :key="1" tab="Property Info">
                    <propertyheader :property="property" />
                    <div class="mt-4 text-[#808097]">
                      <h1
                        class="font-medium text-base text-txt_dark leading-[100%]"
                      >
                        Description
                      </h1>
                      <p
                        class="text-[#808097]"
                        style="color: #808097 !important"
                      >
                        {{ property.description }}
                      </p>
                    </div>
                    <div class="mt-[16px]">
                      <li
                        class="font-medium text-base text-txt_dark leading-[100%]"
                      >
                        Key Features
                      </li>
                      <li></li>
                    </div>
                  </a-tab-pane>
                  <a-tab-pane
                    v-for="unit in property.units"
                    :key="unit.unitId"
                    :tab="unit.unitName"
                  >
                    <propertyheader :property="property" />

                    <div class="mt-4 text-[#808097]">
                      <div class="flex gap-[24px]">
                        <span class="">
                          <h1
                            class="font-medium text-base text-txt_dark leading-[100%]"
                          >
                            Rent
                          </h1>
                          <p
                            class="text-[#808097]"
                            style="color: #808097 !important"
                          >
                            ${{ unit.securityDeposit }}
                          </p>
                        </span>
                        <span>
                          <h1
                            class="font-medium text-base text-txt_dark leading-[100%]"
                          >
                            Security Deposit
                          </h1>
                          <p
                            class="text-[#808097]"
                            style="color: #808097 !important"
                          >
                            ${{ unit.price }}
                          </p>
                        </span>
                      </div>
                    </div>
                    <div
                      class="mt-[16px] text-[#808097] flex flex-col gap-[4px] font-sf font-semibold list-disc"
                    >
                      <li
                        class="font-medium text-base text-txt_dark leading-[100%] list-none"
                      >
                        Key Features
                      </li>
                      <li
                        v-for="amenity in currentAmenities"
                        class="mt-[4px] font-sf text-sm font-semibold text-[#808097] list-disc"
                        style="color: #808097 !important"
                      >
                        {{ amenity.amenity }}
                      </li>
                    </div>
                  </a-tab-pane>
                </a-tabs>
              </div>
              <!-- Property Info Card -->
            </div>
            <!-- Key Features -->
          </template>
        </a-spin>
      </div>
    </div>
    <a-modal
      v-model:visible="showAddTenantModal"
      :footer="null"
      width="540px"
      centered
      :bodyStyle="{ padding: '0' }"
      class="add-tenants-modal"
      :closable="false"
      @cancel="resetTenantModal"
    >
      <!-- <div class="add-tenants-modal-header">
        <div class="modal-title">Add Tenants</div>
      </div> -->
      <template #title>
        <div
          class="flex items-center justify-between border-b border-[#C7C7C7] py-[12px]"
        >
          <div
            class="cursor-pointer flex items-center gap-[8px] text-txt_dark text-[18px] font-medium"
          >
            <ArrowLeftOutlined @click="goBack" class="text-[18px]" />
            Back
          </div>
          <span class="modal-title">Add Tenants</span>
          <span></span>
        </div>
      </template>
      <a-tabs
        v-model:activeKey="tenantTab"
        class="add-tenants-tabs tab-gap"
        centered
        :tabBarGutter="20"
      >
        <a-tab-pane key="single" tab="Single Add">
          <div class="px-2 py-2">
            <div class="font-semibold text-gray-700 text-base mb-2">
              Tenant Information
            </div>
            <a-form
              :model="tenantForm"
              :rules="tenantRules"
              ref="tenantFormRef"
              layout="vertical"
            >
              <a-form-item label="Full Name" name="FullName" required>
                <a-input
                  v-model:value="tenantForm.FullName"
                  placeholder="Enter full name"
                  size="large"
                />
              </a-form-item>
              <a-form-item label="Email" name="emailAddress" required>
                <a-input
                  v-model:value="tenantForm.emailAddress"
                  placeholder="Enter email"
                  size="large"
                />
              </a-form-item>
              <a-form-item label="Phone Number" name="phoneNumber" required>
                <a-input
                  v-model:value="tenantForm.phoneNumber"
                  placeholder="Enter phone number"
                  size="large"
                />
              </a-form-item>
              <div class="font-semibold text-gray-700 text-base mt-6 mb-2">
                Lease Information
              </div>
              <a-form-item label="Property" name="unitId" required>
                <a-select
                  v-model:value="tenantForm.unitId"
                  :options="propertyOptions"
                  placeholder="Select property"
                  size="large"
                />
              </a-form-item>
              <a-form-item label="Lease Start Date" name="startDate" required>
                <a-date-picker
                  v-model:value="tenantForm.startDate"
                  style="width: 100%"
                  size="large"
                />
              </a-form-item>
              <a-form-item label="Lease End Date" name="endDate" required>
                <a-date-picker
                  v-model:value="tenantForm.endDate"
                  style="width: 100%"
                  size="large"
                />
              </a-form-item>
              <a-form-item label="Rent Rate" name="rentRate" required>
                <a-input-number
                  v-model:value="tenantForm.rentRate"
                  style="width: 100%"
                  min="0"
                  size="large"
                />
              </a-form-item>
              <div class="flex justify-end gap-3 mt-8">
                <a-button @click="resetTenantModal" size="large"
                  >Cancel</a-button
                >
                <a-button
                  type="primary"
                  :loading="tenantLoading"
                  @click="createProperties"
                  size="large"
                  class="px-8"
                  >Add Tenants</a-button
                >
              </div>
            </a-form>
          </div>
        </a-tab-pane>
        <a-tab-pane key="bulk" tab="Bulk Upload">
          <div class="px-2 py-4">
            <div class="font-semibold text-gray-700 text-base mb-1">
              Upload Instructions
            </div>
            <div class="text-gray-500 text-sm mb-4">
              Upload a CSV file containing tenant details. Ensure it follows the
              required format.
            </div>
            <div class="font-medium text-gray-700 mb-1">File Upload</div>
            <a-upload-dragger
              :before-upload="() => false"
              :show-upload-list="true"
              :accept="'.csv'"
              v-model:file-list="bulkFileList"
              class="mb-2"
            >
              <div class="flex flex-col items-center justify-center py-2">
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M12 16V4m0 0l-4 4m4-4l4 4"
                    stroke="#23234a"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <rect
                    x="4"
                    y="16"
                    width="16"
                    height="4"
                    rx="2"
                    fill="#f3f4f6"
                    stroke="#e5e7eb"
                    stroke-width="2"
                  />
                </svg>
                <div class="mt-2 text-gray-400 text-base">
                  Drag and drop CSV file here
                </div>
              </div>
            </a-upload-dragger>
            <div class="mt-2 mb-1 text-gray-700 font-medium">
              Download Sample CSV
            </div>
            <a
              @click="downloadSampleFile"
              class="text-primary cursor-pointer mb-4 block"
              >sample.co</a
            >
            <div class="flex justify-end gap-3 mt-8">
              <a-button @click="resetTenantModal" size="large">Cancel</a-button>
              <a-button
                type="primary"
                :loading="tenantLoading"
                @click="submitBulkTenant"
                size="large"
                class="px-8"
                >Upload File</a-button
              >
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>

<script setup>
import { EditOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { openDB } from "idb";
import { computed, h, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Propertyheader from "@/components/Propertyheader.vue";
import { useToast } from "vue-toast-notification";
import {
  GetAccomodationById,
  AddTenants,
  getunitDetails,
} from "@/api/properties";
const route = useRoute();
const activeKey = ref(1);
const router = useRouter();
const property = ref(null);
const loading = ref(true);
const error = ref(null);

const showAddTenantModal = ref(false);
const UNIT_TYPE_ENUM = [
  { label: "Two Bedroom", value: 2 },
  { label: "Three Bedroom", value: 3 },
  { label: "PentHouse", value: 4 },
  { label: "Loft", value: 5 },
  { label: "TownHouse", value: 6 },
  { label: "Duplex", value: 7 },
  { label: "Villa", value: 8 },
  { label: "Serviced Apartment", value: 9 },
  { label: "Shared Accommodation", value: 10 },
  { label: "Hostel/Dormitory", value: 11 },
];

const tenantTab = ref("single");
const tenantLoading = ref(false);
const tenantForm = reactive({
  emailAddress: "",
  FullName: "",
  dob: "",
  phoneNumber: "",
  accountType: 0,
  accountRefNumber: "",
  unitId: 0,
  startDate: "",
  endDate: "",
  rentRate: 0,
});
const tenantFormRef = ref();
const tenantRules = {
  FullName: [{ required: true, message: "Full name is required" }],
  emailAddress: [
    { required: true, message: "Email is required" },
    { type: "email", message: "Invalid email" },
  ],
  phoneNumber: [
    { required: true, message: "Phone number is required" },
    { pattern: /^\d{7,15}$/, message: "Invalid phone number" },
  ],
  unitId: [{ required: true, message: "Property is required" }],
  startDate: [{ required: true, message: "Lease start date is required" }],
  endDate: [{ required: true, message: "Lease end date is required" }],
  rentRate: [{ required: true, message: "Monthly rent is required" }],
};
const createProperties = async () => {
  tenantLoading.value = true;
  let firstname, lastname;
  const [splittedfirstname, splittedlastname] = tenantForm.FullName.split(" ");
  firstname = splittedfirstname;
  lastname = splittedlastname;
  const toast = useToast();
  const payload = {
    emailAddress: tenantForm.emailAddress,
    firstname,
    lastname,
    dob: "",
    phoneNumber: tenantForm.phoneNumber,
    accountType: 0,
    accountRefNumber: "",
    contractRequest: {
      unitId: tenantForm.unitId,
      isActive: true,
      startDate: tenantForm.startDate,
      endDate: tenantForm.endDate,
      rentRate: tenantForm.rentRate,
    },
  };
  console.log(payload, "payload");
  const response = await AddTenants(payload);
  console.log(response.result);
  if (response.result.responseCode == "00") {
    toast.success("Successfully created");
    tenantLoading.value = false;
  } else {
    toast.error(response.result.responseDescription);
    tenantLoading.value = false;
  }
  tenantLoading.value == false;
  showAddTenantModal.value = false;
};
const propertyOptions = computed(() => {
  // You can fetch or map your properties here. For demo, use current property only.
  return property.value.units
    ? property.value.units.map(
        (uni) => uni && { label: uni.unitName, value: uni.unitId }
      )
    : [];
});

onMounted(async () => {
  const id = route.params.id || route.params.accommodationId;
  getAccomodationDetails(id);
  if (!id) {
    error.value = "No property ID provided.";
    loading.value = false;
    return;
  }
  try {
    const db = await openDB("properties-db", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("properties")) {
          db.createObjectStore("properties", { keyPath: "accommodationId" });
        }
      },
    });
    const data = await db.get("properties", Number(id));
    if (!data) {
      error.value = "Property not found.";
    } else {
      property.value = data;
    }
  } catch (e) {
    error.value = "Failed to load property details.";
  } finally {
    loading.value = false;
  }
});

// Main image logic
const mainImage = computed(() => {
  if (
    !property.value ||
    !property.value.images ||
    !property.value.images.length
  )
    return "/placeholder.png";
  const main = property.value.images.find((img) => img.isMain);
  return main ? main.image : property.value.images[0].image;
});

// Side images
const sideImages = computed(() => {
  if (!property.value || !property.value.images) return [];
  return property.value.images
    .filter((img) => !img.isMain)
    .map((img) => img.image)
    .slice(0, 3);
});

// Unit type summary
const unitTypeSummary = computed(() => {
  if (!property.value) return "";
  if (property.value.unitTypes && Array.isArray(property.value.unitTypes)) {
    return property.value.unitTypes
      .map((u) => `${u.type}: ${u.count}`)
      .join(", ");
  }
  if (property.value.unitType) {
    return property.value.unitType;
  }
  return "";
});

// Amenities logic
const amenitiesList = computed(() => {
  if (!property.value) return [];
  if (Array.isArray(property.value.amenities)) {
    return property.value.amenities.map((a) =>
      typeof a === "object" ? a : { label: a }
    );
  }
  return null;
});

// Landlord info
const landlord = computed(() =>
  property.value && property.value.landlord ? property.value.landlord : null
);

// Unit table columns
const unitColumns = [
  { title: "Unit ID", dataIndex: "unitId", key: "unitId" },
  { title: "Rooms", dataIndex: "numberOfRooms", key: "numberOfRooms" },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    customRender: ({ text }) => `₦${text}`,
  },
];

function onEdit() {
  if (property.value && property.value.accommodationId) {
    router.push({
      name: "add-admin-properties",
      params: { id: property.value.accommodationId },
    });
  }
}

// Images array for carousel
const images = computed(() => {
  if (
    !property.value ||
    !property.value.images ||
    !property.value.images.length
  )
    return [];
  return property.value.images.map((img) => img.image);
});
const currentImageIndex = ref(0);
function nextImage() {
  if (!images.value.length) return;
  currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length;
}
function prevImage() {
  if (!images.value.length) return;
  currentImageIndex.value =
    (currentImageIndex.value - 1 + images.value.length) % images.value.length;
}
// Reset index if images change
watch(images, (imgs) => {
  if (currentImageIndex.value >= imgs.length) {
    currentImageIndex.value = 0;
  }
});

// Add preview logic for Ant Design image preview
const previewVisible = ref(false);
const previewIndex = ref(0);
function showPreview(idx) {
  previewIndex.value = idx;
  previewVisible.value = true;
}

function resetTenantModal() {
  showAddTenantModal.value = false;
  tenantTab.value = "single";
  tenantLoading.value = false;
  bulkFileList.value = [];
  Object.assign(tenantForm, {
    name: "",
    email: "",
    phone: "",
    property: null,
    leaseStart: null,
    leaseEnd: null,
    monthlyRent: null,
  });
}
async function submitSingleTenant() {
  await tenantFormRef.value.validate().catch(() => {});
  tenantLoading.value = true;
  // setTimeout(() => {
  //   tenantLoading.value = false;
  //   message.success("Tenant added (demo only)");
  //   resetTenantModal();
  // }, 1200);
}
// Bulk upload logic
const bulkFileList = ref([]);
function submitBulkTenant() {
  if (!bulkFileList.value.length) {
    message.error("Please upload a CSV file.");
    return;
  }
  tenantLoading.value = true;
  setTimeout(() => {
    tenantLoading.value = false;
    message.success("Bulk upload complete (demo only)");
    resetTenantModal();
  }, 1200);
}
function downloadSampleFile() {
  // CSV sample
  const sample = [
    [
      "Full Name",
      "Email",
      "Phone",
      "Property",
      "Lease Start Date",
      "Lease End Date",
      "Monthly Rent",
    ],
    [
      "John Doe",
      "john@example.com",
      "08012345678",
      "4",
      "2024-07-01",
      "2025-07-01",
      "500000",
    ],
    [
      "Jane Smith",
      "jane@example.com",
      "08023456789",
      "4",
      "2024-07-02",
      "2025-07-02",
      "500000",
    ],
    [
      "Mike Brown",
      "mike@example.com",
      "08034567890",
      "4",
      "2024-07-03",
      "2025-07-03",
      "500000",
    ],
    [
      "Lisa White",
      "lisa@example.com",
      "08045678901",
      "4",
      "2024-07-04",
      "2025-07-04",
      "500000",
    ],
  ];
  const csv = sample.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "tenant_sample.csv";
  a.click();
  URL.revokeObjectURL(url);
}
async function getAccomodationDetails(id) {
  const response = await GetAccomodationById(id);
  console.log(response);
}

const currentAmenities = ref();

async function fetchCurrentAmenities(id) {
  if (activeKey.value !== 1) {
    const response = await getunitDetails(id);
    console.log(response.data);
    currentAmenities.value = response.data.amenities.map(
      (amen) => amen && { amenity: amen.amenity.name }
    );
    console.log(currentAmenities.value);
  }
}
</script>

<style scoped>
.bg-neutral {
  background: #f7f8fa;
}

:deep(.ant-btn-primary) {
  background: #000130;
  border-color: #000130;
}
:deep(.ant-btn-primary:hover),
:deep(.ant-btn-primary:focus) {
  background: #23234a;
  border-color: #23234a;
}

/* Property Header */
.property-header h2 {
  color: #1f2937;
  font-weight: 700;
  line-height: 1.2;
}

/* Detail Cards */
.detail-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.detail-card:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-1px);
}

.detail-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: #000130;
  border-radius: 0.5rem;
  color: white;
  flex-shrink: 0;
}

.detail-content {
  flex: 1;
}

.detail-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.detail-value {
  font-size: 1.125rem;
  color: #1f2937;
  font-weight: 600;
  line-height: 1.3;
}

/* Section Titles */
.section-title {
  font-size: 1.125rem;
  color: #1f2937;
  font-weight: 700;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
  position: relative;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 3rem;
  height: 2px;
  background: #000130;
}

/* Unit Types */
.unit-types-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.unit-type-badge {
  background: #000130;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Description */
.description-content {
  background: #f8fafc;
  padding: 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  color: #374151;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Landlord Card */
.landlord-card {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1.5rem;
}

.landlord-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.landlord-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  background: #000130;
  border-radius: 50%;
  color: white;
  flex-shrink: 0;
}

.landlord-details {
  flex: 1;
}

.landlord-name {
  font-size: 1.125rem;
  color: #1f2937;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.landlord-contact {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.contact-item svg {
  color: #000130;
}

/* Responsive Design */
@media (max-width: 768px) {
  .detail-card {
    padding: 1rem;
  }

  .detail-icon {
    width: 2.5rem;
    height: 2.5rem;
  }

  .landlord-info {
    flex-direction: column;
    text-align: center;
  }

  .landlord-contact {
    align-items: center;
  }
}

.add-tenants-modal .ant-modal {
  margin-top: 40px !important;
  margin-bottom: 40px !important;
  padding: 0 !important;
}
.add-tenants-modal .ant-modal-content {
  border-radius: 18px;
  background: #fafbfc;
}
.add-tenants-tabs .ant-tabs-nav {
  margin-bottom: 0;
}
.add-tenants-tabs .ant-tabs-tab {
  width: 50%;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #23234a;
  border-radius: 0;
  background: #f3f4f6;
  margin: 0;
}
.add-tenants-tabs .ant-tabs-tab-active {
  background: #23234a !important;
  color: #fff !important;
}
.add-tenants-tabs .ant-tabs-ink-bar {
  display: none;
}
.add-tenants-tabs .ant-tabs-nav-list {
  width: 100%;
  display: flex;
}
.add-tenants-tabs .ant-tabs-tab {
  flex: 1;
}
.add-tenants-modal-header {
  display: flex;
  align-items: center;
  position: relative;
  padding: 24px 24px 12px 24px;
  border-bottom: 1px solid #e5e7eb;
}
.add-tenants-modal-header .back-btn {
  padding: 0 8px 0 0;
  min-width: 0;
  display: flex;
  align-items: center;
  font-size: 1rem;
}
.add-tenants-modal-header .modal-title {
  flex: 1;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  font-family: "SF Compact Text";
  color: #23234a;
  margin-right: 32px;
}
.add-tenants-tabs.tab-gap .ant-tabs-tab + .ant-tabs-tab {
  margin-left: 20px !important;
}
.add-tenants-modal .ant-modal-body {
  max-height: 70vh;
  overflow-y: auto;
  padding-bottom: 0;
}
:deep(.ant-tabs-nav) {
  /* border: 1px solid #d9d9d9; */
  /* border-radius: 8px; */
  padding: 8px;
}
</style>
