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
                  { label: 'Awaiting Payment', value: 'Awaiting Payment' },
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
        v-if="loadingData == true"
        class="mx-auto h-[500px] w-full flex justify-center items-center"
      >
        <Loader />
      </div>
      <div
        v-else
        class="px-2.5 mt-2 gap-4 grid grid-cols-4 mb-4"
        v-if="selectedDisplayType == 'Grid'"
      >
        <applicationCard
          v-for="value in computedData"
          :app="value"
          @showModal="async () => await showModal(value)"
        />
      </div>
      <table-component
        v-if="selectedDisplayType == 'List'"
        :title="'applications'"
        :columns="headers"
        :data-source="computedData"
        :loading="loadingData"
      >
        <template #action="{ record }">
          <button
            class="bg-inherit text-black cursor-pointer"
            @click="async () => await showModal(record)"
          >
            View Details
          </button>
        </template>
        <template #status="{ record }">
          <div class="flex justify-center">
            <button
              :class="{
                'bg-[#FEF9C3] border-[#854D0F] border-solid border-[0.5px] text-[#854D0F]':
                  record.status == 'Awaiting AdditionalDocuments',
                'bg-[#F3E8FF] text-[#6D24A9] border-[#6D24A9] border-solid border-[1px] ':
                  record.status ==
                    'MoveIn Date Landlord Confirmation Pending' ||
                  record.status == 'Confirming Move-inDate',
                'bg-[#FEF9C3] border-solid  border-[1px] text-[#1D40AE] border-[#1D40AE]':
                  record.status == 'Awaiting Review',
                'bg-red-700 text-red-300 border-red-300 border-solid border-[1px]':
                  record.status == 'Failed',
                'bg-[#DCFCE7] text-[#166434] border-[#166434] border-solid border-[1px] z-50 left-[30%]':
                  record.status == 'Completed',
                'bg-[#FEF9C3] text-[#854D0F] border-solid border-[1px] border-[#854D0F] z- left-[20%]':
                  record.status == 'AwaitingPayment',
                'bg-[#FEF9C3] text-[#854D0F] border-solid border-[1px] border-[#854D0F] z- left-[20%]':
                  record.status == 'Awaiting Lease Generation',
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
    :footer="null"
  >
    <div
      :class="{
        'bg-[#FEF9C3] border-[#854D0F] border-solid border-[0.5px] text-[#854D0F]':
          selectedApplication.status == 'Awaiting AdditionalDocuments',
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
        'bg-[#FEF9C3] text-[#854D0F] border-solid border-[1px] border-[#854D0F] z- left-[20%]':
          selectedApplication.status == 'Awaiting Lease Generation',
      }"
      class="flex gap-3 rounded-lg py-1.5 px-2 mb-3 items-center"
    >
      <IconAlertCircleOutlined class="h-[1.5rem]" />
      <div>
        <p class="font-semibold">{{ selectedApplication.status }}</p>
        <p>{{ selectedApplication.AccommodationApplicationStatusDesc }}</p>
      </div>
    </div>
    <div
      v-if="selectedApplication"
      class="border-gray-200 border-[1.5px] rounded-xl p-2 flex gap-1.5 text-[#00000099]"
    >
      <img
        :src="dummyList[0]"
        alt="profile picture"
        class="size-[40px] object-cover rounded-lg"
      />
      <div class="flex flex-col">
        <span class="text-black font-semibold">{{
          selectedApplication.applicantName
        }}</span>
        <span>{{ selectedApplication.email }}</span>
      </div>
    </div>

    <a-tabs tabPosition="left" class="mt-3 text-[#00000099]">
      <a-tab-pane
        v-for="tab in stagesTabDetails[stage - 1]"
        :key="tab.tabTitle"
        :tab="tab.tabTitle"
        class="flex flex-col gap-y-3"
      >
        <div v-if="stage == 4" class="flex flex-col gap-2">
          <div class="flex flex-col">
            <h2
              class="font-medium uppercase text-[1rem] font-redwing text-black"
            >
              UPLOAD SIGNED LEASE PDF
            </h2>
            <div class="mx-auto flex justify-center items-center">
              <div
                v-if="loadingReview == true"
                class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
              ></div>
            </div>
            <div v-html="selectedApplication.leaseHtml"></div>
            <!-- <a-upload-dragger
              v-if="leaseFile == null || !leaseFile[0]"
              class="upload-dragger"
              :fileList="leaseFile"
              name="leaseFile"
              :multiple="false"
              :maxCount="1"
              :iconRender="customIconRender"
              :customRequest="handleUpload"
              @change="handleChange"
              @drop="handleDrop"
            >
              <p class="ant-upload-drag-icon">
                <inbox-outlined></inbox-outlined>
              </p>
              <p class="ant-upload-text">Click or drag to upload documents</p>
              <p class="ant-upload-hint">
                Upload a pre-signed lease agreement document
              </p>
            </a-upload-dragger>
            <a-upload
              v-else
              :fileList="leaseFile"
              name="leaseFile"
              :multiple="false"
              :maxCount="1"
              :customRequest="handleUpload"
              :iconRender="customIconRender"
              @change="handleChange"
              @drop="handleDrop"
            >
              <a-button>
                <upload-outlined></upload-outlined>
                Reupload
              </a-button>
            </a-upload> -->
          </div>
          <div>
            <h2
              class="font-medium uppercase text-[1rem] font-redwing text-black"
            >
              {{ tab.tabDetails.label }}
            </h2>
            <div class="bg-[#F9F9F9] p-3 rounded-lg flex flex-col gap-2.5">
              <div v-for="key in tab.tabDetails.keys">
                <p class="font-semibold text-black">{{ key }}</p>
                <p v-if="key == 'intendedMoveInDate'">
                  {{ formatDate(selectedApplication[key]) || "N/A" }}
                </p>
                <p v-else>{{ selectedApplication[key] }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <h2 class="font-medium uppercase text-[1rem] font-redwing text-black">
            {{ tab.tabTitle }}
          </h2>
          <div
            v-if="
              ['Document Uploaded', 'Additional Documents'].includes(
                tab.tabTitle
              )
            "
            class="flex gap-3 flex-wrap justify-start items-start"
          >
            <a
              v-for="doc in selectedApplication.propertyDocs"
              :href="doc"
              class="bg-[#F6F6F6] min-w-[130px] h-[7rem] px-3.5 py-2 flex flex-col flex-shrink-0 justify-around items-center rounded-lg font-medium text-[#121212] max-[1000px]:w-[45%] w-[40%]"
            >
              <IconPDFDoc />
              <!-- <span>{{ doc.name }}</span> -->
            </a>
          </div>
          <div v-for="item in tab.tabDetails" class="mb-1.5">
            <p class="font-semibold text-black">{{ item.label }}</p>
            <div v-for="key in item.keys">
              <p
                v-if="
                  [
                    'phoneNo',
                    'workSupervisorPhoneNo',
                    'emergencyPhoneNo',
                    'guarantor1PhoneNo',
                    'guarantor2PhoneNo',
                  ].includes(key)
                "
              >
                {{ formatPhoneNum(selectedApplication[key]) || "N/A" }}
              </p>
              <div
                v-else-if="key == 'intendedMoveInDate'"
                :class="stage == 3 ? 'mt-1' : ''"
              >
                <a-date-picker
                  v-if="stage == 3"
                  v-model:value="this.form.moveInDate"
                />
                <span v-else>{{
                  formatDate(selectedApplication[key]) || "N/A"
                }}</span>
              </div>
              <p
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

        <div
          v-if="stage == 1"
          class="ant-modal-footer flex justify-end gap-3 max-h-fit"
        >
          <Button @click="handleNext">Next</Button>
          <Button
            type="danger"
            v-if="selectedApplication.status == 'Awaiting Review'"
            >Decline</Button
          >
          <Button
            type="custom"
            class="border-gray-200 border-[1.75px] box-border text-[#121212]"
            :disabled="
              selectedApplication.status === 'AwaitingAdditionalDocuments'
            "
            @click="
              () => {
                modalOpen = false;
                requestModalOpen = true;
              }
            "
          >
            Request Additional Document
          </Button>
        </div>
        <div
          v-if="stage == 2"
          class="ant-modal-footer flex justify-between gap-3"
        >
          <Button
            type="custom"
            class="border-gray-200 border-[1.5px] box-border"
            @click="handleBack"
          >
            Back
          </Button>
          <div class="flex gap-3">
            <Button @click="handleNext">Next</Button>
            <Button
              type="danger"
              v-if="selectedApplication.status !== 'Completed'"
              >Decline</Button
            >
          </div>
        </div>
        <div
          v-if="stage == 3"
          class="ant-modal-footer flex justify-between gap-3"
        >
          <Button
            type="custom"
            class="border-gray-200 border-[1.5px] box-border"
            @click="handleBack"
          >
            Back
          </Button>
          <div class="flex gap-3">
            <Button
              @click="handleMovingDate"
              :disabled="
                selectedApplication.status == 'Confirming Move-inDate' ||
                this.form.moveInDate == null
              "
              >Confirm Date</Button
            >
            <Button type="danger">Decline</Button>
          </div>
        </div>
        <div
          v-if="stage == 4"
          class="ant-modal-footer flex justify-between gap-3 max-h-fit"
        >
          <Button
            type="custom"
            class="border-gray-200 border-[1.75px] box-border text-[#121212]"
            @click="handleBack"
          >
            Back
          </Button>
          <Button @click="handleGenerateLease">Generate Lease</Button>
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-modal>

  <a-modal
    wrapClassName="application-page-modal"
    v-model:open="requestModalOpen"
    :title="`Request Additional Documents`"
    :centered="true"
    :footer="null"
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
        <UniversalButton
          @click="
            requestDocumentsOptions.push({
              label: form.otherDocument,
              value: form.otherDocument,
            });
            form.otherDocument = '';
          "
          customClass="flex items-center justify-center w-[48px] h-[48px] rounded-[6px]"
        >
          <PlusOutlined />
        </UniversalButton>
      </div>

      <!-- Custom Footer -->
      <div class="flex justify-end gap-2 mt-6">
        <!-- Cancel Button -->
        <UniversalButton
          @click="requestModalOpen = false"
          customClass="border border-gray-200 text-[#121212] px-4 py-2 rounded-[6px]"
        >
          Cancel
        </UniversalButton>

        <!-- Ok Button -->
        <UniversalButton
          @click="handleRequestDocument"
          customClass="bg-[#000130] text-white px-4 py-2 rounded-[6px]"
        >
          Ok
        </UniversalButton>
      </div>
    </div>
  </a-modal>

  <a-modal
    :visible="showLeaseDetailsModal"
    :footer="null"
    width="1245px"
    :closable="false"
  >
    <div class="flex w-full">
      <div class="border-r-solid border-r-[1px] pr-[75px] w-[570px]">
        <p class="text-[#404164] font-sf text-[14px] font-[400p] py-[24px]">
          PROPERTY & TENANT DETAILS
        </p>
        <div>
          <p
            class="text-[#404164] text-[14px] font-[500] font-sf leading-[100%]"
          >
            Property Address
          </p>
          <p class="mt-[8px] text-[12px] font-sf leading-[100%] text-[#808097]">
            {{ selectedApplication.currentAddress }}
          </p>
        </div>
        <div>
          <p
            class="text-[#404164] m-0 text-[14px] font-[500] font-sf leading-[100%]"
          >
            Applicant
          </p>
          <p class="mt-[8px] text-[12px] font-sf leading-[100%] text-[#808097]">
            {{ selectedApplication.applicantName }}
          </p>
        </div>
        <div>
          <p
            class="text-[#404164] text-[14px] font-[500] m-0 font-sf leading-[100%]"
          >
            Rent
          </p>
          <p class="mt-[8px] text-[12px] font-sf leading-[100%] text-[#808097]">
            {{ "nil" }}
          </p>
        </div>
        <div>
          <p
            class="text-[#404164] m-0 text-[14px] font-[500] font-sf leading-[100%]"
          >
            Security Deposit
          </p>
          <p class="mt-[8px] text-[12px] font-sf leading-[100%] text-[#808097]">
            {{ "nil" }}
          </p>
        </div>
        <div>
          <p
            class="text-[#404164] m-0 text-[14px] font-[500] font-sf leading-[100%]"
          >
            Lease Type
          </p>
          <p class="mt-[8px] text-[12px] font-sf leading-[100%] text-[#808097]">
            {{ "nil" }}
          </p>
        </div>
        <div>
          <p
            class="text-[#404164] m-0 text-[14px] font-[500] font-sf leading-[100%]"
          >
            Lease Start Date
          </p>
          <p class="mt-[8px] text-[12px] font-sf leading-[100%] text-[#808097]">
            {{ "nil" }}
          </p>
        </div>
      </div>
      <div class="pl-[24px]">
        <p class="text-[#404164] text-[14px] leading-[100%] font-sf m-0">
          LEASE DOCUMENT PREVIEW
        </p>
        <p
          class="mx-auto w-fit mt-[28px] text-[#404164] leading-[100%] font-[500] font-sf"
        >
          RESIDENTIAL LEASE AGREEMENT
        </p>
        <div class="font-sf">
          <p class="text-[#404164] font-sf leading-[100%] font-[400] mb-4">
            This Lease Agreement is entered into on {{ new Date() }},
            between 10ANTS Property Management (Landlord) and {{
              selectedApplication.applicantName
            }}.
          </p>
          <div class="mb-4">
            <p class="text-[#404164] font-sf leading-[100%] font-[500] m-0">
              1. PROPERTY DESCRIPTION
            </p>
            <p class="text-[#404164] font-sf leading-[100%] font-[400] m-0">
              The Landlord hereby leases to the Tenant the residential property
              located at {{ selectedApplication.currentAddress }} subject to the
              terms and conditions set forth in this agreement.
            </p>
          </div>

          <div class="mb-4">
            <p class="text-[#404164] font-sf leading-[100%] font-[500] m-0">
              2. LEASE TERM
            </p>
            <p class="text-[#404164] font-sf leading-[100%] font-[400] m-0">
              The lease term shall commence on {{
                selectedApplication.intendedMoveInDate
              }} and shall continue for a period of twelve (12) months, ending
              on August 12, 2026.
            </p>
          </div>

          <div class="mb-4">
            <p class="text-[#404164] font-sf leading-[100%] font-[500] m-0">
              3. RENT AND PAYMENT TERMS
            </p>
            <p class="text-[#404164] font-sf leading-[100%] font-[400] m-0">
              The annual rent for the premises is ₦1,500,000 (One Million Five
              Hundred Thousand Naira), payable in monthly installments
              of ₦125,000. Rent is due on the first day of each month and shall
              be considered late if not received within five (5) days of the due
              date.
            </p>
          </div>

          <div class="mb-4">
            <p class="text-[#404164] font-sf leading-[100%] font-[500] m-0">
              3. RENT AND PAYMENT TERMS
            </p>
            <p class="text-[#404164] font-sf leading-[100%] font-[400] m-0">
              The annual rent for the premises is ₦1,500,000 (One Million Five
              Hundred Thousand Naira), payable in monthly installments
              of ₦125,000. Rent is due on the first day of each month and shall
              be considered late if not received within five (5) days of the due
              date.
            </p>
          </div>

          <div class="mb-4">
            <p class="text-[#404164] font-sf leading-[100%] font-[500] m-0">
              4. SECURITY DEPOSIT
            </p>
            <p class="text-[#404164] font-sf leading-[100%] font-[400] m-0">
              Tenant shall pay a security deposit equivalent to two (2) months'
              rent, totalling C$50,000, to be held by the Landlord as security
              for any damages or unpaid rent.
            </p>
          </div>

          <div class="mb-4">
            <p class="text-[#404164] font-sf leading-[100%] font-[500] m-0">
              5. UTILITIES AND MAINTENANCE
            </p>
            <p class="text-[#404164] font-sf leading-[100%] font-[400] m-0">
              Tenant shall be responsible for all utilities including
              electricity, water, and internet. Landlord shall maintain the
              structural integrity of the property and handle major repairs
            </p>
          </div>

          <div class="mb-4">
            <p class="text-[#404164] font-sf leading-[100%] font-[500] m-0">
              6. TERMINATION
            </p>
            <p class="text-[#404164] font-sf leading-[100%] font-[400] m-0">
              This lease may be terminated by either party with thirty (30) days
              written notice, subject to the terms outlined in this agreement.
            </p>
          </div>
          <hr />
          <p
            class="mt-[12px] text-[16px] font-sf leading-[100%] text-[#404164]"
          >
            IN WITNESS WHEREOF, the parties have executed this lease agreement
            on the date first written above.
          </p>
          <div class="flex justify-between mt-[24px]">
            <div class="w-[40%]">
              <hr class="w-full" />
              <p
                class="text-[#404164] mt-[10px] text-[14px] leading-[100%] font-sf"
              >
                Landlord Signature
              </p>
            </div>
            <div class="w-[40%]">
              <hr class="w-full" />
              <p
                class="text-[#404164] mt-[10px] text-[14px] leading-[100%] font-sf"
              >
                Tenant Signature {{ selectedApplication.applicantName }}
              </p>
            </div>
          </div>
          <div class="ml-auto mt-[28px] w-fit flex gap-[40px]">
            <button
              @click="handleGetLeaseReview"
              class="px-[43px] py-[12px] font-sf font-[600] text-[14px] text-[#000130] rounded-[4px] border-[1px] border-[#000130]"
            >
              Download Pdf
            </button>
            <button
              class="px-[43px] py-[12px] font-sf font-[600] text-[14px] rounded-[4px] text-white bg-[#000130]"
            >
              Send Lease
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-html="selectedApplication.leaseHtml"></div>
  </a-modal>
</template>

<script>
import { useRouter } from "vue-router";

import TableHeader from "@/components/TableHeader.vue";
import { useToast } from "vue-toast-notification";
import V2Table from "@/components/V2Table.vue";
import V2ServiceRequestsDropDown from "@/components/V2ServiceRequestsDropDown.vue";
import { FetchTenant, ApproveTenant } from "@/api/tenancy";
import { getLeaseReview } from "@/api/tenancy";
import {
  ConfirmMoveInDate,
  GenerateLease,
  RequestAdditionalDocuments,
  ChangeApplicationStatus,
} from "@/api/tenancy";
import applicationCard from "@/components/applicationCard.vue";
import BasePagination from "@/components/BasePagination.vue";
import { useUserStore } from "@/store";
import { AccomodationApplications } from "@/api/dashboard";
import UniversalButton from "@/components/Button/UniversalButton.vue";
import confirm from "ant-design-vue/es/modal/confirm";
import { data } from "autoprefixer";
import Button from "@/components/Button/Button.vue";
import IconPDFDoc from "@/components/icons/IconPDFDoc.vue";
import { message } from "ant-design-vue";
import { h } from "vue";
import parsePhoneNumber from "libphonenumber-js";
import moment from "moment";
import dayjs from "dayjs";
import IconAlertCircleOutlined from "@/components/icons/IconAlertCircleOutlined.vue";
import Loader from "@/components/Loader.vue";

export default {
  components: {
    "table-component": V2Table,
    "table-header": TableHeader,
    DropdownButton: V2ServiceRequestsDropDown,
    applicationCard,
    BasePagination,
    IconPDFDoc,
    UniversalButton,
    Button,
    IconAlertCircleOutlined,
    Loader,
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
      showLeaseDetailsModal: false,
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
      loadingData: false,
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
      selectedApplication: null,
      leaseFile: null,
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
              // { keys: ["whatsAppNo"], label: "WhatsApp Number" },
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
              // {
              //   keys: ["lengthOfTimeWithEmployer"],
              //   label: "Length of Time with Employer",
              // },
              // {
              //   keys: ["workSupervisorPhoneNo"],
              //   label: "Work Supervisor's Number",
              // },
              // {
              //   keys: ["workSupervisorEmail"],
              //   label: "Work Supervisor's Email",
              // },
              {
                keys: ["budgetForAccommodation"],
                label: "Budget for Accommodation",
              },
              // { keys: ["carModel"], label: "Car Make, Model" },
              // { keys: ["carLicenseNumber"], label: "Car License Number" },
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
              { keys: ["unitRefNo"], label: "Unit" },
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
            tabDetails: {
              keys: [
                "propertyName",
                "previousAddress",
                "unitName",
                "intendedMoveInDate",
              ],
              label: "LEASE DETAILS PREVIEW",
            },
          },
        ],
      ],
      loadingReview: false,
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
        6: "Awaiting Lease Generation", // Payment received, awaiting lease document generation
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
        1: "New Application submitted, review Tenant details and decide whether to approve, decline or request more documents",

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
    async handleGenerateLease() {
      this.generating = true;
      const response = await GenerateLease(
        this.selectedApplication.applicationId
      );
      try {
        if (response.responseCode == "00") {
          this.toast.success("A lease Has been generated");
          this.modalOpen = false;
        } else {
          this.toast.error("Couldn't generate lease");
        }
        this.modalOpen = false;
        this.generating = false;
        this.fetchData();
        this.stage = 1;
      } catch (err) {
        console.log(err);
      }
    },
    async handleGetLeaseReview() {
      this.loadingReview = true;
      const body = { applicationId: this.selectedApplication.applicationId };
      getLeaseReview(body)
        .then((response) => {
          this.selectedApplication = {
            ...this.selectedApplication,
            leaseHtml: response.leaseHtml,
          };
          this.loadingReview = false;
        })
        .catch();
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
      console.log(this.form.moveInDate);
      const moveInDateISO = this.getMoveInDateISO(this.form.moveInDate);
      this.movingdate = true;
      let payload = {
        applicationId: this.selectedApplication.applicationId,
        isOriginalDateApproved:
          moveInDateISO == this.selectedApplication.intendedMoveInDate,
        confirmedByUserType: 1,
        comments: "N/A",
        moveInDate: moveInDateISO,
      };
      // if (original == false) {
      //   payload = { ...payload, moveInDate: this.form.moveInDate };
      // }
      ConfirmMoveInDate({ ...payload }).then(async (response) => {
        if (response.responseCode == "00") {
          if (payload.isOriginalDateApproved == true) {
            this.stage = 4;
            this.moveInDateModalOpen = false;
            this.movingdate = false;
            this.toast.success("Move-in date confirmed");
          } else {
            this.modalOpen = false;
            this.toast.success(
              "Move-in date confirmed, wait for tenant confirmation"
            );
          }
          await this.handleGetLeaseReview();
        } else {
          // this.stage = 4;
          // await this.handleGetLeaseReview();

          console.log(response, payload);
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
      let statusId;
      // compute status id from stage
      if (this.stage == 1 || this.stage == 2) {
        // if you reuested additional documents
        if (this.selectedApplication.status == "Awaiting AdditionalDocuments") {
          statusId = 2;
        } else {
          statusId = 1;
        }
      } else if (this.stage == 3) {
        // check if landlord has already confirmed date
        this.stage = 3;
      }
      const payload = {
        applicationId: this.selectedApplication.applicationId,
        statusId,
        comments: "N/A",
        userId: "landlord",
      };

      ChangeApplicationStatus({ ...payload }).then((response) => {
        if (response.responseCode == "00") {
          console.log("Status changed successfully");
        } else {
          console.error("Couldn't change status request");
        }
      });
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
    getMoveInDateISO(date) {
      return dayjs(date).format("YYYY-MM-DDTHH:mm:ss");
    },
    handleOk() {
      this.modalOpen = false; // Remove .value
      this.stage = 1; // Remove .value
      this.leaseFile = null;
    },
    handleCancel() {
      this.modalOpen = false; // Remove .value
      this.stage = 1; // Remove .value
      this.leaseFile = null;
    },
    handleChange(info) {
      this.leaseFile = [...info.fileList];
      console.log(this.leaseFile);
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    handleDrop(e) {
      console.log(e);
    },
    async handleUpload({ file, onSuccess, onError }) {
      try {
        file.status = "done";
        this.leaseFile[0].status = "done";
        onSuccess("ok, let's go!");
      } catch (error) {
        onError("no work");
      }
    },
    async showModal(app) {
      this.selectedApplication = app; // Remove .value
      this.modalOpen = true; // Remove .value
      this.form.moveInDate = dayjs(app.intendedMoveInDate);
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
        await this.handleGetLeaseReview();
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
      this.loadingData = true;
      const query = {
        size: this.pageSize,
        page: page,
        query: this.searchQuery || "", // Include search query
      };

      FetchTenant(query, this.store.userProfile.referenceID)
        .then((response) => {
          // this.store.setisLoading(false);
          this.loadingData = false;
          if (response.responseCode == "00" && response.applications) {
            this.Applications = response.applications.items || [];
            this.totalItemCount = response.applications.totalItemCount || 0;
            this.data = (response.applications.items || []).map((app) => {
              return {
                applicantName: app.applicantName || "N/A",
                propertyName: app.propertyName || "N/A",
                unitId: app.unitRefNo || "N/A",

                status:
                  this.AccommodationApplicationStatus[app.status] || "Unknown",
                AccommodationApplicationStatusDesc:
                  this.AccommodationApplicationStatusDesc[app.status],

                email: app.email || "N/A",
                gender: app.gender || "N/A",
                phoneNo: app.phoneNo || "N/A",
                applicationId: app.applicationId || "N/A",
                intendedMoveInDate: app.intendedMoveInDate || "N/A",
                currentAddress: app.currentAddress || "N/A",
                whatsAppNo: app.whatsAppNo || "N/A",
                nameOfEmployer: app.nameOfEmployer || "N/A",
                apprMonthlyIncome: app.apprMonthlyIncome || "N/A",
                budgetForAccommodation: app.budgetForAccommodation || "N/A",
                workSupervisorEmail: app.workSupervisorEmail || "N/A",
                workSupervisorPhoneNo: app.workSupervisorPhoneNo || "N/A",
                lengthOfTimeWithEmployer: app.lengthOfTimeWithEmployer || "N/A",
                currentLandLordName: app.currentLandLordName || "N/A",
                currentLandLordEmail: app.currentLandLordEmail || "N/A",
                emergencyFullName: app.emergencyFullName || "N/A",
                emergencyPhoneNo: app.emergencyPhoneNo || "N/A",
                emergencyEmail: app.emergencyEmail || "N/A",
                emergencyRelationship: app.emergencyRelationship || "N/A",
                guarantor1FullName: app.guarantor1FullName || "N/A",
                guarantor1PhoneNo: app.guarantor1PhoneNo || "N/A",
                guarantor1Email: app.guarantor1Email || "N/A",
                guarantor1Occupation: app.guarantor1Occupation || "N/A",
                guarantor2FullName: app.guarantor2FullName || "N/A",
                guarantor2PhoneNo: app.guarantor2PhoneNo || "N/A",
                guarantor2Email: app.guarantor2Email || "N/A",
                guarantor2Occupation: app.guarantor2Occupation || "N/A",
                propertyDocs: app.propertyDocs || "N/A",
                haveYoubeenToCourtByLandLord:
                  app.haveYoubeenToCourtByLandLord || "N/A",
                haveYoueverDamageApartmentOrMovestillowning:
                  app.haveYoueverDamageApartmentOrMovestillowning || "N/A",
                doYouHaveTotalMoveinAmount:
                  app.doYouHaveTotalMoveinAmount || "N/A",
                doYouHavePets: app.doYouHavePets || "N/A",
                doYouSmoke: app.doYouSmoke || "N/A",
                isYourCurrentRentUpToDate:
                  app.isYourCurrentRentUpToDate || "N/A",
                haveYouEverBeenEvicted: app.haveYouEverBeenEvicted || "N/A",
                img: app.unitImages[0],
                unitRefNo: app.unitRefNo,
                currentAddress: app.currentAddress,
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
    customIconRender({ file }) {
      return h(IconPDFDoc);
    },
  },
};
</script>

<style>
.application-page-modal * {
  font-family: inter, ui-sans-serif, system-ui, sans-serif;
}
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
  min-width: 630px;
  /* height: 70vh !important; */
}

.ant-modal-root > .application-page-modal .ant-modal > div:first-of-type {
  /* height: 70vh; */
}

.ant-modal-root > .application-page-modal .ant-modal-content {
  /* height: 65vh; */
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

.ant-modal-root > .application-page-modal .ant-modal-footer {
  margin-top: 0.75rem;
}

.application-page-modal .ant-tabs-tab {
  margin: 0 !important;
  /* padding: 0; */
}

.application-page-modal .ant-upload {
  width: 70%;
  max-width: 305px;
  padding: 0 0.5rem;
  box-sizing: border-box;
}

.ant-modal-root > .application-page-modal .ant-upload-wrapper {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  max-width: none;
  align-items: center;
  gap: 1rem;
}

.ant-modal-root > .application-page-modal .ant-upload-list-item-container {
  display: flex;
  flex-wrap: wrap;
}

.ant-modal-root > .application-page-modal .upload-dragger {
  margin-right: auto;
}

.ant-modal-root > .application-page-modal .ant-upload-list-item {
  @apply bg-[#F6F6F6] min-w-[130px] px-3.5 py-2 flex flex-col flex-shrink-0 justify-around items-center rounded-lg font-medium text-[#121212] [@media(min-width:1000px)]:w-[45%] w-[40%];
  height: fit-content !important;
}

.ant-modal-root > .application-page-modal .ant-upload > .ant-btn {
  display: flex;
  align-items: center;
}
</style>
