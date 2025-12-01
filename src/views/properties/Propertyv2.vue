<template>
  <div
    class="w-full h-full border-2 border-gray rounded-xl box-border flex flex-col overflow-y-scroll"
  >
    <div class="flex items-center border-b-2">
      <table-header :total-item-count="total" title="All Properties">
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
      class="text-primary px-[13.5px] py-[10px] gap-[20px] grid grid-cols-4 justify-center items-center h-fit"
    >
      <PropertyCard
        v-for="value in propertyList"
        :name="value.name"
        :imageUrl="value.imageUrl"
        :address="value.address"
        :totalUnits="value.totalUnits"
      />
      <!-- <IconProperties />
      <div>
        <p>You have no Properties</p>
        <p class="text-gray-400">There's nothing to view</p>
      </div> -->
      <!-- <Button class="flex gap-1.5" @click="showModal"
        ><span class="font-semibold">+</span> Add property</Button
      > -->
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
                  record.status == 'Awaiting Payment',
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
        :totalPages="totalPages()"
        :total="total"
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
            <a-form-item
              v-if="store.userProfile.referenceID == 'NN1'"
              name="formType"
              class="flex flex-col gap-2 bg-white"
            >
              <div class="text-[#404164] text-lg mb-4 font-sf font-normal">
                Landlord
              </div>
              <a-select
                v-model:value="form.landlordId"
                placeholder="Search and select a landlord"
                size="large"
                show-search
                :getPopupContainer="(node) => node.parentNode"
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
                <template #option="{ label, value }">
                  <div class="flex flex-col bg-white">
                    <span class="font-medium bg-white">{{ label }}</span>
                  </div>
                </template>
                <template #suffixIcon>
                  <a-spin v-if="landlordLoading" size="small" />
                </template>
              </a-select>
            </a-form-item>
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
        <a-form
          v-if="stage == 1"
          class="w-[365px]"
          :rules="rules"
          :model="form"
        >
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
              <div class="w-full m-0 p-0">
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
              <a-form-item
                name="postalcode"
                class="custom-form-item p-0 m-0 w-full"
              >
                <a-input
                  v-model:value="form.zipCode"
                  placeholder="Postal Code"
                  size="large"
                />
              </a-form-item>
            </div>
          </div>
        </a-form>
        <a-form :model="form" v-if="stage == 2" class="w-[356px]">
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
              <a-form-item name="name" class="w-full">
                <a-select
                  ref="select"
                  v-model:value="form.unitTypes[index].unitType"
                  :placeholder="
                    form.rental_unit == 'shared_condo' ||
                    form.rental_unit == 'shared_house'
                      ? 'Room Type'
                      : 'Unit Type'
                  "
                  class="w-full h-[48px]"
                  placeholder="Unit Type"
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
              <div class="flex gap-3">
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
                    class="h-[48px]"
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
                    class="h-[48px]"
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
                  class="h-[48px]"
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
                    class="h-[48px]"
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
                    v-model:value.number="
                      form.unitTypes[index].numberOfBedrooms
                    "
                  />
                </a-form-item>
                <a-form-item
                  :name="['unitTypes', index, 'numberOfBathrooms']"
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
                    v-model:value.number="
                      form.unitTypes[index].numberOfBathrooms
                    "
                  />
                </a-form-item>
              </div>
              <div>
                <p
                  class="text-[#000000] font-[500] p-0 m-0 mt-[38px] leading-[20px] font-redwing text-[14px]"
                >
                  UPLOAD PHOTOS
                </p>
                <div>
                  <FIleUploader
                    v-model:fileList="propertyImagesList"
                    :customRequest="
                      (options) => customPropertyImageUpload(options, index)
                    "
                  />
                </div>
                <button
                  class="flex justify-end bg-none border-0"
                  @click="handleAddUnit"
                >
                  <p
                    class="font-sf text-[1rem] font-[700] leading-[100%] text-[#404164] underline"
                    v-if="form.rental_unit == 'apartment'"
                  >
                    Add Unit
                  </p>
                  <p
                    class="font-sf text-[1rem] font-[700] leading-[100%] text-[#404164] underline"
                    v-if="
                      form.rental_unit == 'shared_condo' ||
                      form.rental_unit == 'shared_house'
                    "
                  >
                    Add Room
                  </p>
                </button>
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
          </div>
        </a-form>
        <a-form v-if="stage == 3" :model="form">
          <div class="">
            <p class="text-[#000000] text-[18px] font-sf leading-[100%]">
              <!-- {{
                form.rental_unit == "others"
                  ? "Define What You are Listing "
                  : "Setup Your Property Feature and Lease options"
              }} -->
            </p>
            <a-form
              class="bg-white rounded-xl flex flex-col gap-2"
              :rules="lastStepThreeRules"
              :model="form"
            >
              <div v-if="form.rental_unit !== 'others'">
                <div class="flex gap-4">
                  <a-form-item name="partkingType" required class="flex-1">
                    <a-select
                      :getPopupContainer="(node) => node.parentNode"
                      ref="select"
                      v-model:value="form.partkingType"
                      style="width: 200px"
                      placeholder="Select Parking Type"
                      class="w-full h-[52px]"
                      @focus="focus"
                      @change="handleChange"
                    >
                      <a-select-option :value="1">Garage</a-select-option>
                      <a-select-option :value="2"
                        >Drive way Parking</a-select-option
                      >
                      <a-select-option :value="3"
                        >Off Street Parking</a-select-option
                      >
                      <a-select-option :value="4"
                        >Parking Available</a-select-option
                      >
                      <a-select-option :value="5"
                        >One Car Garage</a-select-option
                      >
                      <a-select-option :value="6"
                        >Two Car Garage</a-select-option
                      >
                      <a-select-option :value="7"
                        >Three Car Garage</a-select-option
                      >
                      <a-select-option :value="8"
                        >Four Car Garage</a-select-option
                      >
                      <a-select-option :value="9"
                        >Underground Parking</a-select-option
                      >
                    </a-select>
                  </a-form-item>
                  <a-form-item name="pet" required class="flex-1 form-labels">
                    <a-select
                      :getPopupContainer="(node) => node.parentNode"
                      ref="select"
                      v-model:value="form.pet"
                      style="width: 200px"
                      placeholder="Select Pet"
                      class="w-full h-[52px]"
                      @focus="focus"
                      @change="handleChange"
                    >
                      <a-select-option :value="2">Yes</a-select-option>
                      <a-select-option :value="1">No</a-select-option>
                      <a-select-option :value="3">Conditional</a-select-option>
                    </a-select>
                  </a-form-item>
                </div>

                <div class="flex gap-4">
                  <a-form-item
                    :getPopupContainer="(node) => node.parentNode"
                    name="heatingType"
                    required
                    class="flex-1 form-labels"
                  >
                    <a-select
                      ref="select"
                      v-model:value="form.heatingType"
                      style="width: 200px"
                      placeholder="Select Heating Type"
                      class="w-full h-[52px]"
                      @focus="focus"
                      @change="handleChange"
                    >
                      <a-select-option :value="1"
                        >Central Heating</a-select-option
                      >
                      <a-select-option :value="2"
                        >Electric Heating</a-select-option
                      >
                      <a-select-option :value="3">Gas Heating</a-select-option>
                      <a-select-option :value="4"
                        >Heating Available</a-select-option
                      >
                    </a-select>
                  </a-form-item>
                  <a-form-item
                    name="acType"
                    required
                    class="flex-1 form-labels"
                  >
                    <a-select
                      :getPopupContainer="(node) => node.parentNode"
                      ref="select"
                      v-model:value="form.acType"
                      style="width: 200px"
                      placeholder="Select Ac type"
                      class="w-full h-[52px]"
                      @focus="focus"
                      @change="handleChange"
                    >
                      <a-select-option :value="1">CentralAC</a-select-option>
                      <a-select-option :value="2">Conditional</a-select-option>
                      <a-select-option :value="3">AC Available</a-select-option>
                      <a-select-option :value="4"
                        >AC Not Available</a-select-option
                      >
                    </a-select>
                  </a-form-item>
                </div>
                <a-form-item
                  name="laundryType"
                  required
                  class="flex-1 form-labels"
                >
                  <a-select
                    ref="select"
                    v-model:value="form.laundryType"
                    style="width: 200px"
                    placeholder="Select Laundry Type"
                    class="w-full h-[52px]"
                    @focus="focus"
                    @change="handleChange"
                    :getPopupContainer="(node) => node.parentNode"
                  >
                    <a-select-option :value="1">In Unit</a-select-option>
                    <a-select-option :value="2">Shared Laundry</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  name="leaseType"
                  required
                  class="flex-1 form-labels"
                >
                  <div
                    class="form-labels text-base mb-4 font-light leading-[100%] font-sf"
                  >
                    Lease Type Allowed
                    <a-checkbox-group
                      class="grid grid-cols-1 gap-5"
                      v-model:value="form.leaseType"
                    >
                      <a-checkbox
                        key="Yearly Lease"
                        value="Yearly Lease"
                        class="flex items-center gap-2 mt-[16px]"
                      >
                        <span class="text-[20px] text-[#808097]">
                          Yearly Lease
                        </span>
                      </a-checkbox>

                      <a-checkbox
                        key="Month to Month"
                        value="Month to Month"
                        class="flex items-center gap-2"
                      >
                        <span class="text-[20px] text-[#808097]">
                          Month to Month
                        </span>
                      </a-checkbox>
                    </a-checkbox-group>
                  </div>
                </a-form-item>
              </div>

              <a-form-item name="description">
                <p
                  class="form-labels text-base mb-4 font-light leading-[100%] font-sf"
                >
                  Description
                </p>
                <a-textarea
                  class="p-[18px]"
                  v-model:value="form.description"
                  placeholder="Describe your property..."
                  :auto-size="{ minRows: 5, maxRows: 5 }"
                />
              </a-form-item>
            </a-form>
          </div>
        </a-form>
        <a-form :model="form" v-if="stage == 4">
          <a-form-item>
            <FIleUploader
              v-model:fileList="otherDocsFileList"
              :customRequest="
                (options) =>
                  customAdditionalDocumentsUpload(options, 'proofOfOwnership')
              "
              title="Proof Of Ownership"
            />

            <FIleUploader
              v-model:fileList="AdditionalDocumentList"
              :customRequest="
                (options) =>
                  customAdditionalDocumentsUpload(options, 'otherDocs')
              "
              title="Additional Documents"
            />

            <FIleUploader
              v-model:fileList="governmentIDList"
              :customRequest="
                (options) =>
                  customAdditionalDocumentsUpload(options, 'governmentID')
              "
              title="Government-Issued ID"
            />
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
            <img
              v-if="form.unitTypes[0].unitImg.length !== 0"
              :src="form.unitTypes[0].unitImg[0].image"
            />
            <AccomodationBg v-else />
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
        :loading="submitting"
        class="bg-[#000130] disabled:bg-[#000130] disabled:text-[#FFFFFF] disabled:opacity-70 disabled:cursor-not-allowed ml-auto mt-[24px] text-white rounded-[8px] w-[85px] h-[36px] flex items-center justify-center"
      >
        <span v-if="loading">Loading...</span>

        Continue
      </button>
    </a-modal>

    <a-modal
      :open="showSuccessModal"
      :closable="false"
      :footer="null"
      :width="500"
    >
      <template #title>
        <div class="flex items-center justify-between py-[12px]">
          <span></span>
          <span></span>
          <button @click="() => (showSuccessModal = false)">
            <CloseOutlined />
          </button>
        </div>
      </template>
      <div class="mx-auto w-fit">
        <p class="text-[#404164] text-[20px] font-medium">
          Submitted Successfully
        </p>
        <svg
          width="200"
          height="201"
          viewBox="0 0 200 201"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="100"
            cy="100.5"
            r="100"
            fill="black"
            fill-opacity="0.25"
          />
          <ellipse
            cx="100.008"
            cy="99.9324"
            rx="86.5232"
            ry="83.948"
            fill="black"
            fill-opacity="0.25"
          />
          <path
            d="M162.125 100.434C162.125 134.742 134.313 162.555 100.004 162.555C65.6955 162.555 37.8828 134.742 37.8828 100.434C37.8828 66.1251 65.6955 38.3125 100.004 38.3125C134.313 38.3125 162.125 66.1251 162.125 100.434Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M100.001 173.228C140.167 173.228 172.728 140.667 172.728 100.501C172.728 60.3346 140.167 27.7734 100.001 27.7734C59.8346 27.7734 27.2734 60.3346 27.2734 100.501C27.2734 140.667 59.8346 173.228 100.001 173.228ZM138.473 81.4232C141.331 77.9947 140.867 72.8992 137.439 70.0421C134.01 67.1851 128.915 67.6483 126.058 71.0768L96.9834 105.966C94.1817 109.328 92.6066 111.189 91.3491 112.333L91.301 112.377L91.2492 112.338C89.8933 111.313 88.1562 109.601 85.0616 106.507L73.3332 94.7784C70.1774 91.6227 65.061 91.6227 61.9052 94.7784C58.7494 97.9342 58.7494 103.051 61.9052 106.206L73.6336 117.935L73.9635 118.265L73.9636 118.265C76.6019 120.904 79.14 123.443 81.5015 125.229C84.1469 127.229 87.6113 129.11 92.0509 128.909C96.4906 128.707 99.7705 126.521 102.224 124.289C104.414 122.297 106.712 119.538 109.1 116.671L109.399 116.312L138.473 81.4232ZM90.596 112.934C90.596 112.934 90.5998 112.932 90.6072 112.928C90.5996 112.933 90.596 112.935 90.596 112.934ZM92.042 112.863C92.0496 112.866 92.0536 112.868 92.0537 112.868C92.0537 112.868 92.0499 112.867 92.042 112.863Z"
            fill="#000130"
          />
        </svg>
      </div>

      <div class="flex flex-col">
        <RouterLink
          to="/properties"
          class="bg-[#000130] text-center w-full rounded-[4px] py-[9px] text-[500] leading-[25px] text-white mt-[36px]"
          >View Accomodations</RouterLink
        >
        <RouterLink
          to="/edit"
          class="text-[#404164] font-semibold leading-[100%] text-[18px] mt-4 text-center mx-auto w-full"
          >Edit Accomodations</RouterLink
        >
      </div>
    </a-modal>
    <a-modal :open="false" :closable="false">
      <template #title>
        <div class="flex items-center justify-between">
          <div>
            <span class="font-redwing text-[24px] font-medium text-[]">
              My Properties
            </span>
          </div>
          <span></span>
          <button @click="showModal">
            <CloseOutlined />
          </button>
        </div>
      </template>
      <div class="flex gap-[8px]">
        <div>
          <img src="/src/assets/propertyImage2.svg" />
        </div>
        <div class="flex flex-col gap-[8px]">
          <img src="/src/assets/propertyImage.svg" />
          <img src="/src/assets/propertyImage.svg" />
        </div>
      </div>

      <div>
        <a-tab-pane key="single" tab="Single Add"> </a-tab-pane>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import IconProperties from "@/components/icons/IconProperties.vue";
