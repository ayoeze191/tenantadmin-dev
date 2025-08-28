import handleError from "@/utils/handleError";
import { getApi, postApi, putApi } from "@/utils/reqClient";

export const FetchTenant = async (query) => {
  try {
    const response = await getApi(
      `Accommodation/GetAccommodationApplicationById?CurrentPage=${query.page}&pageSize=${query.size}`
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
