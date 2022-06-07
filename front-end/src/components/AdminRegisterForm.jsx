import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { apiPostToken, EMAIL_PATTERN, getItemLocalStorage } from "../services";

export default function AdminRegisterForm({ changeButton }) {
  const [errorRegister, setErrorRegister] = useState(false);
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
      role: "",
    },
  });

  const onSubmit = async (data) => {
    setErrorRegister(false);
    try {
      const { token } = getItemLocalStorage("user");
      await apiPostToken("/admin", data, token);
      changeButton();
    } catch (err) {
      setErrorRegister(true);
      console.log(err);
    }
  };

  return (
    <div className="mx-8 my-4">
      <p className="inline-block text-lg mb-4 border-b-2 border-violet-800">
        Cadastrar Novo Usuário
      </p>
      <form
        className="p-4 flex gap-2 items-start justify-between overflow-auto bg-gray-100 shadow-md rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="block pl-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Nome do usuário"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("name", {
              required: true,
              minLength: {
                value: 1,
                message: "Name must have at least one character",
              },
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div >
          <label className="block pl-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="seu-email@site.com.br"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("email", {
              required: true,
              pattern: {
                value: EMAIL_PATTERN,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label className="block pl-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="******"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("password", {
              required: true,
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <label className="block pl-2" htmlFor="role">
            Role
          </label>
          <select
            id="role"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("role", { required: true })}
          >
            <option value="">Selecione o tipo</option>
            <option value="administrator">Admin</option>
            <option value="seller">Vendedor</option>
            <option value="user">Usuário</option>
          </select>
        </div>

        <div className="py-5 px flex justify-center items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 py-3 px-4 rounded-md font-bold cursor-pointer text-white"
            type="submit"
            disabled={!isValid}
          >
            Cadastrar
          </button>
        </div>
        {errorRegister && <p>Erro ao cadastrar usuário</p>}
      </form>
    </div>
  );
}
