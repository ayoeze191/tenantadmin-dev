import handleError from "@/utils/handleError";
import { getApi, postApi, putApi } from "@/utils/reqClient";

export const FetchTenant = async (query, landlordId) => {
  let response;
  try {
    if (landlordId == "NN1") {
      response = await getApi(
        `Accommodation/GetAccommodationApplicationById?CurrentPage=${query.page}&pageSize=${query.size}`
      );
      return response.data;
    }
    response = await getApi(
      `Accommodation/GetAccommodationApplicationById?CurrentPage=${query.page}&pageSize=${query.size}&LandlordId=${landlordId}`
    );
    return response.data;
  } catch (err) {
    console.log(err, "error");
  }
};

export const ApproveTenant = async (body) => {
  try {
    const response = await postApi(
      "Accommodation/ApproveOrDeclineAccommodationApplication",
      body
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const ConfirmMoveInDate = async (body) => {
  try {
    const response = await postApi(
      `v2/AccommodationApplications/ConfirmMoveInDate`,
      body
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const RequestAdditionalDocuments = async (body) => {
  try {
    const response = await postApi(
      `v2/AccommodationApplications/RequestAdditionalDocument`,
      body
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
