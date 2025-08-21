<template>
  <div class="bg-neutral w-full px-8 py-10">
    <!-- Header -->
    <div>
      {{ console.log(property, "property valyue") }}
      <section class="w-full mx-auto flex justify-between items-center mb-4">
        <router-link to="/properties" class="pt-3">
          <a-button
            type="text"
            class="flex items-center gap-2 text-base font-medium text-gray-600 bg-gray-100 hover:text-primary rounded-full px-4 py-2 transition-all"
          >
            <template #icon>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
                  fill="#404164"
                />
              </svg>
            </template>
            Back
          </a-button>
        </router-link>
        <div class="flex gap-3 items-center">
          <div class="flex gap-3 items-center flex-wrap">
            <button
              :class="[
                'text-txt_dark px-[33px] py-2 h-fit rounded-[4px] border-[#000130] border-[1px] w-fit font-semibold font-sf leading-[28px] min-w-[120px] transition-all sm:px-6 sm:py-2 sm:text-base xs:px-3 xs:py-2 xs:text-sm xs:min-w-[90px]',
                true
                  ? 'bg-[inherit] text-gray-400 '
                  : 'hover:bg-primary hover:text-white bg-inherit',
              ]"
              @click="showEditPropertyModal = true"
            >
              Edit Property
            </button>
            <!-- <button
              @click="
                () => {
                  showAddTenantModal = true;
                  tenantForm.unitId = activeKey;
                }
              "
              :disabled="activeKey == 1"
              :class="[
                'h-fit flex items-center gap-[12px] font-medium rounded-[4px] border-[1px] px-[33px] py-2 w-fit leading-[28px] min-w-[120px] transition-all sm:px-6 sm:py-2 sm:text-base xs:px-3 xs:py-2 xs:text-sm xs:min-w-[90px]',
                activeKey == 1
                  ? 'bg-gray-300  cursor-not-allowed text-txt_dark font-sf font-semibold border-[#000130] border-[1px] w-fit leading-[28px]'
                  : 'bg-[#000130] text-white hover:bg-[#1a1a40]',
              ]"
            >
              <div>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 5.5V19.5M5 12.5H19"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <span class="">Add Tenant</span>
            </button> -->
          </div>
        </div>
      </section>
      <!-- Main Card -->
      <div class="bg-white px-[50px] py-[26px] rounded-2xl w-full mx-auto">
        <a-spin :spinning="loading">
          <template v-if="error">
            <a-result status="404" :title="'Not Found'" :sub-title="error" />
          </template>
          <template v-else-if="property">
            <div>
              <div class="flex h-[300px]">
                <!-- Images Carousel with Ant Design Preview -->
                <div
                  class="relative w-full rounded-xl h-full flex gap-2 items-center justify-center"
                >
                  <a-image-preview-group v-if="images && images.length">
                    <a-image
                      :src="images[currentImageIndex]"
                      :width="'100%'"
                      :height="'100%'"
                      class="w-full h-full object-cover rounded-xl cursor-pointer"
                      :preview="{ visible: false }"
                      @click="showPreview(currentImageIndex)"
                    />
                    <!-- Hidden images for preview group -->
                    <template v-for="(img, idx) in images" :key="idx">
                      <a-image
                        v-if="idx !== currentImageIndex"
                        :src="img"
                        style="display: none"
                      />
                    </template>
                    <!-- Prev Button -->
                    <button
                      v-if="images.length > 1"
                      @click="prevImage"
                      class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow rounded-full p-1 z-10"
                      aria-label="Previous image"
                    >
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M15 6l-6 6 6 6"
                          stroke="#23234a"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    <!-- Next Button -->
                    <button
                      v-if="images.length > 1"
                      @click="nextImage"
                      class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow rounded-full p-1 z-10"
                      aria-label="Next image"
                    >
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9 6l6 6-6 6"
                          stroke="#23234a"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    <!-- +N Remaining Images Indicator -->
                    <div
                      v-if="images.length > 1"
                      class="absolute top-2 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full z-10"
                    >
                      +{{ images.length - 1 }}
                    </div>
                  </a-image-preview-group>
                  <template v-else>
                    <img
                      src="/placeholder.png"
                      class="w-full h-full object-cover rounded-xl"
                      alt="No Image"
                    />
                  </template>
                </div>
                <div class="flex ml-2 flex-col gap-[8px] overflow-y-scroll">
                  <img
                    :src="img"
                    v-for="img in images"
                    class="h-[128px] w-[145px] rounded-lg"
                  />
                </div>
              </div>
              <div class="tabs">
                <a-tabs
                  v-model:activeKey="activeKey"
                  :destroyInactiveTabPane="true"
                  @change="fetchCurrentAmenities(activeKey)"
                >
                  <a-tab-pane :key="1" tab="Property Info">
                    <propertyheader :property="property" />
                    <div class="mt-4 text-[#808097]">
                      <h1
                        class="font-medium text-base text-txt_dark leading-[100%]"
                      >
                        Description
                      </h1>
                      <p
                        class="text-[#808097]"
                        style="color: #808097 !important"
                      >
                        {{ property.description }}
                      </p>
                    </div>
                    <div class="mt-[16px]">
                      <li
                        class="font-medium text-base text-txt_dark leading-[100%]"
                      >
                        Key Features
                      </li>
                      <li></li>
                    </div>
                  </a-tab-pane>
                  <a-tab-pane
                    v-for="unit in property.units"
                    :key="unit.unitId"
                    :tab="unit.unitName"
                  >
                    <propertyheader :property="property" />

                    <div class="mt-4 text-[#808097]">
                      <div class="flex gap-[24px]">
                        <span class="">
                          <h1
                            class="font-medium text-base text-txt_dark leading-[100%]"
                          >
                            Rent
                          </h1>
                          <p
                            class="text-[#808097]"
                            style="color: #808097 !important"
                          >
                            ${{ unit.securityDeposit }}
                          </p>
                        </span>
                        <span>
                          <h1
                            class="font-medium text-base text-txt_dark leading-[100%]"
                          >
                            Security Deposit
                          </h1>
                          <p
                            class="text-[#808097]"
                            style="color: #808097 !important"
                          >
                            ${{ unit.price }}
                          </p>
                        </span>
                      </div>
                    </div>
                    <div
                      class="mt-[16px] text-[#808097] flex flex-col gap-[4px] font-sf font-semibold list-disc"
                    >
                      <li
                        class="font-medium text-base text-txt_dark leading-[100%] list-none"
                      >
                        Key Features
                      </li>
                      <li
                        v-for="amenity in currentAmenities"
                        class="mt-[4px] font-sf text-sm font-semibold text-[#808097] list-disc"
                        style="color: #808097 !important"
                      >
                        {{ amenity.amenity }}
                      </li>
                    </div>
                  </a-tab-pane>
                </a-tabs>
              </div>
              <!-- Property Info Card -->
            </div>
            <!-- Key Features -->
          </template>
        </a-spin>
      </div>
    </div>
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
      <!-- <div class="add-tenants-modal-header">
        <div class="modal-title">Add Tenants</div>
      </div> -->
      <template #title>
        <div
          class="flex items-center justify-between border-b border-[#C7C7C7] py-[12px]"
        >
          <div
            class="cursor-pointer flex items-center gap-[8px] text-txt_dark text-[18px] font-medium"
          >
            <ArrowLeftOutlined @click="goBack" class="text-[18px]" />
            Back
          </div>
          <span class="modal-title">Add Tenants</span>
          <span></span>
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

              <a-form-item label="Lease Start Date" name="phoneNumber" required>
                <a-input
                  v-model:value="tenantForm.phoneNumber"
                  placeholder="Lease Start Date"
                  size="large"
                />
              </a-form-item>

              <div class="flex justify-end gap-3 mt-8">
                <a-button @click="resetTenantModal" size="large"
                  >Cancel</a-button
                >
                <a-button
                  type="primary"
                  :loading="tenantLoading"
                  @click="createProperties"
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

    <a-modal
      :visible="showEditPropertyModal"
      :footer="null"
      width="768px"
      class="px-0"
      :closable="false"
    >
      <template #title>
        <div
          class="flex items-center justify-between border-b border-[#C7C7C7] py-[12px]"
        >
          <button
            @click="showEditPropertyModal = false"
            class="cursor-pointer flex items-center gap-[8px] text-txt_dark text-[18px] font-medium"
          >
            <ArrowLeftOutlined class="text-[18px]" />
            Back
          </button>
          <span class="modal-title">Edit Property</span>
          <span></span>
        </div>
      </template>
      <div class="px-[32px]">
        <li
          class="text-[#808097] text-[20px] leading-[100%] font-sf list-disc mt-[40px] mb-4"
        >
          Building Amenities
        </li>
        <a-checkbox-group
          v-model:value="form.propertyAmenities"
          class="grid grid-cols-2 gap-4"
        >
          <a-checkbox
            v-for="option in amenityOptions"
            :key="option.value"
            :value="option.value"
            class="flex items-center gap-2"
          >
            <span class="text-[20px] text-[#808097]">{{ option.label }}</span>
          </a-checkbox>
        </a-checkbox-group>
        <button
          class="border-0 text-[#C7C7C7] text-[20px] font-sf mt-[24px] mb-[24px]"
        >
          <PlusOutlined /> Add Amenity
        </button>
        <div class="flex gap-4">
          <a-form-item name="packingType" required class="flex-1">
            <div
              class="form-labels text-base mb-4 font-light leading-[100%] font-sf"
            >
              Packing Type
            </div>
            <a-select
              ref="select"
              v-model:value="form.parkingType"
              style="width: 200px"
              placeholder="Select Rental Unit"
              class="w-full h-[52px]"
              @focus="focus"
              @change="handleChange"
            >
              <a-select-option value="Driveway Packing"
                >Driveway Packing</a-select-option
              >
              <a-select-option value="Off Street Packing"
                >Off Street Packing</a-select-option
              >
              <a-select-option value="1 Car Garage"
                >1 Car Garage</a-select-option
              >
              <a-select-option value="2 Car Garage"
                >2 Car Garage</a-select-option
              >
              <a-select-option value="3 Car Garage"
                >3 Car Garage</a-select-option
              >
              <a-select-option value="4 Car Garage"
                >4 Car Garage</a-select-option
              >
            </a-select>
          </a-form-item>
          <a-form-item name="pets" required class="flex-1 form-labels">
            <div
              class="form-labels text-base mb-4 font-light leading-[100%] font-sf"
            >
              Pets
            </div>
            <a-select
              ref="select"
              style="width: 200px"
              placeholder="Select Pet"
              class="w-full h-[52px]"
              @focus="focus"
              @change="handleChange"
              v-model:value="form.pets"
            >
              <a-select-option value="apartment">Yes</a-select-option>
              <a-select-option value="condo">No</a-select-option>
              <a-select-option value="shared_condo"
                >Conditional</a-select-option
              >
            </a-select>
          </a-form-item>
        </div>

        <div class="flex gap-4">
          <a-form-item name="heating" required class="flex-1 form-labels">
            <div
              class="form-labels text-base mb-4 font-light leading-[100%] font-sf"
            >
              Heating Type
            </div>
            <a-select
              v-model:value="form.heatingType"
              ref="select"
              style="width: 200px"
              placeholder="Select Heating Type"
              class="w-full h-[52px]"
              @focus="focus"
              @change="handleChange"
            >
              <a-select-option value="Electric Heating"
                >Central Heating</a-select-option
              >
              <a-select-option value="Electric Heating"
                >Electric Heating</a-select-option
              >
              <a-select-option value="Gas Heating">Gas Heating</a-select-option>
              <a-select-option value="Heating Available"
                >Heating Available</a-select-option
              >
            </a-select>
          </a-form-item>
          <a-form-item name="ac_type" required class="flex-1 form-labels">
            <div
              class="form-labels text-base mb-4 font-light leading-[100%] font-sf"
            >
              AC Type
            </div>
            <a-select
              v-model:value="form.acType"
              ref="select"
              style="width: 200px"
              placeholder="Select AC Type"
              class="w-full h-[52px]"
              @focus="focus"
              @change="handleChange"
            >
              <a-select-option value="apartment">Yes</a-select-option>
              <a-select-option value="condo">No</a-select-option>
              <a-select-option value="shared_condo"
                >Conditional</a-select-option
              >
            </a-select>
          </a-form-item>
        </div>
        <a-form-item name="laundry" required class="flex-1 form-labels">
          <div
            class="form-labels text-base mb-4 font-light leading-[100%] font-sf"
          >
            Laundry Type
          </div>
          <a-select
            v-model:value="form.laundryType"
            ref="select"
            style="width: 200px"
            placeholder="Select Laundry Type"
            class="w-full h-[52px]"
            @focus="focus"
            @change="handleChange"
          >
            <a-select-option value="In Unit">In Unit</a-select-option>
            <a-select-option value="Shared Laundry"
              >Shared Laundry</a-select-option
            >
          </a-select>
        </a-form-item>

        <a-form-item name="lease_type" required class="flex-1 form-labels">
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
                <span class="text-[20px] text-[#808097]"> Yearly Lease </span>
              </a-checkbox>

              <a-checkbox
                key="Month to Month"
                value="Month to Month"
                class="flex items-center gap-2"
              >
                <span class="text-[20px] text-[#808097]"> Month to Month </span>
              </a-checkbox>
            </a-checkbox-group>
          </div>
        </a-form-item>

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
        <div class="flex gap-2.5 ml-auto w-fit">
          <button
            class="border-[#000130] border py-[12px] px-[62px] text-[#404164] font-sf font-semibold leading-[28px] rounded-[4px]"
          >
            Cancel
          </button>
          <button
            class="bg-[#000130] border py-[12px] px-[62px] text-[#fff] font-sf font-semibold leading-[28px] rounded-[4px]"
            @click="EditProperty"
          >
            Save
          </button>
        </div>
      </div>
    </a-modal>
    <a-modal
      :footer="null"
      width="768px"
      :visible="false"
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
          <div
            class="cursor-pointer flex items-center gap-[8px] text-txt_dark text-[18px] font-medium"
          >
            <ArrowLeftOutlined
              @click="goBack"
              class="text-[18px] text-[#808097]"
            />
            Back
          </div>
          <span class="modal-title">Edit Units</span>
          <span></span>
        </div>
      </template>
      <div>
        <div
          class="bg-[#E6F1FC] flex items-start gap-[8px] p-2 rounded-[8px] mt-[37px]"
        >
          <div class="">
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 0.25C8.57164 0.25 6.68657 0.821828 5.08319 1.89317C3.47982 2.96451 2.23013 4.48726 1.49218 6.26884C0.754225 8.05042 0.561142 10.0108 0.937348 11.9021C1.31355 13.7934 2.24215 15.5307 3.60571 16.8943C4.96928 18.2579 6.70656 19.1865 8.59787 19.5627C10.4892 19.9389 12.4496 19.7458 14.2312 19.0078C16.0127 18.2699 17.5355 17.0202 18.6068 15.4168C19.6782 13.8134 20.25 11.9284 20.25 10C20.2473 7.41498 19.2192 4.93661 17.3913 3.10872C15.5634 1.28084 13.085 0.25273 10.5 0.25ZM10.5 18.25C8.86831 18.25 7.27326 17.7661 5.91655 16.8596C4.55984 15.9531 3.50242 14.6646 2.878 13.1571C2.25358 11.6496 2.0902 9.99085 2.40853 8.3905C2.72685 6.79016 3.51259 5.32015 4.66637 4.16637C5.82016 3.01259 7.29017 2.22685 8.89051 1.90852C10.4909 1.59019 12.1497 1.75357 13.6571 2.37799C15.1646 3.00242 16.4531 4.05984 17.3596 5.41655C18.2661 6.77325 18.75 8.3683 18.75 10C18.7475 12.1873 17.8775 14.2843 16.3309 15.8309C14.7843 17.3775 12.6873 18.2475 10.5 18.25ZM12 14.5C12 14.6989 11.921 14.8897 11.7803 15.0303C11.6397 15.171 11.4489 15.25 11.25 15.25C10.8522 15.25 10.4706 15.092 10.1893 14.8107C9.90804 14.5294 9.75 14.1478 9.75 13.75V10C9.55109 10 9.36033 9.92098 9.21967 9.78033C9.07902 9.63968 9 9.44891 9 9.25C9 9.05109 9.07902 8.86032 9.21967 8.71967C9.36033 8.57902 9.55109 8.5 9.75 8.5C10.1478 8.5 10.5294 8.65804 10.8107 8.93934C11.092 9.22064 11.25 9.60218 11.25 10V13.75C11.4489 13.75 11.6397 13.829 11.7803 13.9697C11.921 14.1103 12 14.3011 12 14.5ZM9 5.875C9 5.6525 9.06598 5.43499 9.1896 5.24998C9.31322 5.06498 9.48892 4.92078 9.69449 4.83564C9.90005 4.75049 10.1263 4.72821 10.3445 4.77162C10.5627 4.81502 10.7632 4.92217 10.9205 5.0795C11.0778 5.23684 11.185 5.43729 11.2284 5.65552C11.2718 5.87375 11.2495 6.09995 11.1644 6.30552C11.0792 6.51109 10.935 6.68679 10.75 6.8104C10.565 6.93402 10.3475 7 10.125 7C9.82664 7 9.54049 6.88147 9.32951 6.6705C9.11853 6.45952 9 6.17337 9 5.875Z"
                fill="#163278"
              />
            </svg>
          </div>
          <div class="m-0">
            <p class="text-[#163278] m-0 font-sf font-semibold leading-[100%]">
              You are editing a single unit
            </p>
            <p class="text-[#163278] m-0 text-[14px] font-sf">
              Not all instances of the similar units would change or be affected
              by this edit.
            </p>
          </div>
        </div>
      </div>

      <a-form>
        <p class="text-[#404164] text-[20px] font-sf font-medium mt-[38px]">
          Unit Information
        </p>
        <a-form-item name="rentRate" required>
          <div
            class="form-labels text-base mb-4 font-light leading-[100%] font-sf"
          >
            Reference Number
          </div>
          <a-input-number style="width: 100%" min="0" size="large" />
        </a-form-item>

        <div class="flex gap-4">
          <a-form-item name="rent_price" required class="flex-1 form-labels">
            <div
              class="form-labels text-base mb-4 font-regular leading-[100%] font-sf"
            >
              Rent Price
            </div>
            <a-input placeholder="Rent Price" size="large" />
          </a-form-item>
          <a-form-item
            name="security_deposit"
            required
            class="flex-1 form-labels"
          >
            <div
              class="form-labels text-base mb-4 font-regular leading-[100%] font-sf"
            >
              Security Deposit
            </div>
            <a-input placeholder="Security Deposit" size="large" />
          </a-form-item>
        </div>

        <div class="flex gap-4">
          <a-form-item name="rent_price" required class="flex-1 form-labels">
            <div
              class="form-labels text-base mb-4 font-regular leading-[100%] font-sf"
            >
              Availability Date
            </div>
            <a-input placeholder="Rent Price" size="large" />
          </a-form-item>
          <a-form-item
            name="security_deposit"
            required
            type="date"
            class="flex-1 form-labels"
          >
            <div
              class="form-labels text-base mb-4 font-regular leading-[100%] font-sf"
            >
              Occupancy Status
            </div>
            <a-input placeholder="Security Deposit" size="large" />
          </a-form-item>
        </div>
        <a-form-item>
          <div
            class="form-labels text-base mb-4 font-regular leading-[100%] font-sf"
          >
            Upload Photos
          </div>
          <a-upload-dragger
            class="border-dashed border-[#C7C7C7] rounded-[5px] p-[14px]"
            name="file"
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
            class="border-[#000130] border py-[12px] px-[62px] text-[#404164] font-sf font-semibold leading-[28px] rounded-[4px]"
          >
            Cancel
          </button>
          <button
            class="bg-[#000130] border py-[12px] px-[62px] text-[#fff] font-sf font-semibold leading-[28px] rounded-[4px]"
          >
            Save
          </button>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { message } from "ant-design-vue";
