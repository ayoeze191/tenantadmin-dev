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
        <div
          class="flex gap-[8px] ml-auto"
          v-if="application.statusName == 'Pending'"
        >
          <a-button
            :loading="approving"
            class="border-[#29C354] h-fit bg-[#EDFFF7] text-[#29C354] border-[0.99px] border-solid rounded-[5px] w-[101px] px-[12px] py-[6px]"
          >
            Approve
          </a-button>
          <a-button
            @click="showDeclinemoldal = true"
            class="border-[#F47B7B] h-fit bg-[#FFEDED] text-[#F47B7B] border-[0.99px] border-solid rounded-[5px] w-[101px] px-[12px] py-[6px]"
          >
            Decline
          </a-button>
        </div>

        <div
          v-else-if="application.statusName == 'Completed'"
          class="text-green-500 ml-auto text-[20px] flex items-center gap-2"
        >
          Approved <CheckCircleOutlined />
        </div>

        <div
          v-else-if="application.statusName == 'Declined'"
          class="text-red-500 ml-auto text-[20px] flex items-center gap-2"
        >
          Declined <CloseCircleOutlined />
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
            @click="approveData()"
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
            :disabled="true"
            @click="showRequestDocumentModal = true"
            class="bg-[#ffffff] py-[6px] px-[16.5px] rounded-[5px] border-[#000130] border-[0.99px] text-[#000130]"
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
        this.currentStep = 2;
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
        this.currentStep = 3;

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
