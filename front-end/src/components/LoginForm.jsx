import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  saveToLocalStorage,
  apiPostBody,
  EMAIL_PATTERN,
  STATUS,
} from "../services";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
    <Form className="login_form" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="email@site.com.br"
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
        <Form.Label>Password</Form.Label>
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
        <Button type="submit" variant="primary" disabled={!isValid}>
          Entrar
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate("/register")}
        >
          Ainda não tenho conta
        </Button>
      </Form.Group>
      <Form.Group controlId="errors">
        {errors.email && <p>{errors.email.message}</p>}
        {errors.password && <p>{errors.password.message}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </Form.Group>
    </Form>
  );
}
