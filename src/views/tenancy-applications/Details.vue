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
              Claudia Martins
            </h3>
            <p class="text-[#404164] font-sf text-[18px] leading-[100%]">
              claudiamartins@gmail.com
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
          <button
            @click="showmoldal = true"
            class="border-[#29C354] h-fit bg-[#EDFFF7] text-[#29C354] border-[0.99px] border-solid rounded-[5px] px-[12px] py-[6px]"
          >
            Approve
          </button>
          <button
            class="border-[#F47B7B] h-fit bg-[#FFEDED] text-[#F47B7B] border-[0.99px] border-solid rounded-[5px] px-[12px] py-[6px]"
          >
            Decline
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
              123, Lavington Road, New Brunswick
            </span>
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Nationality<span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >Nigerian</span
            >
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
            <span class="modal-title">Steph Orkuma</span>
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
                @click="showmoldal = false"
                class="text-[18px]"
              />
            </div>
            <span class="modal-title">Steph Orkuma</span>
            <span></span>
          </div>
        </template>
        <div class="flex items-center flex-col mx-auto">
          <p class="text-[#404164] text-[20px] font-sf text-center mt-[57px]">
            Kindly enter your reason for declining this application.
          </p>
          <p
            class="text-[#808097] font-medium font-sf text-base leading-[28px]"
          >
            Applicant will be notified of this reason
          </p>
        </div>
        <p
          class="text-[#808097] text-[18px] font-sf font-medium text-center mt-[24px]"
        >
          Generate a lease now to be signed by applicant
        </p>
        <div class="flex items-center justify-center mt-[64px]">
          <button
            class="bg-[#000130] rounded-[4px] w-[229px] h-[51px] text-white mx-auto"
          >
            Generate Lease
          </button>
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
              >+1(250) 555-0199</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Current Landlord’s Name
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
            >
              Product Owner
            </span>
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Current Landlord’s Name
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >Nigerian</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Approximate Monthly Income<span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >C$4560/month</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Length of Time With Employeer

            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >Applicant</span
            >
          </p>

          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Work Supervisor's Phone Number

            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >Applicant</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Work Supervisor's Email

            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >Applicant</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Budget For Accomodation
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >Applicant</span
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
        <div class="grid grid-cols-4 gap-y-[32px]">
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Name of Employer<span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >+1(250) 555-0199</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Current Landlord’s Name
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
            >
              Product Owner
            </span>
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Current Landlord’s Name
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >Nigerian</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Approximate Monthly Income<span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >C$4560/month</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Length of Time With Employeer

            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >Applicant</span
            >
          </p>

          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Work Supervisor's Phone Number

            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >Applicant</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Work Supervisor's Email

            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >Applicant</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Budget For Accomodation
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >Applicant</span
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
            Name of Employer<span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >+1(250) 555-0199</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Current Landlord’s Name
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
            >
              Product Owner
            </span>
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Current Landlord’s Name
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >Nigerian</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Approximate Monthly Income<span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >C$4560/month</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Length of Time With Employeer

            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >Applicant</span
            >
          </p>

          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Work Supervisor's Phone Number

            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >Applicant</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Work Supervisor's Email

            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >Applicant</span
            >
          </p>
          <p
            class="flex flex-col text-[#808097] leading-[100%] font-sf font-normal"
          >
            Budget For Accomodation
            <span
              class="text-[#404164] font-medium text-[18px] font-sf mt-[6px] leading-[100%]"
              >Applicant</span
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
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "Applications-Details",
  data() {
    return {
      router: useRouter(),
      showmoldal: false,
      showDeclinemoldal: false,
    };
  },
};
</script>
