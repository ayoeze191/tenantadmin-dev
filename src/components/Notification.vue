<template>
  <div
    class="border-b-[#36363533] border-b-[0.75px] flex items-center justify-between px-3 py-2.5 border-solid"
  >
    <div class="flex">
      {{ console.log(props.value.type) }}
      <div class="bg-[#40B869] rounded-[10px] mr-[10px] px-[10px] py-[8px]">
        <Bell v-if="props.value.type == 'Info'" />
        <Dollar v-else />
      </div>
      <div class="flex flex-col">
        <span
          class="text-[#1E1E1E] text-[14px] font-inter leading-[21px] font-semibold"
          >{{ value.subject }}
        </span>
        <span class="text-[#1E1E1E99] text-[12px] font-inter leading-[17px]">{{
          formatDate(value.sendDate)
        }}</span>
      </div>
    </div>
    <div>
      <RightOutlined
        class="text-[#000000B2]"
        color="red"
        @click="$emit('click')"
      />
    </div>
  </div>
</template>

<script setup>
import Bell from "./icons/Bell.vue";
import Dollar from "./icons/Dollar.vue";
import dayjs from "dayjs";
const formatDate = (date) => {
  return dayjs(date).format("DD MMM,YYYY");
};
const props = defineProps({
  value: {
    type: Object,
    required: true,
  },
});
defineEmits(["click"]);
</script>
