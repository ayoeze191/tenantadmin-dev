<template>
  <div class="bg-neutral py-[50px] px-6 w-full">
    <a-typography-title
      class="font-sf m-0 p-0"
      :style="{ color: '#404164', fontFamily: 'SF Compact Text' }"
      :level="3"
    >
      ADD PROPERTIES
    </a-typography-title>

    <div v-if="loading" class="flex items-center justify-center min-h-[300px]">
      <a-spin size="large" />
    </div>

    <div
      v-else-if="error"
      class="flex items-center justify-center min-h-[300px]"
    >
      <a-result status="404" :title="'Not Found'" :sub-title="error" />
    </div>

    <div v-else class="max-w-[85rem] flex flex-col pb-8 mt-[13px]">
      <!-- Stepper -->
      <a-steps :current="currentStep" class="max-w-[529px] mb-8">
        <a-step title="Property Info" />
        <a-step title="Unit Allocation" />
        <a-step title="Unit " />
      </a-steps>

      <!-- Step 1: Property Info -->
      <div class="flex w-full gap-[22px]">
        <div class="w-[60%] min-w-[600px]">
          <div v-if="currentStep === 0" class="bg-white p-6 rounded-xl">
            <a-form
              :model="form"
              :rules="rules"
              ref="propertyFormRef"
              layout="vertical"
            >
              <!-- <a-form-item label="Select Landlord" name="landlordId" required class="form-labels">
                <a-select
                  v-model:value="form.landlordId"
                  placeholder="Search and select a landlord"
                  size="large"
                  show-search
                  :filter-option="false"
                  :loading="landlordLoading"
                  :options="landlordOptions"
                  @search="onLandlordSearch"
                  @popup-scroll="onLandlordScroll"
                  :field-names="{ label: 'label', value: 'value' }"
                  :not-found-content="
                    landlordLoading ? 'Loading...' : 'No landlords found'
                  "
                >
                  <template #option="{ label, value, data }">
                    <div class="flex flex-col">
                      <span class="font-medium"
                        >{{ data.firstname }} {{ data.lastname }}</span
                      >
                      <span class="text-sm text-gray-500">{{
                        data.emailAddress
                      }}</span>
                      <span class="text-xs text-gray-400"
                        >ID: {{ data.accountRefNumber }}</span
                      >
                    </div>
                  </template>
                  <template #suffixIcon>
                    <a-spin v-if="landlordLoading" size="small" />
                  </template>
                </a-select>
              </a-form-item> -->

              <a-form-item
                label="Property Name"
                name="name"
                required
                class="form-labels"
              >
                <a-input
                  v-model:value="form.name"
                  placeholder="Enter property name"
                  size="large"
                />
              </a-form-item>

              <a-form-item
                label="Property Address"
                name="address"
                required
                class="form-labels"
              >
                <a-input
                  v-model:value="form.address"
                  placeholder="Enter address"
                  size="large"
                />
              </a-form-item>

              <div class="flex gap-4">
                <a-form-item
                  label="Zip Code"
                  name="zipCode"
                  required
                  class="flex-1 form-labels"
                >
                  <a-input
                    v-model:value="form.zipCode"
                    placeholder="Zip code"
                    size="large"
                  />
                </a-form-item>
                <a-form-item
                  label="Province"
                  name="province"
                  required
                  class="flex-1 form-labels"
                >
                  <a-input
                    v-model:value="form.province"
                    placeholder="Province"
                    size="large"
                  />
                </a-form-item>
              </div>

              <a-form-item
                label="Property Type"
                name="propertyType"
                required
                class="form-labels"
              >
                <a-select
                  v-model:value="form.propertyType"
                  placeholder="Select property type"
                  :options="propertyTypeOptions"
                  size="large"
                />
              </a-form-item>

              <a-form-item
                label="Description"
                name="description"
                required
                class="form-labels"
              >
                <a-textarea
                  v-model:value="form.description"
                  placeholder="Description"
                  size="large"
                />
              </a-form-item>

              <a-form-item
                label="Total Number of Units"
                name="units"
                required
                class="form-labels"
              >
                <a-input-number
                  v-model:value="form.units"
                  style="width: 100%"
                  min="1"
                  size="large"
                />
              </a-form-item>
            </a-form>
          </div>

          <!-- Step 2: Unit Allocation -->
          <div v-if="currentStep === 1" class="bg-white p-6 rounded-xl">
            <label class="block text-txt_dark2 text-lg mb-4 font-semibold"
              >Unit Type(s)</label
            >
            <div
              v-for="(type, idx) in unitTypeOptions"
              :key="type.value"
              class="flex items-center justify-between py-2 border-b last:border-b-0"
            >
              <span class="text-txt_dark text-base">{{ type.label }}</span>
              <div class="flex items-center gap-2">
                <a-button
                  size="small"
                  class="border-none text-[#404164]"
                  shape="circle"
                  @click="incrementUnitType(type.value, type.label)"
                  :disabled="disableIncrementButton()"
                  >+</a-button
                >
                <span class="text-gray-700">{{
                   form.unitTypeCounts.find((unit) => unit.unitType == type.value) ? form.unitTypeCounts.find((unit) => unit.unitType == type.value).quantity : 0
                }}</span>
                <a-button
                  size="small"
                  class="border-none text-[#404164]"
                  shape="circle"

                  @click="decrementUnitType(type.value)"
                  >-</a-button
                >
              </div>
            </div>
          </div>

          <!-- Step 3: Unit Info -->
          <div v-if="currentStep === 2">
            <div
              v-if="form.unitTypeCounts.length !== 0"
              class="flex items-center justify-between"
            >
              <div class="flex items-center justify-between">
                <h4 class="text-base font-bold text-gray-900">
                  
                  {{ form.unitTypeCounts[currentUnitTypeIndex].label }}
                </h4>
                <!-- <span class="text-sm text-gray-600">
                  Quantity: {{ form.unitTypeDetails[currentUnitTypeIndex].quantity }}
                </span> -->
              </div>
              <div class="flex items-center gap-2 mb-2">
                <a-button
                  type="text"
                  :disabled="currentUnitTypeIndex === 0"
                  @click="
                    () => currentUnitTypeIndex > 0 && currentUnitTypeIndex--
                  "
                  class="flex items-center gap-1"
                  style="color: #404164"
                >
                  <LeftOutlined style="font-size: 16px" />
                  Previous
                </a-button>
                <span class="text-base text-txt_dark leading-[28px]">
                  <span class="font-semibold underline text-txt_dark">{{
                    currentUnitTypeIndex + 1
                  }}</span>
                  of {{ form.unitTypeCounts.length }}
                </span>
                <a-button
                  type="text"
                  :disabled="
                    currentUnitTypeIndex === form.unitTypeCounts.length - 1
                  "
                  @click="
                    () =>
                      currentUnitTypeIndex < form.unitTypeCounts.length - 1 &&
                      currentUnitTypeIndex++
                  "
                  class="flex items-center gap-1"
                  style="color: #404164"
                >
                  Next
                  <RightOutlined style="font-size: 16px" />
                </a-button>
              </div>
            </div>
            <div class="bg-white px-8 py-[16px] rounded-xl">
              <a-form :model="form" ref="unitInfoFormRef" layout="vertical">
                <div
                  v-if="form.unitTypeCounts.length === 0"
                  class="text-center py-8"
                >
                  <p class="text-gray-500">
                    No unit types selected. Please go back to Step 2 and select
                    unit types.
                  </p>
                </div>

                <div v-else>
                  <!-- Current Unit Type Form -->
                  <div>
                    <div class="flex gap-4">
                      <a-form-item
                        :label="`Rent (per month)`"
                        :name="[
                          'unitTypeCounts',
                          currentUnitTypeIndex,
                          'rentPerMonth',
                        ]"
                        required
                        class="w-full form-labels"
                      >
                        <a-input-number
                          v-model:value="
                            form.unitTypeCounts[currentUnitTypeIndex]
                              .rentPerMonth
                          "
                          style="width: 100%"
                          min="0"
                          size="large"
                          placeholder=""
                        />
                      </a-form-item>

                      <a-form-item
                        :label="`Security Deposit`"
                        :name="[
                          'unitTypeCounts',
                          currentUnitTypeIndex,
                          'securityDeposit',
                        ]"
                        required
                        class="w-full form-labels"
                      >
                        <a-input-number
                          v-model:value="
                            form.unitTypeCounts[currentUnitTypeIndex]
                              .securityDeposit
                          "
                          style="width: 100%"
                          min="0"
                          size="large"
                          placeholder=""
                        />
                      </a-form-item>
                    </div>
                  </div>

                  <a-form-item
                    label="• Add Amenities"
                    name="amenities"
                    class="amenities-form"
                    :label-col="{
                      style: {
                        color: '#808097',
                        fontSize: '20px',
                        fontWeight: '400',
                      },
                    }"
                  >
                    <a-checkbox-group
                      v-model:value="form.unitTypeCounts[currentUnitTypeIndex].propertyAmenities"
                      class="flex flex-col gap-2"
                    >
                      <a-checkbox
                        v-for="option in amenityOptions"
                        :key="option.value"
                        :value="option.value"
                        class="flex items-center gap-2"
                      >
                        <span class="text-[20px] text-[#808097]">{{
                          option.label
                        }}</span>
                      </a-checkbox>
                    </a-checkbox-group>
                  
                  </a-form-item>
                  <p
                    class="flex gap-[20px] items-center cursor-pointer leading-[100%] text-[#C7C7C7]"
                    @click="showAmenitiesModal = true"
                  >
                    <span><PlusOutlined /></span>
                    <p class="text-[#C7C7C7] text-[20px] m-0">Add amenity</p>
                </p>
                 <a-modal
        :visible="showAmenitiesModal"
      :closable="false"
      :bodyStyle="{ padding: '0' }"
        style="padding: 0;"
        :footer="null"
        :width="768"
        wrap-class-name="custom-modal"
      >
       <template #title>
        <div
          class="flex items-center justify-between border-b border-[#C7C7C7] py-[12px]"
        >
          <div
            class="cursor-pointer flex items-center gap-[8px] text-txt_dark m-0 text-[18px] font-medium"
            @click="showAmenitiesModal = false"
          >
            <ArrowLeftOutlined @click="goBack" class="text-[18px] m-0" />
            Back
          </div>
          <span class="text-[2rem] m-0 text-[#404164]">Add Amenities</span>
          <span></span>
        </div>
      </template>
        <a-form
          ref="formRef"
          :model="form"
          :rules="rules"
          layout="vertical"
          @finish="handleSubmit"
          class="mt-[32px] amenitiymodalform"
        >
          <!-- Amenity Name -->
          <a-form-item label="Name" name="name" required class="mb-[32px]">
            <a-input
              v-model:value="form.name"
              placeholder="Amenity"
              size="large"
              class="!rounded-lg "
            />
          </a-form-item>

        

          <!-- Image Upload -->
          <a-form-item label="Image Upload" name="image" required>
            <div class="space-y-4">
              <!-- Image Preview -->
              <!-- <div v-if="imagePreview" class="relative">
                <img
                  :src="imagePreview"
                  alt="Preview"
                  class="w-full h-48 object-cover rounded-lg border border-gray-200"
                />
                <a-button
                  type="text"
                  danger
                  size="small"
                  class="absolute top-2 right-2 bg-white/80 rounded-full"
                  @click="removeImage"
                >
                  <template #icon>
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </template>
                </a-button>
              </div> -->

              <!-- Upload Area -->
              <div
                v-if="!imagePreview"
                class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                @click="triggerFileInput"
                @dragover.prevent
                @drop.prevent="handleDrop"
              >
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  style="display: none"
                  @change="handleFileSelect"
                />
                <div class=" flex justify-center flex-col items-center gap-4">
                 <svg width="51" height="52" viewBox="0 0 51 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M33.5 15.3333H33.5267M1.5 36.6667L14.8333 23.3333C17.308 20.952 20.3587 20.952 22.8333 23.3333L36.1667 36.6667M30.8333 31.3333L33.5 28.6667C35.9747 26.2853 39.0253 26.2853 41.5 28.6667L49.5 36.6667M1.5 10C1.5 7.87827 2.34286 5.84344 3.84315 4.34315C5.34344 2.84286 7.37827 2 9.5 2H41.5C43.6217 2 45.6566 2.84286 47.1569 4.34315C48.6571 5.84344 49.5 7.87827 49.5 10V42C49.5 44.1217 48.6571 46.1566 47.1569 47.6569C45.6566 49.1571 43.6217 50 41.5 50H9.5C7.37827 50 5.34344 49.1571 3.84315 47.6569C2.34286 46.1566 1.5 44.1217 1.5 42V10Z" stroke="#808097" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  <div>
                    <p class="text-sm font-medium text-[#808097]">
                      Upload or drag an image <br/> here
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </a-form-item>
  <!-- Keywords -->
          <a-form-item label="Keywords"  class="form-label text-[#404164] leading-[100%] font-sf mb-8" name="amenitiesKeyWords" required>
            <a-input
              v-model:value="form.amenitiesKeyWords"
              placeholder="e.g., pool, swimming, fitness"
              size="large"
              class="!rounded-lg"
            />
            <template #help>
              <span class="text-xs text-gray-500 "
                >Keywords help in searching and categorizing amenities</span
              >
            </template>
          </a-form-item>
          <!-- Form Actions -->
          <div class="">
            <button
              html-type="submit"
              :loading="submitting"
              class="!bg-primary text-white !border-primary flex items-center w-full justify-center py-3"
            >
              <span v-if="submitting">Saving...</span>
              <span v-else>{{
                isEditing ? "Update Amenity" : "Add Amenity"
              }}</span>
            </button>
          </div>
        </a-form>
      </a-modal>

                  <a-form-item
                    :label="``"
                    :name="[
                      'unitTypeCounts',
                      currentUnitTypeIndex,
                      'unitImages',
                    ]"
                    :validate-status="
                      form.unitTypeCounts[currentUnitTypeIndex].unitImages
                        .length === 0
                        ? 'error'
                        : ''
                    "
                    :help="
                      form.unitTypeCounts[currentUnitTypeIndex].unitImages
                        .length === 0
                        ? 'At least one image is required'
                        : ''
                    "
                    required
                  >
                    <template #label>
                      Unit Images -
                      {{ form.unitTypeCounts[currentUnitTypeIndex].label }}
                      <span style="color: red">*</span>
                    </template>
                    <CustomImageUpload
                      v-model="
                        form.unitTypeCounts[currentUnitTypeIndex].unitImages
                      "
                    />
                  </a-form-item>
                </div>
              </a-form>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex gap-4 mt-4">
            <a-button
              type="primary"
              @click="nextOrSubmit"
              :loading="loading"
              :class="'shadow-md rounded-[4px] flex items-center justify-center w-full text-center h-fit py-[9px] text-base font-medium'"
            >
              {{ currentStep === 2 ? "Save" : "Continue" }}
            </a-button>
          </div>
        </div>
        <div class="w-[40%] min-w-[445px]">
          <a-typography-title class="" :level="4" font-family="Inter">
            Quick Preview
          </a-typography-title>
          <div
            class="bg-white border-[#C7C7C7] border-[1px] w-full py-0 text-left flex flex-col gap-2 rounded-xl"
          >
            <div class="">
              <a-image
                v-if="getPreviewImageFromUnitTypes()"
                :src="getPreviewImageFromUnitTypes()"
                width="100%"
                style="border-radius: 8px; object-fit: cover; height: 216px"
              />
              <div
                v-else
                class="w-full h-[216px] bg-gray-200 rounded-t-lg flex items-center justify-center text-gray-400"
              >
                No Image
              </div>
            </div>
            <div
              class="flex justify-between items-center px-[10px] text-[12px] text-[#808097] font-medium"
            >
              <span class="flex gap-2.5 leading-[25px]"
                ><CheckOutlined v-if="form.name" />
                <CloseOutlined v-else />Property Name</span
              >
              <p class="text-[#808097] m-0">
                {{ form.name || "Not Set" }}
              </p>
            </div>
            <div
              class="flex justify-between items-center px-[10px] text-[12px] text-[#808097] font-medium"
            >
              <span class="flex gap-2.5 leading-[25px]"
                ><CheckOutlined v-if="form.address" />
                <CloseOutlined v-else />Property Address</span
              >
              <p class="text-[#808097] m-0">
                {{ form.address || "Not Set" }}
              </p>
            </div>
            <div
              class="flex justify-between items-center px-[10px] text-[12px] text-[#808097] font-medium"
            >
              <span class="flex gap-2.5 leading-[25px]"
                ><CheckOutlined v-if="form.zipCode" />
                <CloseOutlined v-else />Zip Code</span
              >
              <p class="text-[#808097] m-0">
                {{ form.zipCode || "Not Set" }}
              </p>
            </div>
            <div
              class="flex justify-between items-center px-[10px] text-[12px] text-[#808097] font-medium"
            >
              <span class="flex gap-2.5 leading-[25px]"
                ><CheckOutlined v-if="form.province" />
                <CloseOutlined v-else />Province</span
              >
              <p class="text-[#808097] m-0">
                {{ form.province || "Not Set" }}
              </p>
            </div>

            <div
              class="flex justify-between items-center px-[10px] text-[12px] text-[#808097] font-medium"
            >
              <span class="flex gap-2.5 leading-[25px] font-medium"
                ><CheckOutlined v-if="form.propertyType !== null" />
                <CloseOutlined v-else />Property Type</span
              >
              {{ console.log(form.propertyType) }}
              <p class="text-[#808097] m-0">
                {{ form.propertyType !== null ? PROPERTY_TYPE_ENUM.find((prop) => prop.value == form.propertyType).label:  "Not Set" }}
              </p>
            </div>
            <div
              class="flex justify-between items-center px-[10px] text-[12px] text-[#808097] font-medium"
            >
              <span class="flex gap-2.5 leading-[25px] font-medium"
                ><CheckOutlined v-if="form.units" />
                <CloseOutlined v-else />Total Number of Units</span
              >
              <p class="text-[#808097] m-0">
                {{ form.units || "Not Set" }}
              </p>
            </div>

            <div
              class="flex justify-between items-center px-[10px] text-[12px] text-[#808097] font-medium"
            >
              <span class="flex gap-2.5 leading-[25px] font-medium"
                ><CheckOutlined v-if="form.unitTypeCounts.length > 0" />
                <CloseOutlined v-else />Unit Type (s)</span
              >
              <p class="text-[#808097] m-0">
                {{
                  form.unitTypeCounts
                    .map((detail) => detail.label)
                    .join(", ") || "Not Set"
                }}
              </p>
              {{ console.log(store.userProfile) }}
            </div>
            <div class="px-[8px]">
              <a-button
                type="primary"
                @click="nextOrSubmit"
                :disabled="
                  !form.name ||
                  !form.address ||
                  !form.zipCode ||
                  !form.province ||
                  !form.propertyType ||
                  !form.units ||
                  form.unitTypeCounts.length === 0
                "
                shape=""
                :class="[
                  'shadow-md rounded-[4px] flex items-center justify-center w-full text-center h-fit py-[9px] text-base font-medium  mb-[12px]',
                ]"
                :style="{ color: 'white' }"
              >
                View Details
              </a-button>
            </div>

            <!-- <div class="flex gap-2">
            <span>💰</span>
            <p class="text-txt_dark text-sm leading-4">
              {{ form.unitTypeDetails.length > 0 ? formatPrice(form.unitTypeDetails[0].rentPerMonth) : (form.rent ? formatPrice(form.rent) : 'Rent') }}
            </p>
                    </div> -->
            <!-- <div class="flex gap-2">
            <span>🛏️</span>
            <p class="text-txt_dark text-sm leading-4">
              {{ getUnitTypeSummary() }}
            </p>
                    </div> -->
            <!-- <div class="flex gap-2">
            <span>⭐</span>
            <p
              class="text-txt_dark text-sm leading-4"
              v-html="getAmenitiesPreview()"
            ></p>
                </div>
          --></div>

          <a-button
            class="mt-[13px] w-full flex items-start gap-2 text-[#1A7D36] h-fit border-[#29C354] border-[0.5px] rounded-[6px] px-[4px] font-medium text-[13px] leading-4"
          >
            <span class="text-[#1A7D36]"><InfoCircleOutlined /></span>
            <span>
              This is a preview for how your property looks when it is published
            </span>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CreateNewProperty, FetchLandlords } from "@/api/properties";
