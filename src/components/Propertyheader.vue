<template>
  <div>
    <h2 class="text-xl leading-[100%] font-medium font-sf text-gray-900 mb-2">
      {{ property.name || "nil" }}
    </h2>

    <div class="flex items-center gap-2 text-[#808097] font-sf">
      <EnvironmentOutlined class="text-[#808097]" />
      <span class="text-sm leading-[16px] font-normal">
        {{ property.address }}
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
