import React, { Children, createContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserProfile } from "../Models/User";
import axios from "axios";
import { toast } from "react-toastify";
import { login, register } from "../Services/AuthServices";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string
  ) => void;
  loginUser: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string
  ) => {
    await register(firstName, lastName, phoneNumber, email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj = {
            firstName: res?.data.firstName,
            lastName: res?.data.lastName,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success("Register Successfull!");
          navigate("/");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const loginUser = async (email: string, password: string) => {
    await login(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj = {
            firstName: res?.data.firstName,
            lastName: res?.data.lastName,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success("Login Successfull!");
          navigate("/");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    toast.success("Logout Successfull!");
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
