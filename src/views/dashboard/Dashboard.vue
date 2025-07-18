<template>
  <div
    class="bg-neutral py-5 px-10 w-full overflow-y-scroll h-screen pb-40 font-sf"
  >
    <section
      class="grid grid-cols-3 w-full mb-5 verySmallLaptop:grid-cols-2 tablet:grid-cols-1"
    >
      <div class="flex flex-col gap-[30px]">
        <!-- Data Card -->
        <div class="data_card h-full">
          <section class="header mb-[16px] px-[14px]">
            <p class="card_title m-0 text-[14px] leading-[100%]">Application</p>
            <a
              class="flex items-center gap-[2px] font-sf font-medium text-[#252628]"
            >
              See all
              <span class="">
                <right-arrow-icon />
              </span>
            </a>
          </section>
          <section class="px-[14px]">
            <p
              class="flex gap-[4px] items-end font-medium text-dark text-sm h-fit"
            >
              <span class="text-lrge h-full font-[600] font-sf leading-[100%]"
                >15</span
              >
              <span class="text-[14px] mb-[6px] leading-[100%]">
                Completed
              </span>
            </p>
            <p
              class="ml-auto w-fit credit_txt text-right gap-[2px] items-center text-dark flex py-1 px-2"
            >
              <span class=""><up-arrow-icon /></span>2.7%
            </p>

            <p
              class="text-light_dark leading-[100%] font-sf text-right text-xs"
            >
              More applications this week
            </p>
          </section>
          <section
            class="pt-[20px] px-[14px] border-t-[1px] border-[#E3E4E4] border-solid"
          >
            <li class="text-[#25262880] font-[600] flex gap-[2px] items-center">
              Ongoing
              <span
                class="text-[#A31616] text-[12px] bg-[#FFE8EC] px-[5px] py-[2px] rounded-[15px] flex"
                >8</span
              >
            </li>
          </section>
        </div>
        <div class="data_card py-[25px]">
          <section class="header mb-[16px] px-[14px]">
            <p class="card_title m-0 text-[14px] leading-[100%]">My Tenants</p>
            <a
              class="flex items-center gap-[2px] font-sf font-medium text-[#252628]"
            >
              See all
              <span class="">
                <right-arrow-icon />
              </span>
            </a>
          </section>
          <section class="px-[14px]">
            <p class="font-medium text-dark text-sm h-fit">
              <span class="text-lrge font-[600] font-sf m-0 p-0 leading-[100%]"
                >1045</span
              >
            </p>
          </section>
          <section
            class="pt-[20px] mb-0 px-[14px] border-t-[1px] border-[#E3E4E4] border-solid flex flex-col gap-[16px]"
          >
            <div class="h-[10px] bg-[#E3E4E4] rounded-[6.32px]">
              <div
                class="h-full bg-[#D7B360] rounded-[6.32px]"
                :style="{ width: progress + '%' }"
              ></div>
            </div>
            <li
              class="text-[#25262880] text-[14px] leading-[100%] font-[600] flex gap-[2px] items-center"
            >
              Target :
              <span class="text-[14px] px-[5px] py-[2px] rounded-[15px] flex">
                {{ " " }}100 tenants (43% complete)</span
              >
            </li>
          </section>
        </div>
      </div>
      <div class="flex flex-col gap-[30px] ml-[24px] mr-[24px]">
        <div class="data_card">
          <section class="header mb-[16px] px-[14px]">
            <p class="card_title m-0 text-[14px] leading-[100%]">
              Service Requests
            </p>
            <a
              class="flex items-center gap-[2px] font-sf font-medium text-[#252628]"
            >
              See all
              <span class="">
                <right-arrow-icon />
              </span>
            </a>
          </section>
          <section class="px-[14px]">
            <p class="font-medium flex gap-1 items-end text-dark text-sm h-fit">
              <span class="text-lrge font-[600] font-sf m-0 p-0 leading-[100%]"
                >8</span
              >
              <span class="mb-[6px] text-[14px] leading-[100%]">
                Completed
              </span>
            </p>
            <p
              class="ml-auto w-fit credit_txt bg-[#FFE8EC] text-right gap-[2px] items-center text-dark flex py-1 px-2"
            >
              <span class=""><up-arrow-icon /></span>2.7%
            </p>

            <p
              class="text-light_dark leading-[100%] font-sf text-right text-xs"
            >
              Less requests this week
            </p>
          </section>
          <section
            class="pt-[20px] px-[14px] border-t-[1px] border-[#E3E4E4] border-solid flex justify-between"
          >
            <li class="text-[#25262880] font-[600] flex gap-[2px] items-center">
              Ongoing
              <span
                class="text-[#A31616] text-[12px] bg-[#FFE8EC] px-[5px] py-[2px] rounded-[15px] flex"
                >8</span
              >
            </li>
            <li class="text-[#25262880] font-[600] flex gap-[2px] items-center">
              Completed
              <span
                class="text-[#A31616] text-[12px] bg-[#E0F5EB] px-[5px] py-[2px] rounded-[15px] flex"
                >5</span
              >
            </li>
          </section>
        </div>
        <div class="data_card">
          <section class="header mb-[16px] px-[14px]">
            <p class="card_title m-0 text-[14px] leading-[100%]">
              Maintenance Fee
            </p>
            <a
              class="flex items-center gap-[2px] font-sf font-medium text-[#252628]"
            >
              See all
              <span class="">
                <right-arrow-icon />
              </span>
            </a>
          </section>
          <section class="px-[14px]">
            <p class="font-medium text-dark text-sm h-fit">
              <span class="text-lrge font-[600] font-sf m-0 p-0 leading-[100%]"
                >C$55,530.45</span
              >
            </p>
            <p
              class="ml-auto w-fit credit_txt bg-[#FFE8EC] text-right gap-[2px] items-center text-dark flex py-1 px-2"
            >
              <span class=""><up-arrow-icon /></span>2.7%
            </p>

            <p
              class="text-light_dark leading-[100%] font-sf text-right text-xs"
            >
              Less cost this week
            </p>
          </section>
          <section
            class="pt-[20px] px-[14px] border-t-[1px] border-[#E3E4E4] border-solid flex justify-between"
          >
            <li class="text-[#25262880] font-[600] flex gap-[2px] items-center">
              Owing
              <span
                class="text-[#A31616] text-[12px] bg-[#FFE8EC] px-[5px] py-[2px] rounded-[15px] flex"
                >8</span
              >
            </li>
            <li class="text-[#25262880] font-[600] flex gap-[2px] items-center">
              Paid
              <span
                class="text-[#A31616] text-[12px] bg-[#E0F5EB] px-[5px] py-[2px] rounded-[15px] flex"
                >5</span
              >
            </li>
          </section>
        </div>
      </div>
      <!--Rent inflow graph -->
      <aside class="data_card h-auto">
        <section class="header flex items-center px-[16px]">
          <p class="text-[#252628] m-0 font-sf text-sm leading-[100%]">
            Rent Inflow
          </p>

          <a class="m-0 text-[#252628] text-xs leading-[100%] font-semibold">
            See all
            <span class="ml-0.5 mt-1">
              <right-arrow-icon />
            </span>
          </a>
        </section>
        <div class="h-72 flex w-full justify-center tablet:h-auto">
          <chart :data="chartData" :options="chartOptions" />
        </div>
        <section
          class="py-[16px] px-5 border-solid border-t-[#E3E4E4] border-t mt-[20px]"
        >
          <p class="text-[#25262880] font-semibold text-base leading-[100%]">
            Expected Rent : <span class="text-[#252628]">$10,000</span>
          </p>
          <ul class="flex justify-between">
            <li class="text-light_dark text-[12px] leading-[100%]">
              Collected Rent:
              <span
                class="text-[#0E3221] font-semibold bg-[#E0F5EB] rounded-[15px] px-[6px] py-[2px] leading-[100%]"
                >$7,500</span
              >
            </li>
            <li class="text-[#25262880] text-[12px] leading-[100%]">
              Pending Rent:
              <span
                class="debit_txt px-[6px] py-[2px] text-[12px] font-semibold"
                >$2,500</span
              >
            </li>
          </ul>
        </section>
      </aside>
    </section>
    <!-- Table -->
    <div class="py-4 px-8 bg-white rounded-lg w-full overflow-x-scroll">
      <p class="text-lg leading-[100%] text-[#000000] mb-5 font-[500]">
        Pending Rent Payment
      </p>
      <div>
        <!-- Table header -->
        <div
          class="grid grid-cols-6 font-normal text-[#98A2B3] text-[18px] font-[initial]"
        >
          <span> # </span>
          <span> Name </span>
          <span> Status </span>
          <span> Property </span>
          <span> Unit Number </span>
          <span> Due Date </span>
        </div>
        <!-- End Table Header -->
        <!-- Table body -->
        <div
          class="grid grid-cols-6 font-normal mb-[29px] text-[#404164] mt-4 text-[18px] font-[initial]"
        >
          <span> 1 </span>
          <span> Steph Sobim </span>
          <span
            class="text-[#E41919] px-[18px] py-[2.5px] rounded-[155px] bg-[#E4191940] w-fit"
          >
            Overdue
          </span>
          <span> Wellington House </span>
          <span> 1243 </span>
          <span> 23/09/22 </span>
        </div>

        <div
          class="grid grid-cols-6 font-normal mb-[29px] text-[#404164] mt-4 text-[18px] font-[initial]"
        >
          <span> 2 </span>
          <span> Steph Sobim </span>
          <span
            class="text-[#D68F02] px-[18px] py-[2.5px] rounded-[155px] bg-[#D68F0240] w-fit"
          >
            Pending
          </span>
          <span> Wellington House </span>
          <span> 1243 </span>
          <span> 23/09/22 </span>
        </div>

        <div
          class="grid grid-cols-6 font-normal mb-[29px] text-[#404164] mt-4 text-[18px] font-[initial]"
        >
          <span> 3 </span>
          <span> Steph Sobim </span>
          <span
            class="text-[#D68F02] px-[18px] py-[2.5px] rounded-[155px] bg-[#D68F0240] w-fit"
          >
            Pending
          </span>
          <span> Wellington House </span>
          <span> 1243 </span>
          <span> 23/09/22 </span>
        </div>

        <div
          class="grid grid-cols-6 font-normal mb-[29px] text-[#404164] mt-4 text-[18px] font-[initial]"
        >
          <span> 4 </span>
          <span> Steph Sobim </span>
          <span
            class="text-[#31A057] px-[18px] py-[2.5px] rounded-[155px] bg-[#31A05740] w-fit"
          >
            Due
          </span>
          <span> Wellington House </span>
          <span> 1243 </span>
          <span> 23/09/22 </span>
        </div>

        <div
          class="grid grid-cols-6 font-normal mb-[29px] text-[#404164] mt-4 text-[18px] font-[initial]"
        >
          <span> 5 </span>
          <span> Steph Sobim </span>
          <span
            class="text-[#E41919] px-[18px] py-[2.5px] rounded-[155px] bg-[#E4191940] w-fit"
          >
            Overdue
          </span>
          <span> Wellington House </span>
          <span> 1243 </span>
          <span> 23/09/22 </span>
        </div>

        <div
          class="grid grid-cols-6 font-normal mb-[29px] text-[#404164] mt-4 text-[18px] font-[initial]"
        >
          <span> 6 </span>
          <span> Steph Sobim </span>
          <span
            class="text-[#E41919] px-[18px] py-[2.5px] rounded-[155px] bg-[#E4191940] w-fit"
          >
            Overdue
          </span>
          <span> Wellington House </span>
          <span> 1243 </span>
          <span> 23/09/22 </span>
        </div>
        <!-- End Table Body -->
      </div>
      <!-- <table-component :headers="headers" :data="tableData" type="dashboard">
        <template #column0="{ entity }">
          {{ entity.id }}
        </template>
        <template #column1="{ entity }">
          {{ entity.name }}
        </template>
        <template #column2="{ entity }">
          <div
            class="status"
            :class="{
              status_pending: entity.status === 'Pending',
              status_overdue: entity.status === 'Overdue',
              status_due: entity.status === 'Due',
            }"
          >
            {{ entity.status }}
          </div>
        </template>
        <template #column3="{ entity }">
          {{ entity.property }}
        </template>
        <template #column4="{ entity }">
          {{ entity.unit }}
        </template>
        <template #column5="{ entity }">
          {{ entity.date }}
        </template>
      </table-component> -->
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
      progress: 50,
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
};
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
