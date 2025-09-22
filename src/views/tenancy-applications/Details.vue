<template>
  <!-- header -->
  <div class="px-6 py-[50px] bg-neutral">
    <h2
      class="text-[#404164] flex items-center cursor-pointer gap-[12px] text-[20px]"
      @click="() => router.back()"
    >
      <span class="text-[#808097]"> <ArrowLeftOutlined /></span>
      Back
    </h2>
    <div class="flex justify-between items-start">
      <div>
        <p class="text-[#000000] m-0 mb-0 font-sf font-bold text-[24px]">
          Stage {{ currentStep + 1 }} - {{ stages[currentStep] }}
        </p>
        <p class="text-[#000000] text-[16px] m-0 font-sf leading-[28px]">
          Review applicant details and make initial decision
        </p>
      </div>
      <span
        class="flex gap-2 -mt-[40px] rounded-[4px] flex-col items-start border-solid border-[0.5px] text-[#854D0F] px-[20px] text-[14px] font-sf leading-[145%] py-[8px]"
        :class="{
          'bg-[#FEF9C3] border-[#854D0F] border-solid border-[0.5px] text-[#854D0F]':
            AccommodationApplicationStatus[application.status] ==
            'AwaitingAdditionalDocuments',
          'bg-[#F3E8FF] text-[#6D24A9] border-[#6D24A9] border-solid border-[1px] ':
            AccommodationApplicationStatus[application.status] ==
              'MoveInDateLandlordConfirmationPending' ||
            AccommodationApplicationStatus[application.status] ==
              'MoveInDateTenantConfirmationPending',
          'bg-[#FEF9C3] border-solid  border-[1px] text-[#1D40AE] border-[#1D40AE]':
            AccommodationApplicationStatus[application.status] ==
            'AwaitingReview',
          'bg-red-700 text-red-300 border-red-300 border-solid border-[1px]':
            AccommodationApplicationStatus[application.status] == 'Declined',
          'bg-[#DCFCE7] text-[#166434] border-[#166434] border-solid border-[1px] z-50 left-[30%]':
            AccommodationApplicationStatus[application.status] == 'Completed',
          'bg-[#FEF9C3] text-[#854D0F] border-solid border-[1px] border-[#854D0F] z- left-[20%]':
            AccommodationApplicationStatus[application.status] ==
            'AwaitingPayment',
        }"
      >
        <span class="font-[500] text-[20px]"
          ><InfoCircleOutlined class="cursor-pointer" />
          {{
            AccommodationApplicationStatus[application.status]
              ? TurnCamelCaseToWords(
                  AccommodationApplicationStatus[application.status]
                )
              : "nil"
          }}
        </span>
        <span>
          {{ AccommodationApplicationStatusDesc[application.status] }}
        </span>
      </span>
    </div>
    <div class="mt-[23px]">
      <a-steps
        :current="currentStep"
        class="max-w-[790px] mb-8 text-[16px] mx-auto"
      >
        <a-step v-for="value in stages" :title="value" />
      </a-steps>
    </div>

    <div
      class="bg-white mt-4 px-[22px] py-[30px] mx-auto"
      v-if="currentStep === 0"
    >
      <div class="flex items-center">
        <div class="flex items-center gap-[20px]">
          <div class="w-[120px] h-[120px] rounded-full">
            <img
              src="/public/placeholder.png"
              class="w-full h-full rounded-full"
            />
          </div>
          <div>
            <h3
              class="text-[#404164] leading-[100%] text-[26px] font-bold font-sf m-0 mb-[7px]"
            >
              {{ application.applicantName || "Nill" }}
            </h3>
            <p
              class="text-[#404164] font-sf text-[18px] leading-[100%] m-0 mb-[7px]"
            >
              {{ application.email || "Nill" }}
            </p>
            <p
              class="text-[18px] font-sf text-[#404164] leading-[100%] m-0 mb-[7px]"
            >
              24 Years Old
            </p>
            <p
              class="underline text-[#404164] m-0 mt-[8px] text-[14px] cursor-pointer"
            >
              View Rental History
            </p>
          </div>
        </div>
        <div class="flex gap-[8px] ml-auto w-fit">
          <button
            :disabled="application.status == 4 || application.status == 7"
            @click="approveData()"
            class="bg-[#1A7D36] disabled:cursor-not-allowed disabled:bg-gray-300 py-[6px] px-[26.5px] rounded-[5px] border-[0.99px] text-[#FFFFFF]"
          >
            Approve
          </button>
          <button
            :disabled="application.status == 4 || application.status == 7"
            class="bg-[#DC2625] disabled:cursor-not-allowed disabled:bg-gray-300 py-[6px] px-[26.5px] rounded-[5px] border-[0.99px] text-[#FFFFFF]"
          >
            Decline
          </button>
          <button
            :disabled="application.status == 4 || application.status == 7"
            @click="showRequestDocumentModal = true"
            class="bg-[#ffffff] py-[6px] disabled:cursor-not-allowed px-[16.5px] rounded-[5px] border-[#000130] border-[0.99px] text-[#000130]"
          >
            Request Additional Documents
          </button>
        </div>
      </div>

      <div>
        <p
          class="text-[#404164] leading-[100%] font-[600] text-[22px] mt-[50px] border-solid border-b pb-[4px]"
        >
          Personal Information
        </p>
        <div class="grid grid-cols-4 gap-y-[32px]">
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Phone<span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >+1(250) 555-0199</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Current Address<span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
            >
              {{ application.currentAddress || "Nill" }}
            </span>
          </p>

          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Occupation<span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >Product Owner</span
            >
          </p>
        </div>

        <p
          class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
        >
          Responsible for Rent<span
            class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
            >Applicant</span
          >
        </p>
      </div>

      <!-- Professional Information -->
      <a-modal
        :visible="showmoldal"
        :footer="null"
        width="768px"
        :closable="false"
      >
        <template #title>
          <div
            class="flex items-center justify-between border-b border-[#C7C7C7] py-[12px]"
          >
            <div
              class="cursor-pointer flex items-center gap-[8px] text-txt_dark text-[18px] font-medium"
            >
              <ArrowLeftOutlined
                @click="showmoldal = false"
                class="text-[18px]"
              />
            </div>
            <span class="modal-title">{{
              application.applicantName || "nil"
            }}</span>
            <span></span>
          </div>
        </template>
        <div class="flex items-center flex-col mx-auto">
          <p class="text-[#404164] text-[20px] font-sf text-center mt-[57px]">
            You have approved this application and a notification will be sent
            to the user.
          </p>
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="100"
              cy="100"
              r="100"
              fill="black"
              fill-opacity="0.25"
            />
            <ellipse
              cx="99.9137"
              cy="99.4012"
              rx="86.5231"
              ry="83.948"
              fill="black"
              fill-opacity="0.25"
            />
            <path
              d="M162.18 99.9962C162.18 134.305 134.367 162.117 100.059 162.117C65.7501 162.117 37.9375 134.305 37.9375 99.9962C37.9375 65.6876 65.7501 37.875 100.059 37.875C134.367 37.875 162.18 65.6876 162.18 99.9962Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M100.001 172.728C140.167 172.728 172.728 140.167 172.728 100.001C172.728 59.8345 140.167 27.2734 100.001 27.2734C59.8345 27.2734 27.2734 59.8345 27.2734 100.001C27.2734 140.167 59.8345 172.728 100.001 172.728ZM137.452 80.0262C139.809 77.1977 139.427 72.9939 136.598 70.6368C133.77 68.2797 129.566 68.6619 127.209 71.4904L96.1517 108.759C93.8403 111.533 92.5408 113.068 91.5034 114.012L91.4637 114.048L91.421 114.016C90.3024 113.17 88.8693 111.758 86.3162 109.205L72.3978 95.2867C69.7943 92.6832 65.5732 92.6832 62.9697 95.2867C60.3662 97.8902 60.3662 102.111 62.9697 104.715L76.8881 118.633L77.1603 118.905C79.3369 121.083 81.4309 123.178 83.3791 124.651C85.5616 126.301 88.4197 127.853 92.0824 127.687C95.7451 127.521 98.451 125.716 100.475 123.875C102.282 122.232 104.178 119.956 106.148 117.59L106.395 117.295L137.452 80.0262ZM90.8821 114.508C90.8821 114.508 90.8852 114.506 90.8913 114.503C90.8851 114.506 90.882 114.508 90.8821 114.508ZM92.075 114.449C92.0813 114.452 92.0846 114.453 92.0847 114.453C92.0847 114.453 92.0815 114.452 92.075 114.449Z"
              fill="#000130"
            />
          </svg>
        </div>
        <p
          class="text-[#808097] text-[18px] font-sf font-medium text-center mt-[24px]"
        >
          Generate a lease now to be signed by applicant
        </p>
        <div class="flex items-center justify-center mt-[64px]">
          <button
            @click="HandleGenerateLease"
            class="bg-[#000130] rounded-[4px] w-[229px] h-[51px] text-white mx-auto"
          >
            Generate Lease
          </button>
        </div>
      </a-modal>

      <a-modal
        :visible="showDeclinemoldal"
        :footer="null"
        width="768px"
        :closable="false"
      >
        <template #title>
          <div
            class="flex items-center justify-between border-b border-[#C7C7C7] py-[12px]"
          >
            <div
              class="cursor-pointer flex items-center gap-[8px] text-txt_dark text-[18px] font-medium"
            >
              <ArrowLeftOutlined
                @click="showDeclinemoldal = false"
                class="text-[18px]"
              />
            </div>
            <span class="modal-title">Steph Orkuma</span>
            <span></span>
          </div>
        </template>
        <div class="flex items-center flex-col mx-auto">
          <p
            class="text-[#404164] text-[20px] font-sf text-center font-[500] mt-[57px] m-0"
          >
            Kindly enter your reason for declining this application.
          </p>
          <p
            class="text-[#808097] m-0 font-medium font-sf text-base leading-[28px]"
          >
            Applicant will be notified of this reason
          </p>
        </div>
        <a-form-item class="mt-[38px] px-[88px]">
          <a-textarea
            v-model:value="declineReason"
            class="py-[17px] px-[28px] border-[#C7C7C7] border-[1px]"
            placeholder="Enter Reason for decline"
            :auto-size="{ minRows: 10, maxRows: 15 }"
          />
        </a-form-item>
        <div class="flex items-center justify-center mt-[64px]">
          <a-button
            :loading="declining"
            @click="declineData"
            class="bg-[#000130] rounded-[4px] w-[229px] h-[51px] text-white mx-auto"
          >
            Submit
          </a-button>
        </div>
      </a-modal>

      <div>
        <p
          class="text-[#404164] leading-[100%] font-[600] text-[22px] mt-[50px] border-solid border-b pb-[4px] w-"
        >
          Professional Information
        </p>
        <div class="grid grid-cols-4 gap-y-[32px]">
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Name of Employer<span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >{{ "nil" }}</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Current Landlord’s Name
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
            >
              {{ application.currentLandLordName || "Nil" }}
            </span>
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Current Landlord’s Name
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
            >
              {{ application.currentLandLordName || "Nil" }}
            </span>
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Approximate Monthly Income<span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >{{ application.apprMonthlyIncome }}/month</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Length of Time With Employeer

            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >{{ "nil" }}</span
            >
          </p>

          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Work Supervisor's Phone Number

            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >nil</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Work Supervisor's Email

            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >nil</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Budget For Accomodation
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >{{ application.budgetForAccommodation }}</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Car Make, Model
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >Applicant</span
            >
          </p>

          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Car License Number
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >Applicant</span
            >
          </p>
        </div>
      </div>
      <!-- Emergency Information -->
      <div>
        <p
          class="text-[#404164] leading-[100%] font-[600] text-[22px] mt-[50px] border-solid border-b pb-[4px] w-"
        >
          Emergency Information
        </p>
        <p class="text-[#404164] text-[20px] font-medium font-sf">
          Emergency Contact
        </p>
        <div class="p-0 items-center grid grid-cols-4 gap-y-[32px]">
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Full Name<span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
            >
              {{ application.emergencyFullName || "nil" }}
            </span>
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Phone Number
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
            >
              {{ application.emergencyPhoneNo || "nil" }}
            </span>
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Email Address
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >{{ application.emergencyRelationship || "nil" }}</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            RelationsShip<span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >{{ application.emergencyRelationship || "nil" }}</span
            >
          </p>
        </div>
        <p class="text-[#404164] text-[20px] font-medium font-sf mt-6">
          Guarantor Information 1
        </p>
        <div class="grid grid-cols-4 gap-y-[32px]">
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Full Name

            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >{{ application.guarantor1FullName || "nil" }}</span
            >
          </p>

          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Phone Number
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >{{ application.guarantor1PhoneNo || "nil" }}</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Email Address

            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >{{ application.guarantor1Email || "nil" }}</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Address
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >{{ application.guarantor1Address || "nil" }}</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Occupation
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >{{ application.guarantor1Occupation || "nil" }}</span
            >
          </p>
        </div>

        <p class="text-[#404164] text-[20px] font-medium font-sf mt-[24px]">
          Guarantor Information 2
        </p>
        <div class="grid grid-cols-4 gap-y-[32px]">
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Full Name

            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >{{ application.guarantor2FullName || "nil" }}</span
            >
          </p>

          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Phone Number
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >{{ application.guarantor2PhoneNo || "nil" }}</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Email Address

            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >{{ application.guarantor2Email || "nil" }}</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Address
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >{{ application.guarantor2Address || "nil" }}</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Occupation
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >{{ application.guarantor2Occupation || "nil" }}</span
            >
          </p>
        </div>
      </div>
      <!-- Personal Behaviour -->

      <div>
        <p
          class="text-[#404164] leading-[100%] font-[600] text-[22px] mt-[50px] border-solid border-b pb-[4px] w-"
        >
          Personal Behaviour
        </p>
        <div class="grid grid-cols-4 gap-y-[32px]">
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Brought to court by a landlord?
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >{{ application.haveYoubeenToCourtByLandLord ? "Yes" : "No" }}
            </span>
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Moved still owing rent?
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
            >
              {{
                application.haveYoueverDamageApartmentOrMovestillowning
                  ? "Yes"
                  : "No"
              }}
            </span>
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Total move-in amount available?
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >{{ application.doYouHaveTotalMoveinAmount ? "Yes" : "No" }}</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Have pets?<span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >{{ doYouHavePets ? "Yes" : "No" }}</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Smoke
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >{{ application.doYouSmoke ? "Yes" : "No" }}</span
            >
          </p>

          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Current rent up to date?
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >{{ application.isYourCurrentRentUpToDate ? "Yes" : "No" }}</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Damaged an apartment?
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >{{
                application.haveYoueverDamageApartmentOrMoves ? "Yes" : "No"
              }}</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Been evicted as a tenant?
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >{{ application.haveYouEverBeenEvicted ? "Yes" : "No" }}</span
            >
          </p>
        </div>
        <div>
          <p
            class="text-[#404164] leading-[100%] font-[600] text-[22px] mt-[50px] border-solid border-b pb-[4px] w-"
          >
            Documents Uploaded
          </p>
          <div class="flex gap-6">
            <div
              class="bg-[#FAFAFA] h-[124px] w-[170px]"
              v-for="doc in application.attachedDocs"
            ></div>
          </div>
        </div>

        <div class="flex gap-[8px] mx-auto w-fit">
          <button
            :disabled="application.status == 4 || application.status == 7"
            @click="approveData()"
            class="bg-[#1A7D36] disabled:cursor-not-allowed disabled:bg-gray-300 py-[6px] px-[26.5px] rounded-[5px] border-[0.99px] text-[#FFFFFF]"
          >
            Approve
          </button>
          <button
            :disabled="application.status == 4 || application.status == 7"
            class="bg-[#DC2625] disabled:cursor-not-allowed disabled:bg-gray-300 py-[6px] px-[26.5px] rounded-[5px] border-[0.99px] text-[#FFFFFF]"
          >
            Decline
          </button>
          <button
            :disabled="application.status == 4 || application.status == 7"
            @click="showRequestDocumentModal = true"
            class="bg-[#ffffff] py-[6px] disabled:cursor-not-allowed px-[16.5px] rounded-[5px] border-[#000130] border-[0.99px] text-[#000130]"
          >
            Request Additional Documents
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="currentStep == 1"
      class="bg-white mt-4 px-[22px] py-[30px] mx-auto max-w-[873px] w-full"
    >
      <div>
        <p
          class="text-[#000000] pb-[4px] border-b border-b-solid border-[#C7C7C7] text-[20px] leading-[28px]"
        >
          Additional Documents
        </p>
        <div class="mb-[51px]">
          <div
            class="bg-[#FAFAFA] h-[124px] w-[170px] flex items-center justify-center flex-col py-[6px] cursor-pointer rounded-[10px]"
          >
            <svg
              width="170"
              height="124"
              viewBox="0 0 170 124"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="170" height="124" rx="10" fill="#FAFAFA" />
              <path
                d="M97 16L105 24V62C105 63.1046 104.105 64 103 64H67C65.8954 64 65 63.1046 65 62V18C65 16.8954 65.8954 16 67 16H97Z"
                fill="#E4E7EC"
              />
              <path d="M105 24H97V16L105 24Z" fill="#98A2B3" />
              <rect
                x="63"
                y="36"
                width="44"
                height="20"
                rx="2"
                fill="#CC400C"
              />
              <path
                d="M70.3281 51.8161V40.1797H74.6918C75.5857 40.1797 76.3357 40.3464 76.9418 40.6797C77.5516 41.013 78.0118 41.4714 78.3224 42.0547C78.6368 42.6342 78.794 43.2933 78.794 44.032C78.794 44.7782 78.6368 45.4411 78.3224 46.0206C78.008 46.6001 77.544 47.0566 76.9304 47.3899C76.3168 47.7195 75.5611 47.8842 74.6634 47.8842H71.7713V46.1513H74.3793C74.902 46.1513 75.33 46.0604 75.6634 45.8786C75.9967 45.6967 76.2429 45.4467 76.402 45.1286C76.5649 44.8104 76.6463 44.4448 76.6463 44.032C76.6463 43.6191 76.5649 43.2554 76.402 42.9411C76.2429 42.6267 75.9948 42.3823 75.6577 42.2081C75.3243 42.0301 74.8944 41.9411 74.3679 41.9411H72.4361V51.8161H70.3281Z"
                fill="white"
              />
              <path
                d="M84.5682 51.8161H80.625V40.1797H84.6477C85.803 40.1797 86.7955 40.4126 87.625 40.8786C88.4583 41.3407 89.0985 42.0054 89.5455 42.8729C89.9924 43.7403 90.2159 44.7782 90.2159 45.9865C90.2159 47.1986 89.9905 48.2403 89.5398 49.1115C89.0928 49.9827 88.447 50.6513 87.6023 51.1172C86.7614 51.5831 85.75 51.8161 84.5682 51.8161ZM82.733 49.9922H84.4659C85.2765 49.9922 85.9527 49.8445 86.4943 49.549C87.036 49.2498 87.4432 48.8047 87.7159 48.2138C87.9886 47.6191 88.125 46.8767 88.125 45.9865C88.125 45.0964 87.9886 44.3577 87.7159 43.7706C87.4432 43.1797 87.0398 42.7384 86.5057 42.4467C85.9754 42.1513 85.3163 42.0036 84.5284 42.0036H82.733V49.9922Z"
                fill="white"
              />
              <path
                d="M92.2188 51.8161V40.1797H99.6733V41.9467H94.3267V45.1058H99.1619V46.8729H94.3267V51.8161H92.2188Z"
                fill="white"
              />
              <path
                d="M65.5527 83.002C67.1055 83.002 68.1133 84.0332 68.1133 85.5098C68.1133 86.9863 67.1055 88.0117 65.5469 88.0117H63.6895V91H62.6113V83.002H65.5527ZM67.0059 85.5098C67.0059 84.5195 66.4375 83.9453 65.4531 83.9453H63.6895V87.0742H65.4531C66.4375 87.0742 67.0059 86.5 67.0059 85.5098ZM69.7188 91V84.8359H70.7793V85.7852H70.832C70.9844 85.3809 71.4297 84.7422 72.5195 84.7422C72.6543 84.7422 72.7832 84.7539 72.9062 84.7715V85.7383C72.8066 85.7148 72.5957 85.7031 72.4082 85.7031C71.3242 85.7031 70.7852 86.3535 70.7852 87.1914V91H69.7188ZM76.668 84.7363C78.1973 84.7363 79.3281 85.7383 79.3281 87.4551V88.3691C79.3281 90.1094 78.1973 91.0996 76.668 91.0996C75.1094 91.0996 74.002 90.127 74.002 88.3691V87.4609C74.002 85.7969 75.127 84.7363 76.668 84.7363ZM76.6738 85.6387C75.6836 85.6387 75.0625 86.4238 75.0625 87.5488V88.293C75.0625 89.4355 75.6426 90.2031 76.6738 90.2031C77.6934 90.2031 78.2617 89.4355 78.2617 88.293V87.5488C78.2617 86.4238 77.6641 85.6387 76.6738 85.6387ZM83.4766 84.7363C85.0059 84.7363 86.1367 85.7383 86.1367 87.4551V88.3691C86.1367 90.1094 85.0059 91.0996 83.4766 91.0996C81.918 91.0996 80.8105 90.127 80.8105 88.3691V87.4609C80.8105 85.7969 81.9355 84.7363 83.4766 84.7363ZM83.4824 85.6387C82.4922 85.6387 81.8711 86.4238 81.8711 87.5488V88.293C81.8711 89.4355 82.4512 90.2031 83.4824 90.2031C84.502 90.2031 85.0703 89.4355 85.0703 88.293V87.5488C85.0703 86.4238 84.4727 85.6387 83.4824 85.6387ZM88.4336 91V85.7148H87.3965V84.8535H88.4336V84.2383C88.4336 83.0547 88.9902 82.5098 90.3672 82.5098C90.6426 82.5098 90.9473 82.5332 91.0703 82.5449V83.4004C90.9766 83.3887 90.6719 83.377 90.5195 83.377C89.793 83.377 89.4824 83.5879 89.4824 84.3203V84.8535H90.9121V85.7148H89.4941V91H88.4336ZM97.6914 84.7363C99.2207 84.7363 100.352 85.7383 100.352 87.4551V88.3691C100.352 90.1094 99.2207 91.0996 97.6914 91.0996C96.1328 91.0996 95.0254 90.127 95.0254 88.3691V87.4609C95.0254 85.7969 96.1504 84.7363 97.6914 84.7363ZM97.6973 85.6387C96.707 85.6387 96.0859 86.4238 96.0859 87.5488V88.293C96.0859 89.4355 96.666 90.2031 97.6973 90.2031C98.7168 90.2031 99.2852 89.4355 99.2852 88.293V87.5488C99.2852 86.4238 98.6875 85.6387 97.6973 85.6387ZM102.648 91V85.7148H101.611V84.8535H102.648V84.2383C102.648 83.0547 103.205 82.5098 104.582 82.5098C104.857 82.5098 105.162 82.5332 105.285 82.5449V83.4004C105.191 83.3887 104.887 83.377 104.734 83.377C104.008 83.377 103.697 83.5879 103.697 84.3203V84.8535H105.127V85.7148H103.709V91H102.648ZM49.334 101.584C49.334 103.846 48.0742 105.164 46.1113 105.164C44.1484 105.164 42.8887 103.846 42.8887 101.584V100.424C42.8887 98.1504 44.1484 96.8379 46.1113 96.8379C48.0742 96.8379 49.334 98.1504 49.334 100.424V101.584ZM48.25 100.418C48.25 98.6484 47.3242 97.793 46.1113 97.793C44.8926 97.793 43.9727 98.6484 43.9727 100.418V101.584C43.9727 103.354 44.8926 104.209 46.1113 104.209C47.3242 104.209 48.25 103.354 48.25 101.584V100.418ZM58.8906 98.8359L57.25 105H56.1953L54.8066 100.283H54.7773L53.4238 105H52.3633L50.6348 98.8359H51.8125L52.9023 103.682H52.9434L54.291 98.8359H55.2871L56.6758 103.682H56.7168L57.8301 98.8359H58.8906ZM60.2734 105V98.8359H61.3223V99.9551H61.3809C61.5332 99.4688 61.9609 98.7363 63.25 98.7363C64.4922 98.7363 65.3418 99.4102 65.3418 100.793V105H64.2812V101.127C64.2812 100.16 63.7832 99.6621 62.9453 99.6621C61.8613 99.6621 61.334 100.5 61.334 101.566V105H60.2734ZM69.7363 105.1C68.0781 105.1 67.0996 104.051 67.0996 102.387V101.449C67.0996 99.7734 68.1777 98.7363 69.6543 98.7363C71.1484 98.7363 72.2148 99.791 72.2148 101.449V102.193H68.1543V102.504C68.1543 103.459 68.7051 104.203 69.7305 104.203C70.4512 104.203 70.9375 103.857 71.043 103.477H72.1328C72.0391 104.133 71.2949 105.1 69.7363 105.1ZM68.1543 101.426H71.1602V101.326C71.1602 100.301 70.5625 99.627 69.6602 99.627C68.7578 99.627 68.1543 100.301 68.1543 101.326V101.426ZM74.0664 105V98.8359H75.127V99.7852H75.1797C75.332 99.3809 75.7773 98.7422 76.8672 98.7422C77.002 98.7422 77.1309 98.7539 77.2539 98.7715V99.7383C77.1543 99.7148 76.9434 99.7031 76.7559 99.7031C75.6719 99.7031 75.1328 100.354 75.1328 101.191V105H74.0664ZM78.3555 100.605C78.3555 99.2988 79.4512 98.7363 80.6523 98.7363C81.9824 98.7363 82.8613 99.4219 82.8613 100.459H81.877C81.8418 100.031 81.4434 99.5684 80.6172 99.5684C79.8965 99.5684 79.3809 99.9023 79.3809 100.5C79.3809 101.232 80.2129 101.326 80.9102 101.455C82.0645 101.654 83.0195 101.977 83.0195 103.178C83.0195 104.402 82.0352 105.1 80.5586 105.1C79.1875 105.1 78.2441 104.484 78.2441 103.383H79.2812C79.3633 103.928 79.7441 104.273 80.6055 104.273C81.5781 104.273 81.9766 103.834 81.9766 103.301C81.9766 102.615 81.291 102.486 80.4355 102.316C79.2871 102.082 78.3555 101.818 78.3555 100.605ZM84.7715 105V96.5801H85.832V99.9551H85.8848C86.0078 99.5273 86.5117 98.7363 87.7949 98.7363C88.9844 98.7363 89.8633 99.4219 89.8633 100.805V105H88.8027V101.139C88.8027 100.166 88.2695 99.6621 87.4375 99.6621C86.3828 99.6621 85.832 100.494 85.832 101.566V105H84.7715ZM91.8379 96.9375C91.8379 96.5098 92.1602 96.2051 92.582 96.2051C93.0273 96.2051 93.3496 96.5098 93.3496 96.9375C93.3496 97.3594 93.0273 97.6641 92.582 97.6641C92.1602 97.6641 91.8379 97.3594 91.8379 96.9375ZM92.0605 105V98.8359H93.1211V105H92.0605ZM98.248 105.094C97.3984 105.094 96.7656 104.736 96.4785 104.086H96.4258V107.045H95.3652V98.8301H96.3848V99.8145H96.4375C96.6895 99.1523 97.3984 98.7422 98.2832 98.7422C99.7305 98.7422 100.639 99.7617 100.639 101.385V102.445C100.639 104.08 99.7188 105.094 98.248 105.094ZM98.0312 104.186C99.0039 104.186 99.5723 103.482 99.5723 102.252V101.596C99.5723 100.359 99.0039 99.6504 98.002 99.6504C97.0293 99.6504 96.4258 100.33 96.4258 101.443V102.516C96.4258 103.506 97.082 104.186 98.0312 104.186ZM107.248 98.7422C108.115 98.7422 108.789 99.123 109.035 99.75H109.088V96.5801H110.148V105H109.129V104.016H109.076C108.895 104.643 108.127 105.088 107.225 105.088C105.789 105.088 104.857 104.086 104.857 102.516V101.32C104.857 99.75 105.812 98.7422 107.248 98.7422ZM107.465 99.6504C106.504 99.6504 105.924 100.354 105.924 101.537V102.287C105.924 103.482 106.516 104.18 107.494 104.18C108.461 104.18 109.088 103.494 109.088 102.387V101.32C109.088 100.342 108.402 99.6504 107.465 99.6504ZM114.625 98.7363C116.154 98.7363 117.285 99.7383 117.285 101.455V102.369C117.285 104.109 116.154 105.1 114.625 105.1C113.066 105.1 111.959 104.127 111.959 102.369V101.461C111.959 99.7969 113.084 98.7363 114.625 98.7363ZM114.631 99.6387C113.641 99.6387 113.02 100.424 113.02 101.549V102.293C113.02 103.436 113.6 104.203 114.631 104.203C115.65 104.203 116.219 103.436 116.219 102.293V101.549C116.219 100.424 115.621 99.6387 114.631 99.6387ZM118.768 102.41V101.402C118.768 99.7852 119.758 98.7363 121.34 98.7363C122.881 98.7363 123.678 99.6855 123.707 100.617H122.67C122.605 100.254 122.318 99.6621 121.357 99.6621C120.35 99.6621 119.828 100.359 119.828 101.438V102.422C119.828 103.494 120.408 104.174 121.357 104.174C122.266 104.174 122.605 103.758 122.717 103.289H123.748C123.713 104.197 122.969 105.1 121.34 105.1C119.752 105.1 118.768 104.062 118.768 102.41ZM125.295 104.279C125.295 103.781 125.67 103.43 126.133 103.43C126.619 103.43 126.988 103.781 126.988 104.279C126.988 104.754 126.619 105.105 126.133 105.105C125.67 105.105 125.295 104.754 125.295 104.279Z"
                fill="#404164"
              />
              <rect
                x="111"
                y="6"
                width="52"
                height="16"
                rx="5"
                fill="#EFF6FF"
              />
              <path
                d="M116.445 17H115.738V11.668H116.418L119.055 15.7695H119.09V11.668H119.797V17H119.117L116.473 12.8945H116.445V17ZM122.793 17.0664C121.688 17.0664 121.035 16.3672 121.035 15.2578V14.6328C121.035 13.5156 121.754 12.8242 122.738 12.8242C123.734 12.8242 124.445 13.5273 124.445 14.6328V15.1289H121.738V15.3359C121.738 15.9727 122.105 16.4688 122.789 16.4688C123.27 16.4688 123.594 16.2383 123.664 15.9844H124.391C124.328 16.4219 123.832 17.0664 122.793 17.0664ZM121.738 14.6172H123.742V14.5508C123.742 13.8672 123.344 13.418 122.742 13.418C122.141 13.418 121.738 13.8672 121.738 14.5508V14.6172ZM130.648 12.8906L129.555 17H128.852L127.926 13.8555H127.906L127.004 17H126.297L125.145 12.8906H125.93L126.656 16.1211H126.684L127.582 12.8906H128.246L129.172 16.1211H129.199L129.941 12.8906H130.648ZM135.398 16.4688C136.199 16.4688 136.711 15.9609 136.711 15.1367V11.668H137.434V15.1602C137.434 16.3281 136.621 17.1094 135.398 17.1094C134.172 17.1094 133.363 16.3281 133.363 15.1602V11.668H134.082V15.1367C134.082 15.9648 134.594 16.4688 135.398 16.4688ZM140.73 17.0625C140.164 17.0625 139.742 16.8242 139.551 16.3906H139.516V18.3633H138.809V12.8867H139.488V13.543H139.523C139.691 13.1016 140.164 12.8281 140.754 12.8281C141.719 12.8281 142.324 13.5078 142.324 14.5898V15.2969C142.324 16.3867 141.711 17.0625 140.73 17.0625ZM140.586 16.457C141.234 16.457 141.613 15.9883 141.613 15.168V14.7305C141.613 13.9062 141.234 13.4336 140.566 13.4336C139.918 13.4336 139.516 13.8867 139.516 14.6289V15.3438C139.516 16.0039 139.953 16.457 140.586 16.457ZM143.547 17V11.3867H144.254V17H143.547ZM147.25 12.8242C148.27 12.8242 149.023 13.4922 149.023 14.6367V15.2461C149.023 16.4062 148.27 17.0664 147.25 17.0664C146.211 17.0664 145.473 16.418 145.473 15.2461V14.6406C145.473 13.5312 146.223 12.8242 147.25 12.8242ZM147.254 13.4258C146.594 13.4258 146.18 13.9492 146.18 14.6992V15.1953C146.18 15.957 146.566 16.4688 147.254 16.4688C147.934 16.4688 148.312 15.957 148.312 15.1953V14.6992C148.312 13.9492 147.914 13.4258 147.254 13.4258ZM151.32 17.0664C150.523 17.0664 149.977 16.5664 149.977 15.8047C149.977 15.0859 150.477 14.5977 151.422 14.5977H152.496V14.1914C152.496 13.6641 152.164 13.4219 151.637 13.4219C151.117 13.4219 150.898 13.625 150.816 13.9102H150.133C150.195 13.2148 150.742 12.8242 151.66 12.8242C152.508 12.8242 153.207 13.1875 153.207 14.1953V17H152.527V16.4531H152.496C152.297 16.7852 151.926 17.0664 151.32 17.0664ZM151.516 16.4727C152.07 16.4727 152.496 16.0977 152.496 15.5938V15.1367H151.48C150.926 15.1367 150.699 15.4141 150.699 15.7812C150.699 16.2578 151.09 16.4727 151.516 16.4727ZM155.973 12.8281C156.551 12.8281 157 13.082 157.164 13.5H157.199V11.3867H157.906V17H157.227V16.3438H157.191C157.07 16.7617 156.559 17.0586 155.957 17.0586C155 17.0586 154.379 16.3906 154.379 15.3438V14.5469C154.379 13.5 155.016 12.8281 155.973 12.8281ZM156.117 13.4336C155.477 13.4336 155.09 13.9023 155.09 14.6914V15.1914C155.09 15.9883 155.484 16.4531 156.137 16.4531C156.781 16.4531 157.199 15.9961 157.199 15.2578V14.5469C157.199 13.8945 156.742 13.4336 156.117 13.4336Z"
                fill="#2463EB"
              />
            </svg>
            <p class="text-[#404164] text-[12px] font-sf leading-[100%]">
              Proof of Ownership doc.
            </p>
          </div>
        </div>
      </div>
      <div>
        <p
          class="text-[#000000] pb-[4px] border-b border-b-solid border-[#C7C7C7] text-[20px] leading-[28px]"
        >
          Applicants Information
        </p>
        <div>
          <div>
            <div
              class="text-[#808097] leading-[100%] text-[14px] font-sf font-[400]"
            >
              Tenant Name
            </div>
            <div
              class="text-[#404164] font-sf font-[400] mt-[2px] leading-[100%]"
            >
              {{ application.applicantName || "Nill" }}
            </div>
          </div>
          <div class="mt-[13px]">
            <div
              class="text-[#808097] leading-[100%] text-[14px] font-sf font-[400]"
            >
              Email
            </div>
            <div
              class="text-[#404164] font-sf font-[400] mt-[2px] leading-[100%]"
            >
              {{ application.email || "Nill" }}
            </div>
          </div>
          <div class="mt-[13px]">
            <div
              class="text-[#808097] leading-[100%] text-[14px] font-sf font-[400]"
            >
              Phone
            </div>
            <div
              class="text-[#404164] font-sf font-[400] mt-[2px] leading-[100%]"
            >
              {{ application.phoneNo || "Nill" }}
            </div>
          </div>

          <div class="mt-[13px]">
            <div
              class="text-[#808097] leading-[100%] text-[14px] font-sf font-[400]"
            >
              Occupation
            </div>
            <div
              class="text-[#404164] font-sf font-[400] mt-[2px] leading-[100%]"
            >
              {{ application.occupation || "Nill" }}
            </div>
          </div>
          <div class="mt-[13px]">
            <div
              class="text-[#808097] leading-[100%] text-[14px] font-sf font-[400]"
            >
              Monthly Income
            </div>
            <div
              class="text-[#404164] font-sf font-[400] mt-[2px] leading-[100%]"
            >
              {{ application.apprMonthlyIncome || "Nill" }}
            </div>
          </div>
        </div>
        <div class="flex gap-[8px] mx-auto w-fit mt-[51px]">
          <button
            @click="currentStep = 2"
            class="bg-[#1A7D36] py-[6px] px-[26.5px] rounded-[5px] border-[#29C354] border-[0.99px] text-[#FFFFFF]"
          >
            Approve
          </button>
          <button
            class="bg-[#DC2625] py-[6px] px-[26.5px] rounded-[5px] border-[#F47B7B] border-[0.99px] text-[#FFFFFF]"
          >
            Decline
          </button>
          <button
            @click="showRequestDocumentModal = true"
            class="bg-[#ffffff] py-[6px] px-[16.5px] rounded-[5px] border-[#000130] border-[0.99px] text-[#000130]"
          >
            Request Additional Documents
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="currentStep == 2"
      class="bg-white mt-4 px-[22px] py-[30px] mx-auto max-w-[873px] w-full"
    >
      <div>
        <p
          class="text-[#000000] pb-[4px] border-b border-b-solid border-[#C7C7C7] text-[20px] leading-[28px]"
        >
          Application Summary
        </p>
        <div>
          <div>
            <div
              class="text-[#808097] leading-[100%] text-[14px] font-sf font-[400]"
            >
              Property
            </div>
            <div
              class="text-[#404164] font-sf font-[400] mt-[2px] leading-[100%]"
            >
              {{ application.propertyName }}
            </div>
          </div>
          <div class="mt-[13px]">
            <div
              class="text-[#808097] leading-[100%] text-[14px] font-sf font-[400]"
            >
              Unit
            </div>
            <div
              class="text-[#404164] font-sf font-[400] mt-[2px] leading-[100%]"
            >
              mchen@email.com
            </div>
          </div>
          <div class="mt-[13px]">
            <div
              class="text-[#808097] leading-[100%] text-[14px] font-sf font-[400]"
            >
              Monthly
            </div>
            <div
              class="text-[#404164] font-sf font-[400] mt-[2px] leading-[100%]"
            >
              {{ application.apprMonthlyIncome }}
            </div>
          </div>

          <div class="mt-[13px]">
            <div
              class="text-[#808097] leading-[100%] text-[14px] font-sf font-[400]"
            >
              Occupation
            </div>
            <div
              class="text-[#404164] font-sf font-[400] mt-[2px] leading-[100%]"
            >
              {{ application.occupation || "Nill" }}
            </div>
          </div>
          <div class="mt-[13px]">
            <div
              class="text-[#808097] leading-[100%] text-[14px] font-sf font-[400]"
            >
              Monthly Income
            </div>
            <div
              class="text-[#404164] font-sf font-[400] mt-[2px] leading-[100%]"
            >
              {{ application.apprMonthlyIncome || "Nill" }}
            </div>
          </div>
        </div>
      </div>
      <div class="mt-[51px]">
        <p
          class="text-[#000000] pb-[4px] border-b border-b-solid border-[#C7C7C7] text-[20px] leading-[28px]"
        >
          Move-In Date Information
        </p>
        <div
          class="border-solid border-[1px] px-[16px] bg-[#EFF6FF] border-[#EFF6FF] py-[8px] rounded-[8px]"
        >
          <div>
            <p class="text-[#1F3A8A] leading-[100%] m-0">
              Tenant's Intended Move-in Date
            </p>
            <p
              class="font-medium font-sf leading-[100%] text-[#1F3A8A] m-0 mt-[2px]"
            >
              {{ application.intendedMoveInDate || "Nill" }}
            </p>
          </div>
          <div class="mt-[8px]">
            <p class="text-[#1F3A8A] leading-[100%] m-0">
              Property Availabile From
            </p>
            <p
              class="font-medium font-sf leading-[100%] text-[#1F3A8A] m-0 mt-[2px]"
            >
              2024-04-20
            </p>
          </div>
        </div>
        <div class="flex gap-[8px] mx-auto w-fit mt-[51px]">
          <button
            @click="() => handleMovingDate(true)"
            class="bg-[#1A7D36] py-[6px] px-[26.5px] rounded-[5px] border-[#29C354] border-[0.99px] text-[#FFFFFF]"
          >
            Approve
          </button>
          <button
            class="bg-[#DC2625] py-[6px] px-[26.5px] rounded-[5px] border-[#F47B7B] border-[0.99px] text-[#FFFFFF]"
          >
            Decline
          </button>
          <button
            @click="showMovieInDateModal = true"
            class="bg-[#ffffff] py-[6px] px-[16.5px] rounded-[5px] border-[#000130] border-[0.99px] text-[#000130]"
          >
            Set different Date
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="currentStep == 3"
      class="bg-white mt-4 px-[22px] py-[30px] mx-auto max-w-[873px] w-full"
    >
      <div class="">
        <p
          class="text-[#000000] pb-[4px] border-b border-b-solid border-[#C7C7C7] text-[20px] leading-[28px]"
        >
          Security Deposit Paid
        </p>
        <div
          class="border-solid border-[1px] px-[16px] bg-[#EFFDF4] border-[#EFF6FF] py-[8px] rounded-[8px] flex flex-col gap-4"
        >
          <div>
            <p class="text-[#17803D] leading-[100%] m-0">Tenant Name</p>
            <p
              class="font-medium font-sf leading-[100%] text-[#529C66] m-0 mt-[2px]"
            >
              {{ application.applicantName || "Nill" }}
            </p>
          </div>
          <div class="mt-[8px]">
            <p class="text-[#17803D] leading-[100%] m-0">Unit</p>
            <p
              class="font-medium font-sf leading-[100%] text-[#529C66] m-0 mt-[2px]"
            >
              4D
            </p>
          </div>
          <div class="mt-[8px]">
            <p class="text-[#17803D] leading-[100%] m-0">Amount Paid</p>
            <p
              class="font-medium font-sf leading-[100%] text-[#529C66] m-0 mt-[2px]"
            >
              {{ application.securityDepositAmount || "Nill" }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-[49px]">
        <p
          class="text-[#000000] pb-[4px] border-b border-b-solid border-[#C7C7C7] text-[20px] leading-[28px]"
        >
          Lease Generation
        </p>
        <div>
          <p class="text-[#404164] m-0 font-[500] font-sf leading-[100%]">
            Option 1: Upload Signed Lease PDF
          </p>
          <a-upload-dragger
            class="border-dashed m-0 border-[#C7C7C7] rounded-[5px] p-[14px]"
            name="file"
            :multiple="true"
            list-type="picture-card"
          >
            <p class="ant-upload-drag-icon mx-auto w-fit pt-[28px]">
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
              class="ant-upload-text text-[#404164] font-600 font-sf leading-[100%]"
            >
              Drop Documents here or click to upload
            </p>
            <p
              class="ant-upload-hint text-[#808097] font-[12px] font-sf leading-[100%]"
            >
              Upload a pre-signed lease agreement document in PDF format.
            </p>
          </a-upload-dragger>
        </div>

        <p
          class="mx-auto text-center text-[20px] font-sf leading-[100%] text-[#818181]"
        >
          OR
        </p>

        <div>
          <p
            class="text-[#404164] m-0 font-[500] font-sf leading-[100%] flex gap-2 items-center"
          >
            Option 2: Generate Lease Agreement
            <svg
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 0.8125C4.87512 0.8125 3.7755 1.14607 2.8402 1.77102C1.90489 2.39597 1.17591 3.28423 0.745438 4.32349C0.314964 5.36274 0.202333 6.50631 0.421786 7.60958C0.64124 8.71284 1.18292 9.72626 1.97833 10.5217C2.77374 11.3171 3.78716 11.8588 4.89043 12.0782C5.99369 12.2977 7.13726 12.185 8.17651 11.7546C9.21577 11.3241 10.104 10.5951 10.729 9.6598C11.3539 8.7245 11.6875 7.62488 11.6875 6.5C11.6859 4.99207 11.0862 3.54636 10.0199 2.48009C8.95364 1.41382 7.50793 0.814092 6 0.8125ZM6 11.3125C5.04818 11.3125 4.11773 11.0303 3.32632 10.5014C2.53491 9.97264 1.91808 9.22103 1.55383 8.34166C1.18959 7.46229 1.09428 6.49466 1.27997 5.56113C1.46566 4.62759 1.92401 3.77009 2.59705 3.09705C3.27009 2.42401 4.1276 1.96566 5.06113 1.77997C5.99466 1.59428 6.9623 1.68958 7.84167 2.05383C8.72104 2.41808 9.47264 3.03491 10.0014 3.82632C10.5303 4.61773 10.8125 5.54818 10.8125 6.5C10.8111 7.77591 10.3036 8.99915 9.40135 9.90135C8.49915 10.8036 7.27591 11.3111 6 11.3125ZM6.875 9.125C6.875 9.24103 6.82891 9.35231 6.74686 9.43436C6.66481 9.51641 6.55353 9.5625 6.4375 9.5625C6.20544 9.5625 5.98288 9.47031 5.81878 9.30622C5.65469 9.14212 5.5625 8.91956 5.5625 8.6875V6.5C5.44647 6.5 5.33519 6.45391 5.25314 6.37186C5.1711 6.28981 5.125 6.17853 5.125 6.0625C5.125 5.94647 5.1711 5.83519 5.25314 5.75314C5.33519 5.67109 5.44647 5.625 5.5625 5.625C5.79457 5.625 6.01713 5.71719 6.18122 5.88128C6.34531 6.04538 6.4375 6.26794 6.4375 6.5V8.6875C6.55353 8.6875 6.66481 8.73359 6.74686 8.81564C6.82891 8.89769 6.875 9.00897 6.875 9.125ZM5.125 4.09375C5.125 3.96396 5.16349 3.83708 5.2356 3.72916C5.30771 3.62124 5.4102 3.53712 5.53012 3.48745C5.65003 3.43778 5.78198 3.42479 5.90928 3.45011C6.03658 3.47543 6.15351 3.53793 6.24529 3.62971C6.33707 3.72149 6.39957 3.83842 6.42489 3.96572C6.45021 4.09302 6.43722 4.22497 6.38755 4.34489C6.33788 4.4648 6.25376 4.56729 6.14584 4.6394C6.03793 4.71151 5.91105 4.75 5.78125 4.75C5.6072 4.75 5.44028 4.68086 5.31721 4.55779C5.19414 4.43472 5.125 4.2678 5.125 4.09375Z"
                fill="#404164"
              />
            </svg>
          </p>
          <div class="py-[8px] bg-[#F9FAFB] mt-2 px-[16px] rounded-[8px]">
            <p
              class="text-[#404164] text-base font-medium leading-[100%] font-sf"
            >
              Lease Details Preview
            </p>
            <div class="flex flex-col gap-4">
              <div>
                <p
                  class="text-[#404164] text-[14px] font-sf font-medium leading-[100%] m-0"
                >
                  Applicant
                </p>
                <p
                  class="text-[#808097] text-[14px] font-sf font-normal leading-[100%] m-0 mt-[4px]"
                >
                  {{ application.applicantName || "Nill" }}
                </p>
              </div>
              <div>
                <p
                  class="text-[#404164] text-[14px] font-sf font-medium leading-[100%] m-0"
                >
                  Property Address
                </p>
                <p
                  class="text-[#808097] text-[14px] font-sf font-normal leading-[100%] m-0 mt-[4px]"
                >
                  {{ application.currentAddress || "Nill" }}
                </p>
              </div>

              <div>
                <p
                  class="text-[#404164] text-[14px] font-sf font-medium leading-[100%] m-0"
                >
                  Rent
                </p>
                <p
                  class="text-[#808097] text-[14px] font-sf font-normal leading-[100%] m-0 mt-[4px]"
                >
                  {{ application.budgetForAccommodation.source || "Nill" }}
                </p>
              </div>

              <div>
                <p
                  class="text-[#404164] text-[14px] font-sf font-medium leading-[100%] m-0"
                >
                  Rent
                </p>
                <p
                  class="text-[#808097] text-[14px] font-sf font-normal leading-[100%] m-0 mt-[4px]"
                >
                  C$ 670
                </p>
              </div>

              <div>
                <p
                  class="text-[#404164] text-[14px] font-sf font-medium leading-[100%] m-0"
                >
                  Security Deposit
                </p>
                <p
                  class="text-[#808097] text-[14px] font-sf font-normal leading-[100%] m-0 mt-[4px]"
                >
                  C$ 670
                </p>
              </div>

              <div>
                <p
                  class="text-[#404164] text-[14px] font-sf font-medium leading-[100%] m-0"
                >
                  Move-In Date
                </p>
                <p
                  class="text-[#808097] text-[14px] font-sf font-normal leading-[100%] m-0 mt-[4px]"
                >
                  12/07/2024
                </p>
              </div>

              <div>
                <p
                  class="text-[#404164] text-[14px] font-sf font-medium leading-[100%] m-0"
                >
                  Lease Type
                </p>
                <p
                  class="text-[#808097] text-[14px] font-sf font-normal leading-[100%] m-0 mt-[4px]"
                >
                  Month to Month
                </p>
              </div>

              <div>
                <p
                  class="text-[#404164] text-[14px] font-sf font-medium leading-[100%] m-0"
                >
                  Lease Start Date
                </p>
                <p
                  class="text-[#808097] text-[14px] font-sf font-normal leading-[100%] m-0 mt-[4px]"
                >
                  12/07/2024
                </p>
              </div>
            </div>
          </div>
          <div class="mx-auto w-fit mt-[50px]">
            <button
              class="bg-[#000130] w-[229px] mx-auto h-[50px] text-center text-[#FFFFFF] rounded-[5px] mt-[16px]"
              @click="showGenerateLease"
            >
              Generate Lease
            </button>
          </div>
        </div>
      </div>
    </div>

    <a-modal
      :visible="showRequestDocumentModal"
      :footer="null"
      width="422px"
      :closable="false"
    >
      <template #title>
        <div class="flex items-center justify-between">
          <div
            class="cursor-pointer flex items-center gap-[8px] font-sf font-semibold text-txt_dark text-[20px]"
          >
            Request Additional Documents
          </div>
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
              () => {
                requestDocumentsOptions.push({
                  label: form.otherDocument,
                  value: form.otherDocument,
                });
                form.otherDocument = '';
              }
            "
          >
            <PlusOutlined class="" />
          </button>
        </div>
        <div class="mt-[1rem] flex gap-[10px] items-center">
          <button
            @click="handleRequestDocument"
            :disabled="form.requestDocuments.length === 0"
            class="bg-[#000130] disabled:bg-slate-400 disabled:cursor-not-allowed flex-1 leading-[28px] py-[8px] px-[42.5px] rounded-[4px] font-sf font-[600] text-[#FFFFFF]"
          >
            Send Request
          </button>
          <button
            @click="showRequestDocumentModal = false"
            class="bg-[#D1D5DB] flex-[0.8] leading-[28px] py-[8px] px-[42.5px] rounded-[4px] font-sf font-[600] text-[#FFFFFF]"
          >
            Cancel
          </button>
        </div>
      </template>
    </a-modal>

    <a-modal
      :visible="showMovieInDateModal"
      :footer="null"
      width="422px"
      :closable="false"
    >
      <template #title>
        <div class="flex items-center justify-between">
          <div
            class="cursor-pointer flex items-center gap-[8px] font-sf font-semibold text-txt_dark text-[20px]"
          >
            Set Move-In Date
          </div>
          <span class="modal-title"></span>
          <span></span>
        </div>
      </template>

      <div>
        <p class="m-0 text-[#404164] text-[16px] font-sf">
          Move-In Date(Tenant’s Preferred : 2024 - 04-20)
        </p>
        <a-date-picker
          v-model:value="form.moveInDate"
          class="rounded-[6px] mt-[4px] border-[#D8D8D8] border-[1px] w-full border-solid h-[48px]"
          placeholder="Add Document"
        />
      </div>
      <div class="mt-[1rem] flex gap-[10px] items-center">
        <button
          :disabled="!form.moveInDate"
          @click="() => handleMovingDate(false)"
          class="bg-[#1A7D36] disabled:cursor-not-allowed disabled:bg-slate-300 flex-1 leading-[28px] py-[8px] px-[42.5px] rounded-[4px] font-sf font-[600] text-[#FFFFFF]"
        >
          Send Date
        </button>
        <button
          @click="showMovieInDateModal = false"
          class="bg-[#D1D5DB] flex-[0.8] leading-[28px] py-[8px] px-[42.5px] rounded-[4px] font-sf font-[600] text-[#FFFFFF]"
        >
          Cancel
        </button>
      </div>
      <div class="mt-[8px]">
        <button
          @click="showMovieInDateModal = false"
          class="bg-[#ffffff] w-full py-[6px] px-[16.5px] rounded-[5px] border-[#000130] border-[0.99px] text-[#000130]"
        >
          Accept Tenant Date
        </button>
      </div>
    </a-modal>

    <a-modal
      :visible="showDeclinemoldal"
      :footer="null"
      width="422px"
      :closable="false"
    >
      <template #title>
        <div class="flex items-center justify-between">
          <div
            class="cursor-pointer flex items-center gap-[8px] font-sf font-semibold text-txt_dark text-[20px]"
          >
            Decline Application
          </div>
          <span class="modal-title"></span>
          <span></span>
        </div>
      </template>

      <div>
        <p class="m-0 text-[#404164] text-[16px] font-sf">Reason for Decline</p>
        <a-textarea
          v-model:value="value2"
          placeholder="Please provide a reason for declining this application .."
          allow-clear
        />
      </div>
      <div class="mt-[1rem] flex gap-[10px] items-center">
        <button
          class="bg-[#DC2625] flex-1 leading-[28px] py-[8px] px-[42.5px] rounded-[4px] font-sf font-[600] text-[#FFFFFF]"
        >
          Confirm Decline
        </button>
        <button
          class="bg-[#D1D5DB] flex-[0.8] leading-[28px] py-[8px] px-[42.5px] rounded-[4px] font-sf font-[600] text-[#FFFFFF]"
        >
          Cancel
        </button>
      </div>
    </a-modal>
    <a-modal
      :visible="showGenerateLeaseModal"
      :footer="null"
      width="1245px"
      :closable="false"
    >
      <div class="flex w-full">
        <div class="border-r-solid border-r-[1px] pr-[75px] w-[570px]">
          <p class="text-[#404164] font-sf text-[20px] font-[400p] py-[24px]">
            PROPERTY & TENANT DETAILS
          </p>
          <div>
            <p
              class="text-[#404164] text-[20px] font-[500] font-sf leading-[100%]"
            >
              Property Address
            </p>
            <p
              class="mt-[8px] text-[20px] font-sf leading-[100%] text-[#808097]"
            >
              12 Ontario Dr,Toronto, ON M6K 3C3, Canada
            </p>
          </div>
          <div>
            <p
              class="text-[#404164] m-0 text-[20px] font-[500] font-sf leading-[100%]"
            >
              Applicant
            </p>
            <p
              class="mt-[8px] text-[20px] font-sf leading-[100%] text-[#808097]"
            >
              Meredith Grey
            </p>
          </div>
          <div>
            <p
              class="text-[#404164] text-[20px] font-[500] m-0 font-sf leading-[100%]"
            >
              Rent
            </p>
            <p
              class="mt-[8px] text-[20px] font-sf leading-[100%] text-[#808097]"
            >
              C$ 670
            </p>
          </div>
          <div>
            <p
              class="text-[#404164] m-0 text-[20px] font-[500] font-sf leading-[100%]"
            >
              Security Deposit
            </p>
            <p
              class="mt-[8px] text-[20px] font-sf leading-[100%] text-[#808097]"
            >
              C$ 670
            </p>
          </div>
          <div>
            <p
              class="text-[#404164] m-0 text-[20px] font-[500] font-sf leading-[100%]"
            >
              Lease Type
            </p>
            <p
              class="mt-[8px] text-[20px] font-sf leading-[100%] text-[#808097]"
            >
              Month-to-Month
            </p>
          </div>
          <div>
            <p
              class="text-[#404164] m-0 text-[20px] font-[500] font-sf leading-[100%]"
            >
              Lease Start Date
            </p>
            <p
              class="mt-[8px] text-[20px] font-sf leading-[100%] text-[#808097]"
            >
              12/07/2026
            </p>
          </div>
        </div>
        <div class="pl-[24px]">
          <p class="text-[#404164] text-[20px] leading-[100%] font-sf m-0">
            LEASE DOCUMENT PREVIEW
          </p>
          <p
            class="mx-auto w-fit mt-[28px] text-[#404164] leading-[100%] font-[500] font-sf"
          >
            RESIDENTIAL LEASE AGREEMENT
          </p>
          <div class="font-sf">
            <p class="text-[#404164] font-sf leading-[100%] font-[400] mb-4">
              This Lease Agreement is entered into on August 12, 2025,
              between 10ANTS Property Management (Landlord) and John
              Doe (Tenant).
            </p>
            <div class="mb-4">
              <p class="text-[#404164] font-sf leading-[100%] font-[500] m-0">
                1. PROPERTY DESCRIPTION
              </p>
              <p class="text-[#404164] font-sf leading-[100%] font-[400] m-0">
                The Landlord hereby leases to the Tenant the residential
                property located at Block B, Apartment 4, subject to the terms
                and conditions set forth in this agreement.
              </p>
            </div>

            <div class="mb-4">
              <p class="text-[#404164] font-sf leading-[100%] font-[500] m-0">
                2. LEASE TERM
              </p>
              <p class="text-[#404164] font-sf leading-[100%] font-[400] m-0">
                The lease term shall commence on August 12, 2025 and shall
                continue for a period of twelve (12) months, ending on August
                12, 2026.
              </p>
            </div>

            <div class="mb-4">
              <p class="text-[#404164] font-sf leading-[100%] font-[500] m-0">
                3. RENT AND PAYMENT TERMS
              </p>
              <p class="text-[#404164] font-sf leading-[100%] font-[400] m-0">
                The annual rent for the premises is ₦1,500,000 (One Million Five
                Hundred Thousand Naira), payable in monthly installments
                of ₦125,000. Rent is due on the first day of each month and
                shall be considered late if not received within five (5) days of
                the due date.
              </p>
            </div>

            <div class="mb-4">
              <p class="text-[#404164] font-sf leading-[100%] font-[500] m-0">
                3. RENT AND PAYMENT TERMS
              </p>
              <p class="text-[#404164] font-sf leading-[100%] font-[400] m-0">
                The annual rent for the premises is ₦1,500,000 (One Million Five
                Hundred Thousand Naira), payable in monthly installments
                of ₦125,000. Rent is due on the first day of each month and
                shall be considered late if not received within five (5) days of
                the due date.
              </p>
            </div>

            <div class="mb-4">
              <p class="text-[#404164] font-sf leading-[100%] font-[500] m-0">
                4. SECURITY DEPOSIT
              </p>
              <p class="text-[#404164] font-sf leading-[100%] font-[400] m-0">
                Tenant shall pay a security deposit equivalent to two (2)
                months' rent, totalling C$50,000, to be held by the Landlord as
                security for any damages or unpaid rent.
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
                This lease may be terminated by either party with thirty (30)
                days written notice, subject to the terms outlined in this
                agreement.
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
                  Tenant Signature (John Doe)
                </p>
              </div>
            </div>
            <div class="ml-auto mt-[28px] w-fit flex gap-[40px]">
              <button
                class="px-[43px] py-[12px] font-sf font-[600] text-[14px] text-[#000130] rounded-[4px] border-[1px] border-[#000130]"
              >
                Download Pdf
              </button>
              <button
                class="px-[43px] py-[12px] font-sf font-[600] text-[14px] rounded-[4px] text-white bg-[#000130]"
                @click="HandleGenerateLease"
              >
                Send Lease
              </button>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { useRouter, useRoute, routerKey } from "vue-router";
import { openDB } from "idb";
import { ApproveTenant } from "@/api/tenancy";
import { useToast } from "vue-toast-notification";
import { useUserStore } from "@/store";
import {
  ConfirmMoveInDate,
  RequestAdditionalDocuments,
  GenerateLease,
} from "@/api/tenancy";

export default {
  name: "Applications-Details",
  data() {
    return {
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
      store: useUserStore(),
      activeKey: "Personal Information",
      router: useRouter(),
      approving: false,
      declining: false,
      showRequestDocumentModal: false,
      showMovieInDateModal: false,
      stages: [
        "Initial Review",
        "Document Approval",
        "Set Move-In Date",
        "Lease Generation",
      ],
      form: {
        requestDocuments: [],
        otherDocument: "",
        moveInDate: "",
      },
      route: useRoute(),
      showmoldal: false,
      showDeclinemoldal: false,
      showGenerateLeaseModal: false,
      application: {},
      declineReason: "",
      toast: useToast(),
      currentStep: 0,
      AccommodationApplicationStatus: {
        0: "Failed", // Application submission failed or system error occurred
        1: "AwaitingReview", // Application has been submitted and is under review by landlord
        2: "AwaitingAdditionalDocuments", // Landlord has requested additional documents from tenant
        3: "MoveInDateLandlordConfirmationPending", // Application approved, awaiting landlord to confirm move-in date
        4: "MoveInDateTenantConfirmationPending", // Landlord set different date, awaiting tenant confirmation
        5: "AwaitingPayment", // Move-in date confirmed, awaiting security deposit payment
        6: "AwaitingLeaseGeneration", // Payment received, awaiting lease document generation
        7: "Completed", // Lease generated and application process completed
        8: "Declined", // Application has been declined by landlord or tenant
        9: "Cancelled", // Application has been cancelled by tenant

        // Legacy statuses (backward compatibility)
        // 1: "Initial Review", // Use ApplicationReview instead
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
    };
  },
  methods: {
    showGenerateLease() {
      this.showGenerateLeaseModal = true;
    },
    async HandleGenerateLease() {
      const response = await GenerateLease(this.application.applicationId);
      try {
        if (response.responseCode == "00") {
          this.showGenerateLeaseModal = false;
          this.toast.success("Lease Generated Successfully");
          this.showGenerateLeaseModal = false;
          this.currentStep = 4;
        } else {
          this.toast.error("Coudln't generate lease");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getApplications() {
      const id = this.route.params.id;
      const db = await openDB("application-db", 1);
      const data = await db.get("applications", Number(id));
      this.application = data;
      console.log(data);
    },
    async approveData() {
      this.approving = true;
      const payload = {
        applicationId: this.application.applicationId,
        approve: true,
        note: "",
        approvedBy:
          this.store.userProfile.referenceID == "NN1"
            ? 1
            : this.store.userProfile.referenceID,
      };
      ApproveTenant({ ...payload }).then((response) => {
        // this.currentStep = 2;
        if (response.responseCode == "00") {
          this.currentStep = 2;
          this.showmoldal = true;
          this.approving = false;
        } else {
          this.toast.success("Coudln't update");
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
    async handleMovingDate(original) {
      let payload = {
        applicationId: this.application.applicationId,
        isOriginalDateApproved: original ? true : false,
        confirmedByUserId: "landlord",
        comments: "",
        moveInDate: this.application.intendedMoveInDate,
      };
      if (original == false) {
        payload = { ...payload, moveInDate: this.form.moveInDate };
      }
      ConfirmMoveInDate({ ...payload }).then((response) => {
        // this.currentStep = 3;

        if (response.responseCode == "00") {
          this.currentStep = 3;
          this.showMovieInDateModal = false;
          this.toast.success("Move-in date confirmed");
        } else {
          this.toast.error("Coudln't update");
        }
      });
    },
    async handleRequestDocument() {
      const payload = {
        ApplicationId: this.application.applicationId,
        RequiredDocumentsJson: this.form.requestDocuments.join(","),
        MessageToTenant: "Please add the following documents",
        LandlordId: "landlord",
      };
      RequestAdditionalDocuments({ ...payload }).then((response) => {
        if (response.responseCode == "00") {
          this.showRequestDocumentModal = false;
          this.toast.success("Request sent successfully");
        } else {
          this.toast.error("Coudln't send request");
        }
      });
    },
    async declineData() {
      this.declining = true;
      const payload = {
        applicationId: this.application.applicationId,
        approve: false,
        declineReason: this.declineReason,
      };

      ApproveTenant({ ...payload }).then((response) => {
        if (response.responseCode == "00") {
          console.log(response);
          this.declining = false;
          this.showDeclinemoldal = false;
        } else {
          this.declining = false;
          this.showDeclinemoldal = false;
        }
        // this.router.push("/applications");
      });
    },
  },
  created() {
    this.getApplications();
  },
};
</script>

<style scoped>
:deep(.ant-checkbox-inner) {
  width: 16px;
  height: 16px;
  border-radius: 2px;
  border: 1px solid #213595;
}

/* Optional: also remove default background if you don’t want it */
</style>
