import { apiPath } from "@/utils/apiPath";
import axios from "axios";

export type RegisterValues = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
};

export async function registerUser(payload: RegisterValues) {
  const formData = new FormData();
  formData.append("first_name", payload.first_name);
  formData.append("last_name", payload.last_name);
  formData.append("username", payload.username);
  formData.append("email", payload.email.toLowerCase()); // ✅ اختياري
  formData.append("password", payload.password);

  const res = await axios.post(apiPath`user/api/create/`, formData);

  return res.data;
}
