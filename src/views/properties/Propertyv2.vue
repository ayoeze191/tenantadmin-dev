<template>
  <div
    class="w-full h-full border-2 border-gray rounded-xl box-border flex flex-col"
  >
    <div class="flex items-center border-b-2">
      <table-header :total-item-count="totalItemCount" title="All Properties">
        <div class="flex justify-between w-full items-center">
          <a-input
            v-model:value="searchQuery"
            placeholder="Search"
            class="py-[9px] border-[#D0D5DD] mr-[10px] border-[1px] rounded-[8px] max-w-[338px] w-[20vw] min-w-[100px] border-solid"
          >
            <template #prefix>
              <SearchOutlined class="text-[#BEC1C6] text-[20px]" />
            </template>
          </a-input>
          <div class="flex justify-between gap-[14px]">
            <DropdownButton
              :icon="'grid'"
              :label="selectedDisplayType"
              @select="handleDisplayTypeSelect"
              :options="[
                { label: 'Grid', value: 'Grid' },
                { label: 'List', value: 'List' },
              ]"
            />
            <Button class="flex gap-2.5" @click="showModal"
              ><span class="font-semibold">+</span> Add property</Button
            >
          </div>
        </div>
      </table-header>
    </div>
    <div
      v-if="totalItemCount == 0"
      class="h-[100%] text-primary flex flex-col justify-center items-center"
    >
      <IconProperties />
      <div>
        <p>You have no Properties</p>
        <p class="text-gray-400">There's nothing to view</p>
      </div>
      <Button class="flex gap-1.5" @click="showModal"
        ><span class="font-semibold">+</span> Add property</Button
      >
    </div>
    <div v-else>
      <div
        class="px-2.5 mt-2 gap-4 grid grid-cols-4 mb-4"
        v-if="selectedDisplayType == 'Grid'"
      >
        <applicationCard
          v-for="value in computedData"
          :app="value"
          @showModal="() => showModal(value)"
        />
      </div>
      <table-component
        v-if="selectedDisplayType == 'List'"
        :title="'applications'"
        :columns="headers"
        :data-source="computedData"
      >
        <template #action="{ record }">
          <button
            class="bg-inherit text-black cursor-pointer"
            @click="() => showModal(record)"
          >
            View Details
          </button>
        </template>
        <template #status="{ record }">
          <div class="flex justify-center">
            <button
              :class="{
                'bg-[#FEF9C3] border-[#854D0F] border-solid border-[0.5px] text-[#854D0F]':
                  record.status == 'AwaitingAdditionalDocuments',
                'bg-[#F3E8FF] text-[#6D24A9] border-[#6D24A9] border-solid border-[1px] ':
                  record.status == 'MoveInDateLandlordConfirmationPending' ||
                  record.status == 'ConfirmingMove-inDate',
                'bg-[#FEF9C3] border-solid  border-[1px] text-[#1D40AE] border-[#1D40AE]':
                  record.status == 'AwaitingReview',
                'bg-red-700 text-red-300 border-red-300 border-solid border-[1px]':
                  record.status == 'Failed',
                'bg-[#DCFCE7] text-[#166434] border-[#166434] border-solid border-[1px] z-50 left-[30%]':
                  record.status == 'Completed',
                'bg-[#FEF9C3] text-[#854D0F] border-solid border-[1px] border-[#854D0F] z- left-[20%]':
                  record.status == 'AwaitingPayment',
              }"
              class="px-3 py-1 rounded-[8px] text-[12px] font-medium"
            >
              {{ record.status }}
            </button>
          </div>
        </template>
      </table-component>
    </div>

    <div class="border-t border-solid">
      <BasePagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        :total="totalItemCount"
        :pageSize="pageSize"
        @prev="onPrev"
        @next="onNext"
        @change="onPageChange"
      />
    </div>
    <a-modal
      width="fit-content"
      height="80vh"
      :footer="null"
      :closable="false"
      :centered="true"
      v-model:visible="modalVisible"
    >
      <template #title>
        <div class="flex items-center justify-between">
          <div>
            <span class="font-redwing text-[24px] font-medium text-[]">
              {{ ModalTitles[stage].title }}
            </span>
            <p
              class="text-[#00000099] leading-[21px] font-inter font-[400] text-[14px] p-0 m-0"
            >
              {{ ModalTitles[stage].sub_title }}
            </p>
          </div>
          <span></span>
          <button @click="showModal">
            <CloseOutlined />
          </button>
        </div>
      </template>
      <div class="flex gap-4">
        <div class="m-0 p-0" v-if="stage == 0">
          <div class="mt-[24px] w-full">
            <a-radio-group
              v-model:value="form.rental_unit"
              class="grid grid-cols-2 w-full gap-4"
            >
              <a-radio
                v-for="value in propertyTypes"
                :value="value.value"
                :class="[
                  'rounded-[12px]  w-[200px] relative border-[1px] border-solid flex',
                  form.rental_unit === value.value
                    ? '!border-[#000130]'
                    : '!border-[#E5E6EA]',
                ]"
              >
                <div class="flex p-4 items-center gap-[10px] justify-center">
                  <div
                    class=""
                    :class="[
                      'border-[1px] border-solid w-[20px] h-[20px] rounded-full',
                      form.rental_unit === value.value
                        ? 'border-[#000130] '
                        : 'border-[#E5E6EA] border-solid border-[1px]',
                    ]"
                  ></div>
                  <div class="text-[#000130] text-[14px] m-0 p-0">
                    {{ value.title }}
                  </div>
                </div>
              </a-radio>
            </a-radio-group>
          </div>
        </div>
        <a-form v-if="stage == 1" class="w-[365px]">
          <p
            class="text-[#000000] font-[500] leading-[20px] font-redwing text-[14px]"
          >
            BASIC INFO
          </p>
          <div class="mt-4">
            <a-form-item name="name" class="custom-form-item">
              <a-input
                v-model:value="form.name"
                placeholder="Property Name"
                size="large"
              />
            </a-form-item>

            <a-form-item name="Address" class="custom-form-item">
              <a-input
                v-model:value="form.address"
                placeholder="Property Address"
                size="large"
              />
            </a-form-item>

            <a-form-item name="name" class="custom-form-item">
              <a-select
                ref="select"
                v-model:value="form.province"
                placeholder="Select Province"
                class="w-full"
                @focus="focus"
                @change="handleChange"
                :getPopupContainer="(node) => node.parentNode"
              >
                <a-select-option
                  v-for="prov in allProvinces"
                  :value="prov.provinceId"
                  >{{ prov.name }}</a-select-option
                >
              </a-select>
            </a-form-item>
            <div class="flex p-0 m-0 gap-[12px] items-center">
              <div class="w-full m-0">
                <a-select
                  ref="select"
                  v-model:value="form.city"
                  placeholder="Select City"
                  class="m-0 w-full"
                  @focus="focus"
                  @change="handleChange"
                  :getPopupContainer="(node) => node.parentNode"
                >
                  <a-select-option
                    v-for="city in allProvinces.find(
                      (prov) => prov.provinceId === form.province
                    )?.cities || []"
                    :key="city.id"
                    :value="city.name"
                  >
                    {{ city.name }}
                  </a-select-option>
                </a-select>
              </div>
              <a-form-item name="postalcode" class="custom-form-item w-full">
                <a-input
                  v-model:value="form.zipCode"
                  placeholder="Postal Code"
                  size="large"
                />
              </a-form-item>
            </div>
          </div>
        </a-form>
        <a-form v-if="stage == 2" class="w-[356px]">
          <p
            class="text-[#000000] font-[500] leading-[20px] font-redwing text-[14px]"
          >
            PROPERTY INFO
          </p>
          <div class="mt-4">
            <a-form-item name="name" class="custom-form-item">
              <a-input
                :disabled="true"
                class="disabled:text-[grey]"
                v-model:value="form.rental_unit"
                placeholder="Property Type"
                size="large"
              />
            </a-form-item>
            <div v-for="(i, index) in form.unitTypes">
              <div class="flex gap-3">
                <a-form-item name="name" class="custom-form-item">
                  <a-select
                    ref="select"
                    v-model:value="form.unitTypes[index].unitType"
                    style="width: 200px"
                    :placeholder="
                      form.rental_unit == 'shared_condo' ||
                      form.rental_unit == 'shared_house'
                        ? 'Room Type'
                        : 'Unit Type'
                    "
                    class="w-full h-[52px]"
                    @focus="focus"
                    @change="handleChange"
                    :getPopupContainer="(node) => node.parentNode"
                  >
                    <a-select-option
                      v-for="unit in unitTypeOptions"
                      :key="unit.id"
                      :value="unit.id"
                    >
                      {{ unit.name }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  v-if="form.rental_unit == 'apartment'"
                  :rules="[
                    { required: true, message: 'Please input quantity' },
                  ]"
                  :name="['unitTypes', index, 'quantity']"
                  required
                  class="flex-1 form-labels"
                >
                  <a-input
                    v-model:value="form.unitTypes[index].quantity"
                    placeholder="Count"
                    size="large"
                    type="number"
                  />
                </a-form-item>
                <a-form-item
                  :name="['unitTypes', index, 'rentPerMonth']"
                  class="flex-1 form-labels"
                  :rules="[
                    { required: true, message: 'Please input Rent Price' },
                    {
                      pattern: /^[0-9]+$/,
                      message: 'Rent Price must be a number',
                    },
                  ]"
                >
                  <a-input
                    v-model:value="form.unitTypes[index].rentPerMonth"
                    placeholder="Rent Price"
                    size="large"
                  />
                </a-form-item>
              </div>

              <a-form-item
                :rules="[
                  { required: true, message: 'Please input Security Deposit' },
                  {
                    pattern: /^[0-9]+$/,
                    message: 'Security Deposit must be a number',
                  },
                ]"
                :name="['unitTypes', index, 'securityDeposit']"
                required
                class="flex-1 form-labels"
              >
                <a-input
                  v-model:value="form.unitTypes[index].securityDeposit"
                  placeholder="Security Deposit"
                  size="large"
                />
              </a-form-item>
              <div
                class="flex gap-[12px]"
                v-if="
                  form.rental_unit == 'shared_condo' ||
                  form.rental_unit == 'shared_house' ||
                  form.rental_unit == 'apartment'
                "
              >
                <a-form-item
                  :name="['unitTypes', index, 'availabilityDate']"
                  :rules="[
                    {
                      required: true,
                      message: 'Please input Availability Date',
                    },
                  ]"
                  required
                  class="flex-1 form-labels"
                >
                  <a-input
                    :rules="[
                      { required: true, message: 'Please enter availability' },
                    ]"
                    v-model:value="form.unitTypes[index].availabilityDate"
                    placeholder="Availability Date"
                    size="large"
                    type="Date"
                  />
                </a-form-item>
                <a-form-item
                  required
                  class="flex-1 form-labels"
                  :rules="[{ required: true, message: 'Please input Deposit' }]"
                  :name="['unitTypes', index, 'occupancyStatus']"
                >
                  <a-select
                    ref="select"
                    v-model:value="form.unitTypes[index].occupancyStatus"
                    style="width: 200px"
                    placeholder="Select Occupancy Status"
                    class="w-full"
                    @focus="focus"
                    :getPopupContainer="(node) => node.parentNode"
                  >
                    <a-select-option :value="1"
                      >Available and Vacant</a-select-option
                    >
                    <a-select-option :value="2"
                      >Currently Occupied</a-select-option
                    >
                    <a-select-option :value="3"
                      >Under Renovation</a-select-option
                    >
                    <a-select-option :value="4"
                      >Sale Closing Soon</a-select-option
                    >
                  </a-select>
                </a-form-item>
              </div>
              <div
                class="flex gap-4"
                v-if="
                  form.rental_unit == 'condo' || form.rental_unit == 'house'
                "
              >
                <a-form-item
                  :name="['unitTypes', 0, 'numberOfBedrooms']"
                  :rules="[
                    {
                      required: true,
                      message: 'Please enter the number Of Bedrooms',
                    },
                  ]"
                  required
                  class="flex-1 form-labels"
                >
                  <div
                    class="form-labels text-base mb-4 font-regular leading-[100%] font-sf"
                  >
                    Bedroom
                  </div>
                  <a-input
                    type="number"
                    placeholder="Enter Bedroom No"
                    v-model:value.number="form.unitTypes[0].numberOfBedrooms"
                  />
                </a-form-item>
                <a-form-item
                  :name="['unitTypes', 0, 'numberOfBathrooms']"
                  :rules="[
                    {
                      required: true,
                      message: 'Please enter the number Of Bathrooms',
                    },
                  ]"
                  required
                  class="flex-1 form-labels"
                >
                  <div
                    class="form-labels text-base mb-4 font-regular leading-[100%] font-sf"
                  >
                    Bathroom
                  </div>
                  <a-input
                    type="number"
                    placeholder="Enter Bathroom No"
                    v-model:value.number="form.unitTypes[0].numberOfBathrooms"
                  />
                </a-form-item>
              </div>
              <div class="flex gap-[12px]">
                <a-form-item name="Address" class="custom-form-item">
                  <a-input
                    v-model:value="form.name"
                    placeholder="Availability"
                    size="large"
                  />
                </a-form-item>
                <a-form-item name="Address" class="custom-form-item">
                  <a-input
                    v-model:value="form.name"
                    placeholder="Occupancy"
                    size="large"
                  />
                </a-form-item>
              </div>
            </div>

            <a-checkbox-group
              v-model:value="form.propertyAmenities"
              class="grid grid-cols-2 gap-4 amenities"
            >
              <a-checkbox
                v-for="option in amenityOptions"
                :key="option.value"
                :value="option.value"
                class="flex items-center gap-2"
              >
                <span class="text-[14px] text-[#000000]">{{
                  option.label
                }}</span>
              </a-checkbox>
            </a-checkbox-group>

            <div>
              <p
                class="text-[#000000] font-[500] p-0 m-0 mt-[44px] leading-[20px] font-redwing text-[14px]"
              >
                UPLOAD PHOTOS
              </p>
              <div>
                <a-upload-dragger
                  name="file"
                  class="border-dashed border-[#C7C7C7] rounded-[5px] p-[14px]"
                  list-type="picture-card"
                >
                  <p class="ant-upload-drag-icon mx-auto w-fit pt-[28px]">
                    <svg
                      width="26"
                      height="31"
                      viewBox="0 0 26 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25.0459 9.07906L17.1709 1.20406C17.0664 1.09962 16.9423 1.01681 16.8057 0.960347C16.6691 0.903885 16.5228 0.874884 16.375 0.875H2.875C2.27826 0.875 1.70597 1.11205 1.28401 1.53401C0.862053 1.95597 0.625 2.52826 0.625 3.125V27.875C0.625 28.4717 0.862053 29.044 1.28401 29.466C1.70597 29.8879 2.27826 30.125 2.875 30.125H23.125C23.7217 30.125 24.294 29.8879 24.716 29.466C25.1379 29.044 25.375 28.4717 25.375 27.875V9.875C25.3751 9.72722 25.3461 9.58086 25.2897 9.44429C25.2332 9.30772 25.1504 9.18362 25.0459 9.07906ZM17.5 4.71547L21.5345 8.75H17.5V4.71547ZM23.125 27.875H2.875V3.125H15.25V9.875C15.25 10.1734 15.3685 10.4595 15.5795 10.6705C15.7905 10.8815 16.0766 11 16.375 11H23.125V27.875ZM17.1709 16.9541C17.2755 17.0586 17.3584 17.1827 17.4149 17.3192C17.4715 17.4558 17.5006 17.6022 17.5006 17.75C17.5006 17.8978 17.4715 18.0442 17.4149 18.1808C17.3584 18.3173 17.2755 18.4414 17.1709 18.5459C17.0664 18.6505 16.9423 18.7334 16.8058 18.7899C16.6692 18.8465 16.5228 18.8756 16.375 18.8756C16.2272 18.8756 16.0808 18.8465 15.9442 18.7899C15.8077 18.7334 15.6836 18.6505 15.5791 18.5459L14.125 17.0905V23.375C14.125 23.6734 14.0065 23.9595 13.7955 24.1705C13.5845 24.3815 13.2984 24.5 13 24.5C12.7016 24.5 12.4155 24.3815 12.2045 24.1705C11.9935 23.9595 11.875 23.6734 11.875 23.375V17.0905L10.4209 18.5459C10.3164 18.6505 10.1923 18.7334 10.0558 18.7899C9.91919 18.8465 9.77282 18.8756 9.625 18.8756C9.47718 18.8756 9.33081 18.8465 9.19424 18.7899C9.05767 18.7334 8.93359 18.6505 8.82906 18.5459C8.72454 18.4414 8.64163 18.3173 8.58506 18.1808C8.52849 18.0442 8.49937 17.8978 8.49937 17.75C8.49937 17.6022 8.52849 17.4558 8.58506 17.3192C8.64163 17.1827 8.72454 17.0586 8.82906 16.9541L12.2041 13.5791C12.3085 13.4745 12.4326 13.3915 12.5692 13.3349C12.7058 13.2783 12.8522 13.2491 13 13.2491C13.1478 13.2491 13.2942 13.2783 13.4308 13.3349C13.5674 13.3915 13.6915 13.4745 13.7959 13.5791L17.1709 16.9541Z"
                        fill="#404164"
                      />
                    </svg>
                  </p>
                  <p
                    class="ant-upload-text text-[#404164] font-600 font-sf leading-[100%]"
                  >
                    Drop Photos here or click to upload
                  </p>
                  <p
                    class="ant-upload-hint text-[#808097] font-[12px] font-sf leading-[100%]"
                  >
                    Accepted File Types: png, jpg
                  </p>
                </a-upload-dragger>
              </div>
            </div>
          </div>
        </a-form>
        <a-form>
          <a-form-item v-if="stage == 3">
            Stage 3
            <FIleUploader />
          </a-form-item>
        </a-form>
        <!-- preview -->
        <div class="" v-if="stage !== 0">
          <p
            class="text-[#000000] font-[500] leading-[20px] font-redwing text-[14px]"
          >
            QUICK PREVIEW
          </p>
          <div class="w-[300px] h-[193px] mb-2">
            <AccomodationBg />
          </div>
          <div class="bg-[#F9F9F9] flex flex-col gap-4 p-[15px] rounded-[12px]">
            <div>
              <p class="m-0 p-0 text-[12px] font-inter font-semibold">
                Property Name
              </p>
              <span>{{ form.name }}</span>
            </div>
            <div>
              <p class="m-0 p-0 text-[12px] font-inter font-semibold">
                Property Address
              </p>
              <span>{{ form.address }}</span>
            </div>
            <div>
              <p class="m-0 p-0 text-[12px] font-inter font-semibold">
                Zip Code
              </p>
              <span>{{ form.zipCode }}</span>
            </div>
            <div>
              <p class="m-0 p-0 text-[12px] font-inter font-semibold">
                Province
              </p>
              <span>{{ form.province }}</span>
            </div>
          </div>
        </div>
      </div>
      <button
        :disabled="disableNext()"
        @click="handleNext"
        class="bg-[#000130] disabled:bg-[#000130] disabled:text-[#FFFFFF] disabled:opacity-70 disabled:cursor-wait ml-auto mt-[24px] text-white rounded-[8px] w-[85px] h-[36px] flex items-center justify-center"
      >
        Continue
      </button>
    </a-modal>
  </div>
