<template>
  <div
    class="mx-auto bg-neutral py-4 px-8 w-full pb-4"
  >
    <div class="max-w-[95rem] mx-auto">
      <p class="text-txt_dark font-semibold text-xl leading-7 uppercase mb-8">
        View Properties
      </p>
      <div class="w-full">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <!-- Loading State -->
          <template v-if="loading">
            <div
              v-for="n in 8"
              :key="n"
              class="group flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl"
            >
              <div
                class="aspect-[16/10] bg-gray-100 rounded-t-xl animate-pulse"
              ></div>
              <div class="p-4 md:p-5">
                <div class="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div class="h-3 bg-gray-100 rounded w-1/2 mb-1"></div>
                <div class="h-3 bg-gray-100 rounded w-1/3"></div>
              </div>
            </div>
          </template>
          <!-- Error State -->
          <template v-else-if="error">
            <div
              class="col-span-full flex flex-col items-center justify-center min-h-[363px]"
            >
              <p class="text-dng text-lg mb-4">{{ error }}</p>
              <Button :label="'Reload'" :onClick="reload" type="primary" />
            </div>
          </template>
          <!-- Empty State -->
          <template v-else-if="propertyList.length === 0">
            <div
              class="col-span-full flex flex-col items-center justify-center min-h-[363px]"
            >
              <p class="text-secondary text-lg mb-4">No Apartments Found</p>
              <Button :label="'Reload'" :onClick="reload" type="primary" />
            </div>
          </template>
          <!-- Data State -->
          <template v-else>
            <a
              v-for="property in propertyList"
              class="group flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl hover:shadow-md transition cursor-pointer"
              :key="property.accommodationId"
              @click.prevent="handleRedirect(property)"
            >
              <div class="aspect-[16/12] relative">
                <!-- Placeholder: show if no images -->
                <img
                  v-if="!property.images || property.images.length === 0"
                  src="/placeholder.png"
                  class="w-full object-cover rounded-t-xl h-full absolute top-0 left-0 z-0 blur-sm transition-opacity duration-300"
                  alt="No image available"
                  loading="lazy"
                />
                <!-- Real image: show if images exist, no opacity/imageLoadedMap logic for debugging -->
                <img
                  v-if="property.images && property.images.length > 0"
                  :src="property.images[0].image"
                  class="w-full object-cover rounded-t-xl h-full absolute top-0 left-0 z-10"
                  :alt="property.name + ' ' + property.images[0].imageTitle"
                  loading="lazy"
                  @load="onImgLoad(property.accommodationId)"
                  @error="onImgError(property.accommodationId, $event)"
                />
              </div>
              <div class="p-4 flex-1 flex flex-col">
                <p class="text-xs uppercase text-gray-600">Property</p>
                <h3
                  class="text-lg font-medium text-gray-800 group-hover:text-blue-600"
                >
                  {{ property.name }}
                </h3>
                <div class="mt-2 flex flex-col gap-1 text-gray-500 text-sm">
                  <span
                    class="flex items-center gap-1 overflow-hidden whitespace-nowrap truncate"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 7.33594C6 7.86637 6.21071 8.37508 6.58579 8.75015C6.96086 9.12522 7.46957 9.33594 8 9.33594C8.53043 9.33594 9.03914 9.12522 9.41421 8.75015C9.78929 8.37508 10 7.86637 10 7.33594C10 6.8055 9.78929 6.2968 9.41421 5.92172C9.03914 5.54665 8.53043 5.33594 8 5.33594C7.46957 5.33594 6.96086 5.54665 6.58579 5.92172C6.21071 6.2968 6 6.8055 6 7.33594Z"
                        stroke="#404164"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11.7687 11.1045L8.94006 13.9331C8.69006 14.1829 8.35112 14.3232 7.99773 14.3232C7.64434 14.3232 7.30541 14.1829 7.0554 13.9331L4.22607 11.1045C3.48021 10.3586 2.97229 9.40827 2.76652 8.37371C2.56076 7.33916 2.66639 6.26681 3.07007 5.29229C3.47374 4.31777 4.15733 3.48483 5.03439 2.89881C5.91144 2.31279 6.94258 2 7.9974 2C9.05222 2 10.0834 2.31279 10.9604 2.89881C11.8375 3.48483 12.5211 4.31777 12.9247 5.29229C13.3284 6.26681 13.434 7.33916 13.2283 8.37371C13.0225 9.40827 12.5146 10.3586 11.7687 11.1045Z"
                        stroke="#404164"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    {{ property.address }}
                  </span>
                  <span class="flex items-center gap-1">
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
                    {{ property.units.length }} Units
                  </span>
                </div>
                <!-- View Details Button -->
                <div class="mt-4 pt-4 border-t border-gray-100">
                  <a-button
                    type="primary"
                    block
                    size="default"
                    class="btn-primary-custom"
                    @click.stop.prevent="handleRedirect(property)"
                  >
                    View Details
                  </a-button>
                </div>
              </div>
            </a>
          </template>
        </div>
        <!-- Pagination -->
        <div
          v-if="!loading && !error && propertyList.length > 0"
          class="flex justify-center mt-8 mb-4"
        >
          <a-pagination
            :current="currentPage"
            :pageSize="pageSize"
            :total="total"
            @change="onPageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FetchProperties, FetchUnitTypes } from "@/api/properties";
