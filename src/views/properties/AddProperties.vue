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
                :rules="stepOneRule"
                ref="propertyFormRef"
                layout="vertical"
              >
              <a-form-item
              v-if="store.userProfile.referenceID == 'NN1'"
                name="formType"
                class="flex flex-col gap-2 bg-white">
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
                  <template #option="{ label, value }">
                    <div class="flex flex-col bg-white">
                      <span class="font-medium bg-white"
                        >{{ label }}</span
                      >
                    </div>
                  </template>
                  <template #suffixIcon>
                    <a-spin v-if="landlordLoading" size="small" />
                  </template>
                </a-select>
              </a-form-item>
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
            <a-form class="bg-white p-6 rounded-xl flex flex-col gap-2" :rules="rules" :model="form">
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
               <a-form-item class="w-full">
                <div class="form-labels text-lg mb-4 font-light">
                  Province
                </div>
                <a-select
                  ref="select"
                  v-model:value="form.province"
                  style="width: 200px"
                  placeholder="Select City"
                  class="w-full"
                  @focus="focus"
                  @change="handleChange"
                >
                  <a-select-option v-for="prov in allProvinces" :value="prov.provinceId">{{prov.name}}</a-select-option>
                </a-select>
              </a-form-item>

              <div class="flex gap-4">
                <a-form-item name="zipCode" required class=" w-full">
                  <div class="form-labels text-lg mb-4 font-light">
                    Zip Code
                  </div>
                  <a-input
                    v-model:value="form.zipCode"
                    placeholder="Zip code"
                    size="large"
                  />
                </a-form-item>
               <a-form-item class="w-full">
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
                 <a-select-option 
  v-for="city in allProvinces.find(prov => prov.provinceId === form.province)?.cities || []" 
  :key="city.id"
  :value="city.name"
>
  {{ city.name }}
