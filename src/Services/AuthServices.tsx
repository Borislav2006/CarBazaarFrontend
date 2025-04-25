import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

const api = "https://localhost:5001/";

export const login = async (email: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "login", {
      email: email,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "register", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
