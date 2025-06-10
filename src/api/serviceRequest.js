import handleError from "@/utils/handleError";
import { getApi, postApi } from "@/utils/reqClient";

export const FetchServiceRequests = async () => {
  try {
    const response = await getApi(`/ServiceRequest/AllServiceRequest`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateServiceRequest = async (body) => {
  try {
    const response = await postApi(
      "/ServiceRequest/UpdateServiceRequest",
      body
    );
    return response.data;
  } catch (err) {
    handleError(err);
  }
};
