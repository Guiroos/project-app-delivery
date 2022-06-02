import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  saveToLocalStorage,
  apiPostBody,
  EMAIL_PATTERN,
  STATUS,
} from "../services";

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const verifyRole = (role) => {
    if (role === "seller") {
      return "/seller/orders";
    }
    if (role === "administrator") {
      return "/admin/manage";
    }
    return "/customer/products";
  };

  const onSubmit = async (data) => {
    try {
      const sendData = await apiPostBody("/login", data);
      if (sendData.status === STATUS.OK) {
        saveToLocalStorage("user", sendData.data);
        const path = verifyRole(sendData.data.role);
        navigate(path);
      } else {
        setErrorMessage("Usuário não existe ou senha incorreta");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === STATUS.NOT_FOUND) {
        setErrorMessage("Usuário não existe ou senha incorreta");
      }
    }
  };

  return (
    <div className="w-full max-w-lg flex flex-col items-center md:text-xl lg:text-2xl mb-40">
      <form
        className="bg-slate-100 shadow-md rounded px-8 py-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-5">
          <label className="block mb-3" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="email@site.com.br"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("email", {
              required: true,
              pattern: {
                value: EMAIL_PATTERN,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-5">
          <label className="block mb-3" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="******"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("password", {
              required: true,
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        {errorMessage && (
          <p className="mt-1 text-red-500 text-sm">{errorMessage}</p>
        )}

        <div className="flex items-center justify-around text-white">
          <button
            className="bg-blue-500 hover:bg-blue-700 py-3 px-4 rounded-md font-bold cursor-pointer"
            type="submit"
            disabled={!isValid}
          >
            Sign in
          </button>
          <button
            className="bg-purple-500 hover:bg-purple-700 py-3 px-4 rounded-md font-bold cursor-pointer"
            type="button"
            onClick={() => navigate("/register")}
          >
            New account?
          </button>
        </div>
      </form>
      <p className="text-xs">©2022 All rights reserved to guiroos</p>
    </div>
  );
}
