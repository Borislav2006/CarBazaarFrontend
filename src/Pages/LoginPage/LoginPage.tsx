import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Context/userAuth";
import { useForm } from "react-hook-form";
import "./LoginPage.css";

type Props = {};

type LoginFromsInput = {
  email: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = (props: Props) => {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFromsInput>({ resolver: yupResolver(validation) });

  const handleLogin = (form: LoginFromsInput) => {
    loginUser(form.email, form.password);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="login-container">
        <div className="login-form">
          <h1>Sign in to your account</h1>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div>
              <label className="login-label" htmlFor="email">
                Email
              </label>
              <input
                className="login-input"
                type="text"
                id="email"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <p className="login-error">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="login-label" htmlFor="password">
                Password
              </label>
              <input
                className="login-input"
                type="password"
                id="password"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="login-error">{errors.password.message}</p>
              )}
            </div>
            <button className="login-button" type="submit">
              Sign in
            </button>
            <p className="signup">
              Don’t have an account yet? <a href="/register">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
