<template>
  <div
    :class="[
      'bg-neutral py-5 px-10 w-full h-screen pb-40 font-sf',
      modalOpen ? 'overflow-hidden' : 'overflow-y-scroll',
    ]"
  >
    <section class="flex justify-between w-full border-b border-br1">
      <p class="text-[#808097] font-[500] font-sf text-[18px]">
        All Applications (8)
      </p>
    </section>
    <div class="mt-4 flex justify-between w-full items-center">
      <a-input
        v-model:value="searchQuery"
        placeholder="Search by name, gender, age.."
        class="py-[9px] max-w-[451px] border-none"
      >
        <template #prefix>
          <SearchOutlined class="text-[#BEC1C6] text-[20px]" />
        </template>
      </a-input>
      <div class="flex justify-between gap-[14px]">
        <a-dropdown>
          <template #overlay>
            <a-menu
              @click="handleMenuClick"
              class="p-0"
              style="padding: 0 !important; border-radius: 8px !important"
            >
              <a-menu-item
                key="Completed"
                class="bg-white border-b-[1px]"
                style="border-radius: 0px !important; padding: 16px !important"
              >
                Completed
              </a-menu-item>
              <a-menu-item
                key="Pending"
                class="bg-white border-b-[1px]"
                style="border-radius: 0px !important; padding: 16px !important"
              >
                Pending
              </a-menu-item>
              <a-menu-item
                key="Declined"
                class="bg-white border-b-[1px]"
                style="border-radius: 0px !important; padding: 16px !important"
              >
                Declined
              </a-menu-item>
            </a-menu>
          </template>

          <a-button
            class="flex gap-[14px] items-center text-[1rem] leading-[140%] font-sf text-[#404164]"
            style="background: none"
          >
            <span>
              {{ selectedStatus }}
            </span>
            <svg
              width="12"
              height="20"
              viewBox="0 0 12 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.031 13.97C11.1008 14.0396 11.1561 14.1223 11.1938 14.2134C11.2316 14.3044 11.251 14.402 11.251 14.5006C11.251 14.5992 11.2316 14.6967 11.1938 14.7878C11.1561 14.8788 11.1008 14.9616 11.031 15.0312L6.53104 19.5312C6.46139 19.6009 6.37867 19.6563 6.28762 19.694C6.19657 19.7318 6.09898 19.7512 6.00042 19.7512C5.90186 19.7512 5.80426 19.7318 5.71321 19.694C5.62216 19.6563 5.53945 19.6009 5.46979 19.5312L0.969792 15.0312C0.829061 14.8905 0.75 14.6996 0.75 14.5006C0.75 14.3016 0.829061 14.1107 0.969792 13.97C1.11052 13.8292 1.30139 13.7502 1.50042 13.7502C1.69944 13.7502 1.89031 13.8292 2.03104 13.97L6.00042 17.9403L9.96979 13.97C10.0394 13.9002 10.1222 13.8449 10.2132 13.8072C10.3043 13.7694 10.4019 13.75 10.5004 13.75C10.599 13.75 10.6966 13.7694 10.7876 13.8072C10.8787 13.8449 10.9614 13.9002 11.031 13.97ZM2.03104 6.03122L6.00042 2.0609L9.96979 6.03122C10.1105 6.17195 10.3014 6.25101 10.5004 6.25101C10.6994 6.25101 10.8903 6.17195 11.031 6.03122C11.1718 5.89048 11.2508 5.69961 11.2508 5.50059C11.2508 5.30157 11.1718 5.1107 11.031 4.96996L6.53104 0.469965C6.46139 0.400233 6.37867 0.344913 6.28762 0.30717C6.19657 0.269427 6.09898 0.25 6.00042 0.25C5.90186 0.25 5.80426 0.269427 5.71321 0.30717C5.62216 0.344913 5.53945 0.400233 5.46979 0.469965L0.969792 4.96996C0.829061 5.1107 0.75 5.30157 0.75 5.50059C0.75 5.69961 0.829062 5.89048 0.969792 6.03121C1.11052 6.17195 1.30139 6.25101 1.50042 6.25101C1.69944 6.25101 1.89031 6.17195 2.03104 6.03122Z"
                fill="#404164"
              />
            </svg>
          </a-button>
        </a-dropdown>

        <a-dropdown>
          <template #overlay>
            <a-menu
              @click="handleMenuViewType"
              class="p-0"
              style="padding: 0 !important; border-radius: 8px !important"
            >
              <a-menu-item
                key="Grid"
                class="bg-white border-b-[1px]"
                style="border-radius: 0px !important; padding: 16px !important"
              >
                Grid
              </a-menu-item>
              <a-menu-item
                key="List"
                class="bg-white border-b-[1px]"
                style="border-radius: 0px !important; padding: 16px !important"
              >
                List
              </a-menu-item>
            </a-menu>
          </template>

          <a-button
            class="flex gap-[14px] items-center text-[1rem] leading-[140%] font-sf text-[#404164]"
            style="background: none"
          >
            <span>
              {{ selectedListType }}
            </span>
            <svg
              width="12"
              height="20"
              viewBox="0 0 12 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.031 13.97C11.1008 14.0396 11.1561 14.1223 11.1938 14.2134C11.2316 14.3044 11.251 14.402 11.251 14.5006C11.251 14.5992 11.2316 14.6967 11.1938 14.7878C11.1561 14.8788 11.1008 14.9616 11.031 15.0312L6.53104 19.5312C6.46139 19.6009 6.37867 19.6563 6.28762 19.694C6.19657 19.7318 6.09898 19.7512 6.00042 19.7512C5.90186 19.7512 5.80426 19.7318 5.71321 19.694C5.62216 19.6563 5.53945 19.6009 5.46979 19.5312L0.969792 15.0312C0.829061 14.8905 0.75 14.6996 0.75 14.5006C0.75 14.3016 0.829061 14.1107 0.969792 13.97C1.11052 13.8292 1.30139 13.7502 1.50042 13.7502C1.69944 13.7502 1.89031 13.8292 2.03104 13.97L6.00042 17.9403L9.96979 13.97C10.0394 13.9002 10.1222 13.8449 10.2132 13.8072C10.3043 13.7694 10.4019 13.75 10.5004 13.75C10.599 13.75 10.6966 13.7694 10.7876 13.8072C10.8787 13.8449 10.9614 13.9002 11.031 13.97ZM2.03104 6.03122L6.00042 2.0609L9.96979 6.03122C10.1105 6.17195 10.3014 6.25101 10.5004 6.25101C10.6994 6.25101 10.8903 6.17195 11.031 6.03122C11.1718 5.89048 11.2508 5.69961 11.2508 5.50059C11.2508 5.30157 11.1718 5.1107 11.031 4.96996L6.53104 0.469965C6.46139 0.400233 6.37867 0.344913 6.28762 0.30717C6.19657 0.269427 6.09898 0.25 6.00042 0.25C5.90186 0.25 5.80426 0.269427 5.71321 0.30717C5.62216 0.344913 5.53945 0.400233 5.46979 0.469965L0.969792 4.96996C0.829061 5.1107 0.75 5.30157 0.75 5.50059C0.75 5.69961 0.829062 5.89048 0.969792 6.03121C1.11052 6.17195 1.30139 6.25101 1.50042 6.25101C1.69944 6.25101 1.89031 6.17195 2.03104 6.03122Z"
                fill="#404164"
              />
            </svg>
          </a-button>
        </a-dropdown>
      </div>
    </div>
    <div
      v-if="selectedListType == 'List'"
      class="grid grid-cols-6 mt-[44px] bg-[#FAFCFF] rounded-t-[10px] border-b-[#f1f0f0] border-b-[1px]"
    >
      <span class="text-[#404164] font-bold font-sf py-[10px] px-[24px]"
        >NAME</span
      >
      <span class="text-[#404164] font-bold font-sf py-[10px] px-[24px]"
        >CONTACT INFO</span
      >
      <span class="text-[#404164] font-bold font-sf py-[10px] px-[24px]"
        >PROPERTY</span
      >
      <span class="text-[#404164] font-bold font-sf py-[10px] px-[24px]"
        >UNIT</span
      >
      <span class="text-[#404164] font-bold font-sf py-[10px] px-[24px]"
        >APPLICATION STATUS</span
      >
      <span class="text-[#404164] font-bold font-sf py-[10px] px-[24px]"
        >VIEW DETAILS</span
      >
    </div>
    <ul
      class="w-full font-sf"
      :class="{
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6':
          selectedListType === 'Grid',
        'flex flex-col': selectedListType === 'List',
      }"
    >
      <li
        v-if="filteredApplications.length > 0 && selectedListType === 'Grid'"
        v-for="(items, index) in selectedStatus == 'Status'
          ? filteredApplications
          : filteredApplications.filter(
              (app) => app.statusName == selectedStatus
            )"
        :key="items.id || index"
        class="py-3.5 px-2.5 border mt-[44px] border-br1 bg-neutral_light rounded-[5px] w-full flex flex-col gap-[25px] text-center"
      >
        <img
          v-if="!items.profileImage"
          class="w-16 h-16 mx-auto rounded-full object-cover"
          src="https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D"
        />
        <img
          v-else
          class="w-16 h-16 mx-auto rounded-full object-cover"
          :src="items.profileImage"
          alt="user profile"
        />
        <p class="font-medium text-xl leading-6 text-txt_dark">
          {{ items.applicantName }} <br />
          <span class="text-secondary"
            >{{ items.gender || "nil" }}, {{ items.age || "nil" }}</span
          >
        </p>
        <ul class="w-full flex flex-col gap-[18px]">
          <li class="flex justify-between">
            <p class="text-primary text-xs leading-3.5 font-medium">Name</p>
            <p class="text-txt_dark text-xs leading-3.5">
              {{ items.applicantName || "nill" }}
            </p>
          </li>
          <li class="flex justify-between">
            <p class="text-primary text-xs leading-3.5 font-medium">Phone No</p>
            <p class="text-txt_dark text-xs leading-3.5">
              {{ items.phone | "nill" }}
            </p>
          </li>
          <li class="flex justify-between">
            <p class="text-primary text-xs leading-3.5 font-medium">
              Rental Unit
            </p>
            <p class="text-txt_dark text-xs leading-3.5">
              {{ items.unitName || "nill" }}
            </p>
          </li>
          <li class="flex justify-between">
            <p class="text-primary text-xs leading-3.5 font-medium">
              Property Name
            </p>
            <p class="text-txt_dark text-xs leading-3.5">
              {{ items.propertyName || "nill" }}
            </p>
          </li>
        </ul>
        <button
          class="btn btn_primary text-base py-[9px] rounded-md"
          :class="{
            'bg-green-600': items.statusName == 'Completed',
            'bg-red-600': items.statusName == 'Declined',
          }"
          @click="() => goto(items)"
        >
          {{
            items.statusName == "Completed"
              ? "Approved"
              : items.statusName == "Declined"
              ? "Declined"
              : "View Full Details"
          }}
        </button>
      </li>
      <div
        v-if="filteredApplications.length > 0 && selectedListType === 'List'"
        class="grid grid-cols-6"
        v-for="(value, index) in selectedStatus == 'Status'
          ? filteredApplications
          : filteredApplications.filter(
              (app) => app.statusName == selectedStatus
            )"
      >
        <span
          class="bg-[#FFFFFF] text-[#404164] border-gray-100 border-y-[1px] px-[24px] py-[24px]"
        >
          {{ value.applicantName || "nil" }}
        </span>
        <span
          class="bg-[#FFFFFF] text-[#404164] border-gray-100 border-y-[1px] px-[24px] py-[24px]"
        >
          <!-- {{ value.unitName || "nil" }} -->
          <div>{{ value.email || "nil" }}</div>
          {{ value.phone || "nil" }}
        </span>
        <span
          class="bg-[#FFFFFF] text-[#404164] border-gray-100 border-y-[1px] px-[24px] py-[24px]"
        >
          {{ value.propertyName || "nil" }}
        </span>
        <span
          class="bg-[#FFFFFF] text-[#404164] border-gray-100 border-y-[1px] px-[24px] py-[24px]"
        >
          {{ value.unitName || "nil" }}
        </span>
        <span class="bg-[#FFFFFF] border-gray-100 flex items-center pl-0">
          <span
            :class="{
              'bg-[#FEF9C3]   text-[#854D0F]':
                AccommodationApplicationStatus[value.status] ==
                'AwaitingAdditionalDocuments',
              'bg-[#F3E8FF] text-[#6D24A9]':
                AccommodationApplicationStatus[value.status] ==
                  'MoveInDateLandlordConfirmationPending' ||
                AccommodationApplicationStatus[value.status] ==
                  'ConfirmingMove-inDate',
              'bg-[#DBE9FE] text-[#1D40AE] ':
                AccommodationApplicationStatus[value.status] ==
                'Awaiting Review',
              'bg-red-700 text-red-100':
                AccommodationApplicationStatus[value.status] == 'Declined',
              'bg-[#DCFCE7] text-[#166434]':
                AccommodationApplicationStatus[value.status] == 'Completed',
              'bg-[#FEF9C3] text-[#854D0F]':
                AccommodationApplicationStatus[value.status] ==
                'AwaitingPayment',
              'bg-red-200 text-red-500 border-solid border-[1px]  ':
                AccommodationApplicationStatus[value.status] === 'Failed',
            }"
            class="flex gap-2 w-full text-center px-[20px] text-[14px] cursor-pointer font-sf rounded-[12px] leading-[145%] py-[2px] items-center relative group"
          >
            <InfoCircleOutlined class="" />
            <span
              :class="{
                'bg-[#FEF9C3] border-[#854D0F] border-solid border-[0.5px] text-[#854D0F]':
                  AccommodationApplicationStatus[value.status] ==
                  'AwaitingAdditionalDocuments',
                'bg-[#F3E8FF] text-[#6D24A9] border-[#6D24A9] border-solid border-[1px] ':
                  AccommodationApplicationStatus[value.status] ==
                    'MoveInDateLandlordConfirmationPending' ||
                  AccommodationApplicationStatus[value.status] ==
                    'ConfirmingMove-inDate',
                'bg-[#DBE9FE] border-solid  border-[1px] text-[#1D40AE] border-[#1D40AE]':
                  AccommodationApplicationStatus[value.status] ==
                  'Awaiting Review',
                'bg-red-700 text-red-300 border-red-300 border-solid border-[1px]':
                  AccommodationApplicationStatus[value.status] == 'Declined',
                'bg-[#DCFCE7] text-[#166434] border-[#166434] border-solid border-[1px] z-50 left-[30%]':
                  AccommodationApplicationStatus[value.status] == 'Completed',
                'bg-[#FEF9C3] text-[#854D0F] border-solid border-[1px] border-[#854D0F] z- left-[20%]':
                  AccommodationApplicationStatus[value.status] ==
                  'AwaitingPayment',
                'bg-red-200 text-red-500 border-solid border-[1px] border-red-500 z- left-[20%]':
                  AccommodationApplicationStatus[value.status] === 'Failed',
              }"
              class="absolute z-10 top-[20%] mb-2 hidden group-hover:block text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg"
            >
              <p class="">
                {{
                  TurnCamelCaseToWords(
                    AccommodationApplicationStatus[value.status]
                  ) || "nil"
                }}
              </p>
              <p
                class="h-fit"
                v-html="AccommodationApplicationStatusDesc[value.status]"
              ></p>
            </span>
            <span>
              {{
                TurnCamelCaseToWords(
                  AccommodationApplicationStatus[value.status]
                ) || "nil"
              }}
            </span>
          </span>
        </span>
        <button
          :class="{
            'cursor-not-allowed':
              AccommodationApplicationStatus[value.status] === 'Failed',
          }"
          :disabled="AccommodationApplicationStatus[value.status] === 'Failed'"
          @click="() => showModal(value)"
          :key="index"
          class="bg-[#FFFFFF] flex justify-start text-[#404164] border-gray-100 border-y-[1px] px-[24px] py-[24px]"
        >
          <EyeOutlined
            :disabled="
              AccommodationApplicationStatus[value.status] === 'Failed'
            "
            :class="{
              'cursor-not-allowed':
                AccommodationApplicationStatus[value.status] === 'Failed',
            }"
          />
        </button>
      </div>
      <div
        v-else-if="filteredApplications.length === 0"
        class="col-span-full flex flex-col items-center justify-center min-h-[363px]"
      >
        <p class="text-lg mb-4 text-red-600">No Applications Yet</p>
        <Button
          :label="'Add A Property'"
          :onClick="() => router.push('/properties/add')"
          type="primary"
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
    :footer="null"
  >
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
            <a-upload-dragger
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
            </a-upload>
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
            <div
              v-for="doc in tab.tabDetails"
              class="bg-[#F6F6F6] min-w-[130px] h-[7rem] px-3.5 py-2 flex flex-col flex-shrink-0 justify-around items-center rounded-lg font-medium text-[#121212] max-[1000px]:w-[45%] w-[40%]"
            >
              <IconPDFDoc />
              <span>{{ doc.name }}</span>
            </div>
          </div>
          <div v-for="item in tab.tabDetails" v-else class="mb-2.5">
            <p class="font-semibold text-black">{{ item.label }}</p>
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
              <div
                v-else-if="key == 'intendedMoveInDate'"
                :class="stage == 3 ? 'mt-1' : ''"
              >
                <a-date-picker
                  v-if="stage == 3"
                  v-model:value="selectedMoveInDate"
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
          <Button type="danger">Decline</Button>
          <Button
            type="custom"
            class="border-gray-200 border-[1.75px] box-border text-[#121212]"
            >Request Additional Document</Button
          >
        </div>
        <div
          v-if="stage == 2"
          class="ant-modal-footer flex justify-between gap-3"
        >
          <Button
            type="custom"
            class="border-gray-200 border-[1.5px] box-border"
            @click="handleBack"
            >Back</Button
          >
          <div class="flex gap-3">
            <Button @click="handleNext">Next</Button>
            <Button type="danger">Decline</Button>
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
            >Back</Button
          >
          <div class="flex gap-3">
            <Button @click="handleNext">Confirm Date</Button>
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
            >Back</Button
          >
          <Button @click="handleNext">Generate Lease</Button>
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script>
import StatusSelect from "@/components/StatusSelect.vue";
import IconSearch from "../../components/icons/IconSearch.vue";
import IconPDFDoc from "@/components/icons/IconPDFDoc.vue";
// import Modal from "@/components/Modal.vue";
// import { Modal } from 'ant-design-vue';
import { useRouter } from "vue-router";
import { FetchTenant, ApproveTenant } from "@/api/tenancy";
import { openDB } from "idb";
import { useUserStore } from "@/store";
import Button from "@/components/Button/Button.vue";
import { useRoute } from "vue-router";
import { AccomodationApplications } from "@/api/dashboard";

