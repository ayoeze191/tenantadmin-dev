<template>
  <div class="flex-1">
    <transition name="fade">
      <div class="px-4" v-if="showAds == true">
        <div
          class="bg-[#2E544E] flex justify-between w-full px-[14px] py-[12.5px] rounded-[8px]"
        >
          <div
            class="flex gap-2 items-center text-white font-inter text-[14px] font-medium"
          >
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.75 8.5V4.75M7.75 1C11.4779 1 14.5 4.02208 14.5 7.75C14.5 11.4779 11.4779 14.5 7.75 14.5C4.02208 14.5 1 11.4779 1 7.75C1 4.02208 4.02208 1 7.75 1ZM7.71265 10.75V10.675L7.78735 10.6749V10.75H7.71265Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span
              >Enhance tenant satisfaction with a dedicated property manager!
              Efficient lease tracking and prompt maintenance requests.</span
            >
          </div>

          <div class="h-full">
            <button
              @click="showAds = false"
              class="bg-[#FFFFFF33] h-full text-[#FFFFFF] text-[12px] font-inter font-medium px-[10px] py-[6px] rounded-[6px]"
            >
              Skip
            </button>
            <button
              @click="isAddManagerModalOpen = true"
              class="bg-[#FFFFFF] h-full text-[#000000] ml-[4px] text-[12px] font-inter font-medium px-[10px] py-[6px] rounded-[6px]"
            >
              Add Manager
            </button>
          </div>
        </div>
      </div>
    </transition>
    <div class="pt-4 h-full">
      <div
        class="flex p-0 m-0 gap-[10px] flex-col lg:flex-row items-stretch w-full h-full"
      >
        <div
          class="px-4 gap-[10px] h-full flex-[0.9] w-full font-inter grid grid-cols-1 lg:grid-cols-2"
        >
          <div
            class="bg-[#F6F6F6] h-fit border-[0.75px] border-solid text-black border-[#36363633] rounded-[16px]"
          >
            <!-- 1 -->

            <div
              class="rounded-[16px] pb-[10px] px-[14px] bg-white border-b-[0.75px] border-solid border-[#36363633]"
            >
              <div
                class="flex items-center justify-between text-black border-[#36363633] border-b-[0.75px] border-solid"
              >
                <div
                  class="flex items-center py-[10px] border-b-solid border-b-[#36363633] gap-3"
                >
                  <div
                    class="p-[12px] rounded-[8px] border-[#36363633] border-[0.75px] border-solid"
                  >
                    <AppstoreOutlined />
                  </div>
                  <div class="flex flex-col gap-1 ml-[10px]">
                    <span
                      class="text-[#000000] font-medium text-[14px] font-inter leading-[100%]"
                      >Application</span
                    >
                    <span
                      class="text-[#25262899] leading-[100%] text-[12px] font-inter font-medium"
                      >Tenancy Application Record</span
                    >
                  </div>
                </div>
                <div class="bg-[#F2F2F2] rounded-[6px] px-2 py-1">0.0%</div>
              </div>
              <div class="flex justify-between m-0 py-[14px]">
                <span
                  class="text-[#000000B2] m-0 p-0 text-[14px] font-inter leading-[100%]"
                  >Total Applications</span
                >
                <span>00</span>
              </div>
              <div class="flex gap-[2px] m-0 mb-[10px] p-0">
                <div
                  class="flex rounded-[4px] bg-[#67ABFF] h-[13px] w-full"
                ></div>
                <div
                  class="flex rounded-[4px] bg-[#FB8814] h-[13px] w-full"
                ></div>
                <div
                  class="flex rounded-[4px] bg-[#0FC36C] h-[13px] w-full"
                ></div>
              </div>

              <div class="flex flex-col gap-2.5">
                <div class="flex justify-between w-full">
                  <span class="flex gap-[8px] items-center">
                    <span
                      class="w-[13px] rounded-[4px] h-[13px] bg-[#67ABFF]"
                    ></span>
                    Ongoing</span
                  ><span>
                    {{ AccomodationApplicationsCount.ongoing || 0 }}
                  </span>
                </div>

                <div class="flex justify-between w-full">
                  <span class="flex gap-[8px] items-center">
                    <span
                      class="w-[13px] rounded-[4px] h-[13px] bg-[#FA922A]"
                    ></span>
                    Awaiting Payment</span
                  ><span>
                    {{ AccomodationApplicationsCount.awaitingPayment }}
                  </span>
                </div>
                <div class="flex justify-between w-full">
                  <span class="flex gap-[8px] items-center">
                    <span
                      class="w-[13px] rounded-[4px] h-[13px] bg-[#26C779]"
                    ></span>
                    Approved</span
                  ><span>
                    {{ AccomodationApplicationsCount.completed || 0 }}
                  </span>
                </div>
              </div>
            </div>

            <div class="flex justify-between items-center px-[10px] py-[14px]">
              <span>View All Details</span>
              <router-link
                to="/applications"
                class="text-[#000000] bg-[#FFFFFF] rounded-[6px] px-[10px] py-[6px] border-[0.75px] border-solid border-[#36363633]"
              >
                View
              </router-link>
            </div>
          </div>
          <div
            class="bg-[#F6F6F6] h-fit w-full border-[0.75px] border-solid text-black border-[#36363633] rounded-[16px]"
          >
            <!-- 1 -->

            <div
              class="rounded-[16px] pb-[10px] px-[14px] bg-white border-b-[0.75px] border-solid border-[#36363633]"
            >
              <div
                class="flex items-center justify-between text-black border-[#36363633] border-b-[0.75px] border-solid"
              >
                <div
                  class="flex items-center py-[10px] border-b-solid border-b-[#36363633] gap-3"
                >
                  <div
                    class="p-[12px] rounded-[8px] border-[#36363633] border-[0.75px] border-solid"
                  >
                    <AppstoreOutlined />
                  </div>
                  <div class="flex flex-col gap-1 ml-[10px]">
                    <span
                      class="text-[#000000] font-medium text-[14px] font-inter leading-[100%]"
                      >Service Request</span
                    >
                    <span
                      class="text-[#25262899] leading-[100%] text-[12px] font-inter font-medium"
                      >Service Request Record</span
                    >
                  </div>
                </div>
                <div class="bg-[#F2F2F2] rounded-[6px] px-2 py-1">0.0%</div>
              </div>
              <div class="flex justify-between py-[14px]">
                <span
                  class="text-[#000000B2] text-[14px] font-inter leading-[100%]"
                  >Total Service Request</span
                >
                <span>00</span>
              </div>
              <div class="flex gap-[2px] m-0 mb-[10px]">
                <div
                  class="flex rounded-[4px] bg-[#CF67FF] h-[13px] w-full"
                ></div>
                <div
                  class="flex rounded-[4px] bg-[#312AFA] h-[13px] w-full"
                ></div>
                <div
                  class="flex rounded-[4px] bg-[#0FC36C] h-[13px] w-full"
                ></div>
              </div>

              <div class="flex flex-col gap-2.5">
                <div class="flex justify-between w-full">
                  <span class="flex gap-[8px] items-center">
                    <span
                      class="w-[13px] rounded-[4px] h-[13px] bg-[#67ABFF]"
                    ></span>
                    Ongoing</span
                  ><span> {{ serviceRequestsCount.ongoing }} </span>
                </div>

                <div class="flex justify-between w-full">
                  <span class="flex gap-[8px] items-center">
                    <span
                      class="w-[13px] rounded-[4px] h-[13px] bg-[#FA922A]"
                    ></span>
                    Pending</span
                  ><span> {{ serviceRequestsCount.pending }} </span>
                </div>
                <div class="flex justify-between w-full">
                  <span class="flex gap-[8px] items-center">
                    <span
                      class="w-[13px] rounded-[4px] h-[13px] bg-[#26C779]"
                    ></span>
                    Approved</span
                  ><span> {{ serviceRequestsCount.completed }} </span>
                </div>
              </div>
            </div>

            <div class="flex justify-between items-center px-[10px] py-[14px]">
              <span>View All Details</span>
              <router-link
                to="/service-requests"
                class="text-[#000000] bg-[#FFFFFF] rounded-[6px] px-[10px] py-[6px] border-[0.75px] border-solid border-[#36363633]"
              >
                View
              </router-link>
            </div>
          </div>
          <div
            class="bg-[#F6F6F6] h-fit w-full border-[0.75px] border-solid text-black border-[#36363633] rounded-[16px]"
          >
            <!-- 1 -->

            <div
              class="rounded-[16px] pb-[10px] px-[14px] bg-white border-b-[0.75px] border-solid border-[#36363633]"
            >
              <div
                class="flex items-center justify-between text-black border-[#36363633] border-b-[0.75px] border-solid"
              >
                <div
                  class="flex items-center py-[10px] border-b-solid border-b-[#36363633] gap-3"
                >
                  <div
                    class="p-[12px] rounded-[8px] border-[#36363633] border-[0.75px] border-solid"
                  >
                    <AppstoreOutlined />
                  </div>
                  <div class="flex flex-col gap-1 ml-[10px]">
                    <span
                      class="text-[#000000] font-medium text-[14px] font-inter leading-[100%]"
                      >My Tenants</span
                    >
                  </div>
                </div>
                <div class="px-2 py-1 text-[18px] font-semibold">0</div>
              </div>
              <div class="flex justify-between py-[14px]">
                <span
                  class="text-[#000000B2] text-[14px] font-inter leading-[100%]"
                  >Total</span
                >
                <span>{{ tenantsCounts }}</span>
              </div>
              <div class="flex gap-[2px] m-0 mb-[10px]">
                <div
                  class="flex rounded-[4px] bg-[#E4E5E5] h-[13px] w-full"
                ></div>
              </div>

              <div class="flex flex-col gap-2.5">
                <div class="flex justify-between w-full">
                  <span class="flex gap-[8px] items-center">
                    <span
                      class="w-[13px] rounded-[4px] h-[13px] bg-[#26C779]"
                    ></span>
                    Complete</span
                  ><span> 0 </span>
                </div>

                <div class="flex justify-between w-full">
                  <span class="flex gap-[8px] items-center">
                    <span
                      class="w-[13px] rounded-[4px] h-[13px] bg-[#E5E6E6]"
                    ></span>
                    To Complete</span
                  ><span> 0 </span>
                </div>
              </div>
            </div>

            <div class="flex justify-between items-center px-[10px] py-[14px]">
              <span>View All Details</span>
              <router-link
                to="/tenants"
                class="text-[#000000] bg-[#FFFFFF] rounded-[6px] px-[10px] py-[6px] border-[0.75px] border-solid border-[#36363633]"
              >
                View
              </router-link>
            </div>
          </div>
          <div
            class="bg-[#F6F6F6] h-fit w-full border-[0.75px] border-solid text-black border-[#36363633] rounded-[16px]"
          >
            <!-- 1 -->

            <div
              class="rounded-[16px] pb-[10px] px-[14px] bg-white border-b-[0.75px] border-solid border-[#36363633]"
            >
              <div
                class="flex items-center justify-between text-black border-[#36363633] border-b-[0.75px] border-solid"
              >
                <div
                  class="flex items-center py-[10px] border-b-solid border-b-[#36363633] gap-3"
                >
                  <div
                    class="p-[12px] rounded-[8px] border-[#36363633] border-[0.75px] border-solid"
                  >
                    <AppstoreOutlined />
                  </div>
                  <div class="flex flex-col gap-1 ml-[10px]">
                    <span
                      class="text-[#000000] font-medium text-[14px] font-inter leading-[100%]"
                      >Maintenance Fee</span
                    >
                    <span
                      class="text-[#25262899] bg-[#0000000D] px-[6px] mt-[3px] py-[4px] leading-[100%] text-[12px] font-inter font-medium"
                      >Less cost this week</span
                    >
                  </div>
                </div>
                <div class="bg-[#F2F2F2] rounded-[6px] px-2 py-1">0.0%</div>
              </div>
              <div class="flex justify-between py-[14px]">
                <span
                  class="text-[#000000B2] text-[14px] font-inter leading-[100%]"
                  >Total Applications</span
                >
                <span>00</span>
              </div>
              <div class="flex gap-[2px] m-0 mb-[10px]">
                <div
                  class="flex rounded-[4px] bg-[#E4E5E5] h-[13px] w-full"
                ></div>
              </div>

              <div class="flex flex-col gap-2.5">
                <div class="flex justify-between w-full">
                  <span class="flex gap-[8px] items-center">
                    <span
                      class="w-[13px] rounded-[4px] h-[13px] bg-[#26C779]"
                    ></span>
                    Paid</span
                  ><span> 0 </span>
                </div>

                <div class="flex justify-between w-full">
                  <span class="flex gap-[8px] items-center">
                    <span
                      class="w-[13px] rounded-[4px] h-[13px] bg-[#E5E6E6]"
                    ></span>
                    Owing</span
                  ><span> 0 </span>
                </div>
              </div>
            </div>

            <div class="flex justify-between items-center px-[10px] py-[14px]">
              <span>View All Details</span>
              <span
                class="text-[#000000] bg-[#FFFFFF] rounded-[6px] px-[10px] py-[6px] border-[0.75px] border-solid border-[#36363633]"
              >
                View
              </span>
            </div>
          </div>
        </div>
        <div
          class="bg-[#F6F6F6] flex flex-col flex-[0.3] w-fit mr-[16px] border-[0.75px] rounded-[1rem] border-solid border-[#36363633]"
        >
          <div
            class="text-[black] bg-[#FFFFFF] rounded-[16px] border-[0.75px] border-solid border-[#36363633] p-[16px]"
          >
            <div class="flex items-center gap-2.5">
              <div
                class="border-[0.75px] border-solid border-[#36363633] rounded-[8px] p-2.5 w-fit"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0013 18.3307C14.6037 18.3307 18.3346 14.5998 18.3346 9.9974C18.3346 5.39502 14.6037 1.66406 10.0013 1.66406C5.39893 1.66406 1.66797 5.39502 1.66797 9.9974C1.66797 14.5998 5.39893 18.3307 10.0013 18.3307Z"
                    stroke="#1C274C"
                    stroke-width="1.5"
                  />
                  <path
                    d="M10 14.1641V14.5807V14.9974"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M10 5V5.41667V5.83333"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M12.5 7.91927C12.5 6.76868 11.3807 5.83594 10 5.83594C8.61925 5.83594 7.5 6.76868 7.5 7.91927C7.5 9.06985 8.61925 10.0026 10 10.0026C11.3807 10.0026 12.5 10.9354 12.5 12.0859C12.5 13.2365 11.3807 14.1693 10 14.1693C8.61925 14.1693 7.5 13.2365 7.5 12.0859"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <div class="">
                <p class="m-0 p-0 text-[14px] font-medium leading-[100%]">
                  Rent Inflow
                </p>
                <p
                  class="m-0 p-0 text-[#25262899] mt-[4px] text-[12px] font-medium leading-[100%]"
                >
                  Income and Pending Rent Statistics
                </p>
              </div>
            </div>
            <div class="mt-[45px]">
              <chart
                :data="chartData"
                :width="180"
                :height="180"
                :options="chartOptions"
                :plugins="plugins"
              />
            </div>

            <div>
              <div
                class="flex justify-between mt-[45px] items-center pb-[1rem] border-b-[0.7px] border-solid border-[#D3D3D3B2]"
              >
                <span
                  class="text-[#000000B2] text-[14px] leading-[100%] font-inter"
                  >Expected Rent</span
                ><span class="text-[18px] font-bold font-inter">C$00</span>
              </div>
              <div class="flex justify-between w-full mt-[16px]">
                <span class="flex gap-[8px] items-center">
                  <span
                    class="w-[13px] rounded-[4px] h-[13px] bg-[#26C779]"
                  ></span>
                  Incoming</span
                ><span> C$00 </span>
              </div>
              <div class="flex justify-between w-full mt-[16px]">
                <span class="flex gap-[8px] items-center">
                  <span
                    class="w-[13px] rounded-[4px] h-[13px] bg-[#D9625A]"
                  ></span>
                  Pending</span
                ><span> C$00 </span>
              </div>
            </div>
          </div>
          <div
            class="flex flex-1 justify-between items-center px-[10px] py-[14px]"
          >
            <span>View All Details</span>
            <span
              class="text-[#000000] bg-[#FFFFFF] rounded-[6px] px-[10px] py-[6px] border-[0.75px] border-solid border-[#36363633]"
            >
              View
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Second Main Div -->
    <div
      class="flex-1 h-full mt-[15px] mx-4 border-t-[0.75px] border-x-[0.75px] border-solid border-[#36363633] rounded-[6px]"
    >
      <div
        class="border-b-[0.75px] flex items-center justify-between border-solid border-[#36363633] rounded-t-[6px] p-2.5"
      >
        <div class="flex gap-2.5 items-center">
          <div
            class="border-solid p-3 border-[0.75px] rounded-[8px] w-fit border-[#36363633]"
          >
            <DollarCircleOutlined style="color: #1c274c" />
          </div>
          <div>
            <p
              class="p-0 m-0 text-[#000000] text-[14px] font-inter font-medium"
            >
              Pending Rent Payment
            </p>
            <p
              class="p-0 m-0 text-[#25262899] mt-1 text-[14px] font-inter font-medium"
            >
              See all pending payments
            </p>
          </div>
        </div>
        <div class="flex gap-2.5 items-center">
          <!-- <a-input-search placeholder="search" class="px-[12px] py-[6.5px]" /> -->
          <a-dropdown>
            <a
              class="ant-dropdown-link border-[1px] rounded-[8px] flex border-[#D0D5DD] px-[12px] py-[6.5px] gap-[8px] items-center text-[#0000004D]"
              @click.prevent
            >
              <Button
                class="text-[14px] p-0 font-medium font-inter leading-[24px]"
                >Status</Button
              >
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">1st menu item</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">2nd menu item</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">3rd menu item</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <a-date-picker
            v-model:value="value1"
            placeholder="Sort by Date"
            class="text-[14px] font-medium font-inter leading-[24px] px-[12px] py-[6.5px]"
          />
        </div>
      </div>
      <!-- empty state -->
      <div class="h-full flex justify-center py-8">
        <div
          v-if="tenants.length === 0"
          class="flex flex-col items-center h-fit"
        >
          <div
            class="border-solid mx-auto p-3 border-[0.75px] rounded-[8px] w-fit border-[#36363633]"
          >
            <DollarCircleOutlined style="color: #1c274c" />
          </div>
          <div class="flex flex-col items-center">
            <p
              class="text-[#000000] mt-4 font-inter text-[14px] font-medium leading-[100%] text-center"
            >
              You have no pending payments
            </p>
            <p
              class="text-[#25262899] text-[12px] text-center font-inter font-medium leading-[100%]"
            >
              There’s nothing to view, click the button below to add new tenants
            </p>
            <button
              class="bg-[#000130] text-[#FFFFFF] font-inter font-medium px-4 py-4 rounded-[8px]"
              @click="isAddTenantModalOpen = true"
            >
              + Invite user
            </button>
          </div>
        </div>
        <div class="" v-else>
          <dashboard-table-component :headers="headers" />
        </div>
      </div>
    </div>

    <a-modal
      v-model:visible="isAddTenantModalOpen"
      :footer="null"
      centered
      :closable="false"
    >
      <template #title>
        <div class="flex items-center justify-between">
          <span class="font-redwing text-[24px] leading-[100%]"
            >Invite Tenant</span
          >
          <span></span>
          <a-button disabled @click="() => (isAddTenantModalOpen = false)">
            <CloseOutlined />
          </a-button>
        </div>
      </template>
      <div class="flex flex-col gap-4 mt-6">
        <div>
          <div
            class="form-labels font-inter font-medium text-[14px] leading-[100%] mb-3"
          >
            User Email
          </div>
          <a-input
            type="mail"
            placeholder="Enter Mail"
            size="large"
            v-model:value="tenantsPayload.emailAddress"
          />
        </div>

        <a-button
          @click="sendInvite"
          :loading="loadingInvite"
          :disabled="
            loadingInvite == true || !tenantsPayload.emailAddress.includes('@')
          "
          class="w-full bg-[#000130] py-2 leading-[100%] text-white font-inter font-medium rounded-lg"
        >
          Send Invite
        </a-button>
      </div>
    </a-modal>

    <a-modal
      v-model:visible="isAddManagerModalOpen"
      :footer="null"
      centered
      :closable="false"
    >
      <template #title>
        <div class="flex items-center justify-between">
          <span class="font-redwing text-[24px] leading-[100%]"></span>
          <span></span>
          <button
            @click="() => (isAddManagerModalOpen = false)"
            class="bg-[#FFFFFF] rouunded-[100px] p-2"
          >
            <CloseOutlined />
          </button>
        </div>
      </template>
      <div>
        <p class="text-[#000000] m-0 p-0 font-redwing text-[24px]">
          Add Property Manager
        </p>
        <p
          class="text-[#000000B2] m-0 p-0 mt-2 text-[14px] font-inter font-regular leading-[20px]"
        >
          Do you work with a Property Manager? Add them now for easier tenancy
          management.
        </p>
      </div>
      <div class="flex flex-col gap-4 mt-4">
        <div>
          <a-input
            placeholder="Enter First Name"
            size="large"
            v-model:value="managerPayloads.firstname"
          />
        </div>
        <div>
          <a-input
            placeholder="Enter Last Name"
            size="large"
            v-model:value="managerPayloads.lastname"
          />
        </div>
        <div class="flex-1 h-[43px]">
          <a-input
            placeholder="Enter Email"
            class="h-full"
            size="large"
            v-model:value="managerPayloads.emailAddress"
          />
        </div>
        <div class="flex items-center p-0 relative">
          <div class="flex-1 h-[43px]">
            <a-input
              placeholder="Enter password"
              class="h-full"
              size="large"
              type="password"
              v-model:value="managerPayloads.password"
            />
          </div>

          <button
            type="button"
            :disabled="
              managerPayloads.firstname == '' ||
              managerPayloads.lastname == '' ||
              managerPayloads.emailAddress == '' ||
              managerPayloads.password == ''
            "
            @click="handleAddPropertyManager"
            class="w-fit m-0 px-3 disabled:cursor-not-allowed disabled:bg-[#bfbfbf] bg-[#000130] h-[43px] leading-[100%] ml-[10px] text-[14px] text-white font-inter font-medium rounded-lg"
          >
            Add Manager
          </button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
