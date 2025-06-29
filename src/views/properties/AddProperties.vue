<template>
  <div
    class="bg-neutral py-5 px-6 w-full"
  >
    <div v-if="loading" class="flex items-center justify-center min-h-[300px]">
      <a-spin size="large" />
    </div>
    <div v-else-if="error" class="flex items-center justify-center min-h-[300px]">
      <a-result status="404" :title="'Not Found'" :sub-title="error" />
    </div>
    <div v-else class="max-w-[85rem] flex pb-8 mx-auto">
      <div class="flex-1">
        <a-steps :current="currentStep" class="mb-8">
          <a-step title="Property Info" />
          <a-step title="Unit Allocation" />
          <a-step title="Unit Info" />
        </a-steps>

        <div v-if="currentStep === 0" class="bg-white p-6 rounded-xl">
          <!-- Step 1: Property Info -->
          <a-form
            :model="form"
            :rules="rules"
            ref="propertyFormRef"
            layout="vertical"
          >
            <a-form-item label="Property Name" name="name" required>
              <a-input
                v-model:value="form.name"
                placeholder="Enter property name"
                size="large"
              />
            </a-form-item>
            <a-form-item label="Property Address" name="address" required>
              <a-input
                v-model:value="form.address"
                placeholder="Enter address"
                size="large"
              />
            </a-form-item>
            <div class="flex gap-4">
              <a-form-item
                label="Zip Code"
                name="zipCode"
                required
                class="flex-1"
              >
                <a-input
                  v-model:value="form.zipCode"
                  placeholder="Zip code"
                  size="large"
                />
              </a-form-item>
              <a-form-item
                label="Province"
                name="province"
                required
                class="flex-1"
              >
                <a-input
                  v-model:value="form.province"
                  placeholder="Province"
                  size="large"
                />
              </a-form-item>
            </div>
            <a-form-item label="Property Type" name="propertyType" required>
              <a-select
                v-model:value="form.propertyType"
                placeholder="Select property type"
                :options="propertyTypeOptions"
                size="large"
              />
            </a-form-item>
            <a-form-item label="Description" name="description" required>
              <a-textarea
                v-model:value="form.description"
                placeholder="Description"
                size="large"
              />
            </a-form-item>
            <a-form-item label="Total Number of Units" name="units" required>
              <a-input-number
                v-model:value="form.units"
                style="width: 100%"
                min="1"
                size="large"
              />
            </a-form-item>
          </a-form>
        </div>

        <div v-if="currentStep === 1" class="bg-white p-6 rounded-xl">
          <!-- Step 2: Unit Allocation -->
          <div>
            <label class="block text-txt_dark2 text-lg mb-4 font-semibold"
              >Unit Type(s)</label
            >
            <div
              v-for="(type, idx) in unitTypeOptions"
              :key="type.value"
              class="flex items-center justify-between py-2 border-b last:border-b-0"
            >
              <span class="text-txt_dark text-base">{{ type.label }}</span>
              <div class="flex items-center gap-2">
                <a-button
                  size="small"
                  shape="circle"
                  @click="decrementUnitType(idx)"
                  >-</a-button
                >
                <span class="text-gray-700">{{
                  form.unitTypeCounts[idx] || 0
                }}</span>
                <a-button
                  size="small"
                  shape="circle"
                  @click="incrementUnitType(idx)"
                  >+</a-button
                >
              </div>
            </div>
          </div>
        </div>

        <div v-if="currentStep === 2" class="bg-white p-6 rounded-xl">
          <!-- Step 3: Unit Info -->
          <a-form :model="form" ref="unitInfoFormRef" layout="vertical">
            <div class="flex gap-4">
              <a-form-item
                label="Rent (per month)"
                name="rent"
                required
                class="flex-1"
              >
                <a-input-number
                  v-model:value="form.rent"
                  style="width: 100%"
                  min="0"
                  size="large"
                />
              </a-form-item>
              <a-form-item
                label="Security Deposit"
                name="securityDeposit"
                required
                class="flex-1"
              >
                <a-input-number
                  v-model:value="form.securityDeposit"
                  style="width: 100%"
                  min="0"
                  size="large"
                />
              </a-form-item>
            </div>
            <a-form-item
              name="images"
              :validate-status="fileList.length === 0 ? 'error' : ''"
              :help="
                fileList.length === 0 ? 'At least one image is required' : ''
              "
              required
            >
              <template #label>
                Property Images <span style="color: red">*</span>
              </template>
              <CustomImageUpload v-model="fileList" />
            </a-form-item>
            <a-form-item label="Amenities" name="amenities">
              <a-select
                v-model:value="form.amenities"
                mode="multiple"
                placeholder="Select amenities"
                :options="amenityOptions"
                size="large"
                :field-names="{ label: 'label', value: 'value' }"
                :option-label-prop="'label'"
                :tagRender="renderAmenityTag"
              >
                <template #option="{ value, label }">
                  <span class="flex items-center gap-2">
                    <img
                      v-if="
                        amenityOptions.find((o) => o.value === value)?.image
                      "
                      :src="amenityOptions.find((o) => o.value === value).image"
                      style="
                        width: 20px;
                        height: 20px;
                        object-fit: cover;
                        border-radius: 4px;
                      "
                    />
                    <span>{{ label }}</span>
                  </span>
                </template>
              </a-select>
            </a-form-item>
          </a-form>
        </div>

        <div class="flex gap-4 mt-4">
          <a-button
            v-if="currentStep > 0"
            @click="prevStep"
            size="large"
            type="default"
            shape="round"
            class="inline-flex items-center"
          >
            <template #icon>
              <LeftOutlined />
            </template>
            Previous
          </a-button>
          <a-button
            type="primary"
            @click="nextOrSubmit"
            :loading="loading"
            size="large"
            shape="round"
            :class="'shadow-md inline-flex items-center'"
          >
            <template #icon>
              <CheckOutlined v-if="currentStep === 2" />
              <RightOutlined v-else />
            </template>
            {{ currentStep === 2 ? "Save" : "Continue" }}
          </a-button>
        </div>
      </div>
      <div class="w-[350px] ml-10">
        <!-- Quick Preview Panel -->
        <div
          class="bg-white w-full border p-4 text-left flex flex-col gap-2 rounded-xl"
        >
          <h1 class="text-primary font-semibold text-xl leading-7">
            {{ form.name || "Property Name" }}
          </h1>
          <div class="flex items-center gap-2">
            <span>📍</span>
            <p class="text-txt_dark text-sm leading-4">
              {{ form.address || "Property Address" }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <span>🏢</span>
            <p class="text-txt_dark text-sm leading-4">
              {{ form.units || 0 }} Units
            </p>
          </div>
          <div class="flex items-center gap-2">
            <span>💰</span>
            <p class="text-txt_dark text-sm leading-4">
              {{ form.rent ? `$${form.rent}` : "Rent" }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <span>🛏️</span>
            <p class="text-txt_dark text-sm leading-4">
              {{ getUnitTypeSummary() }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <span>⭐</span>
            <p
              class="text-txt_dark text-sm leading-4"
              v-html="getAmenitiesPreview()"
            ></p>
          </div>
          <div class="mt-2">
            <a-image
              v-if="fileList.length > 0"
              :src="getPreviewImage(fileList[0])"
              width="100%"
              style="border-radius: 8px; object-fit: cover; height: 120px"
            />
            <div
              v-else
              class="w-full h-[120px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-400"
            >
              No Image
            </div>
          </div>
        </div>
        <section class="flex gap-0.5 rounded-md p-2 bg-bg2 mt-2">
          <p class="text-tgr font-medium text-sm leading-4">
            This is a preview for how your property looks when published
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AddProperties } from "@/api/properties";
import { useUserStore } from "@/store";
import { useOptionsStore } from "@/stores/options";
import { uploadImages } from "@/utils/helper";
import {
CheckOutlined,
LeftOutlined,
RightOutlined
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import {
defineComponent,
h,
nextTick,
onMounted,
reactive,
ref,
watch,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { openDB } from "idb";

const unitTypeOptions = ref([]);
const propertyTypeOptions = ref([]);
const amenityOptions = ref([]);

const currentStep = ref(0);
const loading = ref(false);
const error = ref(null);

const form = reactive({
  name: "",
  address: "",
  zipCode: "",
  province: "",
  propertyType: null,
  description: "",
  units: null,
  unitTypeCounts: [],
  rent: null,
  securityDeposit: null,
  images: [],
  amenities: [],
});

const router = useRouter();
const route = useRoute();
const store = useUserStore();
const optionsStore = useOptionsStore();

onMounted(async () => {
  await optionsStore.fetchAmenities();
  await optionsStore.fetchUnitTypes();
  amenityOptions.value = optionsStore.amenities.map((a) => ({
    label: a.name,
    value: a.amenityId,
    image: a.image || a.icon || null,
  }));
  unitTypeOptions.value = optionsStore.unitTypes.map((u) => ({
    label: u,
    value: u,
  }));
  propertyTypeOptions.value = optionsStore.unitTypes.map((u) => ({
    label: u,
    value: u,
  }));
  form.unitTypeCounts = Array(optionsStore.unitTypes.length).fill(0);

  // EDIT MODE: If route has id, fetch property from IndexedDB
  const id = route.params.id;
  if (id) {
    loading.value = true;
    try {
      const db = await openDB("properties-db", 1);
      const data = await db.get("properties", Number(id));
      if (!data) {
        error.value = "Property not found.";
      } else {
        // Map data to form fields
        form.name = data.name || "";
        form.address = data.address || "";
        form.zipCode = data.zipCode || "";
        form.province = data.province || "";
        form.propertyType = data.propertyType || "";
        form.description = data.description || "";
        form.units = data.units || null;
        form.unitTypeCounts = Array(optionsStore.unitTypes.length).fill(0); // You may want to map this if you use unitTypeCounts
        form.rent = data.minimumRent || data.rent || null;
        form.securityDeposit = data.securityDeposit || null;
        // Ensure images have .url property for preview logic
        form.images = (data.images || []).map(img => img.url ? img : { ...img, url: img.image });
        fileList.value = (data.images || []).map(img => img.url ? img : { ...img, url: img.image });
        form.amenities = data.amenities || [];
        // If you have more fields, map them here
      }
    } catch (e) {
      error.value = "Failed to load property details.";
    } finally {
      loading.value = false;
    }
  }
});

const rules = {
  name: [{ required: true, message: "Property name is required" }],
  address: [{ required: true, message: "Address is required" }],
  zipCode: [{ required: true, message: "Zip code is required" }],
  province: [{ required: true, message: "Province is required" }],
  propertyType: [{ required: true, message: "Property type is required" }],
  description: [{ required: true, message: "Description is required" }],
  units: [{ required: true, message: "Total number of units is required" }],
  rent: [{ required: true, message: "Rent is required" }],
  securityDeposit: [
    { required: true, message: "Security deposit is required" },
  ],
  images: [{ required: true, message: "At least one image is required" }],
};

const fileList = ref([]);
const uploadedImageUrls = ref([]); // Cache for uploaded image URLs

const CustomImageUpload = defineComponent({
  name: "CustomImageUpload",
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const previewVisible = ref(false);
    const previewIndex = ref(0);
    const dragActive = ref(false);

    function handleFiles(files) {
      let newFiles = Array.from(files).slice(0, 5 - props.modelValue.length);
      const fileObjs = newFiles
        .map((file) => {
          // If already in list, skip
          if (
            props.modelValue.some(
              (f) => f.name === file.name && f.size === file.size
            )
          )
            return null;
          return file;
        })
        .filter(Boolean);
      emit("update:modelValue", [...props.modelValue, ...fileObjs]);
    }
    function onInputChange(e) {
      handleFiles(e.target.files);
      e.target.value = null;
    }
    function onDrop(e) {
      e.preventDefault();
      dragActive.value = false;
      handleFiles(e.dataTransfer.files);
    }
    function onDragOver(e) {
      e.preventDefault();
      dragActive.value = true;
    }
    function onDragLeave(e) {
      e.preventDefault();
      dragActive.value = false;
    }
    function removeImage(idx) {
      const newArr = props.modelValue.slice();
      newArr.splice(idx, 1);
      emit("update:modelValue", newArr);
    }
    function openPreview(idx) {
      previewIndex.value = idx;
      previewVisible.value = true;
      nextTick(() => {
        // Ant Design's a-image-preview-group will handle modal
      });
    }
    return () =>
      h("div", [
        h(
          "div",
          {
            class: [
              "border",
              "border-dashed",
              "rounded-lg",
              "p-4",
              "mb-4",
              "flex",
              "flex-wrap",
              "gap-4",
              dragActive.value ? "border-primary" : "border-br4",
              "bg-white",
              "justify-start",
            ],
            style: {
              minHeight: "120px",
              cursor: "pointer",
              position: "relative",
            },
            onDrop,
            onDragover: onDragOver,
            onDragleave: onDragLeave,
          },
          [
            // Thumbnails
            ...props.modelValue.map((file, idx) =>
              h(
                "div",
                {
                  class:
                    "relative w-[120px] h-[120px] rounded-lg overflow-hidden group",
                  style: { border: "1px solid #eee", background: "#fafafa" },
                  key: idx,
                },
                [
                  h("img", {
                    src:
                      file instanceof File
                        ? URL.createObjectURL(file)
                        : file.originFileObj
                        ? URL.createObjectURL(file.originFileObj)
                        : file.thumbUrl || file.url || "",
                    class:
                      "w-full h-full object-cover rounded-lg cursor-pointer",
                    alt: "preview",
                    onClick: () => openPreview(idx),
                  }),
                  h(
                    "div",
                    {
                      class:
                        "absolute top-1 right-1 bg-white/80 rounded-full p-1 cursor-pointer z-10",
                      onClick: () => removeImage(idx),
                      title: "Remove",
                    },
                    [
                      h(
                        "svg",
                        {
                          width: 18,
                          height: 18,
                          fill: "none",
                          viewBox: "0 0 18 18",
                        },
                        [
                          h("circle", {
                            cx: 9,
                            cy: 9,
                            r: 8,
                            fill: "#808097",
                            stroke: "white",
                          }),
                          h("path", {
                            d: "M12 6L6 12M6 6l6 6",
                            stroke: "white",
                            "stroke-width": 1.5,
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                          }),
                        ]
                      ),
                    ]
                  ),
                ]
              )
            ),
            // Upload button
            props.modelValue.length < 5 &&
              h(
                "label",
                {
                  class:
                    "flex flex-col items-center justify-center w-[120px] h-[120px] border border-dashed border-br4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100",
                  style: { position: "relative" },
                },
                [
                  h("input", {
                    type: "file",
                    multiple: true,
                    accept: "image/png,image/jpeg,image/jpg",
                    class: "absolute inset-0 opacity-0 cursor-pointer",
                    onChange: onInputChange,
                    style: { width: "100%", height: "100%" },
                  }),
                  h(
                    "svg",
                    {
                      width: 32,
                      height: 32,
                      fill: "none",
                      viewBox: "0 0 32 32",
                    },
                    [
                      h("path", {
                        d: "M16 8v16M8 16h16",
                        stroke: "#808097",
                        "stroke-width": 2,
                        "stroke-linecap": "round",
                      }),
                    ]
                  ),
                  h(
                    "span",
                    { class: "text-xs text-secondary mt-2 text-center" },
                    "Upload or drag an image here"
                  ),
                ]
              ),
          ]
        ),
        // Preview modal
        h(
          "a-image-preview-group",
          {
            preview: {
              visible: previewVisible.value,
              current: previewIndex.value,
              onVisibleChange: (v) => (previewVisible.value = v),
            },
          },
          props.modelValue.map((file, idx) =>
            h("a-image", {
              key: idx,
              src:
                file instanceof File
                  ? URL.createObjectURL(file)
                  : file.originFileObj
                  ? URL.createObjectURL(file.originFileObj)
                  : file.thumbUrl || file.url || "",
              style: { display: "none" },
            })
          )
        ),
      ]);
  },
});

const nextOrSubmit = async () => {
  if (currentStep.value === 0) {
    // Validate Step 1 form
    const propertyForm = propertyFormRef.value;
    try {
      await propertyForm.validate();
      currentStep.value++;
    } catch (err) {
      return;
    }
  } else if (currentStep.value === 1) {
    // No form to validate in Step 2, just go to next step
    currentStep.value++;
  } else if (currentStep.value === 2) {
    // EDIT MODE: If editing, show loader for 1.5s then show message
    if (route.params.id) {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        message.info("Edit functionality is not available yet.");
      }, 1500);
      return;
    }
    // Validate Step 3 form (unitInfoFormRef)
    const unitInfoForm = unitInfoFormRef.value;
    try {
      await unitInfoForm.validate();
    } catch (err) {
      console.error("Validation error:", err);
      return;
    }
    if (fileList.value.length === 0) {
      message.error("Please upload at least one property image.");
      return;
    }
    loading.value = true;
    try {
      // Only upload images if not already uploaded
      if (!uploadedImageUrls.value.length) {
        uploadedImageUrls.value = await uploadImages(fileList.value);
      }
      const imageObjs = fileList.value.map((file, idx) => ({
        image: uploadedImageUrls.value[idx],
        imageTitle: file.name || `Image ${idx + 1}`,
      }));
      // Prepare amenities as IDs
      const amenityIds = form.amenities.map((a) =>
        typeof a === "object" ? a.value : a
      );
      // Prepare unit types as array of unit objects (not just count)
      const units = unitTypeOptions.value
        .map((type, idx) => {
          const count = form.unitTypeCounts[idx] || 0;
          if (count > 0) {
            return {
              unitType: type.value,
              count: count,
            };
          }
          return null;
        })
        .filter(Boolean);
      // Prepare unit types
      const unitTypes = unitTypeOptions.value
        .map((type, idx) => ({
          type: type.value,
          count: form.unitTypeCounts[idx] || 0,
        }))
        .filter((u) => u.count > 0);
      // Build payload (wrap in 'payload' field)
      const payload = {
        payload: {
          landlordId:
            parseInt(store.userProfile.adminUserID, 10) ||
            store.userProfile.adminUserID, // If not int, leave as is
          name: form.name,
          address: form.address,
          zipCode: form.zipCode,
          province: form.province,
          propertyType: form.propertyType,
          description: form.description,
          units: units, // now an array of unit objects
          unitTypes: unitTypes, // keep for reference if needed
          rent: form.rent,
          securityDeposit: form.securityDeposit,
          images: imageObjs,
          amenities: amenityIds,
        },
      };
      console.log("Payload to AddProperties:", payload);
      if (!payload.payload.landlordId) {
        message.error("No landlordId found. Please log in again.");
        loading.value = false;
        return;
      }
      const res = await AddProperties(payload);
      console.log("AddProperties API response:", res);
      if (res) {
        message.success("Property Added Successfully!");
        router.push("/properties");
        uploadedImageUrls.value = []; // Reset cache on success
      } else if (res && (res.success || res.status === 200)) {
        // Fallback: if API returns a different success indicator
        message.success("Property Added Successfully!");
        router.push("/properties");
        uploadedImageUrls.value = []; // Reset cache on success
      } else {
        message.error(res?.responseMessage || "Failed to add property");
      }
    } catch (err) {
      message.error("An error occurred while saving the property.");
    } finally {
      loading.value = false;
    }
  }
};

const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--;
};

