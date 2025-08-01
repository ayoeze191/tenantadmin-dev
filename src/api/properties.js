import handleError from "@/utils/handleError";
import { getApi, postApi, putApi } from "@/utils/reqClient";

export const FetchLandlords = async (params = {}) => {
  try {
    const { name = "", pageSize = 10, currentPage = 1 } = params;
    const queryParams = new URLSearchParams({
      Name: name,
      PageSize: pageSize,
      CurrentPage: currentPage,
    });
    console.log("here");
    const response = await getApi(`Account/FetchLandLords`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.log("here failed", error);
    handleError(error);
  }
};

export const FetchProperties = async (landlordId, query) => {
  let response;
  try {
    if (landlordId == "NN1") {
      response = await getApi(
        `/Accommodation/GetAllProperties?pageNumber=${query.page}&pageSize=${query.size}`
      );
      return response.data;
    }
    response = await getApi(
      `/Accommodation/GetAllProperties?LandLordId=${landlordId}&pageNumber=${query.page}&pageSize=${query.size}`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const FetchUnitTypes = async () => {
  try {
    const response = await getApi(`Accommodation/GetAllUnitTypes`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const FetchAmenities = async () => {
  try {
    const response = await getApi(`Amenity/GetAmenities`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const CreateNewProperty = async (payload) => {
  try {
    const response = await postApi(`Accommodation/CreateNewProperty`, payload);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const AddAmenities = async (payload) => {
  try {
    const response = await postApi(`Amenity/CreateAmenity`, payload);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const AddTenants = async (payload) => {
  try {
    const response = await postApi("Account/AddTenant", payload);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const GetAccomodationById = async (id) => {
  try {
    const response = await getApi(
      `Accommodation/AccommodationById?ApplicationId=${id}`
    );
    return response.data;
  } catch (error) {}
};

export const getunitDetails = async (id) => {
  try {
    const response = await getApi(`Accommodation/ViewUnitById?UnitId=${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
