import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import { REQUEST_LOAN_MUTATION } from "@/graphql/documentNodes";
import { useMutation, useReactiveVar } from "@apollo/client";
import { accessTokenVar } from "@/graphql/reactiveVariables";
import { FormEvent, useState } from "react";
import AjaxFeedback from "@/components/AjaxFeedback";
import { usePayload } from "hooks";
import config from "config";
// max amount loanable
const { maxLoan, monthlyInterestRate } = config.environmentVariable;

const badgeStyle = { fontSize: "0.9rem" };

const RequestLoanForm = () => {
  // access token from reactive variable
  const accessToken = useReactiveVar(accessTokenVar);
  const { jwtPayload } = usePayload();
  // form validation state
  const [validated, setValidated] = useState(false);
  // request mutation function and trigger a refresh of profile data
  const [sendRequest, { loading, error, data }] = useMutation<{
    requestLoan: string;
  }>(REQUEST_LOAN_MUTATION, {
    context: {
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
    refetchQueries: ["GetMyProfile"],
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const amount = formData.get("amount");

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    form.reset();

    // execute mutation with variables
    sendRequest({
      variables: { userId: jwtPayload?.sub, amount: +amount! },
    });
  };

  if (loading) return <AjaxFeedback isLoading={loading} />;

  return (
    <div>
      {error && <AjaxFeedback error={error} />}
      {data && <Alert variant="success">{data.requestLoan}</Alert>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Control
          type="number"
          min={1}
          max={maxLoan}
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
      <hr />
      <br />
      <Alert variant="info">
        <Alert.Heading>Note</Alert.Heading>
        <hr />
        <ul>
          <li>
            Maximum loan:{" "}
            <Badge className="bg-primary" style={badgeStyle}>
              &#8358; {maxLoan}
            </Badge>
          </li>
          <li>
            Interest rate:{" "}
            <Badge className="bg-primary" style={badgeStyle}>
              {monthlyInterestRate * 100} %
            </Badge>{" "}
            every month.
          </li>
        </ul>
      </Alert>
    </div>
  );
};

export default RequestLoanForm;