import { openDB } from "idb";
import { computed, h, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Propertyheader from "@/components/Propertyheader.vue";
import { useToast } from "vue-toast-notification";
import { useOptionsStore } from "@/stores/options";
import { UpdateProperty, getPropertyInfo } from "@/api/properties";

import {
  GetAccomodationById,
  AddTenants,
  getunitDetails,
} from "@/api/properties";
const form = reactive({
  accommodationId: "",
  parkingType: "",
  pets: "da",
  heatingType: "",
  acType: "",
  laundryType: "",
  leaseType: [],
  amenities: [],
  description: "",
});
const amenityOptions = ref([]);
const route = useRoute();
const activeKey = ref(1);
const router = useRouter();
const property = ref(null);
const propertyInfo = ref(null);
const propertyUnitIInfo = ref(null);
const loading = ref(true);
const error = ref(null);

const showAddTenantModal = ref(false);
const showEditPropertyModal = ref(false);
const optionsStore = useOptionsStore();

const UNIT_TYPE_ENUM = [
  { label: "Two Bedroom", value: 2 },
  { label: "Three Bedroom", value: 3 },
  { label: "PentHouse", value: 4 },
  { label: "Loft", value: 5 },
  { label: "TownHouse", value: 6 },
  { label: "Duplex", value: 7 },
  { label: "Villa", value: 8 },
  { label: "Serviced Apartment", value: 9 },
  { label: "Shared Accommodation", value: 10 },
  { label: "Hostel/Dormitory", value: 11 },
];

onMounted(async () => {
  await optionsStore.fetchAmenities();

  amenityOptions.value = optionsStore.amenities.map((a) => ({
    label: a.name,
    value: a.amenityId,
    image: a.image || a.icon || null,
  }));
  console.log(optionsStore.amenities);
});
const tenantTab = ref("single");
const tenantLoading = ref(false);
const tenantForm = reactive({
  emailAddress: "",
  FullName: "",
  dob: "",
  phoneNumber: "",
  accountType: 0,
  accountRefNumber: "",
  unitId: 0,
  startDate: "",
  endDate: "",
  rentRate: 0,
});
const tenantFormRef = ref();
const tenantRules = {
  FullName: [{ required: true, message: "Full name is required" }],
  emailAddress: [
    { required: true, message: "Email is required" },
    { type: "email", message: "Invalid email" },
  ],
  phoneNumber: [
    { required: true, message: "Phone number is required" },
    { pattern: /^\d{7,15}$/, message: "Invalid phone number" },
  ],
  unitId: [{ required: true, message: "Property is required" }],
  startDate: [{ required: true, message: "Lease start date is required" }],
  endDate: [{ required: true, message: "Lease end date is required" }],
  rentRate: [{ required: true, message: "Monthly rent is required" }],
};
const createProperties = async () => {
  tenantLoading.value = true;
  let firstname, lastname;
  const [splittedfirstname, splittedlastname] = tenantForm.FullName.split(" ");
  firstname = splittedfirstname;
  lastname = splittedlastname;
  const toast = useToast();
  const payload = {
    emailAddress: tenantForm.emailAddress,
    firstname,
    lastname,
    dob: "",
    phoneNumber: tenantForm.phoneNumber,
    accountType: 0,
    accountRefNumber: "",
    contractRequest: {
      unitId: tenantForm.unitId,
      isActive: true,
      startDate: tenantForm.startDate,
      endDate: tenantForm.endDate,
      rentRate: tenantForm.rentRate,
    },
  };
  console.log(payload, "payload");
  const response = await AddTenants(payload);
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
const EditProperty = async () => {
  try {
    const res = await UpdateProperty({
      ...form,
      leaseType: form.leaseType.join(","),
    });
    showEditPropertyModal.value = false;
  } catch (err) {
    console.log(err);
  }
};
const propertyOptions = computed(() => {
  // You can fetch or map your properties here. For demo, use current property only.
  return property.value.units
    ? property.value.units.map(
        (uni) => uni && { label: uni.unitName, value: uni.unitId }
      )
    : [];
});

onMounted(async () => {
  const id = route.params.id || route.params.accommodationId;
  await getAccomodationDetails(id);
  await fetchPropertyInfo(id);
  if (!id) {
    error.value = "No property ID provided.";
    loading.value = false;
    return;
  }
  try {
    const db = await openDB("properties-db", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("properties")) {
          db.createObjectStore("properties", { keyPath: "accommodationId" });
        }
      },
    });
    const data = await db.get("properties", Number(id));
    if (!data) {
      error.value = "Property not found.";
    } else {
      property.value = data;
    }
  } catch (e) {
    error.value = "Failed to load property details.";
  } finally {
    loading.value = false;
  }
});

