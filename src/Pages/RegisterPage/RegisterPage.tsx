import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Context/userAuth";
import { useForm } from "react-hook-form";
import "./RegisterPage.css";

type Props = {};

type RegisterFromsInput = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
};

const validation = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const RegisterPage = (props: Props) => {
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFromsInput>({ resolver: yupResolver(validation) });

  const handleRegister = (form: RegisterFromsInput) => {
    registerUser(
      form.firstName,
      form.lastName,
      form.email,
      form.phoneNumber,
      form.password
    );
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="register-container">
        <div className="register-form">
          <h1>Sign up</h1>
          <form onSubmit={handleSubmit(handleRegister)}>
            <div>
              <label className="register-label" htmlFor="text">
                First Name
              </label>
              <input
                className="register-input"
                type="text"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="register-error">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="register-label" htmlFor="text">
                Last Name
              </label>
              <input
                className="register-input"
                type="text"
                id="lastName"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="register-error">{errors.lastName.message}</p>
              )}
            </div>
            <div>
              <label className="register-label" htmlFor="text">
                Phone Number
              </label>
              <input
                className="register-input"
                type="text"
                id="phoneNumber"
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <p className="register-error">{errors.phoneNumber.message}</p>
              )}
            </div>
            <div>
              <label className="register-label" htmlFor="email">
                Email
              </label>
              <input
                className="register-input"
                type="text"
                id="email"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <p className="register-error">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="register-label" htmlFor="password">
                Password
              </label>
              <input
                className="register-input"
                type="password"
                id="password"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="register-error">{errors.password.message}</p>
              )}
            </div>
            <button className="register-button" type="submit">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default RegisterPage;
