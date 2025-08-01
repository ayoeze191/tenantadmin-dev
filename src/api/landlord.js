import handleError from "@/utils/handleError";
import { getApi, postApi } from "@/utils/reqClient";

export const FetchLeases = async (landlordId) => {
  let url = `Contract/AllLeaseAgreement/${landlordId}`;
  if (landlordId == "NN1") {
    url = "Contract/AllLeaseAgreement";
  }
  try {
    const response = await getApi(url);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchWaitingLeases = async (landlordId, query) => {
  let url = `ContractRequest/Landlord/${landlordId}?pageNumber=${query.page}&pageSize=${query.size}`;
  if (landlordId == "NN1") {
    url = "ContractRequest/AllContractRequest";
  }
  try {
    const response = await getApi(url);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const ApproveDeclineLease = async (body) => {
  const url = "ContractRequest/Accept-Reject-Lease-Terminate-Request";
  try {
    const response = await postApi(url, body);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
