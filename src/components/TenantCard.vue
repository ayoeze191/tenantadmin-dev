<template>
  <div
    class="mt-4 w-[275px] bg-[#F6F6F6] flex flex-col h-fit gap-4 rounded-[16px] border-solid border-[0.75px]"
  >
    <div
      class="border-[#F6F6F6] bg-[#FFFFFF] py-[10px] gap-2.5 flex items-center rounded-[16px] border-solid border-b-[0.75px] px-[14px]"
    >
      <div><img src="/src/assets/TenantImage.svg" /></div>
      <div class="h-full flex-1">
        <p class="m-0 p-0 text-[#000000] font-inter font-medium leading-[100%]">
          {{ lease?.tenant.firstname + " " + lease?.tenant.lastname || "nill" }}
        </p>
        <p
          class="m-0 p-0 text-[#464646] text-[10px] font-inter font-medium leading-[100%] mt-[4px]"
        >
          {{ lease?.address || "No address provided" }}
        </p>
      </div>
      <button
        class="bg-[#31A057] text-[#FFFFFF] py-[4px] px-2 rounded-[4px] text-[12px]"
      >
        {{ lease?.requestTypeName }}
      </button>
    </div>

    <div class="flex justify-between px-[10px] items-center pb-4">
      <div class="text-[#00000099] font-inter text-[12px] font-medium">
        View Requests
      </div>
      <button
        class="text-[#000000] font-inter font-medium bg-[#FFFFFF] border-[0.75px] border-solid rounded-[6px] px-[10px] py-[6px]"
        @click="$emit('view', lease)"
      >
        View
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TenantCard",
  emits: ["view"],
  props: {
    lease: {
      type: Object,
      required: true,
    },
  },
};
</script>
