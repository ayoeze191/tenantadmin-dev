
import handleError from "@/utils/handleError";
import { getApi, postApi } from "@/utils/reqClient";

export const FetchLeases =  async (landlordId,query) => {
    try {
      const response = await getApi(`ContractRequest/Landlord/${landlordId}?pageNumber=${query.page}&pageSize=${query.size}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
};