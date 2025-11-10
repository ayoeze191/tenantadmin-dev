<template>
  <div
    class="mt-4 w-fit bg-[#F6F6F6] flex flex-col gap-4 rounded-[16px] border-solid border-[0.75px]"
  >
    <div
      class="border-[#F6F6F6] bg-[#FFFFFF] py-[10px] gap-2.5 flex items-center rounded-[16px] border-solid border-b-[0.75px] px-[14px]"
    >
      <div><img src="/src/assets/TenantImage.svg" /></div>
      <div class="h-full">
        <p class="m-0 p-0 text-[#000000] font-inter font-medium leading-[100%]">
          {{ name }}
        </p>
        <p
          class="m-0 p-0 text-[#464646] text-[10px] font-inter font-medium leading-[100%] mt-[4px]"
        >
          {{ address || "Thristlebrook Lane, Mistwood, Ontario, K8N 3P5" }}
        </p>
      </div>
      <button class="bg-[#31A057] text-[#FFFFFF] py-[4px] px-2 rounded-[4px]">
        Renewal
      </button>
    </div>

    <div class="flex justify-between px-[10px] items-center pb-4">
      <div class="text-[#00000099] font-inter text-[12px] font-medium">
        View Requests
      </div>
      <div
        class="text-[#000000] font-inter font-medium bg-[#FFFFFF] border-[0.75px] border-solid rounded-[6px] px-[10px] py-[6px]"
      >
        View
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  dataSource: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  address: {
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