</a-select-option>

                </a-select>
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
              <a-form class="bg-white p-6 rounded-xl flex flex-col gap-2" :model="form" >
            
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
                <a-radio-group v-model:value="form.formType" class="flex gap-[30px]" >
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
                <a-checkbox-group v-model:value="form.propertyAmenities" class="grid grid-cols-2 gap-4">
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
            <a-form class="bg-white p-6 rounded-xl flex flex-col gap-2"  :model="form">
              <a-form-item class="form-labels">
                <div class="form-labels text-base mb-4 font-regular leading-[100%] font-sf">
                  Rental Unit
                </div>
                <a-input
                  v-model:value="form.rental_unit"
                  :disabled="true"
                  placeholder="Enter rental unit"
                  size="large"/>
              
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
                <a-checkbox-group class="grid grid-cols-2 gap-4" v-model:value="form.propertyAmenities">
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
              <button class="flex justify-end bg-none border-0" @click="handleAddUnit">
                <p
                  class="font-sf text-[1rem] font-[700] leading-[100%] text-[#404164] underline" v-if="form.rental_unit == 'apartment'"
                >
                  Add Unit
                </p>
                   <p
                  class="font-sf text-[1rem] font-[700] leading-[100%] text-[#404164] underline" v-if="form.rental_unit == 'shared_condo' || form.rental_unit == 'shared_house'"
                >
                  Add Room
                </p>
              </button>
              <div v-for="(i, index) in form.unitTypes" >
               <button class="border-none border-0 w-full flex justify-end" v-if="index !== 0" @click="form.unitTypes.splice(0, 1)"  style="color: red !important;">    <DeleteOutlined /></button>
              <div class="flex gap-4 flex-col" v-if="form.rental_unit == 'shared_condo' || form.rental_unit == 'shared_house' || form.rental_unit == 'apartment'">
                <div class="flex gap-4"> 
                <a-form-item
                  v-if="form.rental_unit == 'apartment' || form.rental_unit == 'shared_condo' || form.rental_unit == 'shared_house'"
                 :name="['unitTypes', index, 'unitType']"
                  class="flex-1 form-labels"
                    :rules="setuprules.unitType"
                >
                  <div class="form-labels text-base mb-4 font-light leading-[100%] font-sf">
                    {{form.rental_unit == 'shared_condo' || form.rental_unit == 'shared_house' ? 'Room Type' : 'Unit Type'}}
                  </div>
                     <a-select
                    ref="select"
                    v-model:value="form.unitTypes[index].unitType"
                    style="width: 200px"
                   :placeholder="form.rental_unit == 'shared_condo' || form.rental_unit == 'shared_house' ? 'Room Type' : 'Unit Type'"
                    class="w-full h-[52px]"
                    @focus="focus"
                    @change="handleChange"
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
                :rules="[{ required: true, message: 'Please input quantity' }]"
                :name="['unitTypes', index, 'quantity']"
                  required
                  class="flex-1 form-labels"
                >
                  <div class="form-labels text-base mb-4 font-regular leading-[100%] font-sf">
                    Count
                  </div>
                  <a-input
                    v-model:value="form.unitTypes[index].quantity"
                    placeholder="Count"
                    size="large"
                    type="number"
                  />
                </a-form-item>
              </div>
              <div class="flex gap-4">
                <a-form-item
                :name="['unitTypes', index, 'rentPerMonth']"

                  class="flex-1 form-labels"
                :rules="[
  { required: true, message: 'Please input Rent Price' },
  { pattern: /^[0-9]+$/, message: 'Rent Price must be a number' }
]
"
                >
                  <div class="form-labels text-base mb-4 font-regular leading-[100%] font-sf">
                    Rent Price
                  </div>
                  <a-input
                    v-model:value="form.unitTypes[index].rentPerMonth"
                    placeholder="Rent Price"
                    
                    size="large"
                  />
                </a-form-item>
                <a-form-item
                
                                  :rules="[
  { required: true, message: 'Please input Security Deposit' },
  { pattern: /^[0-9]+$/, message: 'Security Deposit must be a number' }
]"
                :name="['unitTypes', index, 'securityDeposit']"

                  required
                  class="flex-1 form-labels"
                >
                  <div class="form-labels text-base mb-4 font-regular leading-[100%] font-sf">
                    Security Deposit
                  </div>
                  <a-input
                    v-model:value="form.unitTypes[index].securityDeposit"
                    placeholder="Security Deposit"
                    size="large"
                  />
                </a-form-item>
              </div>
              <div class="flex gap-4">
                <a-form-item
                :name="['unitTypes', index, 'availabilityDate']"
                  :rules="[{ required: true, message: 'Please input Availability Date' }]"
                  required
                  class="flex-1 form-labels"
                >
                  <div class="form-labels text-base mb-4 font-regular leading-[100%] font-sf">
                    Availability Date
                  </div>
                  <a-input
                :rules="[{ required: true, message: 'Please enter availability' }]"
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
                  <div class="form-labels text-base mb-4 font-regular leading-[100%] font-sf">
                    Occupancy Status
                  </div>
                  <a-select
                    ref="select"
                    v-model:value="form.unitTypes[index].occupancyStatus"
                    
                    style="width: 200px"
                    placeholder="Select Occupancy Status"
                    class="w-full"
                    @focus="focus"
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
                  <a-form-item>
                <a-upload-dragger
  class="border-dashed border-[#C7C7C7] rounded-[5px] p-[14px]"
  v-model:fileList="i.fileList"
  name="file"
  :customRequest="(options) => customUpload(options, index)"
  :multiple="true"
  list-type="picture-card"
  @remove="() => handleRemoveImage(index)"
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


</div>


