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
                  class="w-full h-[52px]"
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
        <a-form v-if="stage == 4">
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
        <a-form v-if="stage == 3">
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
import { uploadImage } from "@/api/properties";
import { options } from "less";
import { FetchLandlords } from "@/api/properties";
const allProvinces = ref([]);
const fetchProvinces = async () => {
  const response = await getProvinces();
  allProvinces.value = response;
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
  await optionsStore.fetchAmenities();
  await optionsStore.fetchUnitTypes();
  await fetchAllLandlords();

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
async function handleNext() {
  if (stage.value == 4) {
    await SubmitCreateProperty();
    return;
  }
  stage.value++;
  // if (stage.value == 3) {
  //   //submit
  // }
}
function disableNext() {
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
