<template>
  <div
    v-if="fetchingData == false"
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
            <!-- <DropdownButton
              :icon="'grid'"
              :label="selectedDisplayType"
              @select="handleDisplayTypeSelect"
              :options="[
                { label: 'Grid', value: 'Grid' },
                { label: 'List', value: 'List' },
              ]"
            /> -->
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
        :loading="selectedPropertyInfoId == value.accommodationId && loadingItem == true"
        @view="() => handleViewProperty(value.accommodationId)"
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
        <div class="mx-auto w-fit">
          <svg
            width="117"
            height="117"
            viewBox="0 0 117 117"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="58.5"
              cy="58.5"
              r="58.5"
              fill="#02D609"
              fill-opacity="0.1"
            />
            <ellipse
              cx="58.452"
              cy="58.1487"
              rx="50.616"
              ry="49.1096"
              fill="#02D609"
              fill-opacity="0.4"
            />
            <path
              d="M94.8771 58.4972C94.8771 78.5677 78.6068 94.8381 58.5362 94.8381C38.4657 94.8381 22.1953 78.5677 22.1953 58.4972C22.1953 38.4266 38.4657 22.1562 58.5362 22.1562C78.6068 22.1562 94.8771 38.4266 94.8771 58.4972Z"
              fill="white"
            />
            <path
              d="M58.499 15.9531C81.996 15.9534 101.044 35.002 101.044 58.499C101.044 81.9959 81.9959 101.044 58.499 101.044C35.002 101.044 15.9534 81.996 15.9531 58.499C15.9531 35.0018 35.0018 15.9531 58.499 15.9531ZM53.5059 66.7539L42.4199 55.6699L39.5918 58.498L36.7637 61.3271L50.9453 75.5088L54.043 78.6055L56.8467 75.2412L80.4834 46.877L74.3369 41.7559L53.5059 66.7539Z"
              fill="#02AE08"
            />
          </svg>
        </div>

        <p
          class="text-[#000000] text-center mb-2 p-0 m-0 mx-auto font-redwing mt-4 leading-[100%] text-[24px] font-medium"
        >
          Submitted Successfully
        </p>
        <p
          class="text-[#00000099] font-inter font-normal text-sm m-0 p-0 mx-auto leading-[21px]"
        >
          Your property has been submitted successfully!
        </p>
      </div>

      <div class="flex flex-col">
        <RouterLink
          to="/"
          class="bg-[#000130] text-center w-full rounded-[8px] py-[13px] text-sm font-[500] leading-[25px] text-white mt-[36px]"
          >View Accomodations</RouterLink
        >
        <RouterLink
          to="/edit"
          class="text-[#404164] font-semibold leading-[100%] text-[14px] py-[13px] mt-4 text-center mx-auto w-full"
          >Edit Accomodations</RouterLink
        >
      </div>
    </a-modal>
    <a-modal :open="showPropertyDetailsModal" :closable="false">
      <template #title>
        <div class="flex items-center justify-between">
          <div>
            <span class="font-redwing text-[24px] font-medium text-[]">
              My Properties
            </span>
          </div>
          <span></span>
          <button @click="showPropertyDetailsModal = false">
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
        <a-tabs
          v-model:activeKey="activeKey"
          class="tenant-details-tabs tab-gap"
        >
          <a-tab-pane key="1" tab="Property Info"
            >
            <div class="mt-[24px]">
              <p class="font-redwing text-[14px] p-0 m-0">DETAILS</p>
              <div class="flex items-center gap-2 text-[#808097] font-sf mt-2">
                <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.66797 5.41797C3.66797 5.8821 3.85234 6.32722 4.18053 6.65541C4.50872 6.98359 4.95384 7.16797 5.41797 7.16797C5.8821 7.16797 6.32722 6.98359 6.65541 6.65541C6.98359 6.32722 7.16797 5.8821 7.16797 5.41797C7.16797 4.95384 6.98359 4.50872 6.65541 4.18053C6.32722 3.85234 5.8821 3.66797 5.41797 3.66797C4.95384 3.66797 4.50872 3.85234 4.18053 4.18053C3.85234 4.50872 3.66797 4.95384 3.66797 5.41797Z" stroke="#808097" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.71659 8.71641L6.2415 11.1915C6.02274 11.41 5.72618 11.5328 5.41696 11.5328C5.10774 11.5328 4.81118 11.41 4.59242 11.1915L2.11675 8.71641C1.46413 8.06376 1.0197 7.23224 0.839653 6.327C0.659608 5.42176 0.752038 4.48346 1.10525 3.63076C1.45847 2.77805 2.05661 2.04923 2.82403 1.53646C3.59146 1.02369 4.4937 0.75 5.41667 0.75C6.33964 0.75 7.24188 1.02369 8.0093 1.53646C8.77673 2.04923 9.37487 2.77805 9.72808 3.63076C10.0813 4.48346 10.1737 5.42176 9.99368 6.327C9.81364 7.23224 9.36921 8.06376 8.71659 8.71641Z" stroke="#808097" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                <span class="text-sm leading-[16px] font-normal">
                        {{ propertyDetails.address }} 
                      </span>
              </div>
              <div
                      class="flex items-center gap-2 text-[#808097] font-sf mt-2"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.66667 14V9.33333L5.33333 6L2 9.33333V14H5.33333M8.66667 14H5.33333M8.66667 14H14V2.66667C14 2.48986 13.9298 2.32029 13.8047 2.19526C13.6797 2.07024 13.5101 2 13.3333 2H6.66667C6.48986 2 6.32029 2.07024 6.19526 2.19526C6.07024 2.32029 6 2.48986 6 2.66667V6.66667M5.33333 14V11.3333M8.66667 4.66667V4.67333M11.3333 4.66667V4.67333M11.3333 7.33333V7.34M11.3333 10V10.0067"
                          stroke="#808097"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <span class="text-sm leading-[16px] font-normal">
                        {{ propertyUnitIInfo.length }} Units
                      </span>
                    </div>
            </div>
              <div class="mt-4 ">
                                   <p class="font-redwing text-[#000000] text-[14px] p-0 m-0">DESCRIPTION</p>
                      <p
                        class="text-[#00000099] text-[14px] font-sf leading-[100%]"
                        style="color: #808097 !important"
                      >
                        {{ propertyDetails.description || 'nill' }}
                      </p>
                    </div>
                    <div class="mt-[24px]">
                      <p
                        class="font-redwing text-[14px] p-0 m-0"
                      >
                        AMENITIES
                    </p>
                      <div class="">
                        {{console.log(amenityOptions, propertyAmenitiess, "Amenitites Option")}}
                      <li v-for="option in amenityOptions" style="color: #808097 !important; " class="text-[#808097] text-[14px] font-sf leading-[100%] ">
                        <li
                        class="list-disc text-[12px] text-[#00000099] leading-[20px] font-inter font-medium"
                          v-if="
                            propertyAmenitiess.find((ame) => ame.amenityId == option.value)
                          "
                          >{{ option.label || 'nill' }}</li>
                      </li>
                      </div>
                      <!-- <li v-for="value in ameniti"></li> -->
                    </div>

                    <div class="mt-[24px]">
                       <h1
                        class="font-medium text-base text-txt_dark leading-[100%]"
                      >
                        Documents
                      </h1>
                      <div class="flex items-center gap-6">
                       <a :href="propertyDetails.propertyDoc" class="bg-[#FAFAFA] p-4 w-fit rounded-[4px] mt-2 flex flex-col gap-2 items-center">
                        <DocumentIcon />
                        Property Doc
                       </a>
                        <a :href="propertyDetails.governmentID" class="bg-[#FAFAFA] p-4 w-fit rounded-[4px] mt-2 flex flex-col gap-2 items-center">
                        <DocumentIcon />
                        Government ID
                       </a>
                        <a :href="propertyDetails.proofofOwnership" class="bg-[#FAFAFA] p-4 w-fit rounded-[4px] mt-2 flex flex-col gap-2 items-center">
                        <DocumentIcon />
                        Proof of Ownership
                       </a>
                       </div>
                    </div>
            </a-tab-pane>
         <a-tab-pane
                    v-for="unit in propertyUnitIInfo"
                    :key="unit.unitId"
                    :tab="unit.unitName"
                  >
                  <div class="flex items-center gap-2 text-[#808097] font-sf mt-2">
                <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.66797 5.41797C3.66797 5.8821 3.85234 6.32722 4.18053 6.65541C4.50872 6.98359 4.95384 7.16797 5.41797 7.16797C5.8821 7.16797 6.32722 6.98359 6.65541 6.65541C6.98359 6.32722 7.16797 5.8821 7.16797 5.41797C7.16797 4.95384 6.98359 4.50872 6.65541 4.18053C6.32722 3.85234 5.8821 3.66797 5.41797 3.66797C4.95384 3.66797 4.50872 3.85234 4.18053 4.18053C3.85234 4.50872 3.66797 4.95384 3.66797 5.41797Z" stroke="#808097" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.71659 8.71641L6.2415 11.1915C6.02274 11.41 5.72618 11.5328 5.41696 11.5328C5.10774 11.5328 4.81118 11.41 4.59242 11.1915L2.11675 8.71641C1.46413 8.06376 1.0197 7.23224 0.839653 6.327C0.659608 5.42176 0.752038 4.48346 1.10525 3.63076C1.45847 2.77805 2.05661 2.04923 2.82403 1.53646C3.59146 1.02369 4.4937 0.75 5.41667 0.75C6.33964 0.75 7.24188 1.02369 8.0093 1.53646C8.77673 2.04923 9.37487 2.77805 9.72808 3.63076C10.0813 4.48346 10.1737 5.42176 9.99368 6.327C9.81364 7.23224 9.36921 8.06376 8.71659 8.71641Z" stroke="#808097" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                <span class="text-sm leading-[16px] font-normal">
                        {{ propertyDetails.address }} 
                      </span>
              </div>
              
              <div class="text-[#000000] py-2 px-3 bg-[#F9F9F9] mt-4 flex justify-between items-center" v-for="uni in unit.bedRoom">
                <div>
                <p class="p-0 m-0  text-[#000000] text-[14px] font-[500] font-inter leading-[21px]">{{unit.unitName}}</p>
                <div class="flex gap-1 items-center ">
                <p class="p-0 m-0  text-[#000000] text-[12px] font-[500] font-inter leading-[20px]">{{unit.referenceNumber}}</p>
                .
                <p class="p-0 m-0  text-[#000000] text-[12px] font-[500] font-inter leading-[20px]">CA${{unit.price}}</p>
