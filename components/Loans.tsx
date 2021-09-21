import Card from "react-bootstrap/Card";
import { LoanType } from "types";

type LoansProps = {
  loans: LoanType[];
};

const getLoanStyle = (
  isPaid: boolean,
  status: "APPROVED" | "DISAPPROVED" | "PENDING"
) => {
  if (status == "APPROVED" && isPaid) return "bg-success";
  if (status == "APPROVED" && !isPaid) return "bg-danger";
  if (status == "PENDING") return "bg-info";
  return "bg-dark";
};

const Loans = ({ loans }: LoansProps) => {
  if (loans.length < 1) return <>No loan record...</>;
  return (
    <>
      {loans.map(
        ({
          amount,
          isPaid,
          createdAt,
          status,
          amountDue,
          deadline,
          monthlyInterestRate,
          _id,
        }) => (
          <Card
            className={`${getLoanStyle(isPaid!, status!)} mb-3`}
            key={String(_id)}
          >
            <Card.Header>
              <div>
                &#8358; {amount} - {status}
              </div>
              <div>
                {status == "APPROVED" && isPaid && "Paid"}
                {status == "APPROVED" && !isPaid && "Owing"}
              </div>
            </Card.Header>
            <Card.Body>
              {status === "APPROVED" && <p>Amount Due: &#8358; {amountDue}</p>}
              <p>Interest Rate per Month: {monthlyInterestRate} %</p>
              {status === "APPROVED" && (
                <p>Deadline: {new Date(+deadline!).toDateString()}</p>
              )}
            </Card.Body>
            <Card.Footer>
              Requested on: {new Date(+createdAt!).toUTCString()}
            </Card.Footer>
          </Card>
        )
      )}
    </>
  );
};

export default Loans;
