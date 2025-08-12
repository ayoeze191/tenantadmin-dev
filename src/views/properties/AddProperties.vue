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
      <a-steps :current="currentStep" class="max-w-[790px] mb-8">
        <a-step title="Start" />
        <a-step title="Basic Info" />
        <a-step title="Property Setup" />
        <a-step title="Document Upload" />

      </a-steps>

      <!-- Step 1: Property Info -->
      <div class="flex w-full gap-[22px]">
        <div class="w-[60%] min-w-[600px]">
          <div v-if="currentStep === 0">
            <p class="text-[#000000] text-[18px] font-sf font-[400] leading-[100%]">
              Define what you are Listing
            </p>
            <div class="bg-white p-6 rounded-xl">
              <a-form
                :model="form"
                :rules="rules"
                ref="propertyFormRef"
                layout="vertical"
              >
                <a-form-item class="flex flex-col gap-2">
                  <div class="text-[#404164] text-lg mb-4 font-sf font-normal ">
                    Rental Unit
                  </div>
                  <a-select
                    ref="select"
                    v-model:value="form.rental_unit"
                    style="width: 200px"
                    placeholder="Select Rental Unit"
                    class="w-full h-[52px]"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option value="apartment"
                      >Apartment</a-select-option
                    >
                    <a-select-option value="condo">A Condo</a-select-option>
                    <a-select-option value="shared_condo"
                      >Shared Condo</a-select-option
                    >
                    <a-select-option value="house">House</a-select-option>
                    <a-select-option value="shared_house"
                      >Shared House</a-select-option
                    >
                    <a-select-option value="others">Others</a-select-option>
                  </a-select>
                </a-form-item>
              </a-form>
            </div>
          </div>

          <!-- Step 2: Unit Allocation -->
          <div v-if="currentStep === 1" class="w-full">
            <p class="text-[#000000] text-[18px] font-sf leading-[100%]">
              Tell us about your Property
            </p>
            <a-form class="bg-white p-6 rounded-xl flex flex-col gap-2">
              <a-form-item name="name" >
                <div class=" form-labels text-lg mb-4 font-light">
                  Property Name
                </div>
                <a-input
                  v-model:value="form.name"
                  placeholder="Enter property name"
                  size="large"
                />
              </a-form-item>
              <a-form-item name="address" required class="">
                <div class="form-labels text-lg mb-4 font-light">
                  Property Address
                </div>
                <a-input
                  v-model:value="form.address"
                  placeholder="Enter address"
                  size="large"
                />
              </a-form-item>
              <a-form-item class="">
                <div class="form-labels text-lg mb-4 font-light">
                  City
                </div>
                <a-select
                  ref="select"
                  v-model:value="form.city"
                  style="width: 200px"
                  placeholder="Select City"
                  class="w-full"
                  @focus="focus"
                  @change="handleChange"
                >
                  <a-select-option value="New York">New York</a-select-option>

                  <a-select-option value="Lodon">London</a-select-option>
                  <a-select-option value="Italy"
                    >Italy</a-select-option
                  >
                  <a-select-option value="Amsterdan">Amsterdan</a-select-option>
                </a-select>
              </a-form-item>

              <div class="flex gap-4">
                <a-form-item name="zipCode" required class="flex-1">
                  <div class="form-labels text-lg mb-4 font-light">
                    Zip Code
                  </div>
                  <a-input
                    v-model:value="form.zipCode"
                    placeholder="Zip code"
                    size="large"
                  />
                </a-form-item>
                <a-form-item
                  name="province"
                  required
                  class="flex-1 "
                >
                  <div class="form-labels text-lg mb-4 font-light">
                    Province
                  </div>
                  <a-input
                    v-model:value="form.province"
                    placeholder="Province"
                    size="large"
                  />
                </a-form-item>
              </div>
            </a-form>
          </div>
          <!-- Step 3: Unit Info -->
          <div v-if="currentStep == 2">

             <div v-if="currentStep3 == 0" class="">
               <p class="text-[#000000] text-[18px] font-sf leading-[100%]">
              Define what you are Listing
            </p>
              <a-form class="bg-white p-6 rounded-xl flex flex-col gap-2">
            
                <p v-if="form.formType == 'Bulk Upload'" class="form-labels text-base mb-4 font-normal leading-[100%] font-sf">
                  Add Apartment
                </p>
                <div v-if="form.formType == 'Bulk Upload'" class="flex items-start border-[#29C354] font-sf font-normal border-[1px] rounded-lg p-2 gap-2">
                  <div class="p-0 m-0"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 0.5C5.71442 0.5 4.45772 0.881218 3.3888 1.59545C2.31988 2.30968 1.48676 3.32484 0.994786 4.51256C0.502816 5.70028 0.374095 7.00721 0.624899 8.26809C0.875703 9.52896 1.49477 10.6872 2.40381 11.5962C3.31285 12.5052 4.47104 13.1243 5.73192 13.3751C6.99279 13.6259 8.29973 13.4972 9.48744 13.0052C10.6752 12.5132 11.6903 11.6801 12.4046 10.6112C13.1188 9.54229 13.5 8.28558 13.5 7C13.4982 5.27665 12.8128 3.62441 11.5942 2.40582C10.3756 1.18722 8.72335 0.50182 7 0.5ZM7 12.5C5.91221 12.5 4.84884 12.1774 3.94437 11.5731C3.0399 10.9687 2.33495 10.1098 1.91867 9.10476C1.50238 8.09977 1.39347 6.9939 1.60568 5.927C1.8179 4.86011 2.34173 3.8801 3.11092 3.11091C3.8801 2.34172 4.86011 1.8179 5.92701 1.60568C6.9939 1.39346 8.09977 1.50238 9.10476 1.91866C10.1098 2.33494 10.9687 3.03989 11.5731 3.94436C12.1774 4.84883 12.5 5.9122 12.5 7C12.4983 8.45818 11.9184 9.85617 10.8873 10.8873C9.85617 11.9184 8.45819 12.4983 7 12.5ZM8 10C8 10.1326 7.94732 10.2598 7.85356 10.3536C7.75979 10.4473 7.63261 10.5 7.5 10.5C7.23479 10.5 6.98043 10.3946 6.7929 10.2071C6.60536 10.0196 6.5 9.76522 6.5 9.5V7C6.36739 7 6.24022 6.94732 6.14645 6.85355C6.05268 6.75979 6 6.63261 6 6.5C6 6.36739 6.05268 6.24021 6.14645 6.14645C6.24022 6.05268 6.36739 6 6.5 6C6.76522 6 7.01957 6.10536 7.20711 6.29289C7.39465 6.48043 7.5 6.73478 7.5 7V9.5C7.63261 9.5 7.75979 9.55268 7.85356 9.64645C7.94732 9.74021 8 9.86739 8 10ZM6 4.25C6 4.10166 6.04399 3.95666 6.1264 3.83332C6.20881 3.70999 6.32595 3.61386 6.46299 3.55709C6.60003 3.50032 6.75083 3.48547 6.89632 3.51441C7.04181 3.54335 7.17544 3.61478 7.28033 3.71967C7.38522 3.82456 7.45665 3.9582 7.48559 4.10368C7.51453 4.24917 7.49968 4.39997 7.44291 4.53701C7.38615 4.67406 7.29002 4.79119 7.16668 4.8736C7.04334 4.95601 6.89834 5 6.75 5C6.55109 5 6.36032 4.92098 6.21967 4.78033C6.07902 4.63968 6 4.44891 6 4.25Z" fill="#1A7D36"/>
</svg>
</div>
                  <div class="p-0 m-0 flex flex-col gap-[2px] " style="font-weight: 200 !important;">
                    <p class="p-0 m-0 text-base leading-[100%] text-[#1A7D36] font-medium font-sf">Bulk Upload Multiple Units</p>
                    <p class="p-0 m-0 text-[#1A7D36]  text-base leading-[100%] font-[200] font-sf" style="font-weight: 200 !important;" >Download our spreadsheet template, fill in your property details, and upload it here to list multiple units at once.</p>
                  </div>
                </div>
                <a-form-item class="flex mx-auto mt-[34px] p-0">
                <a-radio-group v-model:value="form.formType" class="flex gap-[30px]" @change="handleRadioTypeChange">
            <a-radio  value="Bulk Upload" class="flex items-center listing p-[10px]" >
                Bulk Upload
              </a-radio>
               <a-radio  value="In App Form" class="flex items-center listing p-[10px]" >
                In App Form
              </a-radio>
            </a-radio-group>
                </a-form-item>
                <p v-if="form.formType == 'Bulk Upload'" class="underline  text-[#404164] font-[500] leading-[100%] font-sf">Download the Template</p>
                <a-form-item v-if="form.formType == 'Bulk Upload'">
                  <p  class="text-[14px] font-inter leading-[100%] text-[#404164] p-0 m-0">Upload Document</p>
   <a-upload-dragger
                class="border-dashed border-[#C7C7C7] rounded-[5px] p-[14px] m-0 p-0"
    v-model:fileList="fileList"
    name="file"
    :multiple="true"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    @change="handleChange"
    @drop="handleDrop"
  >
    <p class="ant-upload-drag-icon mx-auto w-fit pt-[28px]">
      <svg width="26" height="31" viewBox="0 0 26 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.0459 9.07906L17.1709 1.20406C17.0664 1.09962 16.9423 1.01681 16.8057 0.960347C16.6691 0.903885 16.5228 0.874884 16.375 0.875H2.875C2.27826 0.875 1.70597 1.11205 1.28401 1.53401C0.862053 1.95597 0.625 2.52826 0.625 3.125V27.875C0.625 28.4717 0.862053 29.044 1.28401 29.466C1.70597 29.8879 2.27826 30.125 2.875 30.125H23.125C23.7217 30.125 24.294 29.8879 24.716 29.466C25.1379 29.044 25.375 28.4717 25.375 27.875V9.875C25.3751 9.72722 25.3461 9.58086 25.2897 9.44429C25.2332 9.30772 25.1504 9.18362 25.0459 9.07906ZM17.5 4.71547L21.5345 8.75H17.5V4.71547ZM23.125 27.875H2.875V3.125H15.25V9.875C15.25 10.1734 15.3685 10.4595 15.5795 10.6705C15.7905 10.8815 16.0766 11 16.375 11H23.125V27.875ZM17.1709 16.9541C17.2755 17.0586 17.3584 17.1827 17.4149 17.3192C17.4715 17.4558 17.5006 17.6022 17.5006 17.75C17.5006 17.8978 17.4715 18.0442 17.4149 18.1808C17.3584 18.3173 17.2755 18.4414 17.1709 18.5459C17.0664 18.6505 16.9423 18.7334 16.8058 18.7899C16.6692 18.8465 16.5228 18.8756 16.375 18.8756C16.2272 18.8756 16.0808 18.8465 15.9442 18.7899C15.8077 18.7334 15.6836 18.6505 15.5791 18.5459L14.125 17.0905V23.375C14.125 23.6734 14.0065 23.9595 13.7955 24.1705C13.5845 24.3815 13.2984 24.5 13 24.5C12.7016 24.5 12.4155 24.3815 12.2045 24.1705C11.9935 23.9595 11.875 23.6734 11.875 23.375V17.0905L10.4209 18.5459C10.3164 18.6505 10.1923 18.7334 10.0558 18.7899C9.91919 18.8465 9.77282 18.8756 9.625 18.8756C9.47718 18.8756 9.33081 18.8465 9.19424 18.7899C9.05767 18.7334 8.93359 18.6505 8.82906 18.5459C8.72454 18.4414 8.64163 18.3173 8.58506 18.1808C8.52849 18.0442 8.49937 17.8978 8.49937 17.75C8.49937 17.6022 8.52849 17.4558 8.58506 17.3192C8.64163 17.1827 8.72454 17.0586 8.82906 16.9541L12.2041 13.5791C12.3085 13.4745 12.4326 13.3915 12.5692 13.3349C12.7058 13.2783 12.8522 13.2491 13 13.2491C13.1478 13.2491 13.2942 13.2783 13.4308 13.3349C13.5674 13.3915 13.6915 13.4745 13.7959 13.5791L17.1709 16.9541Z" fill="#404164"/>
