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

export const AccomodationApplications = async () => {
  try {
    const response = await getApi("Dashboard/AccommodationApplications");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const MyTenants = async () => {
  try {
    const response = await getApi("Dashboard/MyTenants");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
