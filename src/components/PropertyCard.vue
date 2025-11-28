<template>
  <div class="border-[0.75px] border-[#36363626] border-solid rounded-[16px]">
    <div class="w-full h-[153px]">
      <img
        :src="imageUrl"
        class="w-full h-full object-cover rounded-t-[16px]"
      />
    </div>

    <div class="p-2.5">
      <p class="m-0 p-0 text-[14px] font-inter leading-[20px] font-[600]">
        {{ name }}
      </p>

      <div class="flex items-center gap-2 mt-1">
        <slot name="location-icon">
          <!-- default location icon -->
          <svg
            width="13"
            height="14"
            viewBox="0 0 13 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.85467 9.85447L7.026 12.6831C6.77599 12.9329 6.43706 13.0732 6.08367 13.0732C5.73028 13.0732 5.39135 12.9329 5.14134 12.6831L2.312 9.85447C1.56615 9.10858 1.05823 8.15827 0.852461 7.12371C0.646695 6.08916 0.752329 5.01681 1.156 4.04229C1.55968 3.06777 2.24327 2.23483 3.12032 1.64881C3.99738 1.06279 5.02851 0.75 6.08334 0.75C7.13816 0.75 8.16929 1.06279 9.04635 1.64881C9.92341 2.23483 10.607 3.06777 11.0107 4.04229C11.4143 5.01681 11.52 6.08916 11.3142 7.12371C11.1084 8.15827 10.6005 9.10858 9.85467 9.85447Z"
              stroke="#404164"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </slot>

        <p class="m-0 p-0 text-[12px] font-inter leading-[17px] font-medium">
          {{ address }}
        </p>
      </div>

      <div class="flex items-center gap-2 mt-1">
        <slot name="units-icon">
          <!-- default units icon -->
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.66667 14V9.33333L5.33333 6L2 9.33333V14H5.33333M8.66667 14H5.33333M8.66667 14H14V2.66667C14 2.48986 13.9298 2.32029 13.8047 2.19526C13.6797 2.07024 13.5101 2 13.3333 2H6.66667C6.48986 2 6.32029 2.07024 6.19526 2.19526C6.07024 2.32029 6 2.48986 6 2.66667V6.66667M5.33333 14V11.3333M8.66667 4.66667V4.67333M11.3333 4.66667V4.67333M11.3333 7.33333V7.34M11.3333 10V10.0067"
              stroke="#404164"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </slot>

        <p class="m-0 p-0 text-[12px] font-inter leading-[17px] font-medium">
          {{ totalUnits }} Units
        </p>
      </div>

      <button
        class="py-[6px] border-solid rounded-[6px] border-[0.75px] border-[#36363633] mt-[10px] text-center w-full justify-center"
        @click="$emit('view')"
      >
        View Full Details
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  imageUrl: String,
  name: String,
  address: String,
  totalUnits: Number,
});

defineEmits(["view"]);
</script>
