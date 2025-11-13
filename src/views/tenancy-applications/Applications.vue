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
    </ul>
    <div class="flex justify-center mt-8 mb-4">
      <a-pagination
        :current="currentPage"
        :pageSize="pageSize"
        :total="total"
        @change="onPageChange"
      />
      <!-- :itemRender="itemRender" -->
    </div>
  </div>

  <a-modal
    v-model:open="modalOpen"
    :title="`Stage ${stage} • ${stages[stage - 1]}`"
    @ok="handleOk"
    @cancel="handleCancel"
    :centered="true"
    wrapClassName="application-page-modal"
  >
      <div
        v-if="selectedApplication"
        class="border-gray-200 border-[1.5px] rounded-xl p-2 flex gap-1.5"
      >
        <img
          :src="dummyList[0]"
          alt="profile picture"
          class="size-[40px] object-cover rounded-lg"
        />
        <div class="flex flex-col">
          <span>{{ selectedApplication.applicantName }}</span>
          <span>{{ selectedApplication.email }}</span>
        </div>
      </div>

      <a-tabs tabPosition="left" class="mt-3">
        <a-tab-pane
          v-for="tab in stagesTabDetails[stage - 1]"
          :key="tab.tabTitle"
          :tab="tab.tabTitle"
        >
          <h2 class="font-medium uppercase text-[1rem] font-redwing">
            {{ tab.tabTitle }}
          </h2>
          <div
            v-if="
              ['Document Uploaded', 'Additional Documents'].includes(
                tab.tabTitle
              )
            "
            class="flex gap-x-3 gap-y-0 size-full flex-wrap"
          >
            <div
              v-for="doc in tab.tabDetails"
              class="bg-[#1e1e1e10] w-[30%] h-[9rem] p-2 flex flex-col flex-shrink-0 justify-center items-center rounded-lg mb-1.5"
            >
              <IconPDFDoc />
              <span>{{ doc.name }}</span>
            </div>
          </div>
          <div v-for="item in tab.tabDetails" v-else>
            <p class="font-bold">{{ item.label }}</p>
            <div class="mb-2">
              <div v-for="key in item.keys">
                <p
                  v-if="
                    [
                      'phoneNo',
                      'whatsAppNo',
                      'workSupervisorPhoneNo',
                      'emergencyPhoneNo',
                      'guarantor1PhoneNo',
                      'guarantor2PhoneNo',
                    ].includes(key)
                  "
                >
                  {{ formatPhoneNum(selectedApplication[key]) || "N/A" }}
                </p>
                <p v-else-if="key == 'intendedMoveInDate'">
                  {{ formatDate(selectedApplication[key]) || "N/A" }}
                </p>
                <p
                  v-else-if="
                    ['apprMonthlyIncome', 'budgetForAccommodation'].includes(
                      key
                    )
                  "
                >
                  {{
                    selectedApplication[key]
                      ? `CA\$${selectedApplication[key]}`
                      : "N/A"
                  }}
                </p>
                <p v-else>
                  {{
                    selectedApplication[key] == true
                      ? "Yes"
                      : selectedApplication[key] == false
                      ? "No"
                      : selectedApplication[key] || "N/A"
                  }}
                </p>
              </div>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    <template #footer>
      <div v-if="stage == 1" class="mt-3 flex justify-end gap-3">
        <Button @click="handleNext">Next</Button>
        <Button type="danger">Decline</Button>
        <Button type="custom" class="border-gray-200 border-[1.5px] box-border"
          >Request Additional Document</Button
        >
      </div>
      <div v-if="stage == 2" class="mt-3 flex justify-end gap-3">
        <Button
          type="custom"
          class="border-gray-200 border-[1.5px] box-border"
          @click="handleBack"
          >Back</Button
        >
        <div>
          <Button @click="handleNext">Next</Button>
          <Button type="danger">Decline</Button>
        </div>
      </div>
      <div v-if="stage == 3" class="mt-3 flex justify-end gap-3">
        <Button
          type="custom"
          class="border-gray-200 border-[1.5px] box-border"
          @click="handleBack"
          >Back</Button
        >
        <div>
          <Button @click="handleNext">Confirm Date</Button>
          <Button type="danger">Decline</Button>
        </div>
      </div>
    </template>
  </a-modal>
</template>

