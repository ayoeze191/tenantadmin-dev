import handleError from "@/utils/handleError";
import { getApi, postApi, putApi } from "@/utils/reqClient";

export const LoginUser = async (payload) => {
  try {
    const response = await postApi(`AdminUser/Login`, payload);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const CreateUser = async (payload) => {
  try {
    const response = await postApi("Account/CreateUser", payload);
    if (response.data.responseCode == "00") {
      const createlandlord = await SignUpLandlord(
        response.data.onboardedAccount.accountId
      );
      return createlandlord;
    } else {
      return response.data;
    }
  } catch (error) {
    handleError(error);
  }
};
// export const CreateUser = async (payload) => {
//   try {
//     const response = await postApi("AdminUser/AddAdminUser");
//     return response.data;
//   } catch (err) {
//     console.log(err);
//   }
// };

export const AddAdminUser = async (payload) => {
  try {
    const response = await postApi(`AdminUser/AddAdminUser`, payload);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const FetchLandlords = async (query) => {
  try {
    const response = await getApi(
      `Account/GetAllAccount?PageSize=${query.size}&CurrentPage=${query.page}&AccountType=0&SearchTerm=${query.query}`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const FetchAdmins = async () => {
  try {
    const response = await getApi(`AdminUser/GetAllAdminUser`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const SignUpLandlord = async (id) => {
  try {
    const response = await postApi(`AdminUser/SignUpLandLord?LandlordID=${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const EditLandlordEmail = async (payload) => {
  try {
    const response = await postApi(`Account/UpdateLandlordEmail`, payload);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const EditAdmin = async (payload) => {
  try {
    const response = await putApi(`AdminUser/UpdateAdminUser`, payload);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const UpdateAdminStatus = async (payload) => {
  try {
    const response = await putApi(
      `AdminUser/UpdateUserActiveStatus?AdminUserID=${payload.id}&AdminUserStatus=${payload.status}`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const ResetAdminPassword = async (payload) => {
  try {
    const response = await postApi(`AdminUser/ResetPassword`, payload);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const CompleteOnboard = async (payload) => {
  try {
    const response = await putApi(`Account/CompleteOnboard`, payload);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const ResendOtp = async (payload) => {
  try {
    const response = await getApi(
      `Account/ResendOTP?emailAddress=${payload.emailAddress}`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const VerifyOtp = async (payload) => {
  try {
    const response = await postApi("Account/VerifyOTP", payload);
    return response.data;
  } catch (err) {
    handleError(err);
  }
};
export const ForgottenPassword = async (payload) => {
  try {
    const response = await postApi("Account/ForgetPassword", payload);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const ResetPassword = async (payload) => {
  try {
    const response = await postApi("Account/ResetPassword", payload);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const VerifyLandlord = async (payload) => {
  try {
    const response = await putApi(
      `AdminUser/VerifyUser?AdminUserID=${payload.AdminUserID}`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