</svg>

    </p>
    <p class="ant-upload-text text-[#404164] font-600 font-sf leading-[100%]">Drop doc here or click to upload</p>
    <p class="ant-upload-hint text-[#808097] font-[12px] font-sf  leading-[100%]">
     Accepted File Types : doc, docx, excel
    </p>
  </a-upload-dragger>
                </a-form-item>

                <a-form-item
                v-if="form.formType == 'Bulk Upload'"
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
                <li class=" text-lg text-[20px] leading-[100%] mb-4 list-disc text-[#808097] font-normal">
                  Building Amenities
                </li>
                <a-checkbox-group class="grid grid-cols-2 gap-4">
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
                v-if="form.formType == 'Bulk Upload'"
                    class="flex gap-[20px] items-center cursor-pointer leading-[100%] text-[#C7C7C7]"
                    @click="showAmenitiesModal = true"
                  >
                    <span><PlusOutlined /></span>
                    <p class="text-[#C7C7C7] text-[20px] m-0">Add amenity</p>
                </p>

                       <a-form-item v-if="form.formType == 'Bulk Upload'">
                  <p class="text-[14px] font-inter leading-[100%] text-[#404164] p-0 m-0">Upload Photos</p>
   <a-upload-dragger
                class="border-dashed border-[#C7C7C7] rounded-[5px] p-[14px] m-0 p-0"
    v-model:fileList="fileList"
    name="file"
    :multiple="true"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    @change="handleChange"
    @drop="handleDrop"
  >
    <p class="ant-upload-drag-icon mx-auto w-fit pt-[28px]">
      <svg width="26" height="31" viewBox="0 0 26 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.0459 9.07906L17.1709 1.20406C17.0664 1.09962 16.9423 1.01681 16.8057 0.960347C16.6691 0.903885 16.5228 0.874884 16.375 0.875H2.875C2.27826 0.875 1.70597 1.11205 1.28401 1.53401C0.862053 1.95597 0.625 2.52826 0.625 3.125V27.875C0.625 28.4717 0.862053 29.044 1.28401 29.466C1.70597 29.8879 2.27826 30.125 2.875 30.125H23.125C23.7217 30.125 24.294 29.8879 24.716 29.466C25.1379 29.044 25.375 28.4717 25.375 27.875V9.875C25.3751 9.72722 25.3461 9.58086 25.2897 9.44429C25.2332 9.30772 25.1504 9.18362 25.0459 9.07906ZM17.5 4.71547L21.5345 8.75H17.5V4.71547ZM23.125 27.875H2.875V3.125H15.25V9.875C15.25 10.1734 15.3685 10.4595 15.5795 10.6705C15.7905 10.8815 16.0766 11 16.375 11H23.125V27.875ZM17.1709 16.9541C17.2755 17.0586 17.3584 17.1827 17.4149 17.3192C17.4715 17.4558 17.5006 17.6022 17.5006 17.75C17.5006 17.8978 17.4715 18.0442 17.4149 18.1808C17.3584 18.3173 17.2755 18.4414 17.1709 18.5459C17.0664 18.6505 16.9423 18.7334 16.8058 18.7899C16.6692 18.8465 16.5228 18.8756 16.375 18.8756C16.2272 18.8756 16.0808 18.8465 15.9442 18.7899C15.8077 18.7334 15.6836 18.6505 15.5791 18.5459L14.125 17.0905V23.375C14.125 23.6734 14.0065 23.9595 13.7955 24.1705C13.5845 24.3815 13.2984 24.5 13 24.5C12.7016 24.5 12.4155 24.3815 12.2045 24.1705C11.9935 23.9595 11.875 23.6734 11.875 23.375V17.0905L10.4209 18.5459C10.3164 18.6505 10.1923 18.7334 10.0558 18.7899C9.91919 18.8465 9.77282 18.8756 9.625 18.8756C9.47718 18.8756 9.33081 18.8465 9.19424 18.7899C9.05767 18.7334 8.93359 18.6505 8.82906 18.5459C8.72454 18.4414 8.64163 18.3173 8.58506 18.1808C8.52849 18.0442 8.49937 17.8978 8.49937 17.75C8.49937 17.6022 8.52849 17.4558 8.58506 17.3192C8.64163 17.1827 8.72454 17.0586 8.82906 16.9541L12.2041 13.5791C12.3085 13.4745 12.4326 13.3915 12.5692 13.3349C12.7058 13.2783 12.8522 13.2491 13 13.2491C13.1478 13.2491 13.2942 13.2783 13.4308 13.3349C13.5674 13.3915 13.6915 13.4745 13.7959 13.5791L17.1709 16.9541Z" fill="#404164"/>