import IconRightArrow from "../../components/icons/IconRightArrow.vue";
import IconUpArrow from "../../components/icons/IconUpArrow.vue";
import IconDownArrow from "../../components/icons/IconDownArrow.vue";
import Table from "@/components/Table.vue";
import dashboardTable from "@/components/icons/dashboardTable.vue";
import { h } from "vue";
import { LoadingOutlined } from "@ant-design/icons-vue";

import {
  AccomodationApplications,
  MyTenants,
  serviceRequests,
} from "@/api/dashboard";
import { useUserStore } from "@/store";
import { AddTenants } from "@/api/properties";
import { addPropertyManager } from "@/api/dashboard";
import { useToast } from "vue-toast-notification";
import { inviteUsers } from "@/api/dashboard";
ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  components: {
    "right-arrow-icon": IconRightArrow,
    "up-arrow-icon": IconUpArrow,
    "down-arrow-icon": IconDownArrow,
    "table-component": Table,
    "dashboard-table-component": dashboardTable,
    chart: Pie,
  },
  data() {
    return {
      loadingInvite: false,
      tenants: [
        // {
        //   name: "Steph Sobim",
        //   status: "Due",
        //   property: "Thistlebrook Lane, Mistwood, Ontario, K8N 3P5",
        //   unit: "12",
        //   dueDate: "22-09-2025",
        // },
        // {
        //   name: "John Doe",
        //   status: "Pending",
        //   property:
        //     "Harborview Drive, Westport Falls, British Columbia, V6Z 1R2",
        //   unit: "98",
        //   dueDate: "22-09-2025",
        // },
        // {
        //   name: "Francesa Dublin",
        //   status: "Overdue",
        //   property: "Snowberry Crescent, Pinefield, Nova Scotia, B3H 2M9",
        //   unit: "77",
        //   dueDate: "22-09-2025",
        // },
      ],
      tenantsPayload: {
        emailAddress: "",
      },
      managerPayloads: {
        emailAddress: "",
        firstname: "",
        lastname: "",
        phoneNumber: "",
        password: "",
        roleId: 0,
        propertyRefNo: 0,
      },
      toast: useToast(),
      isAddTenantModalOpen: false,
      isAddManagerModalOpen: false,
      showAds: true,
      store: useUserStore(),
      progress: 50,
      AccomodationApplicationsCount: {
        completed: 0,
        ongoing: 0,
        awaitingPayment: 0,
      },
      tenantsCounts: 0,
      customIcon: h(LoadingOutlined, {
        style: {
          fontSize: "15px",
          color: "#1890ff",
        },
      }),
      loading: {
        serviceRequestCompleted: false,
        serviceOngoingCompleted: false,
        completedaccomodationApplication: false,
        tenants: false,
      },
      serviceRequests: [],
      serviceRequestsCount: {
        completed: 0,
        ongoing: 0,
        pending: 0,
      },
      ongoingRequests: [],
      pendingRequests: [],
      chartData: {
        labels: ["Income", "Pending"],
        datasets: [
          {
            data: [63, 37],
            backgroundColor: ["#26C779", "#D9625A"],
            borderWidth: 0,
            borderRadius: 6,
            cutout: "75%",
            spacing: 4,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "75%",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
      },
      // ✅ Custom Plugin defined separately
      plugins: [
        {
          id: "centerText",
          beforeDraw(chart) {
            const { ctx, width, height } = chart;
            const text1 = "Total Revenue";
            // const text2 = "₦1.2M";
            ctx.save();
            // Text 1
            ctx.font = "bold 14px sans-serif";
            ctx.fillStyle = "#555";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(text1, width / 2, height / 2 - 10);
            // Text 2
            ctx.font = "bold 18px sans-serif";
            ctx.fillStyle = "#111";
            // ctx.fillText(text2, width / 2, height / 2 + 12);

            ctx.restore();
          },
        },
      ],

      headers: ["S/N", "Name", "Status", "Property", "Unit Number", "Due Date"],
      tableData: [
        {
          id: 1,
          name: "Steph Sobim",
          status: "Overdue",
          property: "Wellington House",
          unit: "1234",
          date: "23/09/22",
        },
        {
          id: 2,
          name: "Steph Sobim",
          status: "Pending",
          property: "Wellington House",
          unit: "1234",
          date: "23/09/22",
        },
        {
          id: 3,
          name: "Steph Sobim",
          status: "Due",
          property: "Wellington House",
          unit: "1234",
          date: "23/09/22",
        },
      ],
    };
  },
  created() {
    this.handleFetchServiceRequest();
    this.handleAccomodationApplication();
    this.handleTenants();
  },
  methods: {
    sendInvite() {
      this.loadingInvite = false;
      inviteUsers(this.tenantsPayload.emailAddress)
        .then((response) => {
          this.loadingInvite = false;
          if (response.responseCode == "00") {
            this.toast.success("Users Successfully Invited");
            this.tenantsPayload.emailAddress = "";
            this.isAddTenantModalOpen = false;
          }
        })
        .catch();
    },
    handleFetchServiceRequest() {
      this.loading.serviceRequestCompleted = true;
      this.loading.serviceOngoingCompleted = true;
      serviceRequests().then((response) => {
        this.loading.serviceRequestCompleted = false;
        this.loading.serviceOngoingCompleted = false;
        if (response.responseCode == "00") {
          this.serviceRequestsCount.completed = response.completed;
          this.serviceRequestsCount.ongoing = response.ongoing;
          this.serviceRequestsCount.pending = response.pending;
        } else handleError(response);
      });
    },
    handleAddTenant() {
      AddTenants(this.tenantsPayload).then((response) => {
        if (response.responseCode === "00") {
          this.isAddTenantModalOpen = false;
          this.toast.success("Tenant added successfully");
        } else {
          console.log(response);
        }
      });
    },
    handleAddPropertyManager() {
      const payloadCopy = { ...this.managerPayloads }; // clone to prevent mutation

      addPropertyManager(payloadCopy).then((response) => {
        console.log("After sending:", this.managerPayloads);
        if (response.responseCode === "00") {
          this.isAddManagerModalOpen = false;
          this.toast.success("Property Manager added successfully");
        } else {
          console.log(response);
        }
      });
    },
    handleAccomodationApplication() {
      AccomodationApplications(this.store.userProfile.referenceID)
        .then((response) => {
          this.AccomodationApplicationsCount = {
            awaitingPayment: response.awaitingPayment,
            ongoing: response.ongoing,
            completed: response.completed,
          };
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleTenants() {
      MyTenants(this.store.userProfile.referenceID)
        .then((response) => {
          this.tenantsCounts = response.count;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
// const AccomodationApplications = () => {
//   this.AccomodationApplications
// }
</script>

<style scoped>
.shell {
  height: 10px;
  width: 292px;
  border-radius: 13px;
  margin-bottom: 16px;
  background-color: #e3e4e4;
}

.bar {
  background: #d7b360;
  height: 10px;
  width: 15px;
  border-radius: 6.32px;
}
</style>
