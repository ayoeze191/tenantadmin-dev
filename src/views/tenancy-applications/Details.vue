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
    <div class="bg-white mt-4 px-[22px] py-[30px]">
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
              class="text-[#404164] leading-[100%] text-[26px] font-bold font-sf"
            >
              {{ application.applicantName || "Nill" }}
            </h3>
            <p class="text-[#404164] font-sf text-[18px] leading-[100%]">
              {{ application.email || "Nill" }}
            </p>
            <p class="text-[18px] font-sf text-[#404164] leading-[100%]">
              24 Years Old
            </p>
            <p
              class="underline text-[#404164] mt-[8px] text-[14px] cursor-pointer"
            >
              View Rental History
            </p>
          </div>
        </div>
        <div class="flex gap-[8px] ml-auto">
          <a-button
            :loading="approving"
            @click="approveData"
            class="border-[#29C354] h-fit bg-[#EDFFF7] text-[#29C354] border-[0.99px] border-solid rounded-[5px] px-[12px] py-[6px]"
          >
            Approve
          </a-button>
          <a-button
            :loading="declining"
            @click="declineData"
            class="border-[#F47B7B] h-fit bg-[#FFEDED] text-[#F47B7B] border-[0.99px] border-solid rounded-[5px] px-[12px] py-[6px]"
          >
            Decline
          </a-button>
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
            Nationality<span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
            >
              {{ application.nationality || "Nill" }}
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
            v-model:value="value2"
            class="py-[17px] px-[28px] border-[#C7C7C7] border-[1px]"
            placeholder="Enter Reason for decline"
            :auto-size="{ minRows: 10, maxRows: 15 }"
          />
        </a-form-item>
        <div class="flex items-center justify-center mt-[64px]">
          <button
            class="bg-[#000130] rounded-[4px] w-[229px] h-[51px] text-white mx-auto"
          >
            Submit
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
                  The annual rent for the premises is ₦1,500,000 (One Million
                  Five Hundred Thousand Naira), payable in monthly installments
                  of ₦125,000. Rent is due on the first day of each month and
                  shall be considered late if not received within five (5) days
                  of the due date.
                </p>
              </div>

              <div class="mb-4">
                <p class="text-[#404164] font-sf leading-[100%] font-[500] m-0">
                  3. RENT AND PAYMENT TERMS
                </p>
                <p class="text-[#404164] font-sf leading-[100%] font-[400] m-0">
                  The annual rent for the premises is ₦1,500,000 (One Million
                  Five Hundred Thousand Naira), payable in monthly installments
                  of ₦125,000. Rent is due on the first day of each month and
                  shall be considered late if not received within five (5) days
                  of the due date.
                </p>
              </div>

              <div class="mb-4">
                <p class="text-[#404164] font-sf leading-[100%] font-[500] m-0">
                  4. SECURITY DEPOSIT
                </p>
                <p class="text-[#404164] font-sf leading-[100%] font-[400] m-0">
                  Tenant shall pay a security deposit equivalent to two (2)
                  months' rent, totalling C$50,000, to be held by the Landlord
                  as security for any damages or unpaid rent.
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
                IN WITNESS WHEREOF, the parties have executed this lease
                agreement on the date first written above.
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
                >
                  Send Lease
                </button>
              </div>
            </div>
          </div>
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
        <p class="text-[#404164] text-[20px] font-medium font-sf">
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
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute, routerKey } from "vue-router";
import { openDB } from "idb";
import { ApproveTenant } from "@/api/tenancy";

export default {
  name: "Applications-Details",
  data() {
    return {
      router: useRouter(),
      approving: false,
      declining: false,
      route: useRoute(),
      showmoldal: false,
      showDeclinemoldal: false,
      showGenerateLeaseModal: false,
      application: {},
    };
  },
  methods: {
    HandleGenerateLease() {
      this.showmoldal = false;
      this.showGenerateLeaseModal = true;
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
      };
      ApproveTenant({ ...payload }).then((response) => {
        this.showmoldal = true;
        this.approving = false;
        console.log(response);
      });
    },
    async declineData() {
      this.declining = true;
      const payload = {
        applicationId: this.application.applicationId,
        approve: false,
      };
      ApproveTenant({ ...payload }).then((response) => {
        console.log(response);
        this.showDeclinemoldal = true;
        this.declining = false;
        // this.router.push("/applications");
      });
    },
  },
  created() {
    this.getApplications();
  },
};
</script>
