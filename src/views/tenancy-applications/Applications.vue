<template>
  <div class="px-4 font-inter h-full">
    <div
      class="rounded-[16px] mt-4 h-full font-inter border-[#36363633] border-[0.75px] border-solid"
    >
      <div class="flex items-center">
        <table-header
          :total-item-count="totalItemCount"
          title="All Applications"
        >
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
                  { label: 'Awaiting Review', value: 'Awaiting Review' },
                  {
                    label: 'Confirm Move-in Date',
                    value: 'Confirming Move-inDate',
                  },
                  {
                    label: 'Awaiting Additional Documents',
                    value: 'AwaitingAdditionalDocuments',
                  },
                  { label: 'Awaiting Payment', value: 'AwaitingPayment' },
                  { label: 'Failed', value: 'Failed' },
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
        <applicationCard
          v-for="value in computedData"
          :app="value"
          @showModal="() => showModal(value)"
        />
      </div>
      <table-component
        v-if="selectedDisplayType == 'List'"
        :title="'applications'"
        :columns="headers"
        :data-source="computedData"
      >
        <template #action="{ record }">
          <button
            class="bg-inherit text-black cursor-pointer"
            @click="() => showModal(record)"
          >
            View Details
          </button>
        </template>
        <template #status="{ record }">
          <div class="flex justify-center">
            <button
              :class="{
                'bg-[#FEF9C3] border-[#854D0F] border-solid border-[0.5px] text-[#854D0F]':
                  record.status == 'AwaitingAdditionalDocuments',
                'bg-[#F3E8FF] text-[#6D24A9] border-[#6D24A9] border-solid border-[1px] ':
                  record.status == 'MoveInDateLandlordConfirmationPending' ||
                  record.status == 'ConfirmingMove-inDate',
                'bg-[#FEF9C3] border-solid  border-[1px] text-[#1D40AE] border-[#1D40AE]':
                  record.status == 'AwaitingReview',
                'bg-red-700 text-red-300 border-red-300 border-solid border-[1px]':
                  record.status == 'Failed',
                'bg-[#DCFCE7] text-[#166434] border-[#166434] border-solid border-[1px] z-50 left-[30%]':
                  record.status == 'Completed',
                'bg-[#FEF9C3] text-[#854D0F] border-solid border-[1px] border-[#854D0F] z- left-[20%]':
                  record.status == 'AwaitingPayment',
              }"
              class="px-3 py-1 rounded-[8px] text-[12px] font-medium"
            >
              {{ record.status }}
            </button>
          </div>
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
  <a-modal
    v-model:open="modalOpen"
    :title="`Stage ${stage} • ${stages[stage - 1]}`"
    @ok="handleOk"
    @cancel="handleCancel"
    :centered="true"
    wrapClassName="application-page-modal"
    width="800px"
  >
    <div
      class="flex gap-[10px] mt-[5px] mb-[1rem] items-center rounded-[10px] px-[10px]"
      :class="{
        'bg-[#FEF9C3] border-[#854D0F] border-solid border-[0.5px] text-[#854D0F]':
          selectedApplication.status == 'Awaiting Additional Documents',
        'bg-[#F3E8FF] text-[#6D24A9] border-[#6D24A9] border-solid border-[1px] ':
          selectedApplication.status ==
            'MoveIn Date Landlord Confirmation Pending' ||
          selectedApplication.status == 'Confirming Move-inDate',
        'bg-[#FEF9C3] border-solid  border-[1px] text-[#1D40AE] border-[#1D40AE]':
          selectedApplication.status == 'Awaiting Review',
        'bg-red-700 text-red-300 border-red-300 border-solid border-[1px]':
          selectedApplication.status == 'Failed',
        'bg-[#DCFCE7] text-[#166434] border-[#166434] border-solid border-[1px] z-50 left-[30%]':
          selectedApplication.status == 'Completed',
        'bg-[#FEF9C3] text-[#854D0F] border-solid border-[1px] border-[#854D0F] z- left-[20%]':
          selectedApplication.status == 'Awaiting Payment',
      }"
    >
      <div class="m-0 p-0"><ExclamationCircleOutlined /></div>
      <div class="p-0 m-0">
        <p>{{ selectedApplication.status }}</p>
        <p>{{ selectedApplication.AccommodationApplicationStatusDesc }}</p>
      </div>
    </div>
    <div
      v-if="selectedApplication"
      class="border-gray-200 items-center border-[1.5px] rounded-xl p-2 flex gap-1.5"
    >
      <div>
        <img
          :src="dummyList[0]"
          alt="profile picture"
          class="size-[34px] object-cover rounded-lg"
        />
      </div>
      <div class="flex flex-col">
        <span
          class="font-[600] p-0 m-0 text-[#000000] font-inter text-[14px] leading-[100%]"
          >{{ selectedApplication.applicantName }}</span
        >
        <span class="text-[#00000066] m-0 p-0">{{
          selectedApplication.email
        }}</span>
      </div>
    </div>

    <a-tabs tabPosition="left" class="mt-3 custom-tabs">
      <a-tab-pane
        v-for="tab in stagesTabDetails[stage - 1]"
        :key="tab.tabTitle"
        :tab="tab.tabTitle"
      >
        <div class="w-full" v-if="tab.tabTitle == 'Lease Generation'">
          <p class="font-medium uppercase p-0 m-0 text-[1rem] font-redwing">
            UPLOAD SIGNED LEASE PDF
          </p>
          <a-upload-dragger
            class="border-dashed flex justify-center items-center w-full border-[#C7C7C7] rounded-[5px] p-[14px] m-0"
            style="margin: 0"
            name="file"
            list-type="picture-card"
          >
            <p class="ant-upload-drag-icon mx-auto p-0 w-fit pt-[28px]">
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
              class="text-[#404164] font-600 text-[14px] font-sf leading-[100%]"
            >
              Drop files here or click to upload
            </p>
            <p class="text-[#808097] font-[12px] font-sf leading-[100%]">
              Accepted File Types: doc, docx
            </p>
          </a-upload-dragger>
        </div>
        <h2 class="font-medium uppercase text-[1rem] font-redwing">
          {{ tab.tabTitle }}
        </h2>
        <div
          v-if="
            ['Document Uploaded', 'Additional Documents'].includes(tab.tabTitle)
          "
          class="flex flex-wrap gap-x-3 gap-y-0 size-full"
        >
          <div
            v-for="doc in tab.tabDetails"
            class="bg-[#1e1e1e10] w-[170px] h-[9rem] p-2 flex flex-col flex-shrink-0 justify-center items-center rounded-lg mb-1.5"
          >
            <IconPDFDoc />
            <span>{{ doc.name }}</span>
          </div>
        </div>
        <div
          v-if="['Lease Generation'].includes(tab.tabTitle)"
          class="bg-[#F9F9F9] rounded-[12px] p-[15px]"
        >
          <div v-for="item in tab.tabDetails">
            <p
              class="text-[12px] text-[#000000] font-inter leading-[20px] font-semibold"
            >
              {{ item.label }}
            </p>
            <div class="mb-2">
              <div v-for="key in item.keys">
                <p
                  class="text-[#00000099] text-[12px] font-[500] font-inter leading-[20px]"
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
                <p
                  v-else-if="key == 'intendedMoveInDate'"
                  class="text-[#00000099] text-[12px] font-[500] font-inter leading-[20px]"
                >
                  {{ formatDate(selectedApplication[key]) || "N/A" }}
                </p>
                <p
                  class="text-[#00000099] text-[12px] font-[500] font-inter leading-[20px]"
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
                <p
                  v-else
                  class="text-[#00000099] text-[12px] font-[500] font-inter leading-[20px]"
                >
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
        </div>
        <div v-for="item in tab.tabDetails" v-else>
          <p class="font-bold">{{ item.label }}</p>
          <div class="mb-2">
            <div v-for="key in item.keys" class="text-[#00000099]">
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
                class=""
                v-else-if="
                  ['apprMonthlyIncome', 'budgetForAccommodation'].includes(key)
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
        <button
          @click="handleNext"
          :disabled="
            approving ||
            declining ||
            (selectedApplication.status == 'AwaitingAdditionalDocuments' &&
              form.requestDocuments.length == 0) ||
            selectedApplication.status == 'Completed'
          "
          :loading="approving"
          class="bg-[#000130] text-[white] disabled:cursor-not-allowed disabled:text-white leading-[24px] font-inter px-3 flex items-center justify-center py-[6px] rounded-[8px] text-[14px] font-medium"
        >
          Next
        </button>
        <button
          type="danger"
          :loading="declining"
          @click="declineData"
          :disabled="
            approving ||
            declining ||
            (selectedApplication.status == 'AwaitingAdditionalDocuments' &&
              form.requestDocuments.length == 0) ||
            selectedApplication.status == 'Completed'
          "
          class="bg-[#A00000] disabled:text-white disabled:cursor-not-allowed font-inter flex items-center justify-center px-3 py-[6px] rounded-[8px] text-[14px] font-medium text-white"
        >
          Decline
        </button>
        <button
          @click="
            () => {
              modalOpen = false;
              requestModalOpen = true;
            }
          "
          :disabled="
            requesting ||
            selectedApplication.status == 'AwaitingAdditionalDocuments'
          "
          type="custom"
          class="border-solid disabled:cursor-not-allowed font-[500] font-inter border-[#36363633] flex items-center justify-center px-[12px] py-[6px] rounded-[8px] border-gray-200 text-[#121212] border-[1.5px] box-border"
        >
          Request Additional Document
        </button>
      </div>
      <div v-if="stage == 2" class="mt-3 flex justify-end gap-3">
        <Button
          type="custom"
          class="border-solid border-[#36363633] px-[12px] py-[6px] rounded-[8px] border-gray-200 text-[#121212] border-[1.5px] box-border"
          @click="handleBack"
          >Back</Button
        >
        <div>
          <Button
            @click="handleNext"
            class="bg-[#000130] mr-[10px] font-inter px-3 py-[6px] rounded-[8px] text-[14px] font-medium text-white"
          >
            Next
          </Button>
          <Button
            type="danger"
            class="bg-[#A00000] font-inter px-3 py-[6px] rounded-[8px] text-[14px] font-medium text-white"
            >Decline</Button
          >
        </div>
      </div>
      <div v-if="stage == 3" class="mt-3 flex justify-end gap-3">
        <Button
          type="custom"
          class="border-solid border-[#36363633] px-[12px] py-[6px] rounded-[8px] border-gray-200 text-[#121212] border-[1.5px] box-border"
          @click="handleBack"
          >Back</Button
        >
        <div>
          <Button
            :loading="movingdate"
            @click="() => handleMovingDate(true)"
            class="px-3 py-[6px] bg-[#000130] mr-[10px] text-[#FFFFFF] rounded-[8px]"
            >Confirm Date</Button
          >
          <Button
            @click="
              () => {
                moveInDateModalOpen = true;
                modalOpen = false;
              }
            "
            type="danger"
            class="bg-[#A00000] text-white font-inter font-medium rounded-[8px] px-[12px] py-[6px]"
            >Decline</Button
          >
        </div>
      </div>

      <div v-if="stage == 4" class="mt-3 flex justify-end gap-3">
        <button
          type="custom"
          class="border-solid border-[#36363633] px-[12px] py-[6px] rounded-[8px] border-gray-200 text-[#121212] border-[1.5px] box-border"
          @click="handleBack"
        >
          Back
        </button>
        <div>
          <button
            :loading="generating"
            @click="HandleGenerateLease"
            class="px-3 py-[6px] bg-[#000130] flex items-center justify-center mr-[10px] text-[#FFFFFF] rounded-[8px]"
          >
            Generate Lease
          </button>
        </div>
      </div>
    </template>
  </a-modal>
  <a-modal
    wrapClassName="application-page-modal"
    v-model:open="requestModalOpen"
    :title="`Request Additional Documents`"
    :centered="true"
    @ok="handleRequestDocument"
  >
    <div>
      <div class="flex items-center justify-between">
        <span class="modal-title"></span>
        <span></span>
      </div>
      <div class="">
        <a-checkbox-group
          class="flex flex-col gap-4 mt-4"
          v-model:value="form.requestDocuments"
          name="checkboxgroup"
          :options="requestDocumentsOptions"
        />
      </div>
      <div class="flex gap-2 items-center p-0 mt-4">
        <a-input
          v-model:value="form.otherDocument"
          class="rounded-[6px] border-[#D8D8D8] border-[1px] border-solid h-[48px]"
          placeholder="Add Document"
        />
        <button
          @click="
            requestDocumentsOptions.push({
              label: form.otherDocument,
              value: form.otherDocument,
            });
            form.otherDocument = '';
          "
          class="flex items-center justify-center size-[48px] rounded-[6px]"
        >
          <PlusOutlined class="" />
        </button>
      </div>
      <!-- <div class="mt-[1rem] flex gap-[10px] items-center">
        <button
          @click="showRequestDocumentModal = false"
          class="bg-[#D1D5DB] flex-[0.8] leading-[28px] py-[8px] px-[42.5px] rounded-[4px] font-sf font-[600] text-[#FFFFFF]"
        >
          Cancel
        </button>
      </div> -->
    </div>
  </a-modal>

  <a-modal
    v-model:open="moveInDateModalOpen"
    :title="'Request Move In Date'"
    :centered="true"
    @ok="
      () => {
        handleMovingDate(false);
      }
    "
    wrapClassName="application-page-modal"
  >
    <div>
      <div>
        <p class="m-0 text-[#404164] text-[16px] font-sf">
          Move-In Date(Tenant’s Preferred :
          {{ selectedApplication.intendedMoveInDate }})
        </p>
        <a-date-picker
          v-model:value="form.moveInDate"
          class="rounded-[6px] mt-[4px] border-[#D8D8D8] border-[1px] w-full border-solid h-[48px]"
          placeholder="Add Document"
        />
      </div>
    </div>
  </a-modal>
