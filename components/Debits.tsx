import Card from "react-bootstrap/Card";
import { DebitType, UserType } from "types";

type DebitProps = {
  debits: DebitType[];
};

const Debits = ({ debits }: DebitProps) => {
  if (debits.length < 1) return <>No debit record...</>;
  return (
    <>
      {debits.map(({ _id, amount, createdAt, to }) => {
        const { firstname, lastname, _id: id } = to as UserType;
        return (
          <Card className="bg-dark mb-3" key={String(_id)}>
            <Card.Header>
              Recipient: {firstname} {lastname} {id}
            </Card.Header>
            <Card.Body>
              <p>Amount sent: &#8358; {amount}</p>
            </Card.Body>
            <Card.Footer>
              Sent: {new Date(+createdAt!).toUTCString()}
            </Card.Footer>
          </Card>
        );
      })}
    </>
  );
};

export default Debits;
