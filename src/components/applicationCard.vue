<template>
  <div
    class="bg-[#F6F6F6] w-fit rounded-[16px] border-[0.75px] border-solid border-[#36363633]"
  >
    <div
      class="bg-[#FFFFFF] py-4 px-[14px] rounded-[16px] border-b-[0.75px] border-solid border-[#36363633]"
    >
      <div class="mx-auto flex flex-col items-center">
        <p class="p-0 m-0 mx-auto w-fit text-[#000000]">{{ applicantName }}</p>
        <p class="p-0 m-0 text-[#000000]">{{ gender }}, 24</p>
      </div>
      <div
        class="p-[10px] rounded-lg mt-4 bg-[#F6F6F6] flex flex-col gap-2.5 border-none"
      >
        <p
          class="m-0 p-0 flex justify-between text-[12px] text-[#00000099] font-inter font-medium leading-[20px]"
        >
          Email: <span class="text-[#000000]">{{ email }}</span>
        </p>
        <p
          class="m-0 p-0 flex justify-between text-[12px] text-[#00000099] font-inter font-medium leading-[20px]"
        >
          Phone No: <span class="text-[#000000]">{{ phoneNo }}</span>
        </p>
        <p
          class="m-0 p-0 flex justify-between text-[12px] text-[#00000099] font-inter font-medium leading-[20px]"
        >
          Nationality:
          <span class="text-[#000000]">{{ nationality }}</span>
        </p>
      </div>
    </div>
    <div class="px-2.5 pb-[10px]">
      <button
        class="py-[6px] w-full text-[12px] rounded-[6px] bg-[#FFFFFF] mt-2 text-center text-[#000000] font-inter font-medium leading-[100%]"
      >
        View Full Details
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  applicantName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  phoneNo: {
    type: String,
    required: false,
  },
  nationality: {
    type: String,
    required: false,
  },
});

defineEmits(["edit", "verify"]);

// 👇 Prepend S/N column automatically
const computedColumns = computed(() => {
  return [
    {
      title: "S/N",
      dataIndex: "serial",
      align: "center",
      width: 70,
    },
    ...props.columns,
  ];
});
</script>
