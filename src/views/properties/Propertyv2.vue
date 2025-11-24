<template>
  <div class="w-full h-full border-2 border-gray rounded-xl box-border flex flex-col">
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
            <Button class="flex gap-2.5" @click="showModal"><span class="font-semibold">+</span> Add property</Button>
          </div>
        </div>
      </table-header>
    </div>
    <div v-if="totalItemCount == 0" class="h-[100%] text-primary flex flex-col justify-center items-center">
      <IconProperties />
      <div>
        <p>You have no Properties</p>
        <p class="text-gray-400">There's nothing to view</p>
      </div>
      <Button class="flex gap-1.5" @click="showModal"><span class="font-semibold">+</span> Add property</Button>
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
  </div>
</template>

<script setup>
import IconProperties from "@/components/icons/IconProperties.vue";
import {  CreateNewProperty, getProvinces } from "@/api/properties";
import Button from "@/components/Button/Button.vue";
import Table from "@/components/V2Table.vue";
import TableHeader from "@/components/TableHeader.vue";
import BasePagination from "@/components/BasePagination.vue";
import DropdownButton from "@/components/V2ServiceRequestsDropDown.vue";
import { useUserStore } from "@/store";

const totalItemCount = 0;
const searchQuery = '';
const selectedDisplayType = "Grid";
const stages = ["Add Property", "Property Details", "Property Setup"];
const stage = 0;
const store = useUserStore();

const propertyData = {
  "landLordId": null,
  "name": "",
  "description": "",
  "rentalUnit": "",
  "address": "",
  "zipCode": "",
  "city": "",
  "province": "",
  "totalUnits": 0,
  "unitTypes": [
    {
      "unitCount": 0,
      "unitType": 0,
      "rentPerMonth": 0,
      "securityDeposit": 0,
      "numberOfBedrooms": 0,
      "numberOfBathrooms": 0,
      "availabilityDate": "",
      "occupancyStatus": 0,
      "unitImg": [
        {
          "imageTitle": "",
          "image": "",
          "isMain": true
        }
      ]
    }
  ],
  "propertyImages": [
    {
      "imageTitle": "",
      "image": "",
      "isMain": true
    }
  ],
  "propertyAmenities": [],
  "propertyDocument": "",
  "proofOfOwnership": "",
  "governmentID": "",
  "otherDocs": "",
  "partkingType": 1,
  "pet": 1,
  "heatingType": 1,
  "acType": 1,
  "laundryType": 1,
  "leaseType": ""
}

function handleDisplayTypeSelect() {}
function showModal(){}
function handleNext(){
    stage++;
    if (stage == 3) {
        //submit
    }
}
const createProperty = async() => {
    let landlord = form.landlordId || store.userProfile.referenceID
  const payload = { ...propertyData, landLordId:landlord  }
    // if(form.formType == 'In App Form'){
    //   console.log(form.unitTypes, "form.unitTypes");
    //   payload['unitTypes'] = [...form.unitTypes]
    // }

    try{
      const res = await CreateNewProperty(payload)
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
</script>

<style></style>
