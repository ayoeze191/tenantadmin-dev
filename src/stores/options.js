import { defineStore } from "pinia";
import { FetchAmenities, FetchUnitTypes } from "@/api/properties";

export const useOptionsStore = defineStore("options", {
  state: () => ({
    amenities: [],
    unitTypes: [],
    amenitiesLoaded: false,
    unitTypesLoaded: false,
  }),
  actions: {
    async fetchAmenities() {
      if (!this.amenitiesLoaded) {
        const res = await FetchAmenities();
        if (res && res.amenities && Array.isArray(res.amenities.items)) {
          this.amenities = res.amenities.items;
          this.amenitiesLoaded = true;
        }
      }
    },
    async fetchUnitTypes() {
      if (!this.unitTypesLoaded) {
        const res = await FetchUnitTypes();
        console.log(res.data, "as");
        if (res && Array.isArray(res.data)) {
          this.unitTypes = res.data;
          this.unitTypesLoaded = true;
        }
      }
    },
    clear() {
      this.amenities = [];
      this.unitTypes = [];
      this.amenitiesLoaded = false;
      this.unitTypesLoaded = false;
    },
  },
});
