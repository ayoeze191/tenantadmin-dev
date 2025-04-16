<template>
  <div class="bg-neutral py-5 px-10 w-full overflow-y-scroll h-screen pb-40">
    <section class="grid grid-cols-3 gap-5 w-full mb-5 verySmallLaptop:grid-cols-2 tablet:grid-cols-1">
      <div class="flex flex-col gap-5">
        <!-- Data Card -->
        <div class="data_card h-48">
          <section class="header">
            <p class="card_title">Application</p>

            <a>
              See all 
              <span class="ml-0.5 mt-1">
                <right-arrow-icon/>
              </span>
            </a>
          </section>
          <section class="pl-3 py-3 pr-5">
            <p class="font-medium text-dark text-sm leading-4"><span class="text-lrge leading-38">15</span> Completed</p>
            <p class="credit_txt text-right text-dark flex w-16 ml-auto mb-1"><span class="mt-1.5 mr-1.5"><up-arrow-icon/></span>2.7%</p>
            <p class="text-light_dark text-right text-xs leading-3.5">More applications this week</p>
          </section>
          <section class="card_bottom">
            <ul class="flex justify-between">
              <li>Ongoing <span class="debit_txt text-debit">8</span></li>
            </ul>
          </section>
        </div>
        <div class="data_card">
          <section class="header">
            <p class="card_title">My Tenants</p>

            <a>
              See all 
              <span class="ml-0.5 mt-1">
                <right-arrow-icon/>
              </span>
            </a>
          </section>
          <section class="pl-3 py-3 pr-5">
            <p class="font-medium text-dark text-sm leading-4"><span class="text-lrge leading-38">43</span> </p>
          </section>
          <section class="card_bottom">
            <div class="shell">
              <div class="bar" :style="{ width: progress + '%' }">
              </div>
            </div>  
            <h1 class="font-medium leading-4.5 text-dark mb-2.5"> <span class="font-normal text-dark">Target : 100 tenants</span> (43% complete)</h1>
            
          </section>
        </div>
      </div>
      <div class="flex flex-col gap-5">
        <div class="data_card h-48">
          <section class="header">
            <p class="card_title">Service Requests</p>

            <a>
              See all 
              <span class="ml-0.5 mt-1">
                <right-arrow-icon/>
              </span>
            </a>
          </section>
          <section class="pl-3 py-3 pr-5">
            <p class="font-medium text-dark text-sm leading-4"><span class="text-lrge leading-38">8</span> Pending</p>
            <p class="debit_txt text-right flex w-16 ml-auto mb-1"><span class="mt-1.5 mr-1.5"><down-arrow-icon/></span>2.7%</p>
            <p class="text-light_dark text-right text-xs leading-3.5">More applications this week</p>
          </section>
          <section class="card_bottom">
            <ul class="flex justify-between">
              <li>Ongoing <span class="debit_txt text-debit">8</span></li>
              <li>Completed <span class="credit_txt">5</span></li>
            </ul>
          </section>
        </div>
        <div class="data_card h-48">
          <section class="header">
            <p class="card_title">Maintenance Fee</p>

            <a>
              See all 
              <span class="ml-0.5 mt-1">
                <right-arrow-icon/>
              </span>
            </a>
          </section>
          <section class="pl-3 py-3 pr-5">
            <p class="font-medium text-dark text-sm leading-4"><span class="text-lrge leading-38">C$1500</span> </p>
            <p class="debit_txt text-right flex w-16 ml-auto mb-1"><span class="mt-1.5 mr-1.5"><down-arrow-icon/></span>2.7%</p>
            <p class="text-light_dark text-right text-xs leading-3.5">Less cost this week</p>
          </section>
          <section class="card_bottom">
            <ul class="flex justify-between">
              <li>Owing <span class="debit_txt text-debit">8</span></li>
              <li>Paid <span class="credit_txt">5</span></li>
            </ul>
          </section>
        </div>
      </div>
      <!--Rent inflow graph -->
      <aside class="data_card h-[414px] tablet:h-auto">
        <section class="header">
          <p class="card_title">Rent Inflow</p>

          <a>
            See all 
            <span class="ml-0.5 mt-1">
              <right-arrow-icon/>
            </span>
          </a>
        </section>
        <div class="h-72 flex w-full justify-center tablet:h-auto">
          <chart  :data="chartData" :options="chartOptions" />
        </div>
        <section class="card_bottom">
          <p>Expected Rent: <span>$10,000</span></p>
          <ul class="flex justify-between">
            <li>Collected Rent: <span class="credit_txt text-debit">$7,500</span></li>
            <li>Pending Rent: <span class="debit_txt">$2,500</span></li>
          </ul>
        </section>
      </aside>
    </section>
    <!-- Table -->
    <div class="py-4 px-8 bg-white rounded-lg w-full overflow-x-scroll">
      <p class="font-medium text-lg leading-[22px] text-black mb-5">Pending Rent Payment</p>
      <table-component :headers="headers" :data="tableData" type="dashboard">
        <template #column0="{ entity }">
          {{ entity.id }}
        </template>
        <template #column1="{ entity }">
          {{ entity.name }}
        </template>
        <template #column2="{ entity }">
          <div class="status" :class="{'status_pending': entity.status === 'Pending','status_overdue': entity.status === 'Overdue', 'status_due': entity.status === 'Due'}">
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
      </table-component>
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import IconRightArrow from "../../components/icons/IconRightArrow.vue";
import IconUpArrow from "../../components/icons/IconUpArrow.vue";
import IconDownArrow from "../../components/icons/IconDownArrow.vue";
import Table from '@/components/Table.vue';

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  components:{
    "right-arrow-icon": IconRightArrow,
    "up-arrow-icon": IconUpArrow,
    "down-arrow-icon": IconDownArrow,
    "table-component": Table,
    "chart": Pie
  },
  data() {
      return {
      progress: 50,
      chartData: {
        labels: ['Collected', 'Pending'],
        datasets: [
          {
            backgroundColor: ['#66DCA0', '#D9625A'],
            data: [63, 37]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: false,
          }
        }
      },
      headers: [
        '#',
        'Name',
        'Status',
        'Property',
        'Unit Number',
        'Due Date'
      ],
      tableData: [
        {
          id: 1,
          name: 'Steph Sobim',
          status: 'Overdue',
          property: 'Wellington House',
          unit: '1234',
          date: '23/09/22'
        },
        {
          id: 2,
          name: 'Steph Sobim',
          status: 'Pending',
          property: 'Wellington House',
          unit: '1234',
          date: '23/09/22'
        },
        {
          id: 3,
          name: 'Steph Sobim',
          status: 'Due',
          property: 'Wellington House',
          unit: '1234',
          date: '23/09/22'
        },
      ],
    }
  }
}
</script>

<style>

.shell {
  height: 10px;
  width: 292px;
  border-radius: 13px;
  margin-bottom: 16px;
  background-color: #E3E4E4;
}

.bar {
  background: #D7B360;
  height: 10px;
  width: 15px;
  border-radius: 6.32px;
}
</style>