import {
  CreateNewProperty,
  getProvinces,
  FetchProperties,
  FetchUnitTypes,
} from "@/api/properties";
import Button from "@/components/Button/Button.vue";
import Table from "@/components/V2Table.vue";
import TableHeader from "@/components/TableHeader.vue";
import BasePagination from "@/components/BasePagination.vue";
import DropdownButton from "@/components/V2ServiceRequestsDropDown.vue";
import { useUserStore } from "@/store";
import { onMounted, ref } from "vue";
import { reactive } from "vue";
import { useToast } from "vue-toast-notification";
import AccomodationBg from "@/components/icons/AccomodationBg.vue";
import { useOptionsStore } from "@/stores/options";
import FIleUploader from "@/components/FIleUploader.vue";
import { uploadImage } from "@/api/properties";
import { options } from "less";
import { FetchLandlords } from "@/api/properties";
import UniversalButton from "@/components/Button/UniversalButton.vue";
import PropertyCard from "@/components/PropertyCard.vue";
const allProvinces = ref([]);
const showSuccessModal = ref(false);
const fetchProvinces = async () => {
  const response = await getProvinces();
  allProvinces.value = response;
};
const rules = {
  name: [
    { required: true, message: "Property name is required" },
    {
      pattern: /^[A-Za-z\s]+$/,
      message: "Property name should not contain numbers",
    },
  ],
  address: [{ required: true, message: "Address is required" }],
  zipCode: [{ required: true, message: "Zip code is required" }],
  province: [{ required: true, message: "Province is required" }],
  description: [{ required: true, message: "Description is required" }],
  city: [{ required: true, message: "City is required" }],
};
const landlordOptions = ref([]);

