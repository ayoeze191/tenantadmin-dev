<template>
  <div
    class="border-b-[#36363533] border-b-[0.75px] flex items-center justify-between px-3 py-2.5 border-solid"
  >
    <div class="flex">
      <div class="bg-[#40B869] rounded-[10px] mr-[10px] px-[10px] py-[8px]">
        <Bell />
      </div>
      <div class="flex flex-col">
        <span
          class="text-[#1E1E1E] text-[14px] font-inter leading-[21px] font-semibold"
          >William Dikerson — Security Deposit has just been Paid —
          CA$50.00</span
        >
        <span class="text-[#1E1E1E99] text-[12px] font-inter leading-[17px]"
          >Sept 9, 2025</span
        >
      </div>
    </div>
    <div>
      <RightOutlined class="text-[#000000B2]" color="red" />
    </div>
  </div>
</template>

<script setup>
import Dollar from "./icons/Dollar.vue";
import Bell from "./icons/Bell.vue";
</script>