<!--  -->
                <div v-if="form.rental_unit == 'condo' || form.rental_unit == 'house'">

  <div class="flex gap-4">
                <a-form-item
                  required
                  class="flex-1 form-labels"
                :name="['unitTypes', 0, 'rentPerMonth']"
                  :rules="[{ required: true, message: 'Please Rent Per Month' }]"
                >
                  <div class="form-labels text-base mb-4 font-regular leading-[100%] font-sf">
                    Rent Price
                  </div>
                  <a-input
                    v-model:value="form.unitTypes[0].rentPerMonth"
                    placeholder="Rent Price"
                    size="large"
                  />
                </a-form-item>
                <a-form-item
                   :name="['unitTypes', 0, 'securityDeposit']"
                  :rules="[{ required: true, message: 'Please security deposit' }]"
                  required
                  class="flex-1 form-labels"
                >
                  <div class="form-labels text-base mb-4 font-regular leading-[100%] font-sf">
                    Security Deposit
                  </div>
                  <a-input
                    v-model:value="form.unitTypes[0].securityDeposit"
                    placeholder="Security Deposit"
                    size="large"
                  />
                </a-form-item>
              </div>
               <div class="flex gap-4" >
                <a-form-item
                    :name="['unitTypes', 0, 'numberOfBedrooms']"
                  :rules="[{ required: true, message: 'Please enter the number Of Bedrooms' }]"
                  required
                  class="flex-1 form-labels"
                >
                  <div class="form-labels text-base mb-4 font-regular leading-[100%] font-sf">
                    Bedroom
                  </div>
                  <a-input type="number" placeholder="Enter Bedroom No" v-model:value.number="form.unitTypes[0].numberOfBedrooms" />
                </a-form-item>
                 <a-form-item
                :name="['unitTypes', 0, 'numberOfBathrooms']"
                  :rules="[{ required: true, message: 'Please enter the number Of Bathrooms' }]"
                  required
                  class="flex-1 form-labels"
                >
                  <div class="form-labels text-base mb-4 font-regular leading-[100%] font-sf">
                    Bathroom
                  </div>
                  <a-input type="number" placeholder="Enter Bathroom No" v-model:value.number="form.unitTypes[0].numberOfBathrooms" />
                </a-form-item>
              </div>
                   <a-form-item>
                <a-upload-dragger
  class="border-dashed border-[#C7C7C7] rounded-[5px] p-[14px]"
  v-model:fileList="propertyImageList"
  name="file"
  :customRequest="customUploadPropertyImage"
  :multiple="true"
  list-type="picture-card"
  @remove="() => handleRemovePropertyImage"
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
                </div>
                <!--  -->
              </div> 
            </a-form>
            </div>


         <div v-if="currentStep3 == 2" class="">
               <p class="text-[#000000] text-[18px] font-sf leading-[100%]">
              {{form.rental_unit == "others" ? "Define What You are Listing " :"Sorem ipsum dolor sit amet, consectetur adipiscing elit"}}
            </p>
            <a-form class="bg-white p-6 rounded-xl flex flex-col gap-2" :rules="lastStepThreeRules" :model="form"> 
              <div v-if="form.rental_unit !== 'others'">
                <div class="flex gap-4">
                  <a-form-item
                  name="partkingType"
                  required
                  class="flex-1"
                >
                  <div class="form-labels text-base mb-4 font-light leading-[100%] font-sf">
                    Packing Type
                  </div>
                  <a-select
                    ref="select"
                    v-model:value="form.partkingType"
                    style="width: 200px"
                    placeholder="Select Rental Unit"
                    class="w-full h-[52px]"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option :value="1"
                      >Garage</a-select-option
                    >
                    <a-select-option :value="2">Drive way Parking</a-select-option>
                    <a-select-option :value="3"
                      >Off Street Parking</a-select-option
                    >
                    <a-select-option :value="4">Parking Available</a-select-option>
                    <a-select-option :value="5"
                      >One Car Garage</a-select-option
                    >
                    <a-select-option :value="6">Two Car Garage</a-select-option>
                    <a-select-option :value="7">Three Car Garage</a-select-option>
                    <a-select-option :value="8">Four Car Garage</a-select-option>
                    <a-select-option :value="9">Underground Parking</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  name="pet"
                  required
                  class="flex-1 form-labels"
                >
                  <div class="form-labels text-base mb-4 font-light leading-[100%] font-sf">
                    Pets
                  </div>  
                    <a-select
                    ref="select"
                    v-model:value="form.pet"
                    style="width: 200px"
                    placeholder="Select Rental Unit"
                    class="w-full h-[52px]"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option :value="2"
                      >Yes</a-select-option
                    >
                    <a-select-option :value="1">No</a-select-option>
                    <a-select-option :value="3"
                      >Conditional</a-select-option
                    >

                  </a-select>
                 
                </a-form-item>
              </div>

                <div class="flex gap-4">
                  <a-form-item
                  name="heatingType"
                  required
                  class="flex-1 form-labels"
                >
                  <div class="form-labels text-base mb-4 font-light leading-[100%] font-sf">
                    Heating Type
                  </div>
                  <a-select
                    ref="select"
                    v-model:value="form.heatingType"
                    style="width: 200px"
                    placeholder="Select Rental Unit"
                    class="w-full h-[52px]"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option :value="1">Central Heating</a-select-option>
                    <a-select-option :value="2">Electric Heating</a-select-option>
                    <a-select-option :value="3">Gas Heating</a-select-option>
                    <a-select-option :value="4">Heating Available</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  name="acType"
                  required
                  class="flex-1 form-labels"
                >
                  <div class="form-labels text-base mb-4 font-light leading-[100%] font-sf">
                    AC Type
                  </div>  
                    <a-select
                    ref="select"
                    v-model:value="form.acType"
                    style="width: 200px"
                    placeholder="Select Rental Unit"
                    class="w-full h-[52px]"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option :value="1">CentralAC</a-select-option>
                    <a-select-option :value="2"
                      >Conditional</a-select-option
                    >
                    <a-select-option :value="3"
                      >AC Available</a-select-option
                    >
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
                  <div class="form-labels text-base mb-4 font-light leading-[100%] font-sf">
                    Laundry Type
                  </div>  
                    <a-select
                    ref="select"
                    v-model:value="form.laundryType"
                    style="width: 200px"
                    placeholder="Select Rental Unit"
                    class="w-full h-[52px]"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option :value="1"
                      >In Unit</a-select-option
                    >
                    <a-select-option :value="2">Shared Laundry</a-select-option>

                  </a-select>
                </a-form-item>
                   <a-form-item
                  name="leaseType"
                  required
                  class="flex-1 form-labels"
                >
                  <div class="form-labels text-base mb-4 font-light leading-[100%] font-sf">
                    Lease Type Allowed
                     <a-checkbox-group class="grid grid-cols-1 gap-5" v-model:value="form.leaseType">
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
                  </div>

                  <a-form-item name="description">
                    <p class="form-labels text-base mb-4 font-light leading-[100%] font-sf">Description</p>
                    <a-textarea
                     class="p-[18px]"
      v-model:value="form.description"
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
    v-model:proofOfOwnershipFileList="proofOfOwnershipFileList"
    name="file"
   :customRequest="customProofOwnershipUpload"
       list-type="picture-card"
         @remove="handleRemove"
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
     v-model:GovernmentIssuedFileList="GovernmentIssuedFileList"
    name="file"
   :customRequest="customGovernmentIssuedUpload"
       list-type="picture-card"
         @remove="handleRemove"
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
   v-model:otherDocsFileList="otherDocsFileList"
    name="file"
   :customRequest="customAdditionalDocumentsUpload"
       list-type="picture-card"
         @remove="handleRemove"
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
              {{ currentStep === 3 ? "Save" : "Continue" }}
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
              <img
                v-if="form.propertyImages.length > 0"
                :src="form.propertyImages[0].image"
                width="100%"
                style="border-radius: 8px; object-fit: cover; height: 216px"
              /> 
                <img
                v-if="form.unitTypes[0].unitImg.length > 0"
                :src="form.unitTypes[0].unitImg[0].image"
                width="100%"
                style="border-radius: 8px; object-fit: cover; height: 216px"
              /> 
              <div
                v-if="form.propertyImages.length == 0 && form.unitTypes[0].unitImg.length == 0"
                class="w-full h-[216px] bg-gray-200 rounded-t-lg flex items-center justify-center text-gray-400"
              >
                No Image
              </div>
            </div>
              <div
              class="flex justify-between items-center px-[10px] text-[12px] text-[#808097] font-medium"
            >
              <span class="flex gap-2.5 leading-[25px]"
                ><span  style="color: green;" v-if="form.rental_unit"><CheckOutlined color="green" /></span>
                <CloseOutlined v-else />Rental Unit</span
              >
              <p class="text-[#808097] m-0">
                {{ form.rental_unit || "Not Set" }}
              </p>
            </div>
            <div
              class="flex justify-between items-center px-[10px] text-[12px] text-[#808097] font-medium"
            >
              <span class="flex gap-2.5 leading-[25px]"
                ><span  style="color: green;" v-if="form.name"><CheckOutlined color="green" /></span>
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
                ><span  style="color: green;" v-if="form.address"><CheckOutlined color="green" /></span>
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
                >
                <span  style="color: green;" v-if="form.zipCode"><CheckOutlined color="green" /></span>
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
                >
                <span  style="color: green;" v-if="form.province"><CheckOutlined color="green" /></span>
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
  <a-modal
  :visible="showSuccessModal"
  :closable="false"
  :footer="null"
  :width="500"
  >
  <template #title>
        <div
          class="flex items-center justify-between py-[12px]"
        >
          <span></span>
          <span></span>
          <button @click="() => showSuccessModal = false">
              <CloseOutlined />
          </button>
        </div>
      </template>
  <div class="mx-auto w-fit">
  <p class="text-[#404164] text-[20px] font-medium">Submitted Successfully</p>
  <svg width="200" height="201" viewBox="0 0 200 201" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="100" cy="100.5" r="100" fill="black" fill-opacity="0.25"/>