import { useUserStore } from "@/store";
import { useOptionsStore } from "@/stores/options";
import { uploadImages } from "@/utils/helper";
import {
  CheckOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { openDB } from "idb";
import {
  defineComponent,
  h,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";

// 1. Define the enum array at the top of the script
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
const PROPERTY_TYPE_ENUM = [
  { label: "Single Unit", value: 0 },
  { label: "Multi Unit", value: 1 },
]
const showAmenitiesModal = ref(false)
// 2. Use this for unitTypeOptions
const unitTypeOptions = ref(UNIT_TYPE_ENUM);

// Use the same enum for propertyTypeOptions
const propertyTypeOptions = ref(PROPERTY_TYPE_ENUM);

const amenityOptions = ref([]);
const landlordOptions = ref([]);
const landlordLoading = ref(false);
const landlordSearchValue = ref("");
const landlordCurrentPage = ref(1);
const landlordTotalItems = ref(0);

const currentStep = ref(0);
const loading = ref(false);
const error = ref(null);
const currentUnitTypeIndex = ref(0);

const form = reactive({
  landlordId: null,
  name: "",
  address: "",
  zipCode: "",
  province: "",
  propertyType: null,
  description: "",
  units: null,
  unitTypeCounts: [],
  unitTypeDetails: [], // New array to store details for each unit type
  images: [],
  amenities: [],
});

const router = useRouter();
const route = useRoute();
const store = useUserStore();
const optionsStore = useOptionsStore();

onMounted(async () => {
  await optionsStore.fetchAmenities();
  // await optionsStore.fetchUnitTypes(); // Removed as per edit hint
  await fetchLandlords();

  amenityOptions.value = optionsStore.amenities.map((a) => ({
    label: a.name,
    value: a.amenityId,
    image: a.image || a.icon || null,
  }));
  // unitTypeOptions.value = optionsStore.unitTypes.map((u) => ({ // Removed as per edit hint
  //   label: u,
  //   value: u,
  // }));
  // propertyTypeOptions.value = optionsStore.unitTypes.map((u) => ({ // Removed as per edit hint
  //   label: u,
  //   value: u,
  // }));
  form.unitTypeCounts = Array(optionsStore.unitTypes.length).fill(0);

  // EDIT MODE: If route has id, fetch property from IndexedDB
  const id = route.params.id;
  if (id) {
    loading.value = true;
    try {
      const db = await openDB("properties-db", 1);
      const data = await db.get("properties", Number(id));
      if (!data) {
        error.value = "Property not found.";
      } else {
        // Map data to form fields
        form.name = data.name || "";
        form.address = data.address || "";
        form.zipCode = data.zipCode || "";
        form.province = data.province || "";
        form.propertyType = data.propertyType || "";
        form.description = data.description || "";
        form.units = data.units || null;
        form.unitTypeCounts = Array(optionsStore.unitTypes.length).fill(0); // You may want to map this if you use unitTypeCounts
        form.rent = data.minimumRent || data.rent || null;
        form.securityDeposit = data.securityDeposit || null;
        // Ensure images have .url property for preview logic
        form.images = (data.images || []).map((img) =>
          img.url ? img : { ...img, url: img.image }
        );
        fileList.value = (data.images || []).map((img) =>
          img.url ? img : { ...img, url: img.image }
        );
        form.amenities = data.amenities || [];
        // If you have more fields, map them here
      }
    } catch (e) {
      error.value = "Failed to load property details.";
    } finally {
      loading.value = false;
    }
  }
});

const rules = {
  landlordId: [{ required: true, message: "Landlord is required" }],
  name: [{ required: true, message: "Property name is required" }],
  address: [{ required: true, message: "Address is required" }],
  zipCode: [{ required: true, message: "Zip code is required" }],
  province: [{ required: true, message: "Province is required" }],
  propertyType: [{ required: true, message: "Property type is required" }],
  description: [{ required: true, message: "Description is required" }],
  units: [{ required: true, message: "Total number of units is required" }],
  images: [{ required: true, message: "At least one image is required" }],
};

const fileList = ref([]);
const uploadedImageUrls = ref([]); // Cache for uploaded image URLs

// Landlord functions
const fetchLandlords = async (searchName = "", page = 1) => {
  landlordLoading.value = true;
  try {
    const response = await FetchLandlords({
      name: searchName,
      currentPage: page,
      pageSize: 10,
    });

    if (response && response.accountList) {
      const landlords = response.accountList.items.map((landlord) => ({
        label: `${landlord.firstname} ${landlord.lastname} (${landlord.emailAddress})`,
        value: landlord.accountId,
        data: landlord,
      }));

      if (page === 1) {
        landlordOptions.value = landlords;
      } else {
        landlordOptions.value = [...landlordOptions.value, ...landlords];
      }

      landlordTotalItems.value = response.accountList.totalItemCount;
      landlordCurrentPage.value = page;
    }
  } catch (error) {
    console.error("Error fetching landlords:", error);
  } finally {
    landlordLoading.value = false;
  }
};

const onLandlordSearch = (value) => {
  landlordSearchValue.value = value;
  landlordCurrentPage.value = 1;
  fetchLandlords(value, 1);
};

const onLandlordScroll = (e) => {
  const { target } = e;
  if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
    // Reached bottom, load more
    if (
      landlordOptions.value.length < landlordTotalItems.value &&
      !landlordLoading.value
    ) {
      fetchLandlords(landlordSearchValue.value, landlordCurrentPage.value + 1);
    }
  }
};

// Update initializeUnitTypeDetails
const initializeUnitTypeDetails = () => {
  form.unitTypeCounts = unitTypeOptions.value
    .map((type, idx) => {
      const count = form.unitTypeCounts[idx] || 0;
      if (count > 0) {
        return {
          unitType: type.value, // enum id
          value: type.value, // enum id (for clarity)
          label: type.label,
          quantity: count,
          rentPerMonth: null,
          securityDeposit: null,
          unitImages: [],
        };
      }
      return null;
    })
    .filter(Boolean);
};

const CustomImageUpload = defineComponent({
  name: "CustomImageUpload",
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const previewVisible = ref(false);
    const previewIndex = ref(0);
    const dragActive = ref(false);

    function handleFiles(files) {
      let newFiles = Array.from(files).slice(0, 5 - props.modelValue.length);
      const fileObjs = newFiles
        .map((file) => {
          // If already in list, skip
          if (
            props.modelValue.some(
              (f) => f.name === file.name && f.size === file.size
            )
          )
            return null;
          return file;
        })
        .filter(Boolean);
      emit("update:modelValue", [...props.modelValue, ...fileObjs]);
    }
    function onInputChange(e) {
      handleFiles(e.target.files);
      e.target.value = null;
    }
    function onDrop(e) {
      e.preventDefault();
      dragActive.value = false;
      handleFiles(e.dataTransfer.files);
    }
    function onDragOver(e) {
      e.preventDefault();
      dragActive.value = true;
    }
    function onDragLeave(e) {
      e.preventDefault();
      dragActive.value = false;
    }
    function removeImage(idx) {
      const newArr = props.modelValue.slice();
      newArr.splice(idx, 1);
      emit("update:modelValue", newArr);
    }
    function openPreview(idx) {
      previewIndex.value = idx;
      previewVisible.value = true;
      nextTick(() => {
        // Ant Design's a-image-preview-group will handle modal
      });
    }
    return () =>
      h("div", [
        h(
          "div",
          {
            class: [
              // "border",
              // "border-dashed",
              "rounded-lg",
              "p-4",
              "mb-4",
              "flex",
              "flex-wrap",
              "gap-4",
              dragActive.value ? "border-primary" : "border-br4",
              "bg-white",
              "justify-start",
            ],
            style: {
              minHeight: "120px",
              cursor: "pointer",
              position: "relative",
            },
            onDrop,
            onDragover: onDragOver,
            onDragleave: onDragLeave,
          },
          [
            // Thumbnails
            ...props.modelValue.map((file, idx) =>
              h(
                "div",
                {
                  class:
                    "relative w-[120px] h-[120px] rounded-lg overflow-hidden group",
                  style: { border: "1px solid #eee", background: "#fafafa" },
                  key: idx,
                },
                [
                  h("img", {
                    src:
                      file instanceof File
                        ? URL.createObjectURL(file)
                        : file.originFileObj
                        ? URL.createObjectURL(file.originFileObj)
                        : file.thumbUrl || file.url || "",
                    class:
                      "w-full h-full object-cover rounded-lg cursor-pointer",
                    alt: "preview",
                    onClick: () => openPreview(idx),
                  }),
                  h(
                    "div",
                    {
                      class:
                        "absolute top-1 right-1 bg-white/80 rounded-full p-1 cursor-pointer z-10",
                      onClick: () => removeImage(idx),
                      title: "Remove",
                    },
                    [
                      h(
                        "svg",
                        {
                          width: 18,
                          height: 18,
                          fill: "none",
                          viewBox: "0 0 18 18",
                        },
                        [
                          h("circle", {
                            cx: 9,
                            cy: 9,
                            r: 8,
                            fill: "#808097",
                            stroke: "white",
                          }),
                          h("path", {
                            d: "M12 6L6 12M6 6l6 6",
                            stroke: "white",
                            "stroke-width": 1.5,
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                          }),
                        ]
                      ),
                    ]
                  ),
                ]
              )
            ),
            // Upload button
            props.modelValue.length < 5 &&
              h(
                "label",
                {
                  class:
                    "flex flex-col items-center justify-center w-[120px] h-[120px] border border-dashed border-br4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100",
                  style: { position: "relative" },
                },
                [
                  h("input", {
                    type: "file",
                    multiple: true,
                    accept: "image/png,image/jpeg,image/jpg",
                    class: "absolute inset-0 opacity-0 cursor-pointer",
                    onChange: onInputChange,
                    style: { width: "100%", height: "100%" },
                  }),
                  h(
                    "svg",
                    {
                      width: 32,
                      height: 32,
                      fill: "none",
                      viewBox: "0 0 32 32",
                    },
                    [
                      h("path", {
                        d: "M16 8v16M8 16h16",
                        stroke: "#808097",
                        "stroke-width": 2,
                        "stroke-linecap": "round",
                      }),
                    ]
                  ),
                  h(
                    "span",
                    { class: "text-xs text-secondary mt-2 text-center" },
                    "Upload or drag an image here"
                  ),
                ]
              ),
          ]
        ),
        // Preview modal
        h(
          "a-image-preview-group",
          {
            preview: {
              visible: previewVisible.value,
              current: previewIndex.value,
              onVisibleChange: (v) => (previewVisible.value = v),
            },
          },
          props.modelValue.map((file, idx) =>
            h("a-image", {
              key: idx,
              src:
                file instanceof File
                  ? URL.createObjectURL(file)
                  : file.originFileObj
                  ? URL.createObjectURL(file.originFileObj)
                  : file.thumbUrl || file.url || "",
              style: { display: "none" },
            })
          )
        ),
      ]);
  },
});

