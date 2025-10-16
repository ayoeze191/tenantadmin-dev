<!--    -->

<template>
   <div class="flex py-[50px] px-6  gap-[22px]">
             <div class=" flex-1">
               <p class="text-[#000000] text-[18px] font-sf leading-[100%]">
              Set Up Building And Unit Types
            </p>
              <a-form class="bg-white p-6 rounded-xl flex flex-col gap-2" >

<a href="/template/10ants_Apartment_upload_template.xlsx"  class="underline  text-[#404164] font-[500] leading-[100%] font-sf">Download the Template</a>
                <a-form-item >
                  <p  class="text-[14px] font-inter leading-[100%] text-[#404164] p-0 m-0">Upload Document</p>
<a-upload-dragger
  class="border-dashed border-[#C7C7C7] rounded-[5px] p-[14px] m-0"
  name="file"
  :multiple="true"
  accept=".xls,.xlsx"

  :showUploadList="true"
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
                   
                    class="flex items-center gap-2"
                    
                  >
                   <!-- :key="option.value"
                    :value="option.value" -->
                    <!-- <span class="text-[20px] text-[#808097]">{{
                      option.label
                    v-for="option in amenityOptions"
                    }}</span> -->
                  </a-checkbox>
                </a-checkbox-group>
              </a-form-item>
                <p
                    class="flex gap-[20px] items-center cursor-pointer leading-[100%] text-[#C7C7C7]"
                  >
                    <span><PlusOutlined /></span>
                <!-- v-if="form.formType == 'Bulk Upload'" -->
                 <!-- @click="showAmenitiesModal = true" -->
                    <p class="text-[#C7C7C7] text-[20px] m-0">Add amenity</p>
                </p>

                       <a-form-item
                       >
                       <!-- v-if="form.formType == 'Bulk Upload'" -->
                  <p class="text-[14px] font-inter leading-[100%] text-[#404164] p-0 m-0">Upload Photos</p>
   <a-upload-dragger
                class="border-dashed border-[#C7C7C7] rounded-[5px] p-[14px] m-0 p-0"
    name="file"
    :multiple="true"
   
  >
  <!--   v-model:fileList="bulkImagefileListUpload" -->
      <!-- :customRequest="CustomUploadBulkImage"
    @drop="handleDrop" -->
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
     <div class="w-[50%]">
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
                {{ form.unitTypes.length || "Not Set" }}
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
</template>


<script setup>
import { reactive } from 'vue';


const form =  reactive({
  rental_unit: '',
  name: '',
  address: '',
  zipCode: '',
  province: '',
  city: '',
  units: '',
  propertyImages: [],
  unitTypes: [
    {
      unitImg: []
    }
  ],
  propertyType: '',
  unitTypeCounts: [],
}); 
</script>