const landlordLoading = ref(false);
const fetchAllLandlords = async (searchName = "", page = 1) => {
  landlordLoading.value = true;
  try {
    const response = await FetchLandlords();
    if (response && response.data) {
      const landlords = response.data.map((landlord) => ({
        label: `${landlord.text}`,
        value: landlord.value,
        // data: landlord,
      }));

      landlordOptions.value = landlords;
      // landlordOptions.value = [...landlordOptions.value, ...landlords];
      // landlordTotalItems.value = response.accountList.totalItemCount;
      // landlordCurrentPage.value = page;
    }
  } catch (error) {
    console.error("Error fetching landlords:", error);
  } finally {
    landlordLoading.value = false;
  }
};
const currentPage = ref(1);
const totalPages = () => {
  console.log(total.value);
  return Math.ceil(total.value / pageSize.value);
};
const pageSize = ref(16);
const total = ref(0);
const propertyList = ref([]);
const handleFetchProperties = (page = currentPage.value) => {
  const query = {
    size: pageSize.value,
    page: page,
    query: "",
  };
  FetchProperties(store.userProfile.referenceID, query)
    .then((response) => {
      if (response.responseCode == "00") {
        propertyList.value = response.propertyRecs.items;
        total.value = response.propertyRecs.totalItemCount || 0;
        pageSize.value = response.propertyRecs.pageSize || pageSize.value;
        currentPage.value = response.propertyRecs.page || page;
      } else {
        // this.error = "Failed to load properties.";
      }
    })
    .catch((e) => {
      // this.error = "Failed to load properties.";
    })
    .finally(() => {
      this.loading = false;
    });
};
const handleAddUnit = () => {
  form.unitTypes.push({
    unitCount: "",
    occupancyStatus: "",
    unitType: "",
    quantity: "",
    securityDeposit: "",
    rentPerMonth: "",
    availabilityDate: "",
    bathrooms: "",
    bedrooms: "",
    unitImg: [],
    fileList: [],
  });
};
const customPropertyImageUpload = async (options, index) => {
  const { file, onSuccess, onError } = options;
  const formData = new FormData();
  formData.append("Image", file);
  formData.append("UploadType", 1);
  formData.append("ImageTitle", file.name);
  try {
    const res = await uploadImage(formData);
    const imageUrl = res.url;
    if (!Array.isArray(form.unitTypes[index].unitImg)) {
      form.unitTypes[index].unitImg = [];
    }
    console.log();
    form.unitTypes[index].unitImg.push({
      imageTitle: file.name,
      image: imageUrl,
    });
    onSuccess({ url: imageUrl }, file);
  } catch (err) {
    message.error(`${file.name} upload failed.`);
    onError(err);
  }
};

