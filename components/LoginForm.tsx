import { gql, useMutation } from "@apollo/client";
import { accessTokenVar } from "@/graphql/reactiveVariables";
import { FormEvent, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { TokenType } from "types";
import { useRouter } from "next/router";
import AjaxFeedback from "./AjaxFeedback";
import { LOGIN_MUTATION } from "../graphql/documentNodes";

const LoginForm = () => {
  const { push } = useRouter();
  const [validated, setValidated] = useState(false);
  const [login, { loading, error }] = useMutation<{
    login: TokenType;
  }>(LOGIN_MUTATION);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    form.reset();
    // execute mutation with variables
    const { data } = await login({
      variables: {
        email,
        password,
      },
    });
    // update token state variable
    accessTokenVar(data?.login?.accessToken!);
    // redirect to dashboard
    push("/me");
  };

  if (loading) return <AjaxFeedback isLoading={loading} />;

  return (
    <>
      {error && <AjaxFeedback error={error} />}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Control
          type="email"
          aria-label="email"
          placeholder="Email"
          name="email"
          size="lg"
          required
          autoFocus
        />
        <Form.Control.Feedback type="invalid">
          This field is required!
        </Form.Control.Feedback>
        <br />
        <Form.Control
          type="password"
          minLength={6}
          aria-label="password"
          placeholder="Password"
          name="password"
          size="lg"
          required
        />
        <Form.Control.Feedback type="invalid">
          This field is required!
        </Form.Control.Feedback>
        <br />
        <br />
        <Button type="submit" size="lg" disabled={loading}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
