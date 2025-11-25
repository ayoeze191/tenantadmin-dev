<template>
  <div>
    <span>{{ title }}</span>

    <a-upload-dragger
      class="border-dashed border border-[#36363633] rounded-[12px] py-4 px-3"
      name="file"
      :before-upload="handleBeforeUpload"
      :show-upload-list="false"
    >
      <div>
        <p class="ant-upload-drag-icon mx-auto w-fit p-0 m-0">
          <!-- your svg -->
        </p>
        <p class="font-inter text-[12px] font-semibold leading-[20px] p-0 m-0">
          Drop Document Here
        </p>
        <p
          class="text-[#00000099] font-inter leading-[20px] font-[500] mt-[2px]"
        >
          {{ desc || "Upload a pre-signed lease agreement document" }}
       <div>   {{ type || "*pdf" }}</div>
        </p>
      </div>
    </a-upload-dragger>
  </div>
</template>

<script setup>
import { message } from "ant-design-vue";
import { document } from "postcss";

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  desc: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["fileSelected"]);

const handleBeforeUpload = (file) => {
  // This prevents autoupload
  // and gives you the file so you can manually send it to your backend.
  emit("fileSelected", file);

  message.success("File selected: " + file.name);

  return false; // VERY IMPORTANT — stops automatic upload
};
</script>
