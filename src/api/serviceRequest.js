import handleError from "@/utils/handleError";
import { getApi, postApi } from "@/utils/reqClient";

export const FetchServiceRequests = async (landlordId) => {
  let response;
  try {
    if (landlordId == "NN1") {
      response = await getApi(`ServiceRequest/AllServiceRequest`);
      // console.log("Fetching all service requests for admin", response.data);
    } else {
      response = await getApi(
        `ServiceRequest/AllServiceRequest?LandLordId=${landlordId}`
      );
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const updateServiceRequest = async (body) => {
  try {
    const response = await postApi("ServiceRequest/UpdateServiceRequest", body);
    return response.data;
  } catch (err) {
    handleError(err);
  }
};
