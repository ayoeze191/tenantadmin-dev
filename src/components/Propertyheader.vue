<template>
  <div>
    <h2 class="text-xl leading-[100%] font-medium font-sf text-gray-900 mb-2">
      {{ console.log(property) }}
      {{ property.name || "nil" }}
    </h2>

    <div class="flex items-center gap-2 text-[#808097] font-sf">
      <EnvironmentOutlined class="text-[#808097]" />
      <span class="text-sm leading-[16px] font-normal">
        {{ property.address | "nil" }}
      </span>
    </div>

    <div class="flex items-center gap-2 text-[#808097] font-sf mt-2">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.66667 14V9.33333L5.33333 6L2 9.33333V14H5.33333M8.66667 14H5.33333M8.66667 14H14V2.66667C14 2.48986 13.9298 2.32029 13.8047 2.19526C13.6797 2.07024 13.5101 2 13.3333 2H6.66667C6.48986 2 6.32029 2.07024 6.19526 2.19526C6.07024 2.32029 6 2.48986 6 2.66667V6.66667M5.33333 14V11.3333M8.66667 4.66667V4.67333M11.3333 4.66667V4.67333M11.3333 7.33333V7.34M11.3333 10V10.0067"
          stroke="#808097"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span class="text-sm leading-[16px] font-normal">
        {{ units.length }} Units
      </span>
    </div>
  </div>
</template>

<script>
import { EnvironmentOutlined } from "@ant-design/icons-vue";

export default {
  name: "PropertyHeader",
  components: {
    EnvironmentOutlined,
  },
  props: {
    property: {
      type: Object,
      required: true,
      default: () => ({
        name: "",
        address: "",
        units: 0,
      }),
    },
    units: {
      type: Array,
      required: true,
    },
  },
};
</script>
