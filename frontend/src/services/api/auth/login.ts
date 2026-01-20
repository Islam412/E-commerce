import { apiPath } from "@/utils/apiPath";
import axios from "axios";

export type LoginValues = {
 
  email: string;
  password: string;
};

export async function loginUser(payload: LoginValues) {
  const formData = new FormData();
  
  formData.append("email", payload.email.toLowerCase()); // ✅ اختياري
  formData.append("password", payload.password);

  const res = await axios.post(apiPath`api/token/`, formData);

  return res.data;
}
