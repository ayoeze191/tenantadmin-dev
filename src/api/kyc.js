import handleError from "@/utils/handleError";
import { getApi, postApi, putApi } from "@/utils/reqClient";

export const ApproveORejectKYCRequest = async (body) => {
  try {
    const response = await postApi(`Account/CompleteKYCRequest`, {
      requestId: body.requestId,
      isCompleted: body.isCompleted,
      comment: body.comment,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchKYC = async (query, landlordId) => {
  let response;
  try {
    if (landlordId == "NN1") {
      response = await getApi(
        `Account/AllTenantKYC?CurrentPage=${query.page}&pageSize=${query.size}`
      );
      return response.data;
    }
    response = await getApi(
      `Account/AllTenantKYC?CurrentPage=${query.page}&pageSize=${query.size}&LandlordId=${landlordId}`
    );
    return response.data;
  } catch (err) {
    console.log(err, "error");
  }
};

export const newlyCreatedProperty = async (query, landlordId) => {
  let response;
  try {
    if (landlordId == "NN1") {
      response = await getApi(`Accommodation/GetNewlyCreatedProperties`);
      return response.data;
    }
    response = await getApi(`Accommodation/GetNewlyCreatedProperties`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const approveOrdeclinedProperperty = async (payload) => {
  let response;
  try {
    if (landlordId == "NN1") {
      response = await postApi(`Accommodation/VerifyNewProperty`);
      return response.data;
    }
    response = await postApi(`Accommodation/VerifyNewProperty`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
