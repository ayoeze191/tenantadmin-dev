import handleError from "@/utils/handleError";
import { getApi, postApi, putApi } from "@/utils/reqClient";

export const FetchProperties =  async (landlordId,query) => {
    try {
      const response = await getApi(`Accommodation/GetAllProperties?pageNumber=${query.page}&pageSize=${query.size}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
};

export const FetchUnitTypes =  async () => {
    try {
      const response = await getApi(`Accommodation/GetAllUnitTypes`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
};

export const FetchAmenities =  async () => {
    try {
      const response = await getApi(`Amenity/GetAmenities`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
};

export const AddProperties =  async (payload) => {
    try {
      const response = await postApi(`Accommodation/AddAccommodation`, payload);
      return response.data;
    } catch (error) {
      handleError(error);
    }
};
export const AddAmenities =  async (payload) => {
    try {
      const response = await postApi(`Amenity/CreateAmenity`, payload);
      return response.data;
    } catch (error) {
      handleError(error);
    }
};