// Add refs for forms
const propertyFormRef = ref();
const unitFormRef = ref();
const unitInfoFormRef = ref();

const getPreviewImage = (file) => {
  if (file instanceof File) {
    return URL.createObjectURL(file);
  }
  if (file.originFileObj) {
    return URL.createObjectURL(file.originFileObj);
  }
  // Support both .url and .image for edit mode
  return file.url || file.image || file.thumbUrl;
};

function incrementUnitType(idx) {
  form.unitTypeCounts[idx] = (form.unitTypeCounts[idx] || 0) + 1;
  form.unitTypeCounts = [...form.unitTypeCounts];
}
function decrementUnitType(idx) {
  if ((form.unitTypeCounts[idx] || 0) > 0) {
    form.unitTypeCounts[idx]--;
    form.unitTypeCounts = [...form.unitTypeCounts];
  }
}

function getUnitTypeSummary() {
  return unitTypeOptions.value
    .map((type, idx) => {
      const count = form.unitTypeCounts[idx];
      return count > 0 ? `${type.label}: ${count}` : null;
    })
    .filter(Boolean)
    .join(", ");
}

function getAmenitiesPreview() {
  if (!form.amenities || form.amenities.length === 0) return "Amenities";
  // Map selected IDs to names and images
  return form.amenities
    .map((aid) => {
      const found = amenityOptions.value.find(
        (opt) => opt.value === (aid.value || aid)
      );
      if (found && found.image) {
        return `<span style='display:inline-flex;align-items:center;gap:4px;'><img src='${found.image}' style='width:18px;height:18px;object-fit:cover;border-radius:4px;margin-right:2px;'/>${found.label}</span>`;
      }
      return found ? found.label : aid.label || aid;
    })
    .join(", ");
}

function renderAmenityTag({ label, value, closable, onClose }) {
  const opt = amenityOptions.value.find((o) => o.value === value);
  return h(
    "span",
    {
      class: "flex items-center gap-1 px-2 py-1 bg-gray-100 rounded",
      style: "margin-right:4px;",
    },
    [
      opt && opt.image
        ? h("img", {
            src: opt.image,
            style:
              "width:16px;height:16px;object-fit:cover;border-radius:3px;margin-right:2px;",
          })
        : null,
      h("span", {}, label),
      closable
        ? h("span", { class: "ml-1 cursor-pointer", onClick: onClose }, "×")
        : null,
    ]
  );
}

// Sync fileList with form.images for validation
watch(fileList, (newVal) => {
  form.images = newVal;
});
</script>

<style scoped>
.bg-neutral {
  background: #f7f8fa;
}
.text-primary {
  color: #1d3557;
}
.text-txt_dark {
  color: #404164;
}
.text-tgr {
  color: #496580;
}
.bg-bg2 {
  background: #f0f2f5;
}
</style>
