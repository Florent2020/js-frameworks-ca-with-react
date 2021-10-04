import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import ValidationError from "../forms/ValidationError";
import { BASE_URL, TOKEN_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

const url = BASE_URL + TOKEN_PATH;
console.log(url);

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username!"),
  password: yup.string().required("Please enter your password!"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    // console.log(data);
    console.log(auth);

    try {
      const response = await axios.post(url, data);
      console.log("response", response.data);
      setAuth(response.data);
      history.push("/admin");
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container>
      {loginError && (
        <Alert variant="danger">Username or Password is wrong!!!</Alert>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={submitting}>
          <Form.Group>
            <Form.Control
              name="username"
              placeholder="Username"
              {...register("username")}
            />
            {errors && errors.username && (
              <ValidationError>{errors.username.message}</ValidationError>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Control
              name="password"
              placeholder="Password"
              {...register("password")}
              type="password"
            />
            {errors && errors.password && (
              <ValidationError>{errors.password.message}</ValidationError>
            )}
          </Form.Group>
          <Button variant="info" type="submit">
            {submitting ? "Logging" : "Login"}
          </Button>
        </fieldset>
      </Form>
    </Container>
  );
}