import Button from "@/components/Button.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import Table from "@/components/Table.vue";
import { useUserStore } from "@/store";
import handleError from "@/utils/handleError";
import { handleToast } from "@/utils/helper";
import dayjs from "dayjs";
import { Pagination } from "ant-design-vue";
import { openDB } from 'idb';

export default {
  components: {
    "table-component": Table,
    "edit-icon": IconEdit,
    Button,
    "a-pagination": Pagination,
  },
  created() {
    this.reload();
  },
  data() {
    return {
      propertyList: [],
      store: useUserStore(),
      loading: false,
      error: null,
      imageLoadedMap: {}, // Track loaded state per property
      currentPage: 1,
      pageSize: 16,
      total: 0,
    };
  },
  methods: {
    handleSort(type) {
      // Placeholder: implement sorting logic
      handleToast(`Sort by ${type}`, "info");
    },
    handleFilter(type) {
      // Placeholder: implement filter logic
      handleToast(`Filter: ${type}`, "info");
    },
    reload() {
      this.currentPage = 1;
      this.loading = true;
      this.error = null;
      this.propertyList = [];
      this.handleFetchProperties();
    },
    handleFetchUnitTypes() {
      FetchUnitTypes().then((response) => {
        if (response.properties) {
          this.propertyList = response.properties.items;
        } else handleError(response);
      });
    },
    handleFetchProperties(page = this.currentPage) {
      const query = {
        size: this.pageSize,
        page: page,
        query: "",
      };
      FetchProperties(this.store.userProfile.adminUserID, query)
        .then((response) => {
          if (response.responseCode == "00") {
            this.propertyList = response.properties.items;
            this.total = response.properties.totalItemCount || 0;
            this.pageSize = response.properties.pageSize || this.pageSize;
            this.currentPage = response.properties.page || page;
          } else {
            this.error = "Failed to load properties.";
          }
        })
        .catch((e) => {
          this.error = "Failed to load properties.";
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onPageChange(page) {
      this.currentPage = page;
      this.handleFetchProperties(page);
    },
    formatDate(date) {
      return dayjs(date).format("DD MMM,YYYY");
    },
    async handleRedirect(property) {
      // IndexedDB logic
      const db = await openDB('properties-db', 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('properties')) {
            db.createObjectStore('properties', { keyPath: 'accommodationId' });
          }
        },
      });
      // Store a plain object to avoid DataCloneError
      const plainProperty = JSON.parse(JSON.stringify(property));
      await db.put('properties', plainProperty); // put will add or replace by key
      this.$router.push({
        path: `/properties/${property.accommodationId}`
      });
    },
    onImgLoad(id) {
      this.imageLoadedMap = { ...this.imageLoadedMap, [id]: true };
    },
    onImgError(id, e) {
      this.imageLoadedMap = { ...this.imageLoadedMap, [id]: false };
      e.target.src = "/placeholder.png";
      e.target.classList.add("blur-sm");
    },
  },
};
</script>

<style>
.property-card:hover {
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.08),
    0 1.5px 4px 0 rgba(0, 0, 0, 0.04);
  transform: scale(1.02);
}
.btn-primary-custom {
  background-color: #000130 !important;
  border-color: #000130 !important;
  color: #fff !important;
}
.btn-primary-custom:hover,
.btn-primary-custom:focus {
  background-color: #23234a !important;
  border-color: #23234a !important;
  color: #fff !important;
}
</style>