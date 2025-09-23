import apiClient from "./apiClient";
import type { User, UserCheck, UserLogin } from "@/models/user";

export const Register = async (RegisterUser: User): Promise<string> => {
  const response = await apiClient.post<string>("/Auth/Register", RegisterUser);
  return response.data;
};

export const Login = async (LoginDetails: UserLogin): Promise<string> => {
  const response = await apiClient.post<string>("/Auth/Login", LoginDetails);
  return response.data;
};

export const Check = async (): Promise<UserCheck> => {
  const response = await apiClient.get<UserCheck>("/Auth/Check");
  return response.data;
};
