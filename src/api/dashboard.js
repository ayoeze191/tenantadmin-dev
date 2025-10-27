import { getApi, postApi, putApi } from "@/utils/reqClient";
import handleError from "@/utils/handleError";

export const dashboard = async (payload) => {
  try {
    const response = await getApi(`AdminUser/Login`, payload);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const AccomodationApplications = async (landlordId) => {
  let response;
  try {
    if (landlordId == "NN1") {
      response = await getApi(`Dashboard/AccommodationApplications`);
      return response.data;
    }
    response = await getApi(
      `Dashboard/AccommodationApplications?LandLordId=${landlordId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const MyTenants = async (landlordId) => {
  let response;
  try {
    if (landlordId == "NN1") {
      response = await getApi("Dashboard/MyTenants");
      return response.data;
    }
    response = await getApi(`Dashboard/MyTenants?LandLordId=${landlordId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addPropertyManager = async (payload) => {
  let response;
  try {
    response = await postApi(`AdminUser/AddPropertyManager`, payload);
  } catch (err) {
    console.log(err);
  }
  return response.data;
};
