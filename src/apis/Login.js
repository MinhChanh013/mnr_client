import { poster } from "../services/BaseService";

export const loginApi = async (loginForm) =>
  await poster("/auth/getToken", loginForm);