</template>

<script>
import { useRouter } from "vue-router";
import TableHeader from "@/components/TableHeader.vue";
import { useToast } from "vue-toast-notification";
import V2Table from "@/components/V2Table.vue";
import V2ServiceRequestsDropDown from "@/components/V2ServiceRequestsDropDown.vue";
import { FetchTenant, ApproveTenant } from "@/api/tenancy";
import { ConfirmMoveInDate, GenerateLease } from "@/api/tenancy";
import { RequestAdditionalDocuments } from "@/api/tenancy";
import applicationCard from "@/components/applicationCard.vue";
import BasePagination from "@/components/BasePagination.vue";
import { useUserStore } from "@/store";
import { AccomodationApplications } from "@/api/dashboard";
import parsePhoneNumber from "libphonenumber-js";
import moment from "moment";
import IconPDFDoc from "@/components/icons/IconPDFDoc.vue";
import confirm from "ant-design-vue/es/modal/confirm";
import { data } from "autoprefixer";
export default {
  components: {
    "table-component": V2Table,
    "table-header": TableHeader,
    DropdownButton: V2ServiceRequestsDropDown,
    applicationCard,
    BasePagination,
    IconPDFDoc,
  },
  created() {
    this.fetchData();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItemCount / this.pageSize) || 1;
    },
    computedData() {
      // STEP 1: apply search
      let filtered = this.searchRequests(this.data, this.searchQuery);
      console.log("Filtered after search:", filtered);
      // STEP 2: apply status filter
      console.log("Selected Status:", this.selectedStatus);
      if (this.selectedStatus !== "All") {
        filtered = filtered.filter(
          (item) => item.status === this.selectedStatus
        );
      }
      // STEP 3: apply pagination
      return filtered;
    },
  },
  data() {
    return {
      data: [],
      movingdate: false,
      requestDocumentsOptions: [
        {
          label: "Additional Income Verification",
          value: "Additional Income Verification",
        },
        { label: "Employment Letter", value: "Employment Letter" },
        {
          label: "Bank Statements (3 month)",
          value: "Bank Statements (3 month)",
        },
        { label: "Credit Report", value: "Credit Report" },
        { label: "References", value: "References" },
        {
          label: "Previous Rental Agreement",
          value: "Previous Rental Agreement",
        },
        { label: "Co-signer Information", value: "Co-signer Information" },
        { label: "Pet Documentation", value: "Pet Documentation" },
      ],
      form: {
        requestDocuments: [],
        otherDocument: "",
        moveInDate: "",
      },
      declining: false,
      approving: false,
      modalOpen: false,
      requestModalOpen: false,
      moveInDateModalOpen: false,
      selectedApplication: {},
      toast: useToast(),
      stage: 1,
      stages: [
        "Review",
        "Document Approval",
        "Set Move-In Date",
        "Lease Generation",
      ],
      dummyList: [
        "https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1667053508464-eb11b394df83?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1683792384436-167313660657?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
        "https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1667053508464-eb11b394df83?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1683792384436-167313660657?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
      ],
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
              // { keys: ["whatsAppNo"], label: "Responsible Rent" },
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
        [
          {
            tabTitle: "Lease Generation",
            tabDetails: [
              { keys: ["propertyName"], label: "Property Name" },
              { keys: ["currentAddress"], label: "Property Address" },
              { keys: ["unitId"], label: "Unit" },

              {
                keys: ["intendedMoveInDate"],
                label: "Tenants Intended Move-In date",
              },
              { keys: ["budgetForAccommodation"], label: "Lease Type" },
              { keys: ["budgetForAccommodation"], label: "Lease Start Date" },
            ],
          },
        ],
      ],
      store: useUserStore(),

      searchQuery: "",
      selectedStatus: "All",
      selectedDisplayType: "Grid",
      AccommodationApplicationStatus: {
        0: "Failed", // Application submission failed or system error occurred
        1: "Awaiting Review", // Application has been submitted and is under review by landlord
        2: "Awaiting AdditionalDocuments", // Landlord has requested additional documents from tenant
        3: "MoveIn Date Landlord Confirmation Pending", // Application approved, awaiting landlord to confirm move-in date
        4: "Confirming Move-inDate", // Landlord set different date, awaiting tenant confirmation
        5: "Awaiting Payment", // Move-in date confirmed, awaiting security deposit payment
        6: "Awaiting LeaseGeneration", // Payment received, awaiting lease document generation
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
      generating: false,
      totalItemCount: 0,
      currentPage: 1,
      pageSize: 8,
    };
  },
  watch: {
    searchQuery(newVal) {
      // Debounce search or trigger on enter
      this.currentPage = 1;
      this.fetchData(1);
    },
    selectedStatus(newVal) {
      this.currentPage = 1;
      this.fetchData(1);
    },
  },
  methods: {
    searchRequests() {
      if (!this.searchQuery) return this.data;
      const lower = this.searchQuery.toLowerCase();
      return this.data.filter((item) => {
        return (
          item.applicantName.toLowerCase().includes(lower) ||
          item.propertyName.toLowerCase().includes(lower)
        );
      });
    },
    async HandleGenerateLease() {
      this.generating = true;
      const response = await GenerateLease(
        this.selectedApplication.applicationId
      );
      try {
        if (response.responseCode == "00") {
          this.toast.success("A lease Has been generated");
          this.modalOpen = false;
        } else {
          this.toast.error("Coudln't generate lease");
        }
        this.modalOpen = false;
        this.generating = false;

        this.stage = 1;
      } catch (err) {
        console.log(err);
      }
    },
    async approveData() {
      this.approving = true;
      const payload = {
        applicationId: this.selectedApplication.applicationId,
        approve: true,
        note: "",
        approvedBy:
          this.store.userProfile.referenceID == "NN1"
            ? 1
            : this.store.userProfile.referenceID,
      };
      ApproveTenant({ ...payload }).then((response) => {
        if (response.responseCode == "00") {
          this.stage = this.stage + 1;
          this.approving = false;
          console.log(response);
        } else {
          this.toast.success("Coudln't update");
        }
      });
    },
    async declineData() {
      this.declining = true;
      const payload = {
        applicationId: this.selectedApplication.applicationId,
        approve: false,
        declineReason: this.declineReason,
      };

      ApproveTenant({ ...payload }).then((response) => {
        if (response.responseCode == "00") {
          console.log(response);
          this.declining = false;
          this.toast.error("Application Declined");
          this.modalOpen = false;
        } else {
          this.declining = false;
          this.showDeclinemoldal = false;
        }
      });
    },
    async handleMovingDate(original) {
      this.movingdate = true;
      let payload = {
        applicationId: this.selectedApplication.applicationId,
        isOriginalDateApproved: original ? true : false,
        confirmedByUserId: "landlord",
        comments: "",
        moveInDate: this.selectedApplication.intendedMoveInDate,
      };

      if (original == false) {
        payload = { ...payload, moveInDate: this.form.moveInDate };
      }
      ConfirmMoveInDate({ ...payload }).then((response) => {
        if (response.responseCode == "00") {
          this.stage = 4;
          this.modalOpen = true;
          this.moveInDateModalOpen = false;
          this.movingdate = false;
          this.toast.success("Move-in date confirmed");
        } else {
          this.toast.error("Coudln't update");
        }
      });
    },
    async handleRequestDocument() {
      if (this.form.requestDocuments.length == 0) {
        this.toast.error("Please select at least one document to request");
        return;
      }
      const payload = {
        ApplicationId: this.selectedApplication.applicationId,
        RequiredDocumentsJson: this.form.requestDocuments.join(","),
        MessageToTenant: "Please add the following documents",
        LandlordId: "landlord",
      };
      RequestAdditionalDocuments({ ...payload }).then((response) => {
        if (response.responseCode == "00") {
          this.form.requestDocuments = [];
          this.requestModalOpen = false;
          this.toast.success("Request sent successfully");
        } else {
          this.toast.error("Coudln't send request");
        }
      });
    },

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
    toggleTabs(value) {
      this.selected_tab = value;
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
    handleBack(event) {
      this.stage = this.stage - 1;
    },
    async handleNext(event) {
      if (this.stage == 1) {
        this.approving = true;
        await this.approveData();
      }
      if (this.stage == 2) {
        this.stage++;
      }
    },
    handleOk() {
      console.log("oked");
      this.modalOpen = false; // Remove .value
      this.stage = 1; // Remove .value
    },
    handleCancel() {
      console.log("cancelled");
      this.modalOpen = false; // Remove .value
      this.stage = 1; // Remove .value
    },
    showModal(app) {
      this.selectedApplication = app; // Remove .value
      this.modalOpen = true; // Remove .value
      if (this.selectedApplication.status == "Awaiting Review") {
        this.stage = 1;
      } else if (
        this.selectedApplication.status == "Awaiting AdditionalDocuments"
      ) {
        this.stage = 2;
      } else if (
        this.selectedApplication.status ==
          "MoveIn Date Landlord Confirmation Pending" ||
        this.selectedApplication.status == "Confirming Move-inDate"
      ) {
        this.stage = 3;
      } else if (
        this.selectedApplication.status == "Awaiting LeaseGeneration"
      ) {
        this.stage = 4;
      }
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
      this.selectedStatus = selected.value;
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
        query: this.searchQuery || "", // Include search query
      };

      FetchTenant(query, this.store.userProfile.referenceID)
        .then((response) => {
          if (response.responseCode == "00" && response.applications) {
            this.Applications = response.applications.items || [];
            this.totalItemCount = response.applications.totalItemCount || 0;
            this.data = (response.applications.items || []).map((app) => {
              return {
                applicantName: app.applicantName || "N/A",
                propertyName: app.propertyName || "N/A",
                unitId: app.unitId || "N/A",
                status:
                  this.AccommodationApplicationStatus[app.status] || "Unknown",
                AccommodationApplicationStatusDesc:
                  this.AccommodationApplicationStatusDesc[app.status],
                email: app.email || "N/A",
                gender: app.gender || "N/A",
                phoneNo: app.phoneNo || "N/A",
                nationality: app.nationality || "N/A",
                applicationId: app.applicationId || "N/A",
              };
            });
          } else {
            console.error("Failed to fetch applications:", response);
            this.data = [];
            this.totalItemCount = 0;
          }
        })
        .catch((error) => {
          console.error("Error fetching applications:", error);
          this.data = [];
          this.totalItemCount = 0;
        });
    },
  },
};
</script>

<style>
:deep(.trigger) {
  background: #111921;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}
.ant-btn {
  color: #0000004d !important;
}
/* Only affects modals wrapped in .application-page-modal */
:deep(.ant-modal-root > .application-page-modal .ant-modal-content) {
  box-shadow: none !important;
  /* box-shadow: 0px 2px 7px 3px rgba(30,30,30,0.09); */
}

:deep(.ant-modal-root > .application-page-modal .ant-modal-mask) {
  background: rgba(30, 30, 30, 0.06) !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
}

:deep(.ant-modal-root > .application-page-modal .ant-tabs-content-holder) {
  border-left: none !important;
}

:deep(.ant-modal-root > .application-page-modal .ant-tabs-ink-bar) {
  display: none !important;
}

:deep(.ant-modal-root > .application-page-modal .ant-tabs-tab-active) {
  background-color: rgba(30, 30, 30, 0.06) !important;
  border-radius: 0.625rem !important;
}

:deep(.ant-modal-root > .application-page-modal .ant-modal) {
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
:deep(.custom-tabs .ant-tabs-tab) {
  padding-left: 8px !important;
  padding-right: 8px !important;
}
:deep(.custom-tabs .ant-tabs-tab) {
  margin-right: 2px !important;
}
</style>
