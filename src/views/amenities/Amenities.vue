<template>
  <div class="bg-neutral py-5 px-4 w-full min-h-screen">
    <a-card class="!bg-white !rounded-2xl !border-0 max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-[#23234a] mb-1">Amenities</h1>
          <p class="text-gray-500 text-sm">
            Manage property amenities and facilities
          </p>
        </div>
        <a-button
          type="primary"
          size="large"
          class="!bg-primary !border-primary !text-white hover:!bg-primary flex items-center"
          @click="openAddModal"
        >
          <template #icon>
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
          </template>
          <span class="ml-1">Add Amenity</span>
        </a-button>
      </div>

      <!-- Loading State -->
      <a-spin
        v-if="loading"
        size="large"
        class="flex justify-center items-center min-h-[400px]"
      />

      <!-- Content -->
      <div v-else>
        <!-- Amenities List -->
        <a-list
          v-if="amenities.length > 0"
          :data-source="amenities"
          bordered
          class="bg-white rounded-xl"
        >
          <template #renderItem="{ item }">
            <a-list-item class="flex items-center justify-between py-3 px-2 border-b last:border-b-0">
              <div class="flex items-center gap-4">
                <img
                  :src="item.image || '/placeholder.png'"
                  :alt="item.name"
                  class="w-10 h-10 object-contain rounded bg-gray-100"
                  style="min-width:2.5rem;"
                />
                <div>
                  <div class="font-semibold text-base text-[#23234a]">{{ item.name }}</div>
                  <div class="text-xs text-gray-500">{{ item.amenitiesKeyWords }}</div>
                </div>
              </div>
              <div class="flex gap-2">
                <a-button type="default" size="small" @click="editAmenity(item)">Edit</a-button>
                <a-button type="default" size="small" danger @click="deleteAmenity(item)">Delete</a-button>
              </div>
            </a-list-item>
          </template>
        </a-list>

        <!-- Empty State -->
        <a-empty v-else description="No amenities found" class="my-16">
          <template #image>
            <div
              class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
            </div>
          </template>
          <a-button type="primary" @click="openAddModal">
            Add Your First Amenity
          </a-button>
        </a-empty>

        <!-- Pagination -->
        <div v-if="totalItems > pageSize" class="flex justify-center mt-6">
          <a-pagination
            v-model:current="currentPage"
            :total="totalItems"
            :page-size="pageSize"
            show-size-changer
            :page-size-options="['10', '20', '50', '100']"
            @change="handlePageChange"
            @showSizeChange="handlePageSizeChange"
            show-quick-jumper
            show-total="(total, range) => `${range[0]}-${range[1]} of ${total} items`"
          />
        </div>
      </div>

      <!-- Add/Edit Amenity Modal (unchanged) -->
      <a-modal
        v-model:visible="modalVisible"
        :title="isEditing ? 'Edit Amenity' : 'Add New Amenity'"
        :footer="null"
        :width="450"
        :centered="true"
        class="!rounded-2xl"
        @cancel="closeModal"
      >
        <a-form
          ref="formRef"
          :model="form"
          :rules="rules"
          layout="vertical"
          @finish="handleSubmit"
        >
          <!-- Amenity Name -->
          <a-form-item label="Amenity Name" name="name" required>
            <a-input
              v-model:value="form.name"
              placeholder="Enter amenity name (e.g., Swimming Pool, Gym)"
              size="large"
              class="!rounded-lg"
            />
          </a-form-item>

          <!-- Keywords -->
          <a-form-item label="Keywords" name="amenitiesKeyWords" required>
            <a-input
              v-model:value="form.amenitiesKeyWords"
              placeholder="Enter keywords (e.g., pool, swimming, fitness)"
              size="large"
              class="!rounded-lg"
            />
            <template #help>
              <span class="text-xs text-gray-500"
                >Keywords help in searching and categorizing amenities</span
              >
            </template>
          </a-form-item>

          <!-- Image Upload -->
          <a-form-item label="Amenity Image" name="image" required>
            <div class="space-y-4">
              <!-- Image Preview -->
              <div v-if="imagePreview" class="relative">
                <img
                  :src="imagePreview"
                  alt="Preview"
                  class="w-full h-48 object-cover rounded-lg border border-gray-200"
                />
                <a-button
                  type="text"
                  danger
                  size="small"
                  class="absolute top-2 right-2 bg-white/80 rounded-full"
                  @click="removeImage"
                >
                  <template #icon>
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </template>
                </a-button>
              </div>

              <!-- Upload Area -->
              <div
                v-if="!imagePreview"
                class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                @click="triggerFileInput"
                @dragover.prevent
                @drop.prevent="handleDrop"
              >
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  style="display: none"
                  @change="handleFileSelect"
                />
                <div class="space-y-3">
                  <svg
                    class="w-12 h-12 text-gray-400 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <div>
                    <p class="text-sm font-medium text-gray-700">
                      Click to upload or drag and drop
                    </p>
                    <p class="text-xs text-gray-500 mt-1">
                      PNG, JPG, JPEG up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </a-form-item>

          <!-- Form Actions -->
          <div class="flex gap-3 justify-end pt-4 border-t border-gray-100">
            <a-button @click="closeModal"> Cancel </a-button>
            <a-button
              type="primary"
              html-type="submit"
              :loading="submitting"
              class="!bg-primary !border-primary flex items-center"
            >
              <span v-if="submitting">Saving...</span>
              <span v-else>{{
                isEditing ? "Update Amenity" : "Add Amenity"
              }}</span>
            </a-button>
          </div>
        </a-form>
      </a-modal>
    </a-card>
  </div>