</div>
                </div>
                <div>
                  <a-dropdown>
    <a class="ant-dropdown-link" @click.prevent>
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a href="#" @click="viewUnitModal = true">View details</a>
        </a-menu-item>
        <a-menu-item>
          <a @click="() => {
            showAddTenantModal = true
                                tenantForm.unitId = unit.unitId;
            
            }" href="#">Add Tenant</a>
        </a-menu-item>
        <a-menu-item key="3" 
          @click="
                              () => {
                                editUnitModal = true;
                                selectedUnit = {
                                  ...unit,
                                  availabilityDate: dayjs(
                                    unit.availabilityDate
                                  ),
                                  unitImg: unit.unitImg || [],
                                };
                                console.log(selectedUnit, 'selectedUnit');
                              }
                            "
        
        > Edit Unit </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
                </div>
              </div>
              
                  </a-tab-pane>
        </a-tabs>
      </div>
    </a-modal>


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
      <template #title>
        <div
          class="flex items-center justify-between border-b border-[#C7C7C7] py-[12px]"
        >
          <span class="modal-title font-redwing text-[24px] font-medium leading-[100%]">Add Tenants</span>
          <span></span>
           <div
            class="cursor-pointer flex items-center gap-[8px] text-txt_dark text-[18px] font-medium"
          >
            <ArrowLeftOutlined @click="showAddTenantModal = false" class="text-[18px]" />
          </div>
          
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

              <a-form-item
                label="Lease Start Date"
                name="leasestartDate"
                required
                class="w-full"
              >
                <a-date-picker
                  v-model:value="tenantForm.leasestartDate"
                  size="large"
                  class="w-full"
                />
              </a-form-item>

              <a-form-item
                label="Lease Start Date"
                name="leaseendDate"
                required
                class="w-full"
              >
                <a-date-picker
                  v-model:value="tenantForm.leaseendDate"
                  size="large"
                  class="w-full"
                />
              </a-form-item>

              <div class="flex justify-end gap-3 mt-8">
                <a-button @click="resetTenantModal" size="large"
                  >Cancel</a-button
                >
                <a-button
                  type="primary"
                  :loading="tenantLoading"
                  @click="createTenant"
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


    <!-- Unit details -->
     <a-modal
      :footer="null"
      width="458px"
      :visible="editUnitModal"
      centered
      :bodyStyle="{ padding: '0' }"
      class=""
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
          <button
            @click="editUnitModal = false"
            class="cursor-pointer flex items-center gap-[8px] text-txt_dark text-[18px] font-medium"
          >
            <ArrowLeftOutlined
              @click="goBack"
              class="text-[18px] text-[#808097]"
            />
            Back
          </button>
          <span class="modal-title">Edit Units</span>
          <span></span>
        </div>
      </template>
      <div>
        <div
          class="bg-[#C382011A] flex items-center gap-[8px] p-2 rounded-[8px] mt-4"
        >
          <div class="">
         <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5 9.33333V5.16667M8.5 1C12.6421 1 16 4.35786 16 8.5C16 12.6421 12.6421 16 8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1ZM8.4585 11.8333V11.75L8.5415 11.7498V11.8333H8.4585Z" stroke="#854D0F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          </div>
          <div class="m-0">
            <p class="text-[#854D0F] m-0 font-sf text-[12px]  font-semibold leading-[100%]">
              You are editing a single unit
            </p>
            <p class="text-[#854D0F] m-0 text-[12px] font-sf">
              Not all instances of the similar units would change or be affected
              by this edit.
            </p>
          </div>
        </div>
      </div>

      <a-form>
        <p class="text-[#404164] font-redwing text-[14px]  font-medium mt-[16px]">
          Unit Information
        </p>
        <a-form-item name="rentRate" required>
          
          <a-input-number
            style="width: 100%"
            min="0"
            size="large"
            v-model:value="selectedUnit.referenceNumber"
          />
        </a-form-item>

        <div class="flex gap-4">
          <a-form-item name="rent_price" required class="flex-1 form-labels">
            <a-input
              placeholder="Rent Price"
              size="large"
              v-model:value="selectedUnit.price"
            />
          </a-form-item>
          <a-form-item
            name="security_deposit"
            required
            class="flex-1 form-labels"
          >
           
            <a-input
              placeholder="Security Deposit"
              size="large"
              v-model:value="selectedUnit.securityDeposit"
            />
          </a-form-item>
        </div>

        <div class="flex gap-4">
          <a-form-item name="rent_price" required class="flex-1 form-labels">
            <a-date-picker
              placeholder="Rent Price"
              size="large"
              v-model:value="selectedUnit.availabilityDate"
            />
          </a-form-item>
          <a-form-item
            name="security_deposit"
            type="date"
            class="flex-1 form-labels"
          >

            <a-select
              ref="select"
              v-model:value="selectedUnit.occupancyStatus"
              style="width: 200px"
              placeholder="Select Occupancy Status"
              class="w-full"
              @focus="focus"
            >
              <a-select-option :value="1">Available and Vacant</a-select-option>
              <a-select-option :value="2">Currently Occupied</a-select-option>
              <a-select-option :value="3">Under Renovation</a-select-option>
              <a-select-option :value="4">Sale Closing Soon</a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <a-form-item>
          <div
            class="form-labels text-[14px] m-0 p-0 font-regular leading-[100%] font-redwing"
          >
            Upload Photos
          </div>
          <a-upload-dragger
    v-model:fileList="UnitImageFileList"
    name="file"
    :customRequest="customUnitImageUpload"
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
        </a-form-item>

        <div class="flex gap-2.5 ml-auto w-fit">
          <button
          @click="editUnitModal = false"
            class="border-[#000130] border py-[6px] text-[14px] font-inter px-[12px] text-[#404164]  font-semibold leading-[28px] rounded-[8px]"
          >
            Cancel
          </button>
          <button
            @click="SubmitEditUnit"
                        class="border-[#000130] bg-[#000130] border py-[6px] text-[14px] font-inter px-[12px] text-[#FFFFFF]  font-semibold leading-[28px] rounded-[8px]"

          >
            Save
          </button>
        </div>
      </a-form>
    </a-modal>

    <!-- End unit details -->



  </div>
  <Loader v-else />
