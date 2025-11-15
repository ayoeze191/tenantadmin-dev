<template>
  <div class="flex justify-between p-2.5 w-full items-center">
    <div class="flex gap-2.5 items-center">
      <div
        class="border-solid border-[0.75px] border-[#36363633] rounded-[8px] p-2.5 w-fit"
      >
        <serviceRequestIcon v-if="title == 'Requests'" />
        <applicationIcon v-if="title == 'All Applications'" />
        <userIcon v-else />
      </div>
      <div>
        <p class="m-0 p-0 text-[#000000] font-medium text-[14px]">
          {{ title }}
        </p>
        <p
          class="m-0 p-0 text-[#25262899] font-medium text-[12px] leading-[100%]"
        >
          Total Number of {{ title }}: <span>{{ totalItemCount }}</span>
        </p>
      </div>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup>
import serviceRequestIcon from "./icons/serviceRequestIcon.vue";
import userIcon from "./icons/userIcon.vue";
import applicationIcon from "./icons/applicationIcon.vue";
const props = defineProps({
  totalItemCount: {
    type: Array,
    required: true,
  },
  title: {
    type: Array,
    required: true,
  },
});
</script>
