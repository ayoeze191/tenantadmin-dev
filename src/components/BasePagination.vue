<template>
  <div class="flex items-center gap-3 justify-end p-2.5">
    <!-- Page info -->
    <span
      class="text-[#000000] font-inter font-semibold text-[12px] leading-[20px]"
    >
      {{ currentPage }} of {{ totalPages }} pages
    </span>

    <!-- Previous button -->
    <button
      class="px-3 py-2 border rounded-lg text-[#1E1E1E] disabled:text-[#1E1E1E4D] disabled:opacity-50"
      :disabled="currentPage === 1"
      @click="$emit('prev')"
    >
      Previous
    </button>

    <!-- Next button -->
    <button
      class="px-3 py-2 border rounded-lg text-[#1E1E1E] disabled:text-[#1E1E1E4D] disabled:opacity-50"
      :disabled="currentPage === totalPages"
      @click="$emit('next')"
    >
      Next
    </button>

    <!-- Hidden Ant Design pagination (to keep internal logic in sync) -->
    <a-pagination
      v-show="false"
      :current="currentPage"
      :pageSize="pageSize"
      :total="total"
      @change="(page) => $emit('change', page)"
    />
  </div>
</template>

<script setup>
defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
});

defineEmits(["prev", "next", "change"]);
</script>
