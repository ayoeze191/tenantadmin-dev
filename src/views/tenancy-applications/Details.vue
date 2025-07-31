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
    };
  },
};
</script>