</template>

<script>
import { createAmenity, getAmenities, updateAmenity } from "@/api/amenity";
import { uploadImage } from "@/utils/helper";
import {
  Button,
  Card,
  Empty,
  Form,
  Input,
  message,
  Modal,
  Pagination,
  Spin,
  Tag,
  Tooltip,
  List, // Added List import
} from "ant-design-vue";

export default {
  name: "Amenities",
  components: {
    "a-button": Button,
    "a-card": Card,
    "a-empty": Empty,
    "a-form": Form,
    "a-form-item": Form.Item,
    "a-input": Input,
    "a-modal": Modal,
    "a-pagination": Pagination,
    "a-spin": Spin,
    "a-tag": Tag,
    "a-tooltip": Tooltip,
    "a-list": List, // Added List component
  },
  data() {
    return {
      loading: false,
      submitting: false,
      modalVisible: false,
      isEditing: false,
      amenities: [],
      currentPage: 1,
      pageSize: 20,
      totalItems: 0,
      imagePreview: null,
      selectedFile: null,
      form: {
        amenityId: 0,
        name: "",
        image: "",
        amenitiesKeyWords: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please enter amenity name",
            trigger: "blur",
          },
          {
            min: 2,
            message: "Name must be at least 2 characters",
            trigger: "blur",
          },
        ],
        amenitiesKeyWords: [
          { required: true, message: "Please enter keywords", trigger: "blur" },
        ],
        image: [
          {
            required: true,
            message: "Please upload an image",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    formRef() {
      return this.$refs.formRef;
    },
    fileInput() {
      return this.$refs.fileInput;
    },
  },
  created() {
    this.fetchAmenities();
  },
  methods: {
    async fetchAmenities() {
      this.loading = true;
      try {
        const response = await getAmenities(this.pageSize, this.currentPage);
        if (response && response.responseCode === "00") {
          this.amenities = response.amenities.items;
          this.totalItems = response.amenities.totalItemCount;
        } else {
          message.error(
            response?.responseDescription || "Failed to fetch amenities"
          );
        }
      } catch (error) {
        message.error("Network error occurred");
      } finally {
        this.loading = false;
      }
    },

    openAddModal() {
      this.isEditing = false;
      this.resetForm();
      this.modalVisible = true;
    },

    editAmenity(amenity) {
      this.isEditing = true;
      this.form = {
        amenityId: amenity.amenityId,
        name: amenity.name,
        image: amenity.image,
        amenitiesKeyWords: amenity.amenitiesKeyWords,
      };
      this.imagePreview = amenity.image;
      this.modalVisible = true;
    },

    closeModal() {
      this.modalVisible = false;
      this.resetForm();
    },

    resetForm() {
      this.form = {
        amenityId: 0,
        name: "",
        image: "",
        amenitiesKeyWords: "",
      };
      this.imagePreview = null;
      this.selectedFile = null;
      this.formRef?.resetFields();
    },

    triggerFileInput() {
      this.fileInput?.click();
    },

    handleFileSelect(event) {
      const file = event.target.files[0];
      if (file) {
        this.processFile(file);
      }
      // Clear the input value to prevent double prompts
      event.target.value = "";
    },

    handleDrop(event) {
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        this.processFile(file);
      }
    },

    processFile(file) {
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        message.error("File size must be less than 10MB");
        return;
      }

      this.selectedFile = file;
      this.form.image = file.name; // For form validation

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    removeImage() {
      this.imagePreview = null;
      this.selectedFile = null;
      this.form.image = "";
    },

    async handleSubmit() {
      this.submitting = true;
      try {
        let imageUrl = this.form.image; // Use existing image URL if editing and no new file selected

        // Upload image if a new file is selected
        if (this.selectedFile) {
          const uploadResult = await uploadImage(this.selectedFile);
          if (uploadResult && uploadResult.secure_url) {
            imageUrl = uploadResult.secure_url;
          } else {
            message.error("Failed to upload image");
            return;
          }
        }

        let response;
        if (this.isEditing) {
          const payload = {
            amenityId: this.form.amenityId,
            name: this.form.name,
            image: imageUrl,
          };
          response = await updateAmenity(payload);
        } else {
          response = await createAmenity(payload);
        }

        // Check for HTTP 200 status and successful response
        if (response && response.status === 200 && response.responseCode === "00") {
          message.success(
            this.isEditing
              ? "Amenity updated successfully!"
              : "Amenity added successfully!"
          );
          this.closeModal();
          this.fetchAmenities();
        } else {
          message.error(
            response?.responseDescription || "Failed to save amenity"
          );
        }
      } catch (error) {
        message.error("Network error occurred");
      } finally {
        this.submitting = false;
      }
    },

    deleteAmenity(amenity) {
      Modal.confirm({
        title: "Delete Amenity",
        content: `Are you sure you want to delete "${amenity.name}"?`,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: () => {
          // Implement delete functionality
          message.info("Delete functionality to be implemented");
        },
      });
    },

    handlePageChange(page) {
      this.currentPage = page;
      this.fetchAmenities();
    },

    handlePageSizeChange(current, size) {
      this.pageSize = size;
      this.currentPage = 1;
      this.fetchAmenities();
    },

    handleImageError(event) {
      event.target.src = "/placeholder.png";
      event.target.classList.add("blur-sm");
    },
  },
};
</script>

<style scoped>
.ant-card:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease-in-out;
}

/* Fix tag overflow */
.ant-tag {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
