import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormEvent, useState } from "react";
import { useMutation, useReactiveVar } from "@apollo/client";
import { SEND_MONEY_MUTATION } from "@/graphql/documentNodes";
import { accessTokenVar } from "@/graphql/reactiveVariables";
import AjaxFeedback from "./AjaxFeedback";
import Alert from "react-bootstrap/Alert";

const SendMoneyForm = () => {
  // get access token
  const accessToken = useReactiveVar(accessTokenVar);
  // form validation state
  const [validated, setValidated] = useState(false);
  // send money mutation hook
  const [sendMoney, { loading, error, data }] = useMutation<{
    sendMoney: string;
  }>(SEND_MONEY_MUTATION, {
    context: {
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
    refetchQueries: ["GetMyProfile"]
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const to = formData.get("to");
    const amount = formData.get("amount");

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    form.reset();

    // execute mutation with variables
    sendMoney({ variables: { to, amount: +amount! } });
  };

  if (loading) return <AjaxFeedback isLoading={loading} />;

  return (
    <div>
      {error && <AjaxFeedback error={error} />}
      {data && <Alert variant="success">{data.sendMoney}</Alert>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Control
          aria-label="to"
          placeholder="To"
          name="to"
          size="lg"
          required
          autoFocus
        />
        <Form.Control.Feedback type="invalid">
          This field is required!
        </Form.Control.Feedback>
        <br />
        <Form.Control
          type="number"
          min={1}
          aria-label="amount"
          placeholder="Amount"
          name="amount"
          size="lg"
          required
        />
        <Form.Control.Feedback type="invalid">
          This field is required!
        </Form.Control.Feedback>
        <br />
        <br />
        <Button type="submit" size="lg">
          Send
        </Button>
      </Form>
    </div>
  );
};

export default SendMoneyForm;
