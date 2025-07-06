import handleError from "@/utils/handleError";
import { getApi, postApi, putApi } from "@/utils/reqClient";

export const getAmenities = async (pageSize = 20, currentPage = 1) => {
  try {
    const response = await getApi(`/Amenity/GetAmenities?PageSize=${pageSize}&CurrentPage=${currentPage}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createAmenity = async (body) => {
  try {
    const response = await postApi("/Amenity/CreateAmenity", body);
    return response.data;
  } catch (err) {
    handleError(err);
  }
};

export const updateAmenity = async (body) => {
  try {
    const response = await putApi("/Amenity/UpdateAmenity", body);
    return response.data;
  } catch (err) {
    handleError(err);
  }
}; 