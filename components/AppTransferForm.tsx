import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormEvent, useState } from "react";
import { accessTokenVar, myLastLoanAmountDueVar } from "@/graphql/reactiveVariables";
import { useReactiveVar, useMutation } from "@apollo/client";
import AjaxFeedback from "@/components/AjaxFeedback";
import { PAYBACK_LOAN_MUTATION } from "@/graphql/documentNodes";
import Alert from "react-bootstrap/Alert"

const AppTransferForm = () => {
  // access token from reactive variable
  const accessToken = useReactiveVar(accessTokenVar)
  const myLastLoanAmountDue = useReactiveVar(myLastLoanAmountDueVar);
  // form validation state
  const [validated, setValidated] = useState(false);
  // payback loan mutation function
  const [paybackLoan, { loading, error, data }] = useMutation<{
    paybackLoan: string;
  }>(PAYBACK_LOAN_MUTATION, {
    context: {
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const amount = formData.get("amount");

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    // reset form fields
    form.reset();
    // if fields are validated
    setValidated(true);

    // execute mutation with variables
    paybackLoan({
      variables: { method: "APP_TRANSFER", amount: +amount! },
    });
  };

  if (loading) return <AjaxFeedback isLoading={loading} />;
  
  return (
    <div>
      
      {error && <AjaxFeedback error={error} />}
      {data && <Alert variant="success">{data.paybackLoan}</Alert>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Control
          type="number"
          min={1}
          aria-label="amount"
          placeholder="Amount"
          name="amount"
          size="lg"
          required
          autoFocus
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
    </div>
  );
};

export default AppTransferForm;