// Add this utility function
function formatPrice(val) {
  if (val === undefined || val === null || val === "") return "-";
  return "₦" + Number(val).toLocaleString();
}


function getAmenitiesPreview() {
  if (!form.amenities || form.amenities.length === 0) return "Amenities";
  // Map selected IDs to names and images
  return form.amenities
    .map((aid) => {
      const found = amenityOptions.value.find(
        (opt) => opt.value === (aid.value || aid)
      );
      if (found && found.image) {
        return `<span style='display:inline-flex;align-items:center;gap:4px;'><img src='${found.image}' style='width:18px;height:18px;object-fit:cover;border-radius:4px;margin-right:2px;'/>${found.label}</span>`;
      }
      return found ? found.label : aid.label || aid;
    })
    .join(", ");
}

function renderAmenityTag({ label, value, closable, onClose }) {
  const opt = amenityOptions.value.find((o) => o.value === value);
  return h(
    "span",
    {
      class: "flex items-center gap-1 px-2 py-1 bg-gray-100 rounded",
      style: "margin-right:4px;",
    },
    [
      opt && opt.image
        ? h("img", {
            src: opt.image,
            style:
              "width:16px;height:16px;object-fit:cover;border-radius:3px;margin-right:2px;",
          })
        : null,
      h("span", {}, label),
      closable
        ? h("span", { class: "ml-1 cursor-pointer", onClick: onClose }, "×")
        : null,
    ]
  );
}

