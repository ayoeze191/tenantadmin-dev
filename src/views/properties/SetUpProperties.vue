<template>
  <div class="p-6 bg-[#F9FAFB] min-h-screen">
    <!-- Header -->
    <div class="mb-6">
      <p class="text-[#000000] text-[20px] font-sf font-semibold leading-tight">
        Define what you are Listing
      </p>
    </div>

    <!-- Upload Form -->
    <a-form class="bg-white p-6 rounded-2xl shadow-sm flex flex-col gap-6">
      <!-- Download Template -->
      <div>
        <a
          href="/template/10ants_Apartment_upload_template.xlsx"
          class="underline text-[#404164] font-medium text-[15px] font-sf hover:text-[#2E2E52] transition"
        >
          Download the Template
        </a>
      </div>

      <!-- Document Upload -->
      <a-form-item>
        <p class="text-[14px] font-inter text-[#404164] mb-2">
          Upload Document
        </p>

        <a-upload-dragger
          name="file"
          :multiple="true"
          accept=".xls,.xlsx"
          class="border-dashed border-[#C7C7C7] bg-[#FAFAFA] hover:bg-[#F4F4F8] rounded-lg p-8 transition"
          :showUploadList="true"
        >
          <div class="flex flex-col items-center justify-center text-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 26 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="mb-3"
            >
              <path
                d="M25.0459 9.07906L17.1709 1.20406C17.0664 1.09962 16.9423 1.01681 16.8057 0.960347C16.6691 0.903885 16.5228 0.874884 16.375 0.875H2.875C2.27826 0.875 1.70597 1.11205 1.28401 1.53401C0.862053 1.95597 0.625 2.52826 0.625 3.125V27.875C0.625 28.4717 0.862053 29.044 1.28401 29.466C1.70597 29.8879 2.27826 30.125 2.875 30.125H23.125C23.7217 30.125 24.294 29.8879 24.716 29.466C25.1379 29.044 25.375 28.4717 25.375 27.875V9.875C25.3751 9.72722 25.3461 9.58086 25.2897 9.44429C25.2332 9.30772 25.1504 9.18362 25.0459 9.07906Z"
                fill="#404164"
              />
            </svg>
            <p class="text-[#404164] font-sf font-semibold text-[14px]">
              Drop document here or click to upload
            </p>
            <p class="text-[#808097] text-[12px] mt-1 font-sf">
              Accepted File Types: .xls, .xlsx
            </p>
          </div>
        </a-upload-dragger>
      </a-form-item>

      <!-- Building Amenities -->
      <a-form-item
        name="amenities"
        :label-col="{
          style: {
            color: '#808097',
            fontSize: '20px',
            fontWeight: '400',
          },
        }"
      >
        <p class="text-[18px] text-[#808097] font-medium mb-4">
          Building Amenities
        </p>

        <a-checkbox-group class="grid grid-cols-2 gap-4">
          <!-- Example -->
          <!-- <a-checkbox value="pool">Swimming Pool</a-checkbox>
          <a-checkbox value="wifi">WiFi</a-checkbox> -->
        </a-checkbox-group>
      </a-form-item>

      <!-- Add Amenity -->
      <div
        class="flex items-center gap-3 text-[#C7C7C7] cursor-pointer hover:text-[#808097] transition"
      >
        <PlusOutlined />
        <span class="text-[16px] font-sf">Add amenity</span>
      </div>

      <!-- Photo Upload -->
      <a-form-item>
        <p class="text-[14px] font-inter text-[#404164] mb-2">Upload Photos</p>

        <a-upload-dragger
          name="file"
          :multiple="true"
          accept=".png,.jpg,.jpeg"
          class="border-dashed border-[#C7C7C7] bg-[#FAFAFA] hover:bg-[#F4F4F8] rounded-lg p-8 transition"
        >
          <div class="flex flex-col items-center justify-center text-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 26 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="mb-3"
            >
              <path
                d="M25.0459 9.07906L17.1709 1.20406C17.0664 1.09962 16.9423 1.01681 16.8057 0.960347C16.6691 0.903885 16.5228 0.874884 16.375 0.875H2.875C2.27826 0.875 1.70597 1.11205 1.28401 1.53401C0.862053 1.95597 0.625 2.52826 0.625 3.125V27.875C0.625 28.4717 0.862053 29.044 1.28401 29.466C1.70597 29.8879 2.27826 30.125 2.875 30.125H23.125C23.7217 30.125 24.294 29.8879 24.716 29.466C25.1379 29.044 25.375 28.4717 25.375 27.875V9.875C25.3751 9.72722 25.3461 9.58086 25.2897 9.44429C25.2332 9.30772 25.1504 9.18362 25.0459 9.07906Z"
                fill="#404164"
              />
            </svg>
            <p class="text-[#404164] font-sf font-semibold text-[14px]">
              Drop photos here or click to upload
            </p>
            <p class="text-[#808097] text-[12px] mt-1 font-sf">
              Accepted File Types: .png, .jpg
            </p>
          </div>
        </a-upload-dragger>
      </a-form-item>
    </a-form>
  </div>
</template>
