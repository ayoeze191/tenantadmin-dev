import handleError from "@/utils/handleError";
import { getApi, postApi, putApi } from "@/utils/reqClient";

export const auditsLogs = async () => {
  let res;
  try {
    res = await getApi(`AuditTrail/GetAllAuditTrail`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};
