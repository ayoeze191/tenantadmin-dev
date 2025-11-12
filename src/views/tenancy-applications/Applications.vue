<template>
  <div class="px-4 font-inter h-full">
    <div
      class="rounded-[16px] mt-4 h-full font-inter border-[#36363633] border-[0.75px] border-solid"
    >
      <div class="flex items-center">
        <table-header :total-item-count="totalItemCount" title="Applications">
          <div class="flex justify-between w-full items-center">
            <a-input
              v-model:value="searchQuery"
              placeholder="Search by name, gender, age.."
              class="py-[9px] border-[#D0D5DD] mr-[10px] border-[1px] rounded-[8px] w-[338px] border-solid"
            >
              <template #prefix>
                <SearchOutlined class="text-[#BEC1C6] text-[20px]" />
              </template>
            </a-input>
            <div class="flex justify-between gap-[14px]">
              <DropdownButton
                :label="selectedStatus"
                :options="[
                  { label: 'All Status', value: 'All' },
                  { label: 'Completed', value: 'Completed' },
                  { label: 'Pending', value: 'Pending' },
                ]"
                @select="handleSelect"
              />
              <DropdownButton
                :icon="'grid'"
                :label="selectedDisplayType"
                @select="handleDisplaytypeSelect"
                :options="[
                  { label: 'Grid', value: 'Grid' },
                  { label: 'List', value: 'List' },
                ]"
              />
            </div>
          </div>
        </table-header>
      </div>
      <div
        class="px-2.5 mt-2 gap-4 grid grid-cols-4 mb-4"
        v-if="selectedDisplayType == 'Grid'"
      >
        <applicationCard v-for="value in computedData" :app="value" />
      </div>
      <table-component
        v-if="selectedDisplayType == 'List'"
        :title="'applications'"
        :columns="headers"
        :data-source="computedData"
      >
        <template #action="{ record }">
          <a-button
            :class="{
              'bg-[#FEF9C3] border-[#854D0F] border-solid border-[0.5px] text-[#854D0F]':
                AccommodationApplicationStatus[record.status] ==
                'AwaitingAdditionalDocuments',
              'bg-[#F3E8FF] text-[#6D24A9] border-[#6D24A9] border-solid border-[1px] ':
                AccommodationApplicationStatus[record.status] ==
                  'MoveInDateLandlordConfirmationPending' ||
                AccommodationApplicationStatus[record.status] ==
                  'MoveInDateTenantConfirmationPending',
              'bg-[#FEF9C3] border-solid  border-[1px] text-[#1D40AE] border-[#1D40AE]':
                AccommodationApplicationStatus[record.status] ==
                'AwaitingReview',
              'bg-red-700 text-red-300 border-red-300 border-solid border-[1px]':
                AccommodationApplicationStatus[record.status] == 'Declined',
              'bg-[#DCFCE7] text-[#166434] border-[#166434] border-solid border-[1px] z-50 left-[30%]':
                AccommodationApplicationStatus[record.status] == 'Completed',
              'bg-[#FEF9C3] text-[#854D0F] border-solid border-[1px] border-[#854D0F] z- left-[20%]':
                AccommodationApplicationStatus[record.status] ==
                'AwaitingPayment',
            }"
            class="bg-inherit text-black cursor-pointer"
            >View Details</a-button
          >
        </template>
      </table-component>
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
  </div>
</template>

<script>
import TableHeader from "@/components/TableHeader.vue";
import V2Table from "@/components/V2Table.vue";
import V2ServiceRequestsDropDown from "@/components/V2ServiceRequestsDropDown.vue";
import { FetchTenant, ApproveTenant } from "@/api/tenancy";
import applicationCard from "@/components/applicationCard.vue";
import BasePagination from "@/components/BasePagination.vue";
import { useUserStore } from "@/store";
import { AccomodationApplications } from "@/api/dashboard";
export default {
  components: {
    "table-component": V2Table,
    "table-header": TableHeader,
    DropdownButton: V2ServiceRequestsDropDown,
    applicationCard,
    BasePagination,
  },
  created() {
    this.fetchData();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItemCount / this.pageSize) || 1;
    },
  },
  data() {
    return {
      store: useUserStore(),
      searchQuery: "",
      selectedStatus: "All Status",
      selectedDisplayType: "Grid",
      computedData: [],
      AccommodationApplicationStatus: {
        0: "Failed", // Application submission failed or system error occurred
        1: "Awaiting Review", // Application has been submitted and is under review by landlord
        2: "AwaitingAdditionalDocuments", // Landlord has requested additional documents from tenant
        3: "MoveInDateLandlordConfirmationPending", // Application approved, awaiting landlord to confirm move-in date
        4: "ConfirmingMove-inDate", // Landlord set different date, awaiting tenant confirmation
        5: "AwaitingPayment", // Move-in date confirmed, awaiting security deposit payment
        6: "AwaitingLeaseGeneration", // Payment received, awaiting lease document generation
        7: "Completed", // Lease generated and application process completed
        8: "Declined", // Application has been declined by landlord or tenant
        9: "Cancelled", // Application has been cancelled by tenant
        // Legacy statuses (backward compatibility)
        // 1: "Pending", // Use ApplicationReview instead
        // 2: "InProcess", // Use ApplicationReview instead
        // 6: "Cancel", // Use Cancelled instead
        // 5: "PaymentCompeted", // Use Completed instead
      },
      headers: [
        {
          title: "Name",
          dataIndex: "applicantName",
          align: "left",
        },
        {
          title: "Property",
          dataIndex: "propertyName",
          className: "properties",
          align: "left",
        },
        {
          title: "Unit number",
          className: "unit",
          dataIndex: "unitId",
          align: "center",
        },
        {
          title: "status",
          dataIndex: "status",
          align: "center",
          slotName: "status",
        },
        {
          title: "action",
          dataIndex: "action",
          align: "center",
          slotName: "action",
        },
      ],
      serviceLiterals: {
        All: "All Status",
        Completed: "Completed",
        Pending: "Pending",
      },
      totalItemCount: 0,
      currentPage: 1,
      pageSize: 8,
      totalPages: 0,
    };
  },
  methods: {
    onPrev() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.onPageChange(this.currentPage);
      }
    },
    onNext() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.onPageChange(this.currentPage);
      }
    },
    onPageChange(page) {
      this.currentPage = page;
      this.fetchData(page); // 👈 Fetch data for the selected page
    },
    handleSelect(selected) {
      this.selectedStatus = selected.label;
      // Handle filtering logic based on selected.value
    },
    handleDisplaytypeSelect(selected) {
      this.selectedDisplayType = selected.label;
      // Handle filtering logic based on selected.value
    },
    fetchData(page = 1) {
      const query = {
        size: this.pageSize,
        page: page,
        query: "",
      };
      FetchTenant(query, this.store.userProfile.referenceID).then(
        (response) => {
          if (response.responseCode == "00") {
            this.Applications = response.applications.items;
            // this.currentPage = response.applications.page || page;
            this.totalItemCount = response.applications.totalItemCount || 0;
            this.computedData = response.applications.items.map((app) => {
              return {
                applicantName: app.applicantName,
                propertyName: app.propertyName,
                unitId: app.unitId,
                status: this.AccommodationApplicationStatus[app.status],
                email: this.email,
                gender: this.gender,
                phoneNo: this.phoneNo,
                nationality: this.nationality,
              };
            });
          }
        }
      );
    },
  },
};
</script>
