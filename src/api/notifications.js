import { getApi } from "@/utils/reqClient";

export const fetchNotifications = async (query) => {
  try {
    const response = await getApi(`Notification/GetLandLordNotifications`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