// Sync fileList with form.images for validation
watch(fileList, (newVal) => {
  form.images = newVal;
});

// Update getPreviewImageFromUnitTypes to find the first available image from any unit type
function getPreviewImageFromUnitTypes() {
  const currentImage = form.unitTypeCounts[currentUnitTypeIndex.value] ? form.unitTypeCounts[currentUnitTypeIndex.value].unitImages[0] : null
  if(currentImage !== null){
    console.log(currentImage)
 return (
    currentImage instanceof File ? URL.createObjectURL(currentImage): null
  )
  }
 
  // for (const unit of form.unitTypeCounts) {
  //   if (unit.unitImages && unit.unitImages.length > 0) {
  //     const img = unit.unitImages[currentUnitTypeIndex.value] || ""
  //     console.log(img)
  //     return (
  //       img.url ||
  //       img.image ||
  //       img.thumbUrl ||
  //       (img instanceof File ? URL.createObjectURL(img) : null)
  //     );
  //   }
  // }
  return null;
}

const nextOrSubmit = async () => {
  if (currentStep.value === 0) {
    // Validate Step 1 form
    const propertyForm = propertyFormRef.value;
    try {
      await propertyForm.validate();
      currentStep.value++;
    } catch (err) {
      return;
    }
  } else if (currentStep.value === 1) {
    // Initialize unit type details for Step 3
    initializeUnitTypeDetails();
    currentStep.value++;
  } else if (currentStep.value === 2) {
    // EDIT MODE: If editing, show loader for 1.5s then show message
    if (route.params.id) {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        message.info("Edit functionality is not available yet.");
      }, 1500);
      return;
    }
    // Validate Step 3 form (unitInfoFormRef)
    const unitInfoForm = unitInfoFormRef.value;
    try {
      await unitInfoForm.validate();
    } catch (err) {
      console.error("Validation error:", err);
      return;
    }
    // Check if all unit types have images
    const hasAllImages = form.unitTypeDetails.every(
      (unitDetail) => unitDetail.unitImages && unitDetail.unitImages.length > 0
    );
    if (!hasAllImages) {
      message.error("Please upload at least one image for each unit type.");
      return;
    }
    loading.value = true;
    try {
      // Upload images for each unit type
      for (const unitDetail of form.unitTypeCounts) {
        // Only upload if not already uploaded (no .url or .image string)
        const filesToUpload = unitDetail.unitImages.filter(
          (img) => img instanceof File || img.originFileObj
        );
        if (filesToUpload.length > 0) {
          const uploadedUrls = await uploadImages(filesToUpload);
          let uploadIdx = 0;
          unitDetail.unitImages = unitDetail.unitImages.map((img) => {
            if (img instanceof File || img.originFileObj) {
              const image = uploadedUrls[uploadIdx++];
              return { image, imageTitle: img.name || "Image", isMain: false };
            }
            // Already uploaded
            return img;
          });
          // Mark the first image as main
          if (unitDetail.unitImages.length > 0) {
            unitDetail.unitImages[0].isMain = true;
          }
        }
      }
      // Build payload according to new API specification
      const payload = {
        landlordId: store.userProfile.adminUserID,
        // landLordId: form.landlordId,
        name: form.name,
        description: form.description,
        address: form.address,
        zipCode: form.zipCode,
        province: form.province,
        totalUnits: form.units,
        propertyTypee: PROPERTY_TYPE_ENUM.find((prop) => form.propertyType == prop.value).label, // Note: API has typo 'propertyTypee'
        unitTypes: [...form.unitTypeCounts]
      };
      // console.log("Payload to CreateNewProperty:", payload);
      console.log(payload)
      // if (!payload.landLordId) {
      //   message.error("Please select a landlord.");
      //   loading.value = false;
      //   return;
      // }
      // const res = await CreateNewProperty(payload);
      // console.log("CreateNewProperty API response:", res);
      // if (res) {
      //   message.success("Property Added Successfully!");
      //   router.push("/properties");
      // } else if (res && (res.success || res.status === 200)) {
      //   // Fallback: if API returns a different success indicator
      //   message.success("Property Added Successfully!");
      //   router.push("/properties");
      // } else {
      //   message.error(res?.responseMessage || "Failed to add property");
      // }
    } catch (err) {
      message.error("An error occurred while saving the property.");
    } finally {
      loading.value = false;
    }
  }
};