<ellipse cx="100.008" cy="99.9324" rx="86.5232" ry="83.948" fill="black" fill-opacity="0.25"/>
<path d="M162.125 100.434C162.125 134.742 134.313 162.555 100.004 162.555C65.6955 162.555 37.8828 134.742 37.8828 100.434C37.8828 66.1251 65.6955 38.3125 100.004 38.3125C134.313 38.3125 162.125 66.1251 162.125 100.434Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M100.001 173.228C140.167 173.228 172.728 140.667 172.728 100.501C172.728 60.3346 140.167 27.7734 100.001 27.7734C59.8346 27.7734 27.2734 60.3346 27.2734 100.501C27.2734 140.667 59.8346 173.228 100.001 173.228ZM138.473 81.4232C141.331 77.9947 140.867 72.8992 137.439 70.0421C134.01 67.1851 128.915 67.6483 126.058 71.0768L96.9834 105.966C94.1817 109.328 92.6066 111.189 91.3491 112.333L91.301 112.377L91.2492 112.338C89.8933 111.313 88.1562 109.601 85.0616 106.507L73.3332 94.7784C70.1774 91.6227 65.061 91.6227 61.9052 94.7784C58.7494 97.9342 58.7494 103.051 61.9052 106.206L73.6336 117.935L73.9635 118.265L73.9636 118.265C76.6019 120.904 79.14 123.443 81.5015 125.229C84.1469 127.229 87.6113 129.11 92.0509 128.909C96.4906 128.707 99.7705 126.521 102.224 124.289C104.414 122.297 106.712 119.538 109.1 116.671L109.399 116.312L138.473 81.4232ZM90.596 112.934C90.596 112.934 90.5998 112.932 90.6072 112.928C90.5996 112.933 90.596 112.935 90.596 112.934ZM92.042 112.863C92.0496 112.866 92.0536 112.868 92.0537 112.868C92.0537 112.868 92.0499 112.867 92.042 112.863Z" fill="#000130"/>
</svg>
</div>

