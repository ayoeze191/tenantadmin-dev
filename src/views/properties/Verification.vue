<template>
  <div class="bg-[#F4F7FC] min-h-screen px-[143px]">
    <div class="pt-[45px]">
      <div class="flex justify-between items-center mb-4">
        <div class="flex text-[#808097] items-center gap-[6px]">
          <ArrowLeftOutlined />
          <p class="text-[#404164] p-0 m-0 text-[20px]">Back</p>
        </div>
        <div class="flex gap-[8px] justify-between items-center">
          <button
            class="border-[#29C354] bg-[#EDFFF7] text-[20px] flex items-center py-[6px] px-[12px] border-solid border-[1px] rounded-[5px] text-[#29C354]"
          >
            Approve
          </button>
          <button
            class="bg-[#FFEDED] text-[#F47B7B] border-[#F47B7B] text-[20px] flex items-center py-[6px] px-[12px] border-solid border-[1px] rounded-[5px]"
          >
            Decline
          </button>
        </div>
      </div>
      <div class="flex bg-[#FFFFFF] py-[24px] px-4 rounded-[8px]">
        <div class="w-[50%] pr-8 border-r-[1px] border-[#E6E8EC]">
          <p class="m-0 text-[#000000] text-[20px] font-sf leading-[100%] mb-4">
            Basic Information
          </p>
          <a-form-item name="owner" required class="">
            <p class="text-lg mb-0 font-light text-[#404164] p-0 m-0">
              Property Owner
            </p>
            <a-input
              placeholder="Enter Owner"
              size="large"
              class="m-0 w-full py-[16px]"
            />
          </a-form-item>
          <a-form-item name="owner" required class="">
            <p class="text-lg mb-0 font-light text-[#404164] p-0 m-0">
              Property Address
            </p>
            <a-input
              placeholder="Enter Address"
              size="large"
              class="m-0 w-full py-[16px]"
            />
          </a-form-item>

          <a-form-item name="owner" required class="">
            <p class="text-lg mb-0 font-light text-[#404164] p-0 m-0">City</p>
            <a-input
              placeholder="Enter Owner"
              size="large"
              class="m-0 w-full py-[16px]"
            />
          </a-form-item>
          <div class="flex gap-4">
            <a-form-item name="owner" required class="w-full">
              <p class="text-lg mb-0 font-light text-[#404164] p-0 m-0">
                Postal Code
              </p>
              <a-input
                placeholder="Postal Code"
                size="large"
                class="m-0 w-full py-[16px]"
              />
            </a-form-item>

            <a-form-item name="owner" required class="w-full">
              <p class="text-lg mb-0 font-light text-[#404164] p-0 m-0">
                Province
              </p>
              <a-input
                placeholder="Province"
                size="large"
                class="m-0 w-full py-[16px]"
              />
            </a-form-item>
          </div>

          <a-form-item name="owner" required class="w-full">
            <p class="text-lg mb-0 font-light text-[#404164] p-0 m-0">
              Rental Type
            </p>
            <a-input
              placeholder="House, Apartment, Condo etc"
              size="large"
              class="m-0 w-full py-[16px]"
            />
          </a-form-item>

          <a-form-item name="owner" required class="w-full">
            <p class="text-lg mb-0 font-light text-[#404164] p-0 m-0">
              Property Type
            </p>
            <a-input
              placeholder="House"
              size="large"
              class="m-0 w-full py-[16px]"
            />
          </a-form-item>

          <a-form-item name="owner" required class="w-full">
            <p class="text-lg mb-0 font-light text-[#404164] p-0 m-0">
              Property Title
            </p>
            <a-input
              placeholder="Mason House"
              size="large"
              class="m-0 w-full py-[16px]"
            />
          </a-form-item>

          <div class="flex gap-4">
            <a-form-item name="owner" required class="w-full">
              <p class="text-lg mb-0 font-light text-[#404164] p-0 m-0">
                Bedrooms
              </p>
              <a-input
                placeholder="6"
                size="large"
                class="m-0 w-full py-[16px]"
              />
            </a-form-item>

            <a-form-item name="owner" required class="w-full">
              <p class="text-lg mb-0 font-light text-[#404164] p-0 m-0">
                Bathrooms
              </p>
              <a-input
                placeholder="6"
                size="large"
                class="m-0 w-full py-[16px]"
              />
            </a-form-item>
          </div>

          <div class="flex gap-4">
            <a-form-item name="owner" required class="w-full">
              <p class="text-lg mb-0 font-light text-[#404164] p-0 m-0">Rent</p>
              <a-input
                placeholder="6"
                size="large"
                class="m-0 w-full py-[16px]"
              />
            </a-form-item>

            <a-form-item name="owner" required class="w-full">
              <p class="text-lg mb-0 font-light text-[#404164] p-0 m-0">
                Security Deposit
              </p>
              <a-input
                placeholder="6"
                size="large"
                class="m-0 w-full py-[16px]"
              />
            </a-form-item>
          </div>

          <div class="flex gap-4">
            <a-form-item name="owner" required class="w-full">
              <p class="text-lg mb-0 font-light text-[#404164] p-0 m-0">
                Availability Date
              </p>
              <a-input
                placeholder="12/4/2026"
                size="large"
                class="m-0 w-full py-[16px]"
              />
            </a-form-item>

            <a-form-item name="owner" required class="w-full">
              <p class="text-lg mb-0 font-light text-[#404164] p-0 m-0">
                Occupancy Status
              </p>
              <a-input
                placeholder="Availabile and Vacant"
                size="large"
                class="m-0 w-full py-[16px]"
              />
            </a-form-item>
          </div>
        </div>
        <!--  -->
        <div class="px-4">
          <p class="text-[#404164] text-[20px] font-sf leading-[100%]">
            Property Images
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
