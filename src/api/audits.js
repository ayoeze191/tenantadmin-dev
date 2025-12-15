import handleError from "@/utils/handleError";
import { getApi, postApi, putApi } from "@/utils/reqClient";

export const auditsLogs = async (params = {}) => {
  try {
    const query = new URLSearchParams({
      userId: params.userId || "",
      fxn: params.fxn || "",
      currentPage: params.page || 1,
      pageSize: params.size || 10,
      dateFrom: params.dateFrom || "",
      dateTo: params.dateTo || "",
    }).toString();

    const res = await getApi(`AuditTrail/GetAllAuditTrail?${query}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};
