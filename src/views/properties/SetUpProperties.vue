<!--    -->

<template>
  <div class="flex py-[50px] px-6 gap-[22px]">
    <div class="flex-1">
      <p class="text-[#000000] text-[18px] font-sf leading-[100%]">
        Set Up Building And Unit Types
      </p>
      <a-form class="bg-white p-6 rounded-xl flex flex-col gap-2">
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
        <a
          href="/template/10ants Apartmentsetuptemplate.xlsx"
          class="underline text-[#404164] font-[500] leading-[100%] font-sf"
          >Download the Template</a
        >
        <a-form-item>
          <p
            class="text-[14px] font-inter leading-[100%] text-[#404164] p-0 m-0"
          >
            Upload Document
          </p>
          <a-upload-dragger
            v-model:fileList="bulkuploaddocumentfileList"
            class="border-dashed border-[#C7C7C7] rounded-[5px] p-[14px] m-0"
            name="file"
            :multiple="true"
            accept=".xls,.xlsx"
            :beforeUpload="beforeUpload"
            :before-upload="() => false"
            :showUploadList="true"
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
              Drop doc here or click to upload
            </p>
            <p
              class="ant-upload-hint text-[#808097] font-[12px] font-sf leading-[100%]"
            >
              Accepted File Types : doc, docx, excel
            </p>
          </a-upload-dragger>
        </a-form-item>
        <p
          class="flex gap-[20px] items-center cursor-pointer leading-[100%] text-[#C7C7C7]"
        ></p>
      </a-form>
      <button
        @click="handleuploadExcelFile(form.landlordId)"
        class="bg-[#000130] leading-[25px] flex items-center justify-center gap-2 font-inter py-[12px] w-full text-white"
      >
        <a-spin v-if="loading" :spinning="loading" :indicator="customIcon" />
        Submit
      </button>
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
            v-if="
              form.propertyImages.length == 0 &&
              form.unitTypes[0].unitImg.length == 0
            "
            class="w-full h-[216px] bg-gray-200 rounded-t-lg flex items-center justify-center text-gray-400"
          >
            No Image
          </div>
        </div>
        <div
          class="flex justify-between items-center px-[10px] text-[12px] text-[#808097] font-medium"
        >
          <span class="flex gap-2.5 leading-[25px]"
            ><span style="color: green" v-if="form.rental_unit"
              ><CheckOutlined color="green"
            /></span>
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
            ><span style="color: green" v-if="form.name"
              ><CheckOutlined color="green"
            /></span>
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
            ><span style="color: green" v-if="form.address"
              ><CheckOutlined color="green"
            /></span>
            <CloseOutlined v-else />Property Address</span
          >
          <p class="text-[#808097] m-0">
            {{ form.address || "Not Set" }}
          </p>
        </div>
        <div
          class="flex justify-between items-center px-[10px] text-[12px] text-[#808097] font-medium"
        >
          <span class="flex gap-2.5 leading-[25px]">
            <span style="color: green" v-if="form.zipCode"
              ><CheckOutlined color="green"
            /></span>
            <CloseOutlined v-else />Zip Code</span
          >
          <p class="text-[#808097] m-0">
            {{ form.zipCode || "Not Set" }}
          </p>
        </div>
        <div
          class="flex justify-between items-center px-[10px] text-[12px] text-[#808097] font-medium"
        >
          <span class="flex gap-2.5 leading-[25px]">
            <span style="color: green" v-if="form.province"
              ><CheckOutlined color="green"
            /></span>
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
            ><CheckOutlined v-if="form.units" /> <CloseOutlined v-else />Total
            Number of Units</span
          >
          <p class="text-[#808097] m-0">
            {{ form.unitTypes.length || "Not Set" }}
          </p>
        </div>

        <div
          class="flex justify-between items-center px-[10px] text-[12px] text-[#808097] font-medium"
        ></div>
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

  <a-modal
    :visible="showErrorModal"
    title="Upload Errors"
    ok-text="Close"
    :cancel-button-props="{ style: 'display: none' }"
    @ok="showErrorModal = false"
  >
    <div v-if="errorList.length">
      <a-alert
        message="Some records could not be saved."
        type="error"
        show-icon
        class="mb-4"
      />
      <ul class="list-disc ml-5 text-[14px] text-red-600">
        <li v-for="(err, index) in errorList" :key="index">
          {{ err }}
        </li>
      </ul>
    </div>
  </a-modal>

  <a-modal
    :visible="showSuccessModal"
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
        <circle cx="100" cy="100.5" r="100" fill="black" fill-opacity="0.25" />
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
</template>

<script setup>
import { reactive } from "vue";
import { useOptionsStore } from "@/stores/options";
import { ref } from "vue";
import { onMounted } from "vue";
import { migrateFromFile } from "@/api/properties";
import { useUserStore } from "@/store";
import { FetchLandlords } from "@/api/properties";
import { h } from "vue";
import { LoadingOutlined } from "@ant-design/icons-vue";

const customIcon = h(LoadingOutlined, {
  style: {
    fontSize: "15px",
    color: "#1890ff",
  },
});
const showSuccessModal = ref(false);
const showErrorModal = ref(false);
const landlordOptions = ref([]);
const landlordLoading = ref(false);
const errorList = ref([]);
const loading = ref(false);
const form = reactive({
  rental_unit: "",
  name: "",
  address: "",
  zipCode: "",
  province: "",
  city: "",
  units: "",
  propertyImages: [],
  unitTypes: [
    {
      unitImg: [],
    },
  ],
  propertyType: "",
  unitTypeCounts: [],
});
const store = useUserStore();

const optionsStore = useOptionsStore();
const bulkuploaddocumentfileList = ref([]);
onMounted(async () => {
  await fetchLandlords();
  await optionsStore.fetchAmenities();
  amenityOptions.value = optionsStore.amenities.map((a) => ({
    label: a.name,
    value: a.amenityId,
    image: a.image || a.icon || null,
  }));
});

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

const handleuploadExcelFile = async (landlordId) => {
  if (!bulkuploaddocumentfileList.value.length) {
    console.error("No file selected");
    return;
  }
  loading.value = true;
  const file = bulkuploaddocumentfileList.value[0].originFileObj; // 👈 this is the real Excel file
  const formData = new FormData();
  formData.append("LandlordId", landlordId);
  formData.append("ExcelFile", file);
  console.log("Uploading file:", file);
  try {
    const res = await migrateFromFile(formData);
    console.log("Upload response:", res);
    if (res.responseCode == "00") {
      console.log("Upload response: success", res);
      const blob = new Blob([res], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "bulk-upload-response-document.xlsx";
      link.click();
      window.open(link.href, "_blank");
      showSuccessModal.value = true;
      loading.value = false;
    } else {
      errorList.value = [...res.errors] || ["An unknown error occurred."];
      console.log("Errors:", errorList.value);
      showErrorModal.value = true;
      console.log("Upload response: failed", res.errors);
      loading.value = false;
    }
  } catch (err) {
    console.error("Upload failed:", err);
  }
};
</script>
