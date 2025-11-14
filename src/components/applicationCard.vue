<template>
  <div
    class="bg-[#F6F6F6] w-full rounded-[16px] border-[0.75px] border-solid border-[#36363633]"
  >
    <div
      class="bg-[#FFFFFF] py-4 px-[14px] rounded-[16px] border-b-[0.75px] border-solid border-[#36363633]"
    >
      <div class="mx-auto flex flex-col items-center">
        <p class="p-0 m-0 mx-auto w-fit text-[#000000]">
          {{ app.applicantName }}
        </p>
        <p class="p-0 m-0 text-[#000000]">{{ app.gender || "Male" }}, 24</p>
      </div>
      <div
        class="p-[10px] rounded-lg mt-4 bg-[#F6F6F6] flex flex-col gap-2.5 border-none"
      >
        <p
          class="m-0 p-0 flex justify-between text-[12px] text-[#00000099] font-inter font-medium leading-[20px]"
        >
          Email:
          <span class="text-[#000000]">{{ app.email || "@gmail.com" }}</span>
        </p>
        <p
          class="m-0 p-0 flex justify-between text-[12px] text-[#00000099] font-inter font-medium leading-[20px]"
        >
          Phone No:
          <span class="text-[#000000]">{{
            app.phoneNo || "-09037183645"
          }}</span>
        </p>
        <p
          class="m-0 p-0 flex justify-between text-[12px] text-[#00000099] font-inter font-medium leading-[20px]"
        >
          Nationality:
          <span class="text-[#000000]">{{ app.nationality || "Nigeria" }}</span>
        </p>
      </div>
    </div>
    <div class="px-2.5 pb-[10px]">
      <button
        @click="$emit('showModal')"
        class="py-[6px] w-full text-[12px] rounded-[6px] bg-[#FFFFFF] mt-2 text-center text-[#000000] font-inter font-medium leading-[100%]"
      >
        View Full Details
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  app: {
    type: Object,
    required: false,
  },
});
defineEmits(["showModal"]);
// 👇 Prepend S/N column automatically
</script>