<div class="flex flex-col">
  <RouterLink to="/properties" class="bg-[#000130] text-center w-full rounded-[4px] py-[9px] text-[500] leading-[25px] text-white mt-[36px]">View Accomodations</RouterLink>
  <RouterLink to="/edit" class="text-[#404164] font-semibold leading-[100%] text-[18px]  mt-4 text-center mx-auto w-full">Edit Accomodations</RouterLink>
</div>
    </a-modal>
</template>

<script setup>
import {  CreateNewProperty, FetchLandlords, getProvinces } from "@/api/properties";
import { useUserStore } from "@/store";
import { useOptionsStore } from "@/stores/options";
// CreateNewProperty,
// import { uploadImages } from "@/utils/helper";
import { createAmenity } from "@/api/amenity";
import { uploadImage } from "@/api/properties";
import {
  CheckOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { openDB } from "idb";
import { useToast } from "vue-toast-notification";
import {
  onMounted,
  reactive,
  ref,
} from "vue";
import { useRoute, useRouter } from "vue-router";
const listingType = ref("");
// 1. Define the enum array at the top of the script
const showAmenitiesModal = ref(false);
// 2. Use this for unitTypeOptions
const showSuccessModal = ref(false);
const amenityOptions = ref([]);
const landlordOptions = ref([]);
const landlordLoading = ref(false);
const uploadedUrls = ref([]) 
const handleAddUnit = () => {
  form.unitTypes.push({
    unitCount:"",
    occupancyStatus: "",
    unitType: '',
    quantity: "",
    securityDeposit: "",
    rentPerMonth: "",
    availabilityDate: "",
    bathrooms: "",
    bedrooms: "",
    unitImg: [],
    fileList: []
  });
}

const allProvinces = ref([])
const fetchProvinces = async () => {
  const response = await getProvinces() 
  allProvinces.value = response
}
const propertyImageList = ref([])

const customUploadPropertyImage = async (options) => {
  const { file, onSuccess, onError } = options
  const formData = new FormData()
  formData.append('Image', file)
  formData.append('UploadType', 1)
  formData.append('ImageTitle', file.name)

  try {
    const res = await uploadImage(formData)
    const imageUrl = res.url   // from backend

    // ✅ push into your form array (make sure propertyImages: [] initially)
    form.propertyImages.push({
      imageId,                // keep track of backend id if you need it
      imageTitle: file.name,
      image: imageUrl
    })

    // ✅ update Upload’s internal list so it shows in UI
    propertyImageList.value.push({
      uid: file.uid,
      name: file.name,
      status: 'done',
      url: imageUrl
    })

    onSuccess(res, file)
  } catch (err) {
    console.error('Upload error:', err)
    onError(err)
  }
}




const handleRemovePropertyImage = (file) => {
  // Remove from your form data
  // form.propertyImages = form.propertyImages.filter(img => img.imageTitle !== file.name)
}
const customUpload = async (options, index) => {
  const { file, onSuccess, onError } = options
  const formData = new FormData()
  formData.append('Image', file)
  formData.append('UploadType', 1)
  formData.append('ImageTitle', file.name)
  try {
    const res = await uploadImage(formData) 
    const imageUrl = res.url 
  if (!Array.isArray(form.unitTypes[index].unitImg)) {
  form.unitTypes[index].unitImg = []
}
form.unitTypes[index].unitImg.push({ imageTitle: file.name, image: imageUrl })
   onSuccess({ url: imageUrl }, file)
  } catch (err) {
    message.error(`${file.name} upload failed.`)
    onError(err)
  }
}

const handleRemoveImage = (file, index, title) => {
  if(index){
     form.unitTypes[index].unitImg = form.unitTypes[index].unitImg.filter(
    img => img.image !== file.url
  )
  }
  else if(title == "property"){
    form.images = form.proofOfOwnership.filter(
      img => img.image !== file.url
    )
  }
  else if(title == "government_issued_id"){
    form.governmentID = form.governmentID.filter(
      img => img.image !== file.url
    )
  }
  else if(title == "additional_documents"){
    form.otherDocs = form.otherDocs.filter(
      img => img.image !== file.url
    )

  }
 
}


function handleDrop(e) {
  console.log(e);
}
const SubmitCreateProperty = async() => {
  let payload;
  let landlord = form.landlordId || store.userProfile.referenceID
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
      unitTypes: [...form.unitTypes],
      proofOfOwnership: form.proofOfOwnership,
      governmentID: form.governmentID,
      otherDocs: form.otherDocs,
      partkingType: form.partkingType,
      pet: form.pet,
      heatingType: form.heatingType,
      laundryType: form.laundryType,
      acType: form.acType,
      leaseType: form.leaseType.join(','),
    }
    try{
      const res = await CreateNewProperty(payload)
      const toast = useToast();
      if (res.responseCode == "00") {
        toast.success("Successfully created")  
        showSuccessModal.value = true;
      }
      else{
        toast.error("Couldn't create")  
      }
    }
    catch(err){
      console.error("Error creating property:", err);
      message.error("Failed to create property. Please try again.");
      return;
    }
    
}
const currentStep = ref(0);
const currentStep3 = ref(0);
const loading = ref(false);
const error = ref(null);

