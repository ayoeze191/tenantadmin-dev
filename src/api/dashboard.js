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
