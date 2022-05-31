import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  STATUS,
  EMAIL_PATTERN,
  apiPostBody,
  saveToLocalStorage,
} from "../services";

export default function RegisterForm() {
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
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const sendData = await apiPostBody("/register", data);
      if (sendData.status === STATUS.CREATED) {
        saveToLocalStorage("user", sendData.data);
        navigate("/customer/products");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === STATUS.NOT_FOUND) {
        setErrorMessage("Usuário já existente");
      }
    }
  };

  return (
    <div className="w-full min-w-sm max-w-lg md:text-xl lg:text-2xl">
      <form
        className="bg-slate-100 shadow-md rounded px-8 py-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-5">
          <label className="block mb-3" htmlFor="name">
            Nome
          </label>
          <input
            type="name"
            id="name"
            placeholder="Seu nome"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("name", {
              required: true,
              minLength: {
                value: 1,
                message: "Name must have at least one character",
              },
            })}
          />
          {errors.name && (
            <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-5">
          <label>Email</label>
          <input
            type="email"
            id="email"
            placeholder="seu-email@site.com.br"
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
          <label>Senha</label>
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

        <div className="flex items-center justify-around text-white">
          <button
            className="bg-purple-500 hover:bg-purple-700 py-3 px-4 rounded-md font-bold cursor-pointer"
            type="button"
            onClick={() => navigate("/login")}
          >
            Go back
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 py-3 px-4 rounded-md font-bold cursor-pointer"
            type="submit"
            disabled={!isValid}
          >
            Register
          </button>
        </div>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}