// Main image logic
const mainImage = computed(() => {
  if (
    !property.value ||
    !property.value.images ||
    !property.value.images.length
  )
    return "/placeholder.png";
  const main = property.value.images.find((img) => img.isMain);
  return main ? main.image : property.value.images[0].image;
});

// Side images
const sideImages = computed(() => {
  if (!property.value || !property.value.images) return [];
  return property.value.images
    .filter((img) => !img.isMain)
    .map((img) => img.image)
    .slice(0, 3);
});

// Unit type summary
const unitTypeSummary = computed(() => {
  if (!property.value) return "";
  if (property.value.unitTypes && Array.isArray(property.value.unitTypes)) {
    return property.value.unitTypes
      .map((u) => `${u.type}: ${u.count}`)
      .join(", ");
  }
  if (property.value.unitType) {
    return property.value.unitType;
  }
  return "";
});

// Amenities logic
const amenitiesList = computed(() => {
  if (!property.value) return [];
  if (Array.isArray(property.value.amenities)) {
    return property.value.amenities.map((a) =>
      typeof a === "object" ? a : { label: a }
    );
  }
  return null;
});

// Landlord info
const landlord = computed(() =>
  property.value && property.value.landlord ? property.value.landlord : null
);

// Unit table columns
const unitColumns = [
  { title: "Unit ID", dataIndex: "unitId", key: "unitId" },
  { title: "Rooms", dataIndex: "numberOfRooms", key: "numberOfRooms" },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    customRender: ({ text }) => `₦${text}`,
  },
];