const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--;
};

// Add refs for forms
const propertyFormRef = ref();
const unitFormRef = ref();
const unitInfoFormRef = ref();

const getPreviewImage = (file) => {
  if (file instanceof File) {
    return URL.createObjectURL(file);
  }
  if (file.originFileObj) {
    return URL.createObjectURL(file.originFileObj);
  }
  // Support both .url and .image for edit mode
  return file.url || file.image || file.thumbUrl;
};
function disableIncrementButton() {
  const totalnumberofrooms = form.unitTypeCounts.reduce((acc, curr) => acc + curr.quantity,0)
  console.log(totalnumberofrooms, 'totalnumberofrooms')
  if(totalnumberofrooms == form.units){
    return true
  }
  else{
    return false
  }
}
function incrementUnitType(idx, label='') {
  // check if it exist before
  const check = form.unitTypeCounts.find((unit) => unit.unitType == idx)
  if(check !== undefined){
    form.unitTypeCounts = form.unitTypeCounts.map((unit) => unit.unitType == idx ? {...unit, quantity:unit.quantity + 1 }: {...unit} )
  }
  else{
    form.unitTypeCounts.push({unitType: idx, quantity:1, label, securityDeposit: 0, rentPerMonth: 0, unitImages:[], propertyAmenities:[]})
  }
}
function decrementUnitType(idx) {
  const unitIndex = form.unitTypeCounts.findIndex((unit) => unit.unitType == idx);
  if (unitIndex !== -1) {
    if (form.unitTypeCounts[unitIndex].quantity > 1) {
      form.unitTypeCounts = form.unitTypeCounts.map((unit, i) =>
        i === unitIndex
          ? { ...unit, quantity: unit.quantity - 1 }
          : { ...unit }
      );
    } else {
      // Remove the unit type if numberofrooms becomes 0
      form.unitTypeCounts.splice(unitIndex, 1);
    }
  }
}
</script>