const customAdditionalDocumentsUpload = async (options, type) => {
  const { file, onSuccess, onError } = options;
  const formData = new FormData();
  formData.append("Image", file);
  formData.append("UploadType", 1);
  formData.append("ImageTitle", file.name);
  try {
    const res = await uploadImage(formData);
    const url = res.url;
    form[type] = url;

    onSuccess({ url: url }, file);
  } catch (err) {
    message.error(`${file.name} upload failed.`);
    onError(err);
  }
};
onMounted(async () => {
  handleFetchProperties();
  submitting.value = true;
  await optionsStore.fetchAmenities();
  await optionsStore.fetchUnitTypes();
  await fetchAllLandlords();
  submitting.value = false;
  amenityOptions.value = optionsStore.amenities.map((a) => ({
    label: a.name,
    value: a.amenityId,
    image: a.image || a.icon || null,
  }));
  unitTypeOptions.value = [...optionsStore.unitTypes];
  await fetchProvinces();
});
onMounted(() => {});
const onPageChange = (page) => {
  currentPage.value = page;
};
const totalItemCount = 0;
const searchQuery = "";
const selectedDisplayType = "Grid";
const stage = ref(0);
const store = useUserStore();
const modalVisible = ref(false);
const unitTypeOptions = ref({});
const otherDocsFileList = ref([]);
const AdditionalDocumentList = ref([]);
const governmentIDList = ref([]);
const propertyImagesList = ref([]);
const form = reactive({
  partkingType: null,
  pet: null,
  heatingType: null,
  laundryType: null,
  acType: null,
  leaseType: null,
  unit_type: "",
  count: "",
  rent_price: "",
  availability_date: "",
  occupancy_status: "",
  security_deposit: "",
  governmentID: "",
  proofOfOwnership: null,
  governmentID: null,
  otherDocs: null,
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
      unitType: null,
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
  { title: "Apartment", value: "apartment" },
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
    title: "Continue Property Setup",
    sub_title: "Setup Your Property Feature and Lease options",
  },
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
  stage.value = 0;

  modalVisible.value = !modalVisible.value;
}
const submitting = ref(false);
async function handleNext() {
  console.log("Before:", stage.value);
  if (stage.value == 4) {
    await SubmitCreateProperty();
    return;
  }
  stage.value++;
  console.log("After:", stage.value);
}
function disableNext() {
  if (submitting.value) {
    return true;
  }
  if (stage.value == 0) {
    if (store.userProfile.referenceID == "NN1") {
      if (form.rental_unit === null || form.landlordId == null) {
        return true;
      }
    }
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
  } else if (stage.value == 3) {
    if (
      form.partkingType == null ||
      form.acType == null ||
      form.laundryType == null ||
      form.leaseType == null ||
      form.acType == null
    ) {
      return true;
    } else if (stage.value == 4) {
      if (
        form.otherDocs == null ||
        form.governmentID == null ||
        form.proofOfOwnership == null
      ) {
        return true;
      }
    }
    return false;
  }
}