function onEdit() {
  if (property.value && property.value.accommodationId) {
    router.push({
      name: "add-admin-properties",
      params: { id: property.value.accommodationId },
    });
  }
}

// Images array for carousel
const images = computed(() => {
  if (
    !property.value ||
    !property.value.images ||
    !property.value.images.length
  )
    return [];
  return property.value.images.map((img) => img.image);
});
const currentImageIndex = ref(0);
function nextImage() {
  if (!images.value.length) return;
  currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length;
}
function prevImage() {
  if (!images.value.length) return;
  currentImageIndex.value =
    (currentImageIndex.value - 1 + images.value.length) % images.value.length;
}
// Reset index if images change
watch(images, (imgs) => {
  if (currentImageIndex.value >= imgs.length) {
    currentImageIndex.value = 0;
  }
});

// Add preview logic for Ant Design image preview
const previewVisible = ref(false);
const previewIndex = ref(0);
function showPreview(idx) {
  previewIndex.value = idx;
  previewVisible.value = true;
}

function resetTenantModal() {
  showAddTenantModal.value = false;
  tenantTab.value = "single";
  tenantLoading.value = false;
  bulkFileList.value = [];
  Object.assign(tenantForm, {
    name: "",
    email: "",
    phone: "",
    property: null,
    leaseStart: null,
    leaseEnd: null,
    monthlyRent: null,
  });
}
async function submitSingleTenant() {
  await tenantFormRef.value.validate().catch(() => {});
  tenantLoading.value = true;
  // setTimeout(() => {
  //   tenantLoading.value = false;
  //   message.success("Tenant added (demo only)");
  //   resetTenantModal();
  // }, 1200);
}
// Bulk upload logic
const bulkFileList = ref([]);
function submitBulkTenant() {
  if (!bulkFileList.value.length) {
    message.error("Please upload a CSV file.");
    return;
  }
  tenantLoading.value = true;
  setTimeout(() => {
    tenantLoading.value = false;
    message.success("Bulk upload complete (demo only)");
    resetTenantModal();
  }, 1200);
}
function downloadSampleFile() {
  // CSV sample
  const sample = [
    [
      "Full Name",
      "Email",
      "Phone",
      "Property",
      "Lease Start Date",
      "Lease End Date",
      "Monthly Rent",
    ],
    [
      "John Doe",
      "john@example.com",
      "08012345678",
      "4",
      "2024-07-01",
      "2025-07-01",
      "500000",
    ],
    [
      "Jane Smith",
      "jane@example.com",
      "08023456789",
      "4",
      "2024-07-02",
      "2025-07-02",
      "500000",
    ],
    [
      "Mike Brown",
      "mike@example.com",
      "08034567890",
      "4",
      "2024-07-03",
      "2025-07-03",
      "500000",
    ],
    [
      "Lisa White",
      "lisa@example.com",
      "08045678901",
      "4",
      "2024-07-04",
      "2025-07-04",
      "500000",
    ],
  ];
  const csv = sample.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "tenant_sample.csv";
  a.click();
  URL.revokeObjectURL(url);
}
async function fetchPropertyInfo(id) {
  try {
    const response = await getPropertyInfo(id);
    console.log(response);
    propertyInfo.value = response.propertydata;
    propertyUnitIInfo.value = response.propertyunits;
  } catch (error) {
    console.log(error);
  }
}