</template>

<script setup>
import IconProperties from "@/components/icons/IconProperties.vue";
import {
  CreateNewProperty,
  getProvinces,
  FetchProperties,
  FetchUnitTypes,
} from "@/api/properties";
import { AddTenants, EditPropertyUnit } from "@/api/properties";
import Button from "@/components/Button/Button.vue";
import Table from "@/components/V2Table.vue";
import TableHeader from "@/components/TableHeader.vue";
import BasePagination from "@/components/BasePagination.vue";
import DropdownButton from "@/components/V2ServiceRequestsDropDown.vue";
import { useUserStore } from "@/store";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import { reactive } from "vue";
import { useToast } from "vue-toast-notification";
import DocumentIcon from "@/components/icons/DocumentIcon.vue";
import AccomodationBg from "@/components/icons/AccomodationBg.vue";
import { useOptionsStore } from "@/stores/options";
import FIleUploader from "@/components/FIleUploader.vue";
import { uploadImage } from "@/api/properties";
import { options } from "less";
import { FetchLandlords } from "@/api/properties";
import UniversalButton from "@/components/Button/UniversalButton.vue";
import PropertyCard from "@/components/PropertyCard.vue";
import Loader from "@/components/Loader.vue";
import { getPropertyInfo } from "@/api/properties";
const editUnitModal = ref(false)
const selectedUnit = ref({
  referenceNumber: "",
  price: "",
  securityDeposit: "",
  availabilityDate: "",
  occupancyStatus: 1,
  unitImg: []
});

