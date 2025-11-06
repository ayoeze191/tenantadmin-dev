<template>
  <div class="flex justify-between w-full items-center">
    <div class="flex gap-2.5 p-2.5 items-center">
      <div
        class="border-solid border-[0.75px] border-[#36363633] rounded-[8px] p-2.5 w-fit"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5013 8.33073C9.34225 8.33073 10.8346 6.83835 10.8346 4.9974C10.8346 3.15645 9.34225 1.66406 7.5013 1.66406C5.66035 1.66406 4.16797 3.15645 4.16797 4.9974C4.16797 6.83835 5.66035 8.33073 7.5013 8.33073Z"
            stroke="#1C274C"
            stroke-width="1.5"
          />
          <path
            d="M12.5 7.5C13.8808 7.5 15 6.38071 15 5C15 3.61929 13.8808 2.5 12.5 2.5"
            stroke="#1C274C"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M7.5013 17.5026C10.723 17.5026 13.3346 16.0102 13.3346 14.1693C13.3346 12.3283 10.723 10.8359 7.5013 10.8359C4.27964 10.8359 1.66797 12.3283 1.66797 14.1693C1.66797 16.0102 4.27964 17.5026 7.5013 17.5026Z"
            stroke="#1C274C"
            stroke-width="1.5"
          />
          <path
            d="M15 11.6641C16.4618 11.9846 17.5 12.7965 17.5 13.7474C17.5 14.6051 16.6552 15.3498 15.4167 15.7227"
            stroke="#1C274C"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
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