import { message } from "ant-design-vue";
import { h } from "vue";

import parsePhoneNumber from "libphonenumber-js";
import moment from "moment";
import dayjs from "dayjs";
import { ref } from "vue";

export default {
  name: "Applications",
  data() {
    return {
      store: useUserStore(),
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
      stages: [
        "Review",
        "Document Approval",
        "Set Move-In Date",
        "Lease Generation",
      ],
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
      selected_tab: "pending",
      selected_Request: {},
      status: "Status",
      computedData: [],
      router: useRouter(),
      selectedStatus: "Status",
      selectedListType: "List",
      currentPage: 1,
      searchQuery: "",
      total: 0,
      pageSize: 9,
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
      Applications: [],
    };
  },
  setup() {
    const stage = ref(1);
    const leaseFile = ref(null);
    const modalOpen = ref(false);
    const selectedApplication = ref(null);
    const selectedMoveInDate = ref(null);

    function showModal(app) {
      selectedApplication.value = app;
      selectedMoveInDate.value = dayjs(app.intendedMoveInDate);
      // console.log(selectedMoveInDate)
      modalOpen.value = true;
    }

    const handleOk = () => {
      modalOpen.value = false;
      stage.value = 1;
      leaseFile.value = null;
    };

    const handleCancel = () => {
      modalOpen.value = false;
      stage.value = 1;
      leaseFile.value = null;
    };

    return {
      modalOpen,
      stage,
      selectedApplication,
      selectedMoveInDate,
      leaseFile,
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

    onPageChange(page) {
      this.currentPage = page;
      this.fetchData(page);
    },

    fetchData(page = this.currentPage) {
      const query = {
        size: this.pageSize,
        page: page,
        query: "",
      };
      FetchTenant(query, this.store.userProfile.referenceID).then(
        (response) => {
          if (response.responseCode == "00") {
            this.Applications = response.applications.items;
            this.currentPage = response.applications.page || page;
            this.total = response.applications.totalItemCount || 0;
            this.computedData = response.applications.items;
            console.log("fetching", response.applications.items);
          }
        }
      );
    },

    setStage(status) {},

    handleNext(event) {
      this.stage = this.stage + 1;
      if (this.stage == 5) {
        this.modalOpen.value = false;
      }

      // console.log(this.selectedMoveInDate);
    },
    handleBack(event) {
      this.stage = this.stage - 1;
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
        console.log("got here");
        file.status = "done";
        console.log((this.leaseFile[0].status = "done"));
        onSuccess("ok, let's go!");
      } catch (error) {
        onError("no work");
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

    customIconRender({ file }) {
      return h(IconPDFDoc);
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
@tailwind base;
@tailwind components;
@tailwind utilities;
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