</template>

<script setup>
import IconProperties from "@/components/icons/IconProperties.vue";
import { CreateNewProperty, getProvinces } from "@/api/properties";
import Button from "@/components/Button/Button.vue";
import Table from "@/components/V2Table.vue";
import TableHeader from "@/components/TableHeader.vue";
import BasePagination from "@/components/BasePagination.vue";
import DropdownButton from "@/components/V2ServiceRequestsDropDown.vue";
import { useUserStore } from "@/store";
import { onMounted, ref } from "vue";
import { reactive } from "vue";
import AccomodationBg from "@/components/icons/AccomodationBg.vue";
import { useOptionsStore } from "@/stores/options";
import FIleUploader from "@/components/FIleUploader.vue";

const allProvinces = ref([]);
const fetchProvinces = async () => {
  const response = await getProvinces();
  allProvinces.value = response;
};
onMounted(async () => {
  await optionsStore.fetchAmenities();
  await optionsStore.fetchUnitTypes();

  amenityOptions.value = optionsStore.amenities.map((a) => ({
    label: a.name,
    value: a.amenityId,
    image: a.image || a.icon || null,
  }));
  unitTypeOptions.value = [...optionsStore.unitTypes];
  await fetchProvinces();
});
const totalItemCount = 0;
const searchQuery = "";
const selectedDisplayType = "Grid";
const stages = ["Add Property", "Property Details", "Property Setup"];
const stage = ref(0);
const store = useUserStore();
const modalVisible = ref(true);
const unitTypeOptions = ref({});

