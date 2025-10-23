<template>
  <div>
    <div class="flex gap-[10px] w-full">
      <div
        class="px-4 mt-4 gap-[10px] h-fit flex-1 font-inter grid grid-cols-2"
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
                ><span> {{ AccomodationApplicationsCount.ongoing || 0 }} </span>
              </div>

              <div class="flex justify-between w-full">
                <span class="flex gap-[8px] items-center">
                  <span
                    class="w-[13px] rounded-[4px] h-[13px] bg-[#FA922A]"
                  ></span>
                  Under Review</span
                ><span> 00 </span>
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
            <span
              class="text-[#000000] bg-[#FFFFFF] rounded-[6px] px-[10px] py-[6px] border-[0.75px] border-solid border-[#36363633]"
            >
              View
            </span>
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
                ><span> 0 </span>
              </div>

              <div class="flex justify-between w-full">
                <span class="flex gap-[8px] items-center">
                  <span
                    class="w-[13px] rounded-[4px] h-[13px] bg-[#FA922A]"
                  ></span>
                  Under Review</span
                ><span> 0 </span>
              </div>
              <div class="flex justify-between w-full">
                <span class="flex gap-[8px] items-center">
                  <span
                    class="w-[13px] rounded-[4px] h-[13px] bg-[#26C779]"
                  ></span>
                  Approved</span
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
                >Target</span
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
            <span
              class="text-[#000000] bg-[#FFFFFF] rounded-[6px] px-[10px] py-[6px] border-[0.75px] border-solid border-[#36363633]"
            >
              View
            </span>
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
        class="bg-[#F6F6F6] h-fit mr-[16px] border-[0.75px] rounded-[1rem] border-solid border-[#36363633] mt-[16px]"
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
          <div class="mt-[45px] w-[200px] h-[200px]">
            <chart :data="chartData" :options="chartOptions" />
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

    <!-- Second Main Div -->
    <div
      class="flex-1 mt-[15px] mx-4 border-t-[0.75px] border-x-[0.75px] border-solid border-[#36363633] rounded-[6px]"
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
      asas
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
import IconRightArrow from "../../components/icons/IconRightArrow.vue";
import IconUpArrow from "../../components/icons/IconUpArrow.vue";
import IconDownArrow from "../../components/icons/IconDownArrow.vue";
import Table from "@/components/Table.vue";
import { h } from "vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
import { FetchServiceRequests } from "@/api/serviceRequest";
import { AccomodationApplications, MyTenants } from "@/api/dashboard";
import { useUserStore } from "@/store";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  components: {
    "right-arrow-icon": IconRightArrow,
    "up-arrow-icon": IconUpArrow,
    "down-arrow-icon": IconDownArrow,
    "table-component": Table,
    chart: Pie,
  },
  data() {
    return {
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
      ongoingRequests: [],
      pendingRequests: [],
      chartData: {
        labels: ["Collected", "Pending"],
        datasets: [
          {
            backgroundColor: ["#66DCA0", "#D9625A"],
            data: [63, 37],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: false,
          },
        },
      },
      headers: ["#", "Name", "Status", "Property", "Unit Number", "Due Date"],
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
    handleFetchServiceRequest() {
      this.loading.serviceRequestCompleted = true;
      this.loading.serviceOngoingCompleted = true;
      FetchServiceRequests().then((response) => {
        this.loading.serviceRequestCompleted = false;
        this.loading.serviceOngoingCompleted = false;
        if (response.responseCode == "00") {
          this.serviceRequests = response.serviceRequests.filter(
            (req) => req.serviceStatus == 3
          );
          this.ongoingRequests = response.serviceRequests.filter(
            (req) => req.serviceStatus == 2
          );
          this.pendingRequests = response.serviceRequests.filter(
            (req) => req.serviceStatus == 1
          );
        } else handleError(response);
      });
    },

    handleAccomodationApplication() {
      AccomodationApplications(this.store.userProfile.referenceID)
        .then((response) => {
          this.AccomodationApplicationsCount = { ...response };
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

<style>
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
