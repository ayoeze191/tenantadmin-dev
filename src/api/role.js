import handleError from "@/utils/handleError";
import { getApi, postApi } from "@/utils/reqClient";

export const FetchRoles =  async (payload) => {
    try {
      const response = await getApi(`Role/GetAllRoles`, payload);
      return response.data;
    } catch (error) {
      handleError(error);
    }
};
export const FetchPermissions =  async (payload) => {
    try {
      const response = await getApi(`AdminUserFunction/GetAllFunctions`, payload);
      return response.data;
    } catch (error) {
      handleError(error);
    }
};

export const CreateRole =  async (payload) => {
    try {
      const response = await postApi(`Role/AddRole`,payload);
      return response.data;
    } catch (error) {
      handleError(error);
    }
};

export const EditRole = async (payload) => {
    try {
      const response = await postApi(`Role/UpdateRole`,payload);
      return response.data;
    } catch (error) {
      handleError(error);
    }
};

export const DeleteRole =  async (id) => {
    try {
      const response = await postApi(`Role/RemoveRole?RoleID=${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
};