const form = reactive({
  partkingType: "",
  pet: "",
  heatingType: "",
  laundryType: "",
  acType: "",
  leaseType: "",
  unit_type: "",
  count: "",
  rent_price: "",
  availability_date: "",
  occupancy_status: "",
  security_deposit: "",
  governmentID: "",
  proofOfOwnership: "",
  governmentID: "",
  otherDocs: "",
  rental_unit: null,
  name: "",
  address: "",
  city: "",
  zipCode: "",
  province: "",
  propertyType: null,
  description: "",
  units: null,
  unitTypes: [
    {
      unitCount: "",
      occupancyStatus: "",
      unitType: "",
      quantity: "",
      securityDeposit: "",
      rentPerMonth: 0,
      availabilityDate: "",
      numberOfBathrooms: 0,
      numberOfBedrooms: 0,
      unitImg: [],
      fileList: [],
    },
  ],
  images: [],
  propertyAmenities: [],
  landlordId: null,
  amenities: [],
  amenityname: "",
  amenitiesKeyWords: "",
  formType: "Bulk Upload",
  propertyImages: [],
});
const propertyTypes = [
  { title: "Apartment", value: "Apartment" },
  { title: "Shared House", value: "shared_house" },
  { title: "House", value: "house" },
  { title: "Shared Condo", value: "shared_condo" },
  { title: "Condo", value: "condo" },
  { title: "Others", value: "others" },
];
const amenityOptions = ref([]);
const optionsStore = useOptionsStore();