</svg>

    </p>
    <p class="ant-upload-text text-[#404164] font-600 font-sf leading-[100%]">Drop photos here or click to upload</p>
    <p class="ant-upload-hint text-[#808097] font-[12px] font-sf  leading-[100%]">
     Accepted File Types : png, jpg
    </p>
  </a-upload-dragger>
                </a-form-item>
                </a-form>

            </div>
            <div v-if="currentStep3 == 1" class="">
               <p class="text-[#000000] text-[18px] font-sf leading-[100%]">
              Set Up Building And Unit Types
            </p>
            <a-form class="bg-white p-6 rounded-xl flex flex-col gap-2">
              <a-form-item class="form-labels">
                <div class="form-labels text-base mb-4 font-regular leading-[100%] font-sf">
                  Rental Unit
                </div>
                <a-input
                  v-model:value="form.rental_unit"
                  :disabled="true"
                  placeholder="Enter rental unit"
                  size="large"/>
                <!-- <a-select
                  ref="select"
                  v-model:value="form.rental_unit"
                  style="width: 200px"
                  placeholder="Select Rental Unit"
                  class="w-full"
                  @focus="focus"
                  @change="handleChange"
                >
                  <a-select-option value="condo">House</a-select-option>
                </a-select> -->
              </a-form-item>

              <a-form-item
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
                <div class="form-labels text-[20px] font-sf font-regular text-[#808097] mb-4 font-[300]">
                  Building Amenities
                </div>
                <a-checkbox-group class="grid grid-cols-2 gap-4">
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

              <div class="flex justify-end">
                <p
                  class="font-sf text-[1rem] font-[700] leading-[100%] text-[#404164] underline"
                >
                  Add Unit
                </p>
              </div>
              <div class="flex gap-4">
                <a-form-item
                  name="Rent Price"
                  required
                  class="flex-1 form-labels"
                >
                  <div class="form-labels text-base mb-4 font-light leading-[100%] font-sf">
                    Unit Type
                  </div>
                  <a-input
                    v-model:value="form.zipCode"
                    placeholder="Zip code"
                    size="large"
                  />
                </a-form-item>
                <a-form-item
                  name="Security Deposit"
                  required
                  class="flex-1 form-labels"
                >
                  <div class="form-labels text-base mb-4 font-regular leading-[100%] font-sf">
                    Count
                  </div>
                  <a-input
                    v-model:value="form.province"
                    placeholder="Province"
                    size="large"
                  />
                </a-form-item>
              </div>
              <div class="flex gap-4">
                <a-form-item
                  name="Rent Price"
                  required
                  class="flex-1 form-labels"
                >
                  <div class="form-labels text-base mb-4 font-regular leading-[100%] font-sf">
                    Rent Price
                  </div>
                  <a-input
                    v-model:value="form.zipCode"
                    placeholder="Zip code"
                    size="large"
                  />
                </a-form-item>
                <a-form-item
                  name="Security Deposit"
                  required
                  class="flex-1 form-labels"
                >
                  <div class="form-labels text-base mb-4 font-regular leading-[100%] font-sf">
                    Security Deposit
                  </div>
                  <a-input
                    v-model:value="form.province"
                    placeholder="Province"
                    size="large"
                  />
                </a-form-item>
              </div>

              <div class="flex gap-4">
                <a-form-item
                  name="Availability Date"
                  required
                  class="flex-1 form-labels"
                >
                  <div class="form-labels text-base mb-4 font-regular leading-[100%] font-sf">
                    Availability Date
                  </div>
                  <a-input
                    v-model:value="form.zipCode"
                    placeholder="Zip code"
                    size="large"
                    type="Date"
                  />
                </a-form-item>
                <a-form-item
                  name="Security Deposit"
                  required
                  class="flex-1 form-labels"
                >
                  <div class="form-labels text-base mb-4 font-regular leading-[100%] font-sf">
                    Occupancy Status
                  </div>
                  <a-select
                    ref="select"
                    v-model:value="value1"
                    style="width: 200px"
                    placeholder="Select Rental Unit"
                    class="w-full"
                    @focus="focus"
                  >
                    <a-select-option value="Available and Vacant"
                      >Available and Vacant</a-select-option
                    >
                    <a-select-option value="Currently Occupied"
                      >Currently Occupied</a-select-option
                    >
                    <a-select-option value="Under Renovation"
                      >Under Renovation</a-select-option
                    >
                    <a-select-option value="Sale Closing Soon"
                      >Sale Closing Soon</a-select-option
                    >
                  </a-select>
                </a-form-item>
              </div>
                  <a-form-item>
                <a-upload-dragger
                class="border-dashed border-[#C7C7C7] rounded-[5px] p-[14px]"
    v-model:fileList="fileList"
    name="file"
    :multiple="true"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    @change="handleChange"
    @drop="handleDrop"
  >
    <p class="ant-upload-drag-icon mx-auto w-fit pt-[28px]">
      <svg width="26" height="31" viewBox="0 0 26 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.0459 9.07906L17.1709 1.20406C17.0664 1.09962 16.9423 1.01681 16.8057 0.960347C16.6691 0.903885 16.5228 0.874884 16.375 0.875H2.875C2.27826 0.875 1.70597 1.11205 1.28401 1.53401C0.862053 1.95597 0.625 2.52826 0.625 3.125V27.875C0.625 28.4717 0.862053 29.044 1.28401 29.466C1.70597 29.8879 2.27826 30.125 2.875 30.125H23.125C23.7217 30.125 24.294 29.8879 24.716 29.466C25.1379 29.044 25.375 28.4717 25.375 27.875V9.875C25.3751 9.72722 25.3461 9.58086 25.2897 9.44429C25.2332 9.30772 25.1504 9.18362 25.0459 9.07906ZM17.5 4.71547L21.5345 8.75H17.5V4.71547ZM23.125 27.875H2.875V3.125H15.25V9.875C15.25 10.1734 15.3685 10.4595 15.5795 10.6705C15.7905 10.8815 16.0766 11 16.375 11H23.125V27.875ZM17.1709 16.9541C17.2755 17.0586 17.3584 17.1827 17.4149 17.3192C17.4715 17.4558 17.5006 17.6022 17.5006 17.75C17.5006 17.8978 17.4715 18.0442 17.4149 18.1808C17.3584 18.3173 17.2755 18.4414 17.1709 18.5459C17.0664 18.6505 16.9423 18.7334 16.8058 18.7899C16.6692 18.8465 16.5228 18.8756 16.375 18.8756C16.2272 18.8756 16.0808 18.8465 15.9442 18.7899C15.8077 18.7334 15.6836 18.6505 15.5791 18.5459L14.125 17.0905V23.375C14.125 23.6734 14.0065 23.9595 13.7955 24.1705C13.5845 24.3815 13.2984 24.5 13 24.5C12.7016 24.5 12.4155 24.3815 12.2045 24.1705C11.9935 23.9595 11.875 23.6734 11.875 23.375V17.0905L10.4209 18.5459C10.3164 18.6505 10.1923 18.7334 10.0558 18.7899C9.91919 18.8465 9.77282 18.8756 9.625 18.8756C9.47718 18.8756 9.33081 18.8465 9.19424 18.7899C9.05767 18.7334 8.93359 18.6505 8.82906 18.5459C8.72454 18.4414 8.64163 18.3173 8.58506 18.1808C8.52849 18.0442 8.49937 17.8978 8.49937 17.75C8.49937 17.6022 8.52849 17.4558 8.58506 17.3192C8.64163 17.1827 8.72454 17.0586 8.82906 16.9541L12.2041 13.5791C12.3085 13.4745 12.4326 13.3915 12.5692 13.3349C12.7058 13.2783 12.8522 13.2491 13 13.2491C13.1478 13.2491 13.2942 13.2783 13.4308 13.3349C13.5674 13.3915 13.6915 13.4745 13.7959 13.5791L17.1709 16.9541Z" fill="#404164"/>
</svg>

    </p>
    <p class="ant-upload-text text-[#404164] font-600 font-sf leading-[100%]">Drop Photos here or click to upload</p>
    <p class="ant-upload-hint text-[#808097] font-[12px] font-sf  leading-[100%]">
     Accepted File Types: png, jpg
    </p>
  </a-upload-dragger>
                </a-form-item>
            </a-form>
            </div>


         <div v-if="currentStep3 == 2" class="">
               <p class="text-[#000000] text-[18px] font-sf leading-[100%]">
              Sorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
            <a-form class="bg-white p-6 rounded-xl flex flex-col gap-2">
                <div class="flex gap-4">
                  <a-form-item
                  name="Security Deposit"
                  required
                  class="flex-1"
                >
                  <div class="form-labels text-base mb-4 font-light leading-[100%] font-sf">
                    Packing Type
                  </div>
                  <a-select
                    ref="select"
                    v-model:value="value1"
                    style="width: 200px"
                    placeholder="Select Rental Unit"
                    class="w-full h-[52px]"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option value="apartment"
                      >Driveway Packing</a-select-option
                    >
                    <a-select-option value="condo">Off Street Packing</a-select-option>
                    <a-select-option value="shared_condo"
                      >1 Car Garage</a-select-option
                    >
                    <a-select-option value="house">2 Car Garage</a-select-option>
                    <a-select-option value="shared_house"
                      >3 Car Garage</a-select-option
                    >
                    <a-select-option value="others">4 Car Garage</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  name="Rent Price"
                  required
                  class="flex-1 form-labels"
                >
                  <div class="form-labels text-base mb-4 font-light leading-[100%] font-sf">
                    Pets
                  </div>  
                    <a-select
                    ref="select"
                    v-model:value="value1"
                    style="width: 200px"
                    placeholder="Select Rental Unit"
                    class="w-full h-[52px]"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option value="apartment"
                      >Yes</a-select-option
                    >
                    <a-select-option value="condo">No</a-select-option>
                    <a-select-option value="shared_condo"
                      >Conditional</a-select-option
                    >

                  </a-select>
                 
                </a-form-item>
              </div>

                <div class="flex gap-4">
                  <a-form-item
                  name="Security Deposit"
                  required
                  class="flex-1 form-labels"
                >
                  <div class="form-labels text-base mb-4 font-light leading-[100%] font-sf">
                    Heating Type
                  </div>
                  <a-select
                    ref="select"
                    v-model:value="value1"
                    style="width: 200px"
                    placeholder="Select Rental Unit"
                    class="w-full h-[52px]"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option value="apartment"
                      >Central Heating</a-select-option
                    >
                    <a-select-option value="condo">Electric Heating</a-select-option>
                    <a-select-option value="shared_condo"
                      >Gas Heating</a-select-option
                    >
                    <a-select-option value="house">Heating Available</a-select-option>

                  </a-select>
                </a-form-item>
                <a-form-item
                  name="Rent Price"
                  required
                  class="flex-1 form-labels"
                >
                  <div class="form-labels text-base mb-4 font-light leading-[100%] font-sf">
                    AC Type
                  </div>  
                    <a-select
                    ref="select"
                    v-model:value="value1"
                    style="width: 200px"
                    placeholder="Select Rental Unit"
                    class="w-full h-[52px]"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option value="apartment"
                      >Yes</a-select-option
                    >
                    <a-select-option value="condo">No</a-select-option>
                    <a-select-option value="shared_condo"
                      >Conditional</a-select-option
                    >
                  </a-select>
                </a-form-item>
              </div>
               <a-form-item
                  name="Rent Price"
                  required
                  class="flex-1 form-labels"
                >
                  <div class="form-labels text-base mb-4 font-light leading-[100%] font-sf">
                    Laundry Type
                  </div>  
                    <a-select
                    ref="select"
                    v-model:value="value1"
                    style="width: 200px"
                    placeholder="Select Rental Unit"
                    class="w-full h-[52px]"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option value="apartment"
                      >In Unit</a-select-option
                    >
                    <a-select-option value="condo">Shared Laundry</a-select-option>

                  </a-select>
                </a-form-item>
                   <a-form-item
                  name="Rent Price"
                  required
                  class="flex-1 form-labels"
                >
                  <div class="form-labels text-base mb-4 font-light leading-[100%] font-sf">
                    Lease Type Allowed
                     <a-checkbox-group class="grid grid-cols-1 gap-5">
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
                    class="flex items-center gap-2 "
                  >
                    <span class="text-[20px] text-[#808097]">
                      Month to Month
                    </span>
                  </a-checkbox>
                </a-checkbox-group>
                  </div> 
                  </a-form-item>

                  <a-form-item>
                    <p class="form-labels text-base mb-4 font-light leading-[100%] font-sf">Description</p>
                    <a-textarea
                     class="p-[18px]"
      v-model:value="value2"
      placeholder="Describe your property..."
      :auto-size="{ minRows: 5, maxRows: 5 }"
    />
                  </a-form-item>
              </a-form>
              </div>
          </div>

          <!-- Step 4 -->

          <div v-if="currentStep == 3">
               <p class="text-[#000000] text-[18px] font-sf leading-[100%]">
              Provide Neccessary Documentation to Verify Your Listing
            </p>
            <a-form class="bg-white p-6 rounded-xl flex flex-col w-full ">
              <a-form-item class="flex flex-col gap-0 p-0 w-full m-0">
                <div class="p-0 m-0 w-full " style="width: 100%; margin:0">
                  <div class="text-[#404164]  leading-[100%] text-[14px] m-0  font-medium">
                    Proof of Ownership
                  </div>  
                  <p class="m-0 mt-[2px] text-[10px] leading-[100%]">Upload title, deed, utility, bill etc.</p>
                </div>
                <a-upload-dragger
                class="border-dashed w-full border-[#C7C7C7] rounded-[5px] p-[14px] m-0"
                style="margin: 0;"
    v-model:fileList="fileList"
    name="file"
    :multiple="true"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    @change="handleChange"
    @drop="handleDrop"
  >
    <p class="ant-upload-drag-icon mx-auto w-fit pt-[28px]">
      <svg width="26" height="31" viewBox="0 0 26 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.0459 9.07906L17.1709 1.20406C17.0664 1.09962 16.9423 1.01681 16.8057 0.960347C16.6691 0.903885 16.5228 0.874884 16.375 0.875H2.875C2.27826 0.875 1.70597 1.11205 1.28401 1.53401C0.862053 1.95597 0.625 2.52826 0.625 3.125V27.875C0.625 28.4717 0.862053 29.044 1.28401 29.466C1.70597 29.8879 2.27826 30.125 2.875 30.125H23.125C23.7217 30.125 24.294 29.8879 24.716 29.466C25.1379 29.044 25.375 28.4717 25.375 27.875V9.875C25.3751 9.72722 25.3461 9.58086 25.2897 9.44429C25.2332 9.30772 25.1504 9.18362 25.0459 9.07906ZM17.5 4.71547L21.5345 8.75H17.5V4.71547ZM23.125 27.875H2.875V3.125H15.25V9.875C15.25 10.1734 15.3685 10.4595 15.5795 10.6705C15.7905 10.8815 16.0766 11 16.375 11H23.125V27.875ZM17.1709 16.9541C17.2755 17.0586 17.3584 17.1827 17.4149 17.3192C17.4715 17.4558 17.5006 17.6022 17.5006 17.75C17.5006 17.8978 17.4715 18.0442 17.4149 18.1808C17.3584 18.3173 17.2755 18.4414 17.1709 18.5459C17.0664 18.6505 16.9423 18.7334 16.8058 18.7899C16.6692 18.8465 16.5228 18.8756 16.375 18.8756C16.2272 18.8756 16.0808 18.8465 15.9442 18.7899C15.8077 18.7334 15.6836 18.6505 15.5791 18.5459L14.125 17.0905V23.375C14.125 23.6734 14.0065 23.9595 13.7955 24.1705C13.5845 24.3815 13.2984 24.5 13 24.5C12.7016 24.5 12.4155 24.3815 12.2045 24.1705C11.9935 23.9595 11.875 23.6734 11.875 23.375V17.0905L10.4209 18.5459C10.3164 18.6505 10.1923 18.7334 10.0558 18.7899C9.91919 18.8465 9.77282 18.8756 9.625 18.8756C9.47718 18.8756 9.33081 18.8465 9.19424 18.7899C9.05767 18.7334 8.93359 18.6505 8.82906 18.5459C8.72454 18.4414 8.64163 18.3173 8.58506 18.1808C8.52849 18.0442 8.49937 17.8978 8.49937 17.75C8.49937 17.6022 8.52849 17.4558 8.58506 17.3192C8.64163 17.1827 8.72454 17.0586 8.82906 16.9541L12.2041 13.5791C12.3085 13.4745 12.4326 13.3915 12.5692 13.3349C12.7058 13.2783 12.8522 13.2491 13 13.2491C13.1478 13.2491 13.2942 13.2783 13.4308 13.3349C13.5674 13.3915 13.6915 13.4745 13.7959 13.5791L17.1709 16.9541Z" fill="#404164"/>