const SubmitEditUnit = async () => {
  const payload = {
    unitId: selectedUnit.value.unitId,
    refNumber: selectedUnit.value.referenceNumber,
    rentPrice: selectedUnit.value.price,
    securityDeposit: selectedUnit.value.securityDeposit,
    availabilityDate: selectedUnit.value.availabilityDate,
    occupancyStatus: selectedUnit.value.occupancyStatus,
    unitImg: selectedUnit.value.unitImg
  };
  const response = await EditPropertyUnit(payload);
  const toast = useToast();
  toast.success("Succsfully updated the unit");
  editUnitModal.value = false;
};
const tenantLoading = ref(false)
const createTenant = async () => {
  tenantLoading.value = true;
  let firstname, lastname;
  const [splittedfirstname, splittedlastname] = tenantForm.value.FullName.split(" ");
  firstname = splittedfirstname;
  lastname = splittedlastname;
  const toast = useToast();
  const payload = {
    emailAddress: tenantForm.value.emailAddress,
    firstname,
    lastname: lastname || "",
    dob: "",
    phoneNumber: tenantForm.value.phoneNumber,
    accountType: 0,
    accountRefNumber: "",
    contractRequest: {
      unitId: tenantForm.value.unitId,
      isActive: true,
      startDate: tenantForm.value.leasestartDate,
      endDate: tenantForm.value.leaseendDate,
      rentRate: 0,
    },
  };
  console.log(payload, "payload");
  const response = await AddTenants(payload)
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
const showAddTenantModal = ref(false)
const viewUnitModal = ref(false)
const tenantTab= ref('single')

const tenantForm = ref({
  FullName: null,
  emailAddress: null,
  phoneNumber: null,
  leasestartDate: null,
  leaseendDate: null
}) 
const loadingItem = ref(false)
const handleViewProperty = async (id) => {
  selectedPropertyInfoId.value = id;
  loadingItem.value = true
  const response = await getPropertyInfo(id)
  const {propertydata, propertyunits, propertyAmenities} = response
  propertyDetails.value = propertydata;
  propertyUnitIInfo.value = propertyunits;
  propertyAmenitiess.value = propertyAmenities;
  showPropertyDetailsModal.value = true;
  loadingItem.value = false
};
const propertyDetails = ref(null)
const propertyAmenitiess = ref(null)
const propertyUnitIInfo = ref(null)
const selectedPropertyInfoId = ref(null)
const showPropertyDetailsModal = ref(false)
const allProvinces = ref([]);
const fetchingData = ref(false);
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
  fetchingData.value = true;
  const query = {
    size: pageSize.value,
    page: page,
    query: "",
  };
  FetchProperties(store.userProfile.referenceID, query)
    .then((response) => {
      fetchingData.value = false;

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
    availabilityDate: null,
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
  city: null,
  zipCode: "",
  province: null,
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
      availabilityDate: null,
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

:deep(.tenant-details-tabs .ant-tabs-nav) {
  margin-bottom: 0;
}
:deep(.tenant-details-tabs .ant-tabs-tab) {
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  font-family: "Inter";
  line-height: 20px;
  color: #00000066;
  border: #000000 1px solid;
  border: none !important;
  margin: 0;
  margin-right: 14px;
}
:deep(.ant-tabs-nav::before) {
  border-bottom: none !important;
}

:deep(.tenant-details-tabs .ant-tabs-nav-wrap) {
  border: none !important;
}
.tenant-details-tabs .ant-tabs-tab-active {
  background: #23234a !important;
  color: #fff !important;
}
.tenant-details-tabs .ant-tabs-ink-bar {
  display: none;
}
.tenant-details-tabs .ant-tabs-nav-list {
  width: 100%;
  display: flex;
}
.tenant-details-tabs .ant-tabs-tab {
  flex: 1;
}
</style>