const ModalTitles = [
  { title: "Add Property", sub_title: "Define what you are listing" },
  { title: "Property Details", sub_title: "Tell us about your property" },
  { title: "Property Setup", sub_title: "Tell us about your property" },
  {
    title: "Property Documents Setup",
    sub_title: "Upload Your property Documents",
  },
];
const propertyData = {
  landLordId: null,
  name: "",
  description: "",
  rentalUnit: "",
  address: "",
  zipCode: "",
  city: "",
  province: "",
  totalUnits: 0,

  unitTypes: [
    {
      unitCount: 0,
      unitType: 0,
      rentPerMonth: 0,
      securityDeposit: 0,
      numberOfBedrooms: 0,
      numberOfBathrooms: 0,
      availabilityDate: "",
      occupancyStatus: 0,
      unitImg: [
        {
          imageTitle: "",
          image: "",
          isMain: true,
        },
      ],
    },
  ],
  propertyImages: [
    {
      imageTitle: "",
      image: "",
      isMain: true,
    },
  ],
  propertyAmenities: [],
  propertyDocument: "",
  proofOfOwnership: "",
  governmentID: "",
  otherDocs: "",
  partkingType: 1,
  pet: 1,
  heatingType: 1,
  acType: 1,
  laundryType: 1,
  leaseType: "",
};