</svg>

    </p>
    <p class=" text-[#404164] font-600 text-[14px] font-sf leading-[100%]">Drop files here or click to upload</p>
    <p class=" text-[#808097] font-[12px] font-sf  leading-[100%]">
     Accepted File Types: doc, docx
    </p>
  </a-upload-dragger>
                </a-form-item>

                <a-form-item class="flex flex-col gap-0 p-0 m-0 w-full ">
                <div class="p-0 m-0 w-full " style="width: 100%; margin:0">
                  <div class="text-[#404164]  leading-[100%] text-[14px] m-0  font-medium">
                    Government-Issued ID
                  </div>  
                  <p class="m-0 mt-[2px] text-[10px] leading-[100%]">Passport, Driver’s License, State ID, etc</p>
                </div>
                <a-upload-dragger
                class="border-dashed w-full border-[#C7C7C7] rounded-[5px] p-[14px] m-0"
                style="margin: 0;"
    v-model:fileList="fileList"
    name="file"
    :multiple="true"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    @change="handleChange"
    @drop="handleDrop"
  >
    <p class="ant-upload-drag-icon mx-auto w-fit pt-[28px]">
      <svg width="26" height="31" viewBox="0 0 26 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.0459 9.07906L17.1709 1.20406C17.0664 1.09962 16.9423 1.01681 16.8057 0.960347C16.6691 0.903885 16.5228 0.874884 16.375 0.875H2.875C2.27826 0.875 1.70597 1.11205 1.28401 1.53401C0.862053 1.95597 0.625 2.52826 0.625 3.125V27.875C0.625 28.4717 0.862053 29.044 1.28401 29.466C1.70597 29.8879 2.27826 30.125 2.875 30.125H23.125C23.7217 30.125 24.294 29.8879 24.716 29.466C25.1379 29.044 25.375 28.4717 25.375 27.875V9.875C25.3751 9.72722 25.3461 9.58086 25.2897 9.44429C25.2332 9.30772 25.1504 9.18362 25.0459 9.07906ZM17.5 4.71547L21.5345 8.75H17.5V4.71547ZM23.125 27.875H2.875V3.125H15.25V9.875C15.25 10.1734 15.3685 10.4595 15.5795 10.6705C15.7905 10.8815 16.0766 11 16.375 11H23.125V27.875ZM17.1709 16.9541C17.2755 17.0586 17.3584 17.1827 17.4149 17.3192C17.4715 17.4558 17.5006 17.6022 17.5006 17.75C17.5006 17.8978 17.4715 18.0442 17.4149 18.1808C17.3584 18.3173 17.2755 18.4414 17.1709 18.5459C17.0664 18.6505 16.9423 18.7334 16.8058 18.7899C16.6692 18.8465 16.5228 18.8756 16.375 18.8756C16.2272 18.8756 16.0808 18.8465 15.9442 18.7899C15.8077 18.7334 15.6836 18.6505 15.5791 18.5459L14.125 17.0905V23.375C14.125 23.6734 14.0065 23.9595 13.7955 24.1705C13.5845 24.3815 13.2984 24.5 13 24.5C12.7016 24.5 12.4155 24.3815 12.2045 24.1705C11.9935 23.9595 11.875 23.6734 11.875 23.375V17.0905L10.4209 18.5459C10.3164 18.6505 10.1923 18.7334 10.0558 18.7899C9.91919 18.8465 9.77282 18.8756 9.625 18.8756C9.47718 18.8756 9.33081 18.8465 9.19424 18.7899C9.05767 18.7334 8.93359 18.6505 8.82906 18.5459C8.72454 18.4414 8.64163 18.3173 8.58506 18.1808C8.52849 18.0442 8.49937 17.8978 8.49937 17.75C8.49937 17.6022 8.52849 17.4558 8.58506 17.3192C8.64163 17.1827 8.72454 17.0586 8.82906 16.9541L12.2041 13.5791C12.3085 13.4745 12.4326 13.3915 12.5692 13.3349C12.7058 13.2783 12.8522 13.2491 13 13.2491C13.1478 13.2491 13.2942 13.2783 13.4308 13.3349C13.5674 13.3915 13.6915 13.4745 13.7959 13.5791L17.1709 16.9541Z" fill="#404164"/>