<style scoped>
.bg-neutral {
  background: #f7f8fa;
}
.text-primary {
  color: #1d3557;
}
.text-txt_dark {
  color: #404164;
}
.text-tgr {
  color: #496580;
}
.bg-bg2 {
  background: #f0f2f5;
}
/* :deep(.ant-steps-item-icon) {
  background: none !important;
  border: 1px solid !important;
} */
:deep(.ant-steps-item-finish .ant-steps-item-icon) {
  background-color: #000130 !important;
}
:deep(.ant-steps-item-finish .ant-steps-item-icon) {
  background-color: #000130 !important;
}
:deep(.ant-steps-item-finish .ant-steps-item-icon span) {
  color: #fff !important;
}
.ant-steps-item-wait .ant-steps-item-title {
  /* color: red !important; */
}
:deep(.ant-steps-item-wait .ant-steps-item-icon) {
  background-color: #f0f2f5 !important;
  border: 1px solid #c7c7c7 !important;

  /* color: red !important; */
}
:deep(.ant-steps-item-wait .ant-steps-item-icon span) {
  color: #c7c7c7 !important;
}
/*  */

/* Scoped: use :deep to penetrate shadow DOM */
:deep(.ant-checkbox-inner) {
  width: 22px;
  height: 22px;
  border-radius: 2px;
  border: 1px solid #213595;
}