<script>
import TableHeader from "@/components/TableHeader.vue";
import V2Table from "@/components/V2Table.vue";
import V2ServiceRequestsDropDown from "@/components/V2ServiceRequestsDropDown.vue";
import StatusSelect from "@/components/StatusSelect.vue";
import IconSearch from "../../components/icons/IconSearch.vue";
import IconPDFDoc from "@/components/icons/IconPDFDoc.vue";
// import Modal from "@/components/Modal.vue";
// import { Modal } from 'ant-design-vue';
import { useRouter } from "vue-router";
import { FetchTenant, ApproveTenant } from "@/api/tenancy";
import applicationCard from "@/components/applicationCard.vue";
import BasePagination from "@/components/BasePagination.vue";
import { useUserStore } from "@/store";
import { AccomodationApplications } from "@/api/dashboard";
// import { component } from "vue/types/umd";
import parsePhoneNumber from "libphonenumber-js";
import moment from "moment";
import { ref } from "vue";

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
      AccommodationApplicationStatusDesc: {
        0: "Application submission failed or system error occurred",
        1: "New Application submitted, review Tenant details and<br> decide whether to approve, decline or request more documents",

        2: "You have requested extra documents waiting for tenants to upload",
        3: "Application approved, awaiting landlord to confirm move-in date",
        4: "Landlord set different date, awaiting tenant confirmation",
        5: "Move-in date confirmed, awaiting security deposit payment",
        6: "Payment received, awaiting lease document generation",
        7: "Lease generated and application process completed",
        8: "Application has been declined by landlord or tenant",
        9: "Application has been cancelled by tenant",
      },
      stages: ["Review", "Document Approval", "Set Move-In Date"],
      // [TODO: Responsible Rent in personal information attribute, what do we do if the property is null, not display or display n/a], no guarantor relationship just occupation, no occupation for the applicant, document uploaded information missing. Need backend api for upload signed lease pdf, how to know whether security deposit has been paid currently using doYouHaveTotalMoveinAmount
      stagesTabDetails: [
        [
          {
            tabTitle: "Personal Information",
            tabDetails: [
              { keys: ["phoneNo"], label: "Phone" },
              { keys: ["intendedMoveInDate"], label: "Intended Move-In Date" },
              { keys: ["currentAddress"], label: "Current Address" },
              { keys: ["gender"], label: "Gender" },
              { keys: ["whatsAppNo"], label: "WhatsApp Number" },
            ],
          },
          {
            tabTitle: "Professional Information",
            tabDetails: [
              { keys: ["nameOfEmployer"], label: "Name of Employer" },
              {
                keys: ["currentLandLordName"],
                label: "Current Landlord's Name",
              },
              {
                keys: ["currentLandLordEmail"],
                label: "Current Landlord's Email",
              },
              {
                keys: ["apprMonthlyIncome"],
                label: "Approximate Monthly Income",
              },
              {
                keys: ["lengthOfTimeWithEmployer"],
                label: "Length of Time with Employer",
              },
              {
                keys: ["workSupervisorPhoneNo"],
                label: "Work Supervisor's Number",
              },
              {
                keys: ["workSupervisorEmail"],
                label: "Work Supervisor's Email",
              },
              {
                keys: ["budgetForAccommodation"],
                label: "Budget for Accommodation",
              },
              { keys: ["carModel"], label: "Car Make, Model" },
              { keys: ["carLicenseNumber"], label: "Car License Number" },
            ],
          },
          {
            tabTitle: "Emergency Information",
            tabDetails: [
              {
                label: "Emergency Contact",
                keys: [
                  "emergencyFullName",
                  "emergencyPhoneNo",
                  "emergencyEmail",
                  "emergencyRelationship",
                ],
              },
              {
                label: "Guarantor Information 1",
                keys: [
                  "guarantor1FullName",
                  "guarantor1PhoneNo",
                  "guarantor1Email",
                  "guarantor1Occupation",
                ],
              },
              {
                label: "Guarantor Information 2",
                keys: [
                  "guarantor2FullName",
                  "guarantor2PhoneNo",
                  "guarantor2Email",
                  "guarantor2Occupation",
                ],
              },
            ],
          },
          {
            tabTitle: "Personal Behavior",
            tabDetails: [
              {
                keys: ["haveYoubeenToCourtByLandLord"],
                label: "Brought to court by a Landlord?",
              },
              {
                keys: ["haveYoueverDamageApartmentOrMovestillowning"],
                label: "Moved still owing Rent?",
              },
              {
                keys: ["doYouHaveTotalMoveinAmount"],
                label: "Total Move-in amount available?",
              },
              { keys: ["doYouHavePets"], label: "Have pets?" },
              { keys: ["doYouSmoke"], label: "Smoke?" },
              {
                keys: ["isYourCurrentRentUpToDate"],
                label: "Current rent up to date?",
              },
              {
                keys: ["haveYoueverDamageApartmentOrMovestillowning"],
                label: "Damaged an apartment?",
              },
              {
                keys: ["haveYouEverBeenEvicted"],
                label: "Been evicted as a tenant?",
              },
            ],
          },
          {
            tabTitle: "Document Uploaded",
            tabDetails: [
              { name: "Proof of Ownership doc.", docType: "PDF" },
              { name: "Government-Issued ID doc.", docType: "PDF" },
              { name: "Lease Agreement Template doc.", docType: "PDF" },
              { name: "House Rules doc.", docType: "PDF" },
            ],
          },
        ],
        [
          {
            tabTitle: "Additional Documents",
            tabDetails: [
              { name: "Proof of Ownership doc.", docType: "PDF" },
              { name: "Government-Issued ID doc.", docType: "PDF" },
              { name: "Lease Agreement Template doc.", docType: "PDF" },
              { name: "House Rules doc.", docType: "PDF" },
            ],
          },
          {
            tabTitle: "Applicant's Information",
            tabDetails: [
              { keys: ["phoneNo"], label: "Phone" },
              { keys: ["nameOfEmployer"], label: "Name Of Employer" },
              { keys: ["apprMonthlyIncome"], label: "Monthly Income" },
            ],
          },
        ],
        [
          {
            tabTitle: "Move-In Date Information",
            tabDetails: [
              { keys: ["propertyName"], label: "Property Name" },
              { keys: ["unitName"], label: "Unit" },
              {
                keys: ["intendedMoveInDate"],
                label: "Tenants Intended Move-In date",
              },
              { keys: ["apprMonthlyIncome"], label: "Monthly Income" },
            ],
          },
        ],
      ],
      selected_tab: "pending",
      selected_Request: {},
      status: "Status",
      computedData: [],
      router: useRouter(),
      selectedStatus: "Status",
      selectedListType: "List",
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
  setup() {
    const stage = ref(1);
    const modalOpen = ref(false);
    const selectedApplication = ref(null);

    function showModal(app) {
      selectedApplication.value = app;
      modalOpen.value = true;
    }

    const handleOk = () => {
      console.log("oked");
      modalOpen.value = false;
      stage.value = 1;
    };

    const handleCancel = () => {
      console.log("cancelled");
      modalOpen.value = false;
      stage.value = 1;
    };

    return {
      modalOpen,
      stage,
      selectedApplication,
      moment,
      showModal,
      handleOk,
      handleCancel,
    };
  },
  computed: {
    filteredApplications() {
      if (!this.searchQuery) return this.Applications;
      const q = this.searchQuery.toLowerCase();
      return this.Applications.filter(
        (app) =>
          (app.applicantName && app.applicantName.toLowerCase().includes(q)) ||
          (app.email && app.unitName.toLowerCase().includes(q)) ||
          (app.statusName && app.statusName.toLowerCase().includes(q)) ||
          (app.unitName && app.unitName.toLowerCase().includes(q)) ||
          (app.gender && app.gender.toLowerCase().includes(q))
      );
    },
  },
  components: {
    "search-icon": IconSearch,
    "status-select": StatusSelect,
    IconPDFDoc,
    Button,
  },
  methods: {
    TurnCamelCaseToWords(str) {
      return str
        .replace(/([A-Z])/g, " $1") // Insert a space before all caps
        .replace(/^./, function (str) {
          return str.toUpperCase();
        }) // Uppercase the first character
        .trim(); // Remove any leading or trailing spaces
    },
    handleMenuClick(e) {
      this.selectedStatus = e.key;
    },
    handleMenuViewType(e) {
      this.selectedListType = e.key;
    },
    async goto(application) {
      const db = await openDB("application-db", 1, {
        upgrade(db) {
          db.createObjectStore("applications", {
            keyPath: "applicationId",
            autoIncrement: true,
          });
        },
      });
      const plainApplication = JSON.parse(JSON.stringify(application));
      await db.put("applications", plainApplication); // put will add or replace by key
      this.router.push(`/applications/${application.applicationId}`);
    },
    toggleTabs(value) {
      this.selected_tab = value;
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

    handleSearch(value) {},

    handleNext(event) {
      this.stage = this.stage + 1;
    },
    handleBack(event) {
      this.stage = this.stage - 1;
    },

    formatPhoneNum(num) {
      if (!num) return num;
      const phoneNum = parsePhoneNumber(num);
      let res = phoneNum?.formatInternational();
      if (!res) return num;
      res = res.split(" ");
      if (res.length != 4) return num;
      res = res
        .map((n, i) => {
          if (i == 1) return ` (${n}) `;
          else if (i == 2) return `${n}-`;
          else return n;
        })
        .join("");
      return res;
    },
    formatDate(ts) {
      if (ts) {
        const res = moment(ts);
        return res.format("DD MMMM YYYY");
      }
      return "";
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style>
/* Only affects modals wrapped in .application-page-modal */
.ant-modal-root > .application-page-modal .ant-modal-content {
  box-shadow: none !important;
  /* box-shadow: 0px 2px 7px 3px rgba(30,30,30,0.09); */
}

.ant-modal-root > .application-page-modal .ant-modal-mask {
  background: rgba(30, 30, 30, 0.06) !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
}

.ant-modal-root > .application-page-modal .ant-tabs-content-holder {
  border-left: none !important;
}

.ant-modal-root > .application-page-modal .ant-tabs-ink-bar {
  display: none !important;
}

.ant-modal-root > .application-page-modal .ant-tabs-tab-active {
  background-color: rgba(30, 30, 30, 0.06) !important;
  border-radius: 0.625rem !important;
}

.ant-modal-root > .application-page-modal .ant-modal {
  width: 50vw !important;
  height: fit-content !important;
}

.ant-modal-root > .application-page-modal p {
  margin: 0 !important;
  padding: 0 !important;
}

.ant-modal-root > .application-page-modal .ant-modal-title {
  font-family: redwing, ui-sans-serif, system-ui, sans-serif !important;
  font-weight: 500 !important;
  font-size: 24px !important;
}
</style>