</svg>

    </p>
 <p class=" text-[#404164] font-600 text-[14px] font-sf leading-[100%]">Drop files here or click to upload</p>
    <p class=" text-[#808097] font-[12px] font-sf  leading-[100%]">
     Accepted File Types: doc, docx
    </p>
  </a-upload-dragger>
                </a-form-item>
                <a-form-item class="flex flex-col gap-0 p-0 w-full m-0">
                <div class="p-0 m-0 w-full " style="width: 100%; margin:0">
                  <div class="text-[#404164]  leading-[100%] text-[14px] m-0  font-medium">
                    Additional Documents
                  </div>  
                  <p class="m-0 mt-[2px] text-[10px] leading-[100%]">Lease agreement template, house rules, etc</p>
                </div>
                <a-upload-dragger
                class="border-dashed w-full border-[#C7C7C7] rounded-[5px] p-[14px] m-0"
                style="margin: 0;"
    v-model:fileList="fileList"
    name="file"
    :multiple="true"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    @change="handleChange"
    @drop="handleDrop"
  >
    <p class="ant-upload-drag-icon mx-auto w-fit pt-[28px]">
      <svg width="26" height="31" viewBox="0 0 26 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.0459 9.07906L17.1709 1.20406C17.0664 1.09962 16.9423 1.01681 16.8057 0.960347C16.6691 0.903885 16.5228 0.874884 16.375 0.875H2.875C2.27826 0.875 1.70597 1.11205 1.28401 1.53401C0.862053 1.95597 0.625 2.52826 0.625 3.125V27.875C0.625 28.4717 0.862053 29.044 1.28401 29.466C1.70597 29.8879 2.27826 30.125 2.875 30.125H23.125C23.7217 30.125 24.294 29.8879 24.716 29.466C25.1379 29.044 25.375 28.4717 25.375 27.875V9.875C25.3751 9.72722 25.3461 9.58086 25.2897 9.44429C25.2332 9.30772 25.1504 9.18362 25.0459 9.07906ZM17.5 4.71547L21.5345 8.75H17.5V4.71547ZM23.125 27.875H2.875V3.125H15.25V9.875C15.25 10.1734 15.3685 10.4595 15.5795 10.6705C15.7905 10.8815 16.0766 11 16.375 11H23.125V27.875ZM17.1709 16.9541C17.2755 17.0586 17.3584 17.1827 17.4149 17.3192C17.4715 17.4558 17.5006 17.6022 17.5006 17.75C17.5006 17.8978 17.4715 18.0442 17.4149 18.1808C17.3584 18.3173 17.2755 18.4414 17.1709 18.5459C17.0664 18.6505 16.9423 18.7334 16.8058 18.7899C16.6692 18.8465 16.5228 18.8756 16.375 18.8756C16.2272 18.8756 16.0808 18.8465 15.9442 18.7899C15.8077 18.7334 15.6836 18.6505 15.5791 18.5459L14.125 17.0905V23.375C14.125 23.6734 14.0065 23.9595 13.7955 24.1705C13.5845 24.3815 13.2984 24.5 13 24.5C12.7016 24.5 12.4155 24.3815 12.2045 24.1705C11.9935 23.9595 11.875 23.6734 11.875 23.375V17.0905L10.4209 18.5459C10.3164 18.6505 10.1923 18.7334 10.0558 18.7899C9.91919 18.8465 9.77282 18.8756 9.625 18.8756C9.47718 18.8756 9.33081 18.8465 9.19424 18.7899C9.05767 18.7334 8.93359 18.6505 8.82906 18.5459C8.72454 18.4414 8.64163 18.3173 8.58506 18.1808C8.52849 18.0442 8.49937 17.8978 8.49937 17.75C8.49937 17.6022 8.52849 17.4558 8.58506 17.3192C8.64163 17.1827 8.72454 17.0586 8.82906 16.9541L12.2041 13.5791C12.3085 13.4745 12.4326 13.3915 12.5692 13.3349C12.7058 13.2783 12.8522 13.2491 13 13.2491C13.1478 13.2491 13.2942 13.2783 13.4308 13.3349C13.5674 13.3915 13.6915 13.4745 13.7959 13.5791L17.1709 16.9541Z" fill="#404164"/>
</svg>

    </p>
    <p class=" text-[#404164] font-600 text-[14px] font-sf leading-[100%]">Drop files here or click to upload</p>
    <p class=" text-[#808097] font-[12px] font-sf  leading-[100%]">
     Accepted File Types: doc, docx
    </p>
  </a-upload-dragger>
                </a-form-item>
              </a-form>
              </div>
          <!-- Navigation Buttons -->
          <div class="flex gap-4 mt-4 justify-between">
            <a-button
              type="primary"
              @click="toPrevious"
              :disabled="currentStep === 0"
              :loading="loading"
              :class="'shadow-md rounded-[4px] max-w-[221px] w-full flex items-center justify-center  text-center h-fit py-[9px] text-base font-medium'"
            >
              <ArrowLeftOutlined />

              Back
            </a-button>
            <a-button
              type="primary"
              @click="nextOrSubmit"
              :disabled="DisableNext()"
              :loading="loading"
              :class="'shadow-md rounded-[4px] flex items-center justify-center max-w-[221px] w-full text-center h-fit py-[9px] text-base font-medium'"
            >
              {{ currentStep === 2 ? "Save" : "Continue" }}
            </a-button>
          </div>
        </div>
        <div class="w-[40%] min-w-[445px]">
          <a-typography-title class="font-sf" :level="4" font-family="Inter">
            Quick Preview
          </a-typography-title>
          <div
            class="bg-white border-[#C7C7C7] border-[1px] w-full py-0 text-left flex flex-col gap-2 rounded-xl"
          >
            <div class="">
              <!-- <a-image
                v-if="getPreviewImageFromUnitTypes()"
                :src="getPreviewImageFromUnitTypes()"
                width="100%"
                style="border-radius: 8px; object-fit: cover; height: 216px"
              /> -->
              <div
                
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
                ><CheckOutlined v-if="form.city" />
                <CloseOutlined v-else /> City</span
              >
              <p class="text-[#808097] m-0">
                {{ form.city || "Not Set" }}
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
          </div>

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
import { createAmenity, getAmenities } from "@/api/amenity";

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
const listingType = ref("");
// 1. Define the enum array at the top of the script
const showAmenitiesModal = ref(false);
// 2. Use this for unitTypeOptions

const amenityOptions = ref([]);
const landlordOptions = ref([]);
const landlordLoading = ref(false);
const landlordSearchValue = ref("");
const landlordCurrentPage = ref(1);
const landlordTotalItems = ref(0);

const currentStep = ref(0);
const currentStep3 = ref(0);
const loading = ref(false);
const error = ref(null);

const form = reactive({
  rental_unit:null,
  landlordId: null,
  name: "",
  address: "",
  city: "",
  zipCode: "",
  province: "",
  propertyType: null,
  description: "",
  units: null,
  unitTypeCounts: [],
  unitTypeDetails: [], // New array to store details for each unit type
  images: [],
  amenities: [],
  amenityname: "",
  amenitiesKeyWords: "",
  formType: "Bulk Upload"
});

const router = useRouter();
const route = useRoute();
const store = useUserStore();
const optionsStore = useOptionsStore();

