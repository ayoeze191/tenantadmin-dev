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

    const response = await getApi(`Account/Get-All-LandLords?${queryParams}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const FetchProperties = async (landlordId, query) => {
  try {
    const response = await getApi(
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
    const response = await postApi(
      `Accommodation/Create-New-Property`,
      payload
    );
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
    const response = await postApi("");
  } catch (error) {}
};
