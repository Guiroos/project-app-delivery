import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  STATUS,
  EMAIL_PATTERN,
  apiPostBody,
  saveToLocalStorage,
} from "../services";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
    <Form className="register_form" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="name">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="name"
          name="name"
          placeholder="Seu nome"
          {...register("name", {
            required: true,
            minLength: {
              value: 12,
              message: "Name must be at least 12 characters",
            },
          })}
        />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="seu-email@site.com.br"
          {...register("email", {
            required: true,
            pattern: {
              value: EMAIL_PATTERN,
              message: "Invalid email",
            },
          })}
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Senha</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="******"
          {...register("password", {
            required: true,
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
      </Form.Group>

      <Form.Group controlId="buttons">
        <Button variant="primary" onClick={() => navigate("/login")}>
          Voltar ↩️
        </Button>
        <Button type="submit" disabled={!isValid}>
          Cadastrar
        </Button>
      </Form.Group>

      <Form.Group controlId="errors">
        {errors.name && <p>{errors.name.message}</p>}
        {errors.email && <p>{errors.email.message}</p>}
        {errors.password && <p>{errors.password.message}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </Form.Group>
    </Form>
  );
}