const form = reactive({
  partkingType: "",
  pet: "",
  heatingType:"",
  laundryType: "",
  acType:"",
  leaseType: "",
  unit_type:"",
  count:"",
  rent_price:"",
  availability_date:"",
  occupancy_status:"",
  security_deposit:"",
  governmentID: "",
  proofOfOwnership: "",
  governmentID: "",
  otherDocs: "",
  rental_unit:null,
  name: "",
  address: "",
  city: "",
  zipCode: "",
  province: "",
  propertyType: null,
  description: "",
  units: null,
  unitTypes:[{
    unitCount:"",
    occupancyStatus: "",
    unitType: "",
    quantity: "",
    securityDeposit: "",
    rentPerMonth: "",
    availabilityDate: "",
    numberOfBathrooms: 0,
    numberOfBedrooms: 0,
    unitImg: [],
    fileList: [],
  }],
  images: [],
  propertyAmenities: [],
  landlordId: null,
  amenities: [],
  amenityname: "",
  amenitiesKeyWords: "",
  formType: "Bulk Upload",
  propertyImages: []
});

const router = useRouter();
const route = useRoute();
const store = useUserStore();
const optionsStore = useOptionsStore();
const unitTypeOptions = ref({})
onMounted(async () => {
  await optionsStore.fetchAmenities();
  await optionsStore.fetchUnitTypes()
  await fetchLandlords();
  await fetchProvinces()
  amenityOptions.value = optionsStore.amenities.map((a) => ({
    label: a.name,
    value: a.amenityId,
    image: a.image || a.icon || null,
  }));
  unitTypeOptions.value = [...optionsStore.unitTypes]
  // form.unitTypeCounts = Array(optionsStore.unitTypes.length).fill(0);

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
        // form.unitTypeCounts = Array(optionsStore.unitTypes.length).fill(0); // You may want to map this if you use unitTypeCounts
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
  name: [
    { required: true, message: 'Property name is required' },
    { 
      pattern: /^[A-Za-z\s]+$/, 
      message: 'Property name should not contain numbers' 
    }
  ],
  address: [{ required: true, message: 'Address is required' }],
  zipCode: [{ required: true, message: 'Zip code is required' }],
  province: [{ required: true, message: 'Province is required' }],
  description: [{ required: true, message: 'Description is required' }],
  city: [{ required: true, message: 'City is required' }],
}


const setuprules = {
  propertyAmenities: [
    { required: true, message: 'Please select at least one amenity', type: 'array' }
  ],
  unitType: [
    { required: true, message: 'Please select a unit type' }
  ],
  quantity: [
    { required: true, message: 'Please enter quantity' },
    { type: 'number', min: 1, message: 'Quantity must be at least 1' }
  ],
  rentPerMonth: [
    { required: true, message: 'Please enter rent price' },
    // { pattern: /^[0-9]+$/, message: 'Rent price must be a number'}
  ],
  securityDeposit: [
    { required: true, message: 'Please enter security deposit' },
    { pattern: /^[0-9]+$/, message: 'Deposit must be a number' }
  ],
  bedRoom: [
    { required: true, message: 'Please select bedroom option' }
  ],
  bathroom: [
    { required: true, message: 'Please select bathroom option' }
  ],
  availabilityDate: [
    { required: true, message: 'Please enter availability date' }
  ],
  occupancyStatus: [
    { required: true, message: 'Please select occupancy status' }
  ],
  fileList: [
    { required: true, message: 'Please upload at least one image', type: 'array' }
  ]
};

const stepOneRule = {
  rental_unit: [{ required: true, message: "Rental unit type is required" }],
};


const lastStepThreeRules = {
  partkingType: [{ required: true, message: "Packing type is required" }],
  pets: [{ required: true, message: "Pets is required" }],
  heatingType: [{ required: true, message: "Heating is required" }],
  laundryType: [{ required: true, message: "Laundry is required" }],
  acType: [{ required: true, message: "AC type is required" }],
  leaseType: [{ required: true, message: "Lease type is required" }],
  description: [{ required: true, message: "Description is required" }],
}
const fileList = ref([]);; // Cache for uploaded image URLs
 // Cache for proof of ownership files
const GovernmentIssuedFileList = ref([]); // Cache for government-issued ID files
const proofOfOwnershipFileList = ref([]); // Cache for additional documents files
const otherDocsFileList = ref([]); // Cache for other documents files
const customProofOwnershipUpload = async (options) => {
  const { file, onSuccess, onError } = options;
  const formData = new FormData();
  formData.append('Image', file);
  formData.append('UploadType', 1);
  formData.append('ImageTitle', file.name);
  try {
    const res = await uploadImage(formData);
    const url = res.url;
    form.proofOfOwnership = url
    onSuccess({ url: url }, file);
  } catch (err) {
    message.error(`${file.name} upload failed.`);
    onError(err);
  }
};
const customGovernmentIssuedUpload = async (options) => {
  const { file, onSuccess, onError } = options;
  const formData = new FormData();
  formData.append('Image', file);
  formData.append('UploadType', 1);
  formData.append('ImageTitle', file.name);
  try {
    const res = await uploadImage(formData);
    const url = res.url;
    form.governmentID = url;
    onSuccess({ url: url }, file);
  } catch (err) {
    message.error(`${file.name} upload failed.`);
    onError(err);
  }
};
const customAdditionalDocumentsUpload = async (options) => {
  const { file, onSuccess, onError } = options;
  const formData = new FormData();
  formData.append('Image', file);
  formData.append('UploadType', 1);
  formData.append('ImageTitle', file.name);
  try {
    const res = await uploadImage(formData);
    const url = res.url;
    form.otherDocs = url
    onSuccess({ url: url }, file);
  } catch (err) {
    message.error(`${file.name} upload failed.`);
    onError(err);
  }
};

// Landlord functions
const fetchLandlords = async (searchName = "", page = 1) => {
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

const Check = (val) => {
  for (let i of form.unitTypes){
    if(i[val] == '' || i[val] == 0){
      return ''
    }
  }
  return 'success'
}


const DisableNext = () => {
 if(currentStep.value == 0){
    if(store.userProfile.referenceID == "NN1"){
 if(form.rental_unit === null || form.landlordId == null){
         return true;
       }
    }
    else if(form.rental_unit === null){
      return true
    }
      
   }
  else if(currentStep.value == 1){
    if (form.name === "" || form.address === "" || form.zipCode === "" || form.province === "" ||  form.city === "") {
      return true;
    }
  }
  else if(currentStep.value == 2){
      if(currentStep3.value == 1){
        if(form.rental_unit == 'apartment' || form.rental_unit == 'shared_condo' || form.rental_unit == 'shared_house'){
          if(Check('rentPerMonth') == '' || Check('securityDeposit') == '' || Check('availabilityDate') == ''  || Check('occupancyStatus') == '' || Check('quantity') == ''){
            return true
          }
        }
        else if(form.rental_unit == 'condo' || form.rental_unit == 'house'){
          if(Check('rentPerMonth') == '' || Check('securityDeposit') == '' || Check('numberOfBathrooms') == ''  || Check('numberOfBedrooms') == ''){
            return true
          }
        }
      }
      else if(currentStep3.value == 1){
        if(form.unit_type === "" || form.count === "" || form.rent_price === "" || form.availability_date === "" || form.occupancy_status === "" || form.security_deposit === ""){
          return true;
        }
      }
       else if(currentStep3.value == 2){
       if(form.partkingType === "" || form.pet === "" || form.heatingType === "" || form.acType === "" || form.laundryType === "" || form.leaseType === "" || form.description === ""){
          return true;
        }
    }
  }
  else if(currentStep.value == 3){
    if(form.governmentID == '' || form.proofOfOwnership == "" || form.otherDocs == ""){
      return true
    }
  }
  return false
}


const nextOrSubmit = async () => {
  // makes sure the steps don't go beyond the last step

  if(currentStep.value < 3){
if (currentStep.value === 0) {
    try {
      currentStep.value++;
    } catch (err) {
      return;
    }
  } 
  else if (currentStep.value === 1) {
    // 
      if(form.rental_unit === "apartment"){
        // show first form is rental unit is apartment
        currentStep3.value = 0;
      }
      else if(form.rental_unit == "others"){
        currentStep3.value = 2
      }
      else{
        currentStep3.value = 1;
      }
    currentStep.value++;
  }

  else if (currentStep.value === 2) {
    // checks if it's the first step of the third step
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
  else{
      await SubmitCreateProperty()
  }
}
const toPrevious = () => {
  if (currentStep.value > 0) {
    if (currentStep.value === 2) {
      if(currentStep3.value == 0){
        currentStep.value--
        return;
      }
      else if(currentStep3.value == 1 && (form.rental_unit == 'condo' || form.rental_unit == 'house')){
                currentStep.value--
        return ;
      }
       else if(currentStep3.value == 1 && (form.rental_unit == 'apartment')){
                currentStep3.value--
        return ;
      }
      else if(currentStep3.value == 2){
                currentStep3.value--
        return ;
      }
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
}
</style>