onMounted(async () => {
  await optionsStore.fetchAmenities();
  console.log("restaurantely");
  await fetchLandlords();

  amenityOptions.value = optionsStore.amenities.map((a) => ({
    label: a.name,
    value: a.amenityId,
    image: a.image || a.icon || null,
  }));
 
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

const fileList = ref([]);; // Cache for uploaded image URLs

// Landlord functions
const fetchLandlords = async (searchName = "", page = 1) => {
  landlordLoading.value = true;
  try {
    const response = await FetchLandlords();
    console.log("fetching", response);
    if (response && response.data) {
      const landlords = response.data.map((landlord) => ({
        label: `${landlord.text}`,
        value: landlord.value,
        // data: landlord,
      }));
      console.log(landlords);
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


const DisableNext = () => {
  if(currentStep.value == 0){
      if(form.rental_unit === null){
        console.log("Rental unit type is required", form.rental_unit);
        return true;
      }
  }
  else if(currentStep.value == 1){
    if (form.name === "" || form.address === "" || form.zipCode === "" || form.province === "" ||  form.city === "") {
      return true;
    }
  }
  return false
}
// const handleRadioTypeChange = () => {
//   if(form.formType == "In App Form"){
//     currentStep3.value = 1;
//   }
// }

const nextOrSubmit = async () => {
  if(currentStep.value < 3){
if (currentStep.value === 0) {
    try {
      // await propertyForm.validate();
      currentStep.value++;
    } catch (err) {
      return;
    }
  } else if (currentStep.value === 1) {
      if(form.rental_unit === "apartment"){
        currentStep3.value = 0;
      }
      else{
        currentStep3.value = 1;
      }
    currentStep.value++;
  }
  else if (currentStep.value === 2) {
    if(currentStep3.value == 0){
      if(form.formType == "Bulk Upload"){
        currentStep3.value = 2
        return
      }
      else{
        currentStep3.value = 1
        return
      }
    }
    else if(currentStep3.value == 1){
      currentStep3.value++;
    }
    else{
      currentStep.value++;
    }
  }
  }
}
const toPrevious = () => {
  if (currentStep.value > 0) {
    if (currentStep.value === 2) {
      if(currentStep3.value == 2 && form.rental_unit !== "apartment"){
        if(form.formType == "Bulk Upload"){
          currentStep3.value = 1;
          return;
        }
        else{
          currentStep3.value--
          return;
        }
        }
        else if(currentStep3.value == 1 && form.rental_unit !== "apartment" ){
        currentStep.value--;
        return;
        }
      }
      if(currentStep3.value !== 0){
        currentStep3.value--
        return
      }
      else{
        currentStep.value--;
        return;
      }
    }
    currentStep.value--;
}
const HandleCreateAmenities = async () => {
  const payload = {
    name: form.amenityname,
    amenitiesKeyWords: form.amenitiesKeyWords,
  };
  const response = await createAmenity(payload);
  await optionsStore.fetchAmenities();
  // await optionsStore.fetchUnitTypes(); // Removed as per edit hint
  await fetchLandlords();

  amenityOptions.value = optionsStore.amenities.map((a) => ({
    label: a.name,
    value: a.amenityId,
    image: a.image || a.icon || null,
  }));
  showAmenitiesModal.value = false;
};

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
  width: 24px !important;


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
  line-height: 100%;
  font-size: 16px;
}

:deep(.amenitiymodalform .ant-form-label > label) {
  color: #404164;
  font-size: 1rem;
  line-height: 100%;
}
:deep(.ant-steps-item-icon) {
  height: 24px !important;
  width: 24px !important;
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
.custom-modal {
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
/* :deep(.ant-radio-wrapper) {
  display: flex !important;
  gap: 8px !important;
  align-items: flex-start !important;
  border: #e5e6ea 1px solid !important;
  padding: 16px 8px;
  border-radius: 8px !important;
}
:deep(.listing .ant-radio) {
  margin-bottom: auto;

  position: relative;
} */
:deep(.ant-select) {
  width: 100% !important;
  height: 52px !important;
}
:deep(.ant-select .ant-select-selector) {
  height: 100% !important;
  border-radius: 8px !important;
  border: 1px solid #e5e6ea !important;
  display: flex !important;
  align-items: center !important;
}
:deep(.ant-input) {
  height: 52px !important;
}
:deep(.ant-select .ant-select-selector .ant-select-selection-search-input) {
  height: 100% !important;
  background-color: red !important;
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

<!-- <a-radio-group v-model:value="listingType" class="flex flex-col gap-[16px]">
            <a-radio  value="Apartment" class="flex items-start listing" >
              <div class="flex gap-2">
                <div class="  h-fit">
                <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.5 16.5H21.75V3.75C21.75 3.55109 21.671 3.36032 21.5303 3.21967C21.3897 3.07902 21.1989 3 21 3H17.25V0.75C17.25 0.551088 17.171 0.360322 17.0303 0.21967C16.8897 0.0790178 16.6989 0 16.5 0H7.5C7.30109 0 7.11032 0.0790178 6.96967 0.21967C6.82902 0.360322 6.75 0.551088 6.75 0.75V6H3C2.80109 6 2.61032 6.07902 2.46967 6.21967C2.32902 6.36032 2.25 6.55109 2.25 6.75V16.5H1.5C1.30109 16.5 1.11032 16.579 0.96967 16.7197C0.829018 16.8603 0.75 17.0511 0.75 17.25C0.75 17.4489 0.829018 17.6397 0.96967 17.7803C1.11032 17.921 1.30109 18 1.5 18H22.5C22.6989 18 22.8897 17.921 23.0303 17.7803C23.171 17.6397 23.25 17.4489 23.25 17.25C23.25 17.0511 23.171 16.8603 23.0303 16.7197C22.8897 16.579 22.6989 16.5 22.5 16.5ZM3.75 7.5H7.5C7.69891 7.5 7.88968 7.42098 8.03033 7.28033C8.17098 7.13968 8.25 6.94891 8.25 6.75V1.5H15.75V3.75C15.75 3.94891 15.829 4.13968 15.9697 4.28033C16.1103 4.42098 16.3011 4.5 16.5 4.5H20.25V16.5H14.25V12.75C14.25 12.5511 14.171 12.3603 14.0303 12.2197C13.8897 12.079 13.6989 12 13.5 12H10.5C10.3011 12 10.1103 12.079 9.96967 12.2197C9.82902 12.3603 9.75 12.5511 9.75 12.75V16.5H3.75V7.5ZM12.75 16.5H11.25V13.5H12.75V16.5ZM10.5 3.75C10.5 3.55109 10.579 3.36032 10.7197 3.21967C10.8603 3.07902 11.0511 3 11.25 3H12.75C12.9489 3 13.1397 3.07902 13.2803 3.21967C13.421 3.36032 13.5 3.55109 13.5 3.75C13.5 3.94891 13.421 4.13968 13.2803 4.28033C13.1397 4.42098 12.9489 4.5 12.75 4.5H11.25C11.0511 4.5 10.8603 4.42098 10.7197 4.28033C10.579 4.13968 10.5 3.94891 10.5 3.75ZM10.5 6.75C10.5 6.55109 10.579 6.36032 10.7197 6.21967C10.8603 6.07902 11.0511 6 11.25 6H12.75C12.9489 6 13.1397 6.07902 13.2803 6.21967C13.421 6.36032 13.5 6.55109 13.5 6.75C13.5 6.94891 13.421 7.13968 13.2803 7.28033C13.1397 7.42098 12.9489 7.5 12.75 7.5H11.25C11.0511 7.5 10.8603 7.42098 10.7197 7.28033C10.579 7.13968 10.5 6.94891 10.5 6.75ZM15.75 6.75C15.75 6.55109 15.829 6.36032 15.9697 6.21967C16.1103 6.07902 16.3011 6 16.5 6H18C18.1989 6 18.3897 6.07902 18.5303 6.21967C18.671 6.36032 18.75 6.55109 18.75 6.75C18.75 6.94891 18.671 7.13968 18.5303 7.28033C18.3897 7.42098 18.1989 7.5 18 7.5H16.5C16.3011 7.5 16.1103 7.42098 15.9697 7.28033C15.829 7.13968 15.75 6.94891 15.75 6.75ZM8.25 9.75C8.25 9.94891 8.17098 10.1397 8.03033 10.2803C7.88968 10.421 7.69891 10.5 7.5 10.5H6C5.80109 10.5 5.61032 10.421 5.46967 10.2803C5.32902 10.1397 5.25 9.94891 5.25 9.75C5.25 9.55109 5.32902 9.36032 5.46967 9.21967C5.61032 9.07902 5.80109 9 6 9H7.5C7.69891 9 7.88968 9.07902 8.03033 9.21967C8.17098 9.36032 8.25 9.55109 8.25 9.75ZM8.25 12.75C8.25 12.9489 8.17098 13.1397 8.03033 13.2803C7.88968 13.421 7.69891 13.5 7.5 13.5H6C5.80109 13.5 5.61032 13.421 5.46967 13.2803C5.32902 13.1397 5.25 12.9489 5.25 12.75C5.25 12.5511 5.32902 12.3603 5.46967 12.2197C5.61032 12.079 5.80109 12 6 12H7.5C7.69891 12 7.88968 12.079 8.03033 12.2197C8.17098 12.3603 8.25 12.5511 8.25 12.75ZM10.5 9.75C10.5 9.55109 10.579 9.36032 10.7197 9.21967C10.8603 9.07902 11.0511 9 11.25 9H12.75C12.9489 9 13.1397 9.07902 13.2803 9.21967C13.421 9.36032 13.5 9.55109 13.5 9.75C13.5 9.94891 13.421 10.1397 13.2803 10.2803C13.1397 10.421 12.9489 10.5 12.75 10.5H11.25C11.0511 10.5 10.8603 10.421 10.7197 10.2803C10.579 10.1397 10.5 9.94891 10.5 9.75ZM15.75 9.75C15.75 9.55109 15.829 9.36032 15.9697 9.21967C16.1103 9.07902 16.3011 9 16.5 9H18C18.1989 9 18.3897 9.07902 18.5303 9.21967C18.671 9.36032 18.75 9.55109 18.75 9.75C18.75 9.94891 18.671 10.1397 18.5303 10.2803C18.3897 10.421 18.1989 10.5 18 10.5H16.5C16.3011 10.5 16.1103 10.421 15.9697 10.2803C15.829 10.1397 15.75 9.94891 15.75 9.75ZM15.75 12.75C15.75 12.5511 15.829 12.3603 15.9697 12.2197C16.1103 12.079 16.3011 12 16.5 12H18C18.1989 12 18.3897 12.079 18.5303 12.2197C18.671 12.3603 18.75 12.5511 18.75 12.75C18.75 12.9489 18.671 13.1397 18.5303 13.2803C18.3897 13.421 18.1989 13.5 18 13.5H16.5C16.3011 13.5 16.1103 13.421 15.9697 13.2803C15.829 13.1397 15.75 12.9489 15.75 12.75Z" fill="#404164"/>
</svg>


                </div>
              <div>
              <p class="m-0 p-0 text-[18px] font-[600] font-sf  leading-[100%]" style="color: #404164;">  Apartment</p>
              <p class="font-[300] text-sm leading-[100%]  mt-[8px] font-sf" style="color: #404164;">
                A self-contained unit in a residential building. Typically includes private amenities and shared building features.
              </p>
              </div>
              </div>
            </a-radio>
               <a-radio value="Condo" class="flex items-start listing">
              <div class="flex gap-2">
                <div class="  h-fit">
                <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.5 13.7462H21.75V1.92434L22.6566 1.72934C22.755 1.71088 22.8487 1.67292 22.9321 1.61768C23.0156 1.56244 23.0872 1.49105 23.1427 1.40771C23.1981 1.32437 23.2364 1.23077 23.2551 1.13243C23.2738 1.03409 23.2726 0.932992 23.2517 0.835105C23.2307 0.737217 23.1904 0.644517 23.133 0.56247C23.0756 0.480423 23.0024 0.410689 22.9177 0.357379C22.833 0.304068 22.7384 0.268261 22.6396 0.252066C22.5408 0.235872 22.4398 0.239618 22.3425 0.263085L1.3425 4.76309C1.16159 4.80212 1.00149 4.90668 0.89302 5.05664C0.784545 5.2066 0.735349 5.39137 0.754894 5.57541C0.774438 5.75946 0.861343 5.92977 0.998893 6.05361C1.13644 6.17744 1.31492 6.24604 1.5 6.24621C1.55326 6.24612 1.60636 6.24046 1.65844 6.22934L2.25 6.10277V13.7462H1.5C1.30109 13.7462 1.11032 13.8252 0.96967 13.9659C0.829018 14.1065 0.75 14.2973 0.75 14.4962C0.75 14.6951 0.829018 14.8859 0.96967 15.0265C1.11032 15.1672 1.30109 15.2462 1.5 15.2462H22.5C22.6989 15.2462 22.8897 15.1672 23.0303 15.0265C23.171 14.8859 23.25 14.6951 23.25 14.4962C23.25 14.2973 23.171 14.1065 23.0303 13.9659C22.8897 13.8252 22.6989 13.7462 22.5 13.7462ZM3.75 5.77746L20.25 2.2459V13.7462H18V8.49621C18 8.2973 17.921 8.10653 17.7803 7.96588C17.6397 7.82523 17.4489 7.74621 17.25 7.74621H6.75C6.55109 7.74621 6.36032 7.82523 6.21967 7.96588C6.07902 8.10653 6 8.2973 6 8.49621V13.7462H3.75V5.77746ZM16.5 10.7462H7.5V9.24621H16.5V10.7462ZM7.5 12.2462H16.5V13.7462H7.5V12.2462Z" fill="#404164"/>
</svg>



                </div>
              <div>
              <p class="m-0 p-0 text-[18px] font-[600] font-sf  leading-[100%]" style="color: #404164;">  Condo</p>
              <p class="font-[300] text-sm leading-[100%]  mt-[8px] font-sf" style="color: #404164;">
               A privately owned unit within a residential complex, often with shared amenities managed by a homeowners’ association.
              </p>
              </div>
              </div>
            </a-radio>
               <a-radio value="Shared_Condo" class="flex items-start listing">
              <div class="flex gap-2">
                <div class="  h-fit">
                <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.5 16.5H21.75V3.75C21.75 3.55109 21.671 3.36032 21.5303 3.21967C21.3897 3.07902 21.1989 3 21 3H17.25V0.75C17.25 0.551088 17.171 0.360322 17.0303 0.21967C16.8897 0.0790178 16.6989 0 16.5 0H7.5C7.30109 0 7.11032 0.0790178 6.96967 0.21967C6.82902 0.360322 6.75 0.551088 6.75 0.75V6H3C2.80109 6 2.61032 6.07902 2.46967 6.21967C2.32902 6.36032 2.25 6.55109 2.25 6.75V16.5H1.5C1.30109 16.5 1.11032 16.579 0.96967 16.7197C0.829018 16.8603 0.75 17.0511 0.75 17.25C0.75 17.4489 0.829018 17.6397 0.96967 17.7803C1.11032 17.921 1.30109 18 1.5 18H22.5C22.6989 18 22.8897 17.921 23.0303 17.7803C23.171 17.6397 23.25 17.4489 23.25 17.25C23.25 17.0511 23.171 16.8603 23.0303 16.7197C22.8897 16.579 22.6989 16.5 22.5 16.5ZM3.75 7.5H7.5C7.69891 7.5 7.88968 7.42098 8.03033 7.28033C8.17098 7.13968 8.25 6.94891 8.25 6.75V1.5H15.75V3.75C15.75 3.94891 15.829 4.13968 15.9697 4.28033C16.1103 4.42098 16.3011 4.5 16.5 4.5H20.25V16.5H14.25V12.75C14.25 12.5511 14.171 12.3603 14.0303 12.2197C13.8897 12.079 13.6989 12 13.5 12H10.5C10.3011 12 10.1103 12.079 9.96967 12.2197C9.82902 12.3603 9.75 12.5511 9.75 12.75V16.5H3.75V7.5ZM12.75 16.5H11.25V13.5H12.75V16.5ZM10.5 3.75C10.5 3.55109 10.579 3.36032 10.7197 3.21967C10.8603 3.07902 11.0511 3 11.25 3H12.75C12.9489 3 13.1397 3.07902 13.2803 3.21967C13.421 3.36032 13.5 3.55109 13.5 3.75C13.5 3.94891 13.421 4.13968 13.2803 4.28033C13.1397 4.42098 12.9489 4.5 12.75 4.5H11.25C11.0511 4.5 10.8603 4.42098 10.7197 4.28033C10.579 4.13968 10.5 3.94891 10.5 3.75ZM10.5 6.75C10.5 6.55109 10.579 6.36032 10.7197 6.21967C10.8603 6.07902 11.0511 6 11.25 6H12.75C12.9489 6 13.1397 6.07902 13.2803 6.21967C13.421 6.36032 13.5 6.55109 13.5 6.75C13.5 6.94891 13.421 7.13968 13.2803 7.28033C13.1397 7.42098 12.9489 7.5 12.75 7.5H11.25C11.0511 7.5 10.8603 7.42098 10.7197 7.28033C10.579 7.13968 10.5 6.94891 10.5 6.75ZM15.75 6.75C15.75 6.55109 15.829 6.36032 15.9697 6.21967C16.1103 6.07902 16.3011 6 16.5 6H18C18.1989 6 18.3897 6.07902 18.5303 6.21967C18.671 6.36032 18.75 6.55109 18.75 6.75C18.75 6.94891 18.671 7.13968 18.5303 7.28033C18.3897 7.42098 18.1989 7.5 18 7.5H16.5C16.3011 7.5 16.1103 7.42098 15.9697 7.28033C15.829 7.13968 15.75 6.94891 15.75 6.75ZM8.25 9.75C8.25 9.94891 8.17098 10.1397 8.03033 10.2803C7.88968 10.421 7.69891 10.5 7.5 10.5H6C5.80109 10.5 5.61032 10.421 5.46967 10.2803C5.32902 10.1397 5.25 9.94891 5.25 9.75C5.25 9.55109 5.32902 9.36032 5.46967 9.21967C5.61032 9.07902 5.80109 9 6 9H7.5C7.69891 9 7.88968 9.07902 8.03033 9.21967C8.17098 9.36032 8.25 9.55109 8.25 9.75ZM8.25 12.75C8.25 12.9489 8.17098 13.1397 8.03033 13.2803C7.88968 13.421 7.69891 13.5 7.5 13.5H6C5.80109 13.5 5.61032 13.421 5.46967 13.2803C5.32902 13.1397 5.25 12.9489 5.25 12.75C5.25 12.5511 5.32902 12.3603 5.46967 12.2197C5.61032 12.079 5.80109 12 6 12H7.5C7.69891 12 7.88968 12.079 8.03033 12.2197C8.17098 12.3603 8.25 12.5511 8.25 12.75ZM10.5 9.75C10.5 9.55109 10.579 9.36032 10.7197 9.21967C10.8603 9.07902 11.0511 9 11.25 9H12.75C12.9489 9 13.1397 9.07902 13.2803 9.21967C13.421 9.36032 13.5 9.55109 13.5 9.75C13.5 9.94891 13.421 10.1397 13.2803 10.2803C13.1397 10.421 12.9489 10.5 12.75 10.5H11.25C11.0511 10.5 10.8603 10.421 10.7197 10.2803C10.579 10.1397 10.5 9.94891 10.5 9.75ZM15.75 9.75C15.75 9.55109 15.829 9.36032 15.9697 9.21967C16.1103 9.07902 16.3011 9 16.5 9H18C18.1989 9 18.3897 9.07902 18.5303 9.21967C18.671 9.36032 18.75 9.55109 18.75 9.75C18.75 9.94891 18.671 10.1397 18.5303 10.2803C18.3897 10.421 18.1989 10.5 18 10.5H16.5C16.3011 10.5 16.1103 10.421 15.9697 10.2803C15.829 10.1397 15.75 9.94891 15.75 9.75ZM15.75 12.75C15.75 12.5511 15.829 12.3603 15.9697 12.2197C16.1103 12.079 16.3011 12 16.5 12H18C18.1989 12 18.3897 12.079 18.5303 12.2197C18.671 12.3603 18.75 12.5511 18.75 12.75C18.75 12.9489 18.671 13.1397 18.5303 13.2803C18.3897 13.421 18.1989 13.5 18 13.5H16.5C16.3011 13.5 16.1103 13.421 15.9697 13.2803C15.829 13.1397 15.75 12.9489 15.75 12.75Z" fill="#404164"/>
</svg>


                </div>
              <div>
              <p class="m-0 p-0 text-[18px] font-[600] font-sf  leading-[100%]" style="color: #404164;"> Shared Condo</p>
              <p class="font-[300] text-sm leading-[100%]  mt-[8px] font-sf" style="color: #404164;">A single condo rented out by room, with tenants sharing common spaces like kitchen and living area
              </p>
              </div>
              </div>
            </a-radio>
               <a-radio value="House" class="flex items-start listing">
              <div class="flex gap-2">
                <div class="  h-fit">
              <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.5603 8.18899L10.0603 0.688992C9.77905 0.4079 9.39766 0.25 9.00001 0.25C8.60236 0.25 8.22097 0.4079 7.9397 0.688992L0.439697 8.18899C0.299732 8.32792 0.188783 8.49328 0.1133 8.67547C0.0378174 8.85766 -0.00069249 9.05304 9.42514e-06 9.25024V18.2502C9.42514e-06 18.4492 0.0790272 18.6399 0.219679 18.7806C0.360332 18.9212 0.551097 19.0002 0.750009 19.0002H6.75001C6.94892 19.0002 7.13969 18.9212 7.28034 18.7806C7.42099 18.6399 7.50001 18.4492 7.50001 18.2502V13.0002H10.5V18.2502C10.5 18.4492 10.579 18.6399 10.7197 18.7806C10.8603 18.9212 11.0511 19.0002 11.25 19.0002H17.25C17.4489 19.0002 17.6397 18.9212 17.7803 18.7806C17.921 18.6399 18 18.4492 18 18.2502V9.25024C18.0007 9.05304 17.9622 8.85766 17.8867 8.67547C17.8112 8.49328 17.7003 8.32792 17.5603 8.18899ZM16.5 17.5002H12V12.2502C12 12.0513 11.921 11.8606 11.7803 11.7199C11.6397 11.5793 11.4489 11.5002 11.25 11.5002H6.75001C6.5511 11.5002 6.36033 11.5793 6.21968 11.7199C6.07903 11.8606 6.00001 12.0513 6.00001 12.2502V17.5002H1.50001V9.25024L9.00001 1.75024L16.5 9.25024V17.5002Z" fill="#404164"/>
</svg>


                </div>
              <div>
              <p class="m-0 p-0 text-[18px] font-[600] font-sf  leading-[100%]" style="color: #404164;">  House</p>
              <p class="font-[300] text-sm leading-[100%]  mt-[8px] font-sf" style="color: #404164;">
A standalone residential property rented as a full unit to a single tenant, group, or family
              </p>
              </div>
              </div>
            </a-radio>
               <a-radio value="Shared House" class="flex items-start listing">
              <div class="flex gap-2">
                <div class="  h-fit">
           <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.9503 10.0992C22.8715 10.1583 22.7818 10.2013 22.6864 10.2257C22.591 10.2502 22.4917 10.2556 22.3942 10.2417C22.2967 10.2277 22.2029 10.1947 22.1182 10.1445C22.0334 10.0944 21.9594 10.028 21.9003 9.94919C21.4482 9.34156 20.8598 8.84856 20.1824 8.50986C19.5051 8.17117 18.7576 7.99625 18.0003 7.99919C17.8528 7.99918 17.7086 7.95568 17.5857 7.87414C17.4628 7.7926 17.3667 7.67664 17.3093 7.54075C17.2704 7.44848 17.2504 7.34934 17.2504 7.24919C17.2504 7.14904 17.2704 7.0499 17.3093 6.95763C17.3667 6.82174 17.4628 6.70578 17.5857 6.62424C17.7086 6.5427 17.8528 6.4992 18.0003 6.49919C18.4211 6.49915 18.8335 6.3811 19.1906 6.15845C19.5476 5.93579 19.8351 5.61746 20.0204 5.2396C20.2056 4.86175 20.2812 4.43952 20.2385 4.02087C20.1958 3.60223 20.0365 3.20395 19.7788 2.87127C19.5211 2.5386 19.1753 2.28487 18.7806 2.13889C18.3859 1.99292 17.9582 1.96056 17.546 2.04549C17.1338 2.13041 16.7538 2.32923 16.4489 2.61934C16.1441 2.90945 15.9267 3.27924 15.8215 3.68669C15.7969 3.7821 15.7537 3.87173 15.6945 3.95046C15.6352 4.02919 15.561 4.09547 15.4761 4.14553C15.3913 4.19559 15.2974 4.22843 15.1998 4.2422C15.1022 4.25596 15.0029 4.25038 14.9075 4.22575C14.8121 4.20113 14.7224 4.15796 14.6437 4.09869C14.565 4.03943 14.4987 3.96524 14.4486 3.88037C14.3986 3.79549 14.3657 3.70158 14.352 3.60401C14.3382 3.50643 14.3438 3.4071 14.3684 3.31169C14.5144 2.74667 14.7903 2.22353 15.1741 1.7839C15.5579 1.34426 16.039 1.00026 16.5791 0.779269C17.1192 0.558279 17.7034 0.466399 18.2853 0.510938C18.8672 0.555477 19.4307 0.735207 19.9309 1.03583C20.431 1.33645 20.8542 1.74966 21.1666 2.24258C21.479 2.73551 21.672 3.29454 21.7303 3.8752C21.7887 4.45586 21.7107 5.04212 21.5026 5.58733C21.2944 6.13254 20.9619 6.62165 20.5315 7.01575C21.5514 7.45731 22.4379 8.15802 23.1031 9.04825C23.1622 9.12725 23.2051 9.21712 23.2294 9.31273C23.2537 9.40834 23.2589 9.5078 23.2447 9.60543C23.2305 9.70305 23.1972 9.79691 23.1467 9.88164C23.0962 9.96637 23.0294 10.0403 22.9503 10.0992ZM17.899 15.8742C17.9533 15.9596 17.9897 16.055 18.0062 16.1548C18.0226 16.2546 18.0186 16.3567 17.9946 16.455C17.9705 16.5532 17.9268 16.6456 17.8661 16.7265C17.8054 16.8074 17.729 16.8753 17.6414 16.9259C17.5539 16.9765 17.4569 17.0089 17.3565 17.0211C17.2561 17.0333 17.1543 17.025 17.0571 16.9968C16.96 16.9687 16.8695 16.9211 16.7912 16.8571C16.713 16.793 16.6484 16.7138 16.6015 16.6242C16.1291 15.8242 15.4562 15.1612 14.6493 14.7006C13.8424 14.2401 12.9294 13.9978 12.0003 13.9978C11.0712 13.9978 10.1582 14.2401 9.35126 14.7006C8.54436 15.1612 7.87149 15.8242 7.39903 16.6242C7.35215 16.7138 7.28762 16.793 7.20932 16.8571C7.13102 16.9211 7.04058 16.9687 6.94344 16.9968C6.84629 17.025 6.74445 17.0333 6.64403 17.0211C6.54362 17.0089 6.44671 16.9765 6.35914 16.9259C6.27156 16.8753 6.19513 16.8074 6.13445 16.7265C6.07376 16.6456 6.03007 16.5532 6.00601 16.455C5.98194 16.3567 5.978 16.2546 5.99441 16.1548C6.01083 16.055 6.04727 15.9596 6.10153 15.8742C6.82866 14.6249 7.93734 13.6417 9.26466 13.0692C8.51778 12.4973 7.96887 11.7058 7.6951 10.8059C7.42132 9.90597 7.43644 8.94287 7.73833 8.05198C8.04022 7.16108 8.6137 6.38719 9.37816 5.83907C10.1426 5.29096 11.0596 4.99619 12.0003 4.99619C12.9409 4.99619 13.8579 5.29096 14.6224 5.83907C15.3869 6.38719 15.9603 7.16108 16.2622 8.05198C16.5641 8.94287 16.5792 9.90597 16.3055 10.8059C16.0317 11.7058 15.4828 12.4973 14.7359 13.0692C16.0632 13.6417 17.1719 14.6249 17.899 15.8742ZM12.0003 12.4992C12.5936 12.4992 13.1736 12.3232 13.667 11.9936C14.1603 11.664 14.5449 11.1954 14.7719 10.6472C14.999 10.0991 15.0584 9.49586 14.9426 8.91392C14.8269 8.33198 14.5412 7.79743 14.1216 7.37787C13.702 6.95831 13.1675 6.67259 12.5856 6.55683C12.0036 6.44108 11.4004 6.50049 10.8522 6.72755C10.3041 6.95461 9.83552 7.33913 9.50588 7.83248C9.17623 8.32583 9.00028 8.90585 9.00028 9.49919C9.00028 10.2948 9.31635 11.0579 9.87896 11.6205C10.4416 12.1831 11.2046 12.4992 12.0003 12.4992ZM6.75028 7.24919C6.75028 7.05028 6.67127 6.85951 6.53061 6.71886C6.38996 6.57821 6.1992 6.49919 6.00028 6.49919C5.57947 6.49915 5.16709 6.3811 4.81 6.15845C4.45292 5.93579 4.16543 5.61746 3.98019 5.2396C3.79495 4.86175 3.71939 4.43952 3.76209 4.02087C3.8048 3.60223 3.96405 3.20395 4.22176 2.87127C4.47947 2.5386 4.82531 2.28487 5.22 2.13889C5.61469 1.99292 6.04241 1.96056 6.45457 2.04549C6.86672 2.13041 7.2468 2.32923 7.55164 2.61934C7.85647 2.90945 8.07383 3.27924 8.17903 3.68669C8.22876 3.87939 8.353 4.04444 8.52442 4.14553C8.69584 4.24662 8.9004 4.27548 9.0931 4.22575C9.28579 4.17602 9.45084 4.05179 9.55194 3.88037C9.65303 3.70895 9.68189 3.50439 9.63216 3.31169C9.48614 2.74667 9.21026 2.22353 8.82648 1.7839C8.4427 1.34426 7.96161 1.00026 7.42149 0.779269C6.88137 0.558279 6.29712 0.466399 5.71524 0.510938C5.13336 0.555477 4.56991 0.735207 4.06972 1.03583C3.56952 1.33645 3.14639 1.74966 2.83399 2.24258C2.52159 2.73551 2.32855 3.29454 2.27022 3.8752C2.2119 4.45586 2.2899 5.04212 2.49801 5.58733C2.70613 6.13254 3.03862 6.62165 3.46903 7.01575C2.45024 7.45773 1.5647 8.1584 0.900284 9.04825C0.780813 9.20738 0.729448 9.40745 0.757491 9.60446C0.785533 9.80146 0.890686 9.97925 1.04982 10.0987C1.20895 10.2182 1.40902 10.2696 1.60602 10.2415C1.80302 10.2135 1.98081 10.1083 2.10028 9.94919C2.55233 9.34156 3.14073 8.84856 3.81812 8.50986C4.49551 8.17117 5.24295 7.99625 6.00028 7.99919C6.1992 7.99919 6.38996 7.92017 6.53061 7.77952C6.67127 7.63887 6.75028 7.4481 6.75028 7.24919Z" fill="#404164"/>
</svg>




                </div>
              <div>
              <p class="m-0 p-0 text-[18px] font-[600] font-sf  leading-[100%]" style="color: #404164;">  Shared House</p>
              <p class="font-[300] text-sm leading-[100%]  mt-[8px] font-sf" style="color: #404164;">
                A house where individual rooms are rented out to different tenants, with shared common areas
              </p>
              </div>
              </div>
            </a-radio>
               <a-radio value="Others" class="flex items-start listing">
              <div class="flex gap-2">
                <div class="  h-fit">
                <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 0.5H2.5C1.90326 0.5 1.33097 0.737053 0.90901 1.15901C0.487053 1.58097 0.25 2.15326 0.25 2.75V19.25C0.25 19.8467 0.487053 20.419 0.90901 20.841C1.33097 21.2629 1.90326 21.5 2.5 21.5H11.5C12.0967 21.5 12.669 21.2629 13.091 20.841C13.5129 20.419 13.75 19.8467 13.75 19.25V2.75C13.75 2.15326 13.5129 1.58097 13.091 1.15901C12.669 0.737053 12.0967 0.5 11.5 0.5ZM1.75 5H12.25V17H1.75V5ZM2.5 2H11.5C11.6989 2 11.8897 2.07902 12.0303 2.21967C12.171 2.36032 12.25 2.55109 12.25 2.75V3.5H1.75V2.75C1.75 2.55109 1.82902 2.36032 1.96967 2.21967C2.11032 2.07902 2.30109 2 2.5 2ZM11.5 20H2.5C2.30109 20 2.11032 19.921 1.96967 19.7803C1.82902 19.6397 1.75 19.4489 1.75 19.25V18.5H12.25V19.25C12.25 19.4489 12.171 19.6397 12.0303 19.7803C11.8897 19.921 11.6989 20 11.5 20Z" fill="#404164"/>
</svg>


                </div>
              <div>
              <p class="m-0 p-0 text-[18px] font-[600] font-sf  leading-[100%]" style="color: #404164;">  Others</p>
              <p class="font-[300] text-sm leading-[100%]  mt-[8px] font-sf" style="color: #404164;">
               If your rental type doesn't fit the options above, please enter a short description and contact support for help.
              </p>
              </div>
              </div>
            </a-radio>
            </a-radio-group> -->