async function getAccomodationDetails(id) {
  const response = await GetAccomodationById(id);
  // console.log(response);
  form.acType = response.acType;
  form.heatingType = response.heatingType;
  form.laundryType = response.laundryType;
  form.leaseType = response.leaseType;
  form.parkingType = response.parkingType;
  form.pets = response.pet;
  form.accommodationId = response.accommodationId;
  // pageProperty = { ...response };
}

const currentAmenities = ref();

async function fetchCurrentAmenities(id) {
  if (activeKey.value !== 1) {
    const response = await getunitDetails(id);
    console.log(response.data);
    currentAmenities.value = response.data.amenities.map(
      (amen) => amen && { amenity: amen.amenity.name }
    );
    console.log(currentAmenities.value);
  }
}
</script>

<style scoped>
.bg-neutral {
  background: #f7f8fa;
}

:deep(.ant-btn-primary) {
  background: #000130;
  border-color: #000130;
}
:deep(.ant-btn-primary:hover),
:deep(.ant-btn-primary:focus) {
  background: #23234a;
  border-color: #23234a;
}

/* Property Header */
.property-header h2 {
  color: #1f2937;
  font-weight: 700;
  line-height: 1.2;
}

/* Detail Cards */
.detail-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.detail-card:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-1px);
}

.detail-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: #000130;
  border-radius: 0.5rem;
  color: white;
  flex-shrink: 0;
}

