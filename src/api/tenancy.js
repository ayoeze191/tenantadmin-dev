import handleError from "@/utils/handleError";
import { getApi, postApi, putApi } from "@/utils/reqClient";

export const FetchTenant = async () => {
  try {
    const response = await getApi(
      "Accommodation/GetAccommodationApplicationById"
    );
    return response.data;
  } catch (err) {
    console.log(err, "error");
  }
};
