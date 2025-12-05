<template>
  <div
    class="bg-[#F6F6F6] w-full rounded-[16px] border-[0.75px] border-solid border-[#36363633]"
  >
    <div
      class="bg-[#FFFFFF] py-4 px-[14px] rounded-[16px] border-b-[0.75px] border-solid border-[#36363633]"
    >
      <div class="mx-auto flex flex-col items-center">
        <div class="mb-[10px]">
          {{ console.log(app) }}
          <a-avatar v-if="app.img == '' || app.img == null">
            <UserOutlined />
          </a-avatar>
          <img v-else :src="app.img" />
        </div>
        <p
          class="p-0 m-0 mx-auto w-fit font-[500] text-[14px] font-inter leading-[100%] text-[#000000]"
        >
          {{ app.applicantName }}
        </p>
        <p class="p-0 m-0 text-[12px] text-[#464646]">
          {{ app.gender || "Male" }}
        </p>
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
        <!-- <p
          class="m-0 p-0 flex justify-between text-[12px] text-[#00000099] font-inter font-medium leading-[20px]"
        >
          Nationality:
          <span class="text-[#000000]">{{ app.nationality || "Nigeria" }}</span>
        </p> -->
      </div>
    </div>
    <div class="px-2.5 pb-[10px]">
      <Button
        label="View Full Details"
        customClass="bg-[#FFFFFF] border-[#36363633] border-[0.75px] w-full text-[12px] text-[#000] mt-2"
        @click="$emit('showModal')"
      ></Button>
    </div>
  </div>
</template>

<script setup>
import Button from "./Button/UniversalButton.vue";
const props = defineProps({
  components: {
    Button,
  },
  app: {
    type: Object,
    required: false,
  },
});
defineEmits(["showModal"]);
// 👇 Prepend S/N column automatically
</script>
