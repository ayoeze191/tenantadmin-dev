import handleError from "@/utils/handleError";
import { getApi, postApi, putApi } from "@/utils/reqClient";

export const auditsLogs = async (currentPage) => {
  let res;
  try {
    res = await getApi(`AuditTrail/GetAllAuditTrail?currentPage=${currentPage}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};
