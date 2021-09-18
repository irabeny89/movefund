import { gql, useMutation } from "@apollo/client";
import { accessTokenVar } from "@/graphql/reactiveVariables";
import { FormEvent, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { TokenType } from "types";
import { useRouter } from "next/router";
import AjaxFeedback from "./AjaxFeedback";
import { REGISTER_MUTATION } from "@/graphql/documentNodes";

const RegisterForm = () => {
  const { push } = useRouter();
  const [validated, setValidated] = useState(false);
  const [createUser, { loading, error }] = useMutation<{
    registerUser: TokenType;
  }>(REGISTER_MUTATION);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");
    const phone = formData.get("phone");

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    form.reset();
    // execute mutation
    const { data } = await createUser({
      variables: {
        userData: {
          firstname,
          lastname,
          email,
          password,
          phone,
        },
      },
    });
    // update token state variable
    accessTokenVar(data?.registerUser?.accessToken);
    // redirect to dashboard
    push("/me");
  };

  return (
    <>
      <AjaxFeedback
        error={error}
        isLoading={loading}
        spinnerMessage="MoveMoney"
      />
      {!loading && (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Control
            aria-label="first name"
            placeholder="First name"
            name="firstname"
            size="lg"
            required
            autoFocus
          />
          <Form.Control.Feedback type="invalid">
            This field is required!
          </Form.Control.Feedback>
          <br />
          <Form.Control
            aria-label="last name"
            placeholder="Last name"
            name="lastname"
            size="lg"
            required
          />
          <Form.Control.Feedback type="invalid">
            This field is required!
          </Form.Control.Feedback>
          <br />
          <Form.Control
            aria-label="email"
            placeholder="Email"
            type="email"
            size="lg"
            name="email"
            required
          />
          <Form.Control.Feedback type="invalid">
            This field is required!
          </Form.Control.Feedback>
          <br />
          <Form.Control
            minLength={6}
            type="password"
            aria-label="password"
            placeholder="Password"
            name="password"
            size="lg"
            required
          />
          <Form.Text>Password should be 6 or more characters</Form.Text>
          <Form.Control.Feedback type="invalid">
            This field is required!
          </Form.Control.Feedback>
          <br />
          <Form.Control
            type="tel"
            aria-label="Phone"
            placeholder="Phone"
            size="lg"
            name="phone"
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
      )}
    </>
  );
};

export default RegisterForm;
