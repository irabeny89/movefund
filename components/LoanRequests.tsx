import Loans from "@/components/Loans";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { LoanType, UserType } from "types";
import { useMutation, useReactiveVar } from "@apollo/client";
import { REPLY_LOAN_REQUEST_MUTATION } from "@/graphql/documentNodes";
import { accessTokenVar } from "@/graphql/reactiveVariables";
import AjaxFeedback from "./AjaxFeedback";
import { Alert } from "react-bootstrap";

type LoanRequestsProps = {
  usersWithPendingLoans: UserType[];
};

const usersStyle = {
  paddingBottom: "20rem",
};

const LoanRequests = ({ usersWithPendingLoans }: LoanRequestsProps) => {
  const accessToken = useReactiveVar(accessTokenVar);
  const [replyLoanRequest, { loading, error, data }] = useMutation<{
    replyLoanRequest: string;
  }>(REPLY_LOAN_REQUEST_MUTATION, {
    context: {
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
    refetchQueries: ["GetAllUsers"],
  });

  const handleReply = (id: any, reply: "APPROVED" | "DISAPPROVED") =>
    replyLoanRequest({
      variables: { userId: id, reply: reply },
    });

  return (
    <div style={usersStyle}>
      {usersWithPendingLoans.map(({ _id, firstname, lastname, loans }) => {
        const _loans = loans as LoanType[]
        return _loans.length < 1 ? null : (
          <div key={String(_id)}>
            <h2>
              {firstname} {lastname}
            </h2>
            {error && <AjaxFeedback error={error} />}
            {data && <Alert variant="success">{data.replyLoanRequest}</Alert>}
            <Loans loans={_loans} key={String(_id)} />
            <ButtonGroup>
              <Button
                variant="danger"
                onClick={() => handleReply(_id, "DISAPPROVED")}
                disabled={loading}
              >
                Disapprove
              </Button>
              <Button
                variant="success"
                onClick={() => handleReply(_id, "APPROVED")}
                disabled={loading}
              >
                Approve
              </Button>
            </ButtonGroup>
            {loading && <Spinner animation="grow" />}
          </div>
        );
      })}
    </div>
  );
};

export default LoanRequests;
