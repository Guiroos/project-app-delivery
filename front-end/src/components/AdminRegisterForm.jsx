import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { apiPostToken, EMAIL_PATTERN, getItemLocalStorage } from "../services";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
      const { token } = getItemLocalStorage('user');
      await apiPostToken('/admin', data, token);
      changeButton();
    } catch (err) {
      setErrorRegister(true);
      console.log(err);
    }
  };


  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Nome do usuário"
          {...register("name", {
            required: true,
            minLength: {
              value: 12,
              message: "Name must be at least 12 characters",
            },
          })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
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
        {errors.email && <p>{errors.email.message}</p>}
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
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
        {errors.password && <p>{errors.password.message}</p>}
      </Form.Group>

      <Form.Group controlId="formBasicRole">
        <Form.Label>Role</Form.Label>
        <Form.Control
          as="select"
          name="role"
          {...register("role", { required: true })}
        >
          <option value="">Selecione o tipo</option>
          <option value="administrator">Admin</option>
          <option value="seller">Vendedor</option>
          <option value="user">Usuário</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formBasicButton">
        <Button type="submit" disabled={!isValid}>Cadastrar</Button>
      </Form.Group>
    </Form>
  );
}