/* When checked */
:deep(.ant-checkbox-checked .ant-checkbox-inner) {
  /* background-color: #29C354; */
  border-color: #213595;
}

/* Optional: Checkmark color (it's a pseudo-element) */
:deep(.ant-checkbox-checked .ant-checkbox-inner::after) {
  border-color: white;
}
:deep(.amenities-form .ant-form-item-label > label) {
  color: #808097;
  font-size: 20px;
  font-weight: 400;
}
:deep(.form-labels .ant-form-item-label > label) {
  color: #404164;
  font-weight: 350;
  line-height: 100%;
  font-size: 16px;
  font-family: "SF Compact Text";
}

:deep(.amenitiymodalform .ant-form-label > label){
  color: #404164;
  font-size: 1rem;
   line-height: 100%;
}
:deep(.ant-steps-item-icon) {
  height: 24px;
  width: 24px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
:deep(.ant-steps-item-container) {
  display: flex;
  align-items: center;
}
:deep(.ant-steps-item-title) {
  font-size: 18px;
  font-weight: 500;
  color: #404164 !important;
}
:deep(.ant-modal) :deep(.ant-modal-content) {
  padding: 0 !important;
}
:deep(.custom-modal .ant-modal-content) {
  padding: 0 !important;
}
.custom-modal{
  padding: 0 !important;
}
:deep(.ant-modal-body) {
  padding: 0 !important;
}


.custom-modal .ant-modal-content {
  padding: 0 !important;
    background-color: red; /* test only */
}
.custom-modal .ant-modal-body {
  padding: 0 !important;
}
</style>
<!-- <div class="flex gap-2">
            <span>💰</span>
            <p class="text-txt_dark text-sm leading-4">
              {{ form.unitTypeDetails.length > 0 ? formatPrice(form.unitTypeDetails[0].rentPerMonth) : (form.rent ? formatPrice(form.rent) : 'Rent') }}
            </p>
                    </div> -->
<!-- <div class="flex gap-2">
            <span>🛏️</span>
            <p class="text-txt_dark text-sm leading-4">
              {{ getUnitTypeSummary() }}
            </p>
                    </div> -->
<!-- <div class="flex gap-2">
            <span>⭐</span>
            <p
              class="text-txt_dark text-sm leading-4"
              v-html="getAmenitiesPreview()"
            ></p>
                </div>
          -->
<!-- passs string for prperty types -->