.detail-content {
  flex: 1;
}

.detail-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.detail-value {
  font-size: 1.125rem;
  color: #1f2937;
  font-weight: 600;
  line-height: 1.3;
}

/* Section Titles */
.section-title {
  font-size: 1.125rem;
  color: #1f2937;
  font-weight: 700;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
  position: relative;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 3rem;
  height: 2px;
  background: #000130;
}

/* Unit Types */
.unit-types-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.unit-type-badge {
  background: #000130;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Description */
.description-content {
  background: #f8fafc;
  padding: 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  color: #374151;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Landlord Card */
.landlord-card {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1.5rem;
}

.landlord-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.ant-modal .ant-modal-body {
  padding: 0 !important;
}
.landlord-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  background: #000130;
  border-radius: 50%;
  color: white;
  flex-shrink: 0;
}

.landlord-details {
  flex: 1;
}

.landlord-name {
  font-size: 1.125rem;
  color: #1f2937;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.landlord-contact {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.contact-item svg {
  color: #000130;
}

/* Responsive Design */
@media (max-width: 768px) {
  .detail-card {
    padding: 1rem;
  }

  .detail-icon {
    width: 2.5rem;
    height: 2.5rem;
  }

  .landlord-info {
    flex-direction: column;
    text-align: center;
  }

  .landlord-contact {
    align-items: center;
  }
}

.add-tenants-modal .ant-modal {
  margin-top: 40px !important;
  margin-bottom: 40px !important;
  padding: 0 !important;
}
.add-tenants-modal .ant-modal-content {
  border-radius: 18px;
  background: #fafbfc;
}
.add-tenants-tabs .ant-tabs-nav {
  margin-bottom: 0;
}
.add-tenants-tabs .ant-tabs-tab {
  width: 50%;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #23234a;
  border-radius: 0;
  background: #f3f4f6;
  margin: 0;
}
.add-tenants-tabs .ant-tabs-tab-active {
  background: #23234a !important;
  color: #fff !important;
}
.add-tenants-tabs .ant-tabs-ink-bar {
  display: none;
}
.add-tenants-tabs .ant-tabs-nav-list {
  width: 100%;
  display: flex;
}
.add-tenants-tabs .ant-tabs-tab {
  flex: 1;
}
.add-tenants-modal-header {
  display: flex;
  align-items: center;
  position: relative;
  padding: 24px 24px 12px 24px;
  border-bottom: 1px solid #e5e7eb;
}
.add-tenants-modal-header .back-btn {
  padding: 0 8px 0 0;
  min-width: 0;
  display: flex;
  align-items: center;
  font-size: 1rem;
}
.add-tenants-modal-header .modal-title {
  flex: 1;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  font-family: "SF Compact Text";
  color: #23234a;
  margin-right: 32px;
}
.add-tenants-tabs.tab-gap .ant-tabs-tab + .ant-tabs-tab {
  margin-left: 20px !important;
}
.add-tenants-modal .ant-modal-body {
  max-height: 70vh;
  overflow-y: auto;
  padding-bottom: 0;
}
:deep(.ant-tabs-nav) {
  /* border: 1px solid #d9d9d9; */
  /* border-radius: 8px; */
  padding: 8px;
}

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