function handleDisplayTypeSelect() {}
function showModal() {
  modalVisible.value = !modalVisible.value;
}
function handleNext() {
  stage.value++;
  // if (stage.value == 3) {
  //   //submit
  // }
}
function disableNext() {
  if (stage.value == 0) {
    if (form.rental_unit == null) return true;
  } else if (stage.value == 1) {
    if (
      form.name == "" ||
      form.address == "" ||
      form.city == null ||
      form.zipCode == "" ||
      form.province == null
    ) {
      return true;
    }
  }
  return false;
}
const createProperty = async () => {
  let landlord = form.landlordId || store.userProfile.referenceID;
  const payload = { ...propertyData, landLordId: landlord };
  // if(form.formType == 'In App Form'){
  //   console.log(form.unitTypes, "form.unitTypes");
  //   payload['unitTypes'] = [...form.unitTypes]
  // }

  try {
    const res = await CreateNewProperty(payload);
    const toast = useToast();
    if (res.responseCode == "00") {
      console.log("Property created successfully:", res);
      //    if(form.formType == "In App Form"){
      //     toast.success("Successfully created")
      //     showSuccessModal.value = true;
      //    }
      //    else{
      //     await handleuploadExcelFile(res.accommodationId)
      //    }
    } else {
      toast.error("Couldn't create");
    }
  } catch (err) {
    console.error("Error creating property:", err);
    message.error("Failed to create property. Please try again.");
    return;
  }
};
</script>

<style scoped>
:deep(.ant-radio .ant-radio-inner) {
  display: none;
}
:deep(.custom-form-item .ant-input) {
  border-radius: 8px;
  border: 1px solid #d1d1d1;
  padding: 16px 12px;
  font-size: 14px;
  line-height: 100%;
  color: #000000;
  font-family: "Inter";
}
:deep(.custom-form-item .ant-input:focus) {
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}
:deep(.ant-select .ant-select-selector) {
  height: 100% !important;
  border-radius: 8px !important;
  border: 1px solid #e5e6ea !important;
  display: flex !important;
  align-items: center !important;
  padding: 0.5rem 12px;
}

:deep(.ant-checkbox-inner) {
  width: 15px;
  height: 15px;
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
</style>
