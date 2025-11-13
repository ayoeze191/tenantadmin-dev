<template>
  <span
    class="px-3 py-1 rounded-[8px] text-[12px] font-medium"
    :class="{
      'bg-[#C38201] text-[#FFFFFF]': serviceStatus === 'Pending',
      'bg-[#31A057] text-[#FFFFFF]': serviceStatus === 'Completed',
      'bg-[#E5F6FF] text-[#FFFFFF]': serviceStatus === 'Ongoing',
      'bg-[#5f16a4] text-[#FFFFFF]': serviceStatus === 'Requested',
      'bg-[#9f0f0f] text-[#FFFFFF]': serviceStatus === 'Terminate',
    }"
  >
    {{ serviceStatus }}
  </span>
</template>

<script setup>
const props = defineProps({
  serviceStatus: {
    type: String,
    required: true,
  },
});
</script>
