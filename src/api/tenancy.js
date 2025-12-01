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
      `v2/AccommodationApplications/${body.applicationId}/approve`,
      { approvedBy: body.approvedBy, notes: body.note }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const DeclineTenant = async (body) => {
  try {
    const response = await postApi(
      `/api/v2/AccommodationApplications/${body.applicationId}/status`,
      {
        applicationId: body.applicationId,
        declinedBy: body.declinedBy,
        notes: body.note,
      }
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

export const GenerateLease = async (applicationId) => {
  try {
    const response = await getApi(
      `v2/AccommodationApplications/${applicationId}/GenerateLeaseAgreement`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const sendEmailToTenant = async (body) => {
  try {
    const response = await postApi(`notification`, body);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const ChangeApplicationStatus = async (body) => {
  try {
    const response = await putApi(
      `/api/v2/AccommodationApplications/${body.applicationId}/status`,
      {
        applicationId: body.applicationId,
        status: body.statusId,
        comments: body.comments,
        updatedByUserId: body.userId,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getLeaseReview = async (body) => {
  try {
    const response = await getApi(
      `v2/AccommodationApplications/${body.applicationId}/GetLeaseReview`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
