<template>
  <div>
    <span>{{ title }}</span>

    <a-upload-dragger
      class="border-dashed border border-[#36363633] rounded-[12px] py-4 px-3"
      :file-list="fileList"
      :custom-request="customRequest"
      @update:fileList="onFileListChange"
      multiple
      :accept="type || 'application/pdf'"
    >
      <div>
        <p class="ant-upload-drag-icon mx-auto w-fit p-0 m-0">
          <!-- your svg -->
        </p>

        <p class="font-inter text-[12px] font-semibold leading-[20px] m-0">
          Drop Document Here
        </p>

        <p class="text-[#00000099] font-inter leading-[20px] font-[500] mt-[2px]">
          {{ desc || "Upload a pre-signed lease agreement document" }}
          <div>Accepted File Types: {{ type || "pdf" }}</div>
        </p>
      </div>
    </a-upload-dragger>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  desc: String,
  type: String,
  fileList: {
    type: Array,
    default: () => [],
  },
  customRequest: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(["update:fileList"]);

// Sync file list with parent v-model
const onFileListChange = (newList) => {
  emit("update:fileList", newList);
};
</script>