const SubmitCreateProperty = async () => {
  submitting.value = true;
  console.log("here");
  let payload;
  let landlord = form.landlordId || store.userProfile.referenceID;
  // if(form.rental_unit == 'apartment'){
  payload = {
    landlordId: landlord,
    name: form.name,
    address: form.address,
    description: form.description,
    rentalUnit: form.rental_unit,
    propertyAmenities: [...form.propertyAmenities],
    propertyImages: [...form.propertyImages],
    city: form.city,
    zipCode: form.zipCode,
    province: form.province,
    proofOfOwnership: form.proofOfOwnership,
    governmentID: form.governmentID,
    otherDocs: form.otherDocs,
    partkingType: form.partkingType,
    pet: form.pet,
    heatingType: form.heatingType,
    laundryType: form.laundryType,
    acType: form.acType,
    leaseType: form.leaseType.join(","),
    unitTypes: [],
  };
  // if(form.formType == 'In App Form'){
  console.log(form.unitTypes, "form.unitTypes");
  payload["unitTypes"] = [...form.unitTypes];
  // }

  try {
    const res = await CreateNewProperty(payload);
    const toast = useToast();
    if (res.responseCode == "00") {
      console.log("Property created successfully:", res);
      // if (form.formType == "In App Form") {
      toast.success("Successfully created");
      showSuccessModal.value = true;
      // }
      // else {
      // await handleuploadExcelFile(res.accommodationId);
      // }
    } else {
      toast.error("Couldn't create");
    }
    submitting.value = false;
  } catch (err) {
    console.error("Error creating property:", err);
    message.error("Failed to create property. Please try again.");
    return;
  }
};
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
      if (form.formType == "In App Form") {
        toast.success("Successfully created");
        showSuccessModal.value = true;
      } else {
        await handleuploadExcelFile(res.accommodationId);
      }
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
