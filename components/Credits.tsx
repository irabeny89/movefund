import Card from "react-bootstrap/Card";
import { CreditType } from "types";

type CreditsProps = {
  credits: CreditType[];
};

const Credits = ({ credits }: CreditsProps) => {
  if (credits.length < 1) return <>No credit record...</>;
  return (
    <>
      {credits.map(({ amount, from, method, _id, createdAt }) => (
        <Card className="bg-dark mb-3" key={String(_id)}>
          <Card.Header>&#8358; {amount}</Card.Header>
          <Card.Body>
            <p>Sender: {from}</p>
            <p>Transfer Method: {method}</p>
          </Card.Body>
          <Card.Footer>
            Recieved: {new Date(+createdAt!).toUTCString()}
          </Card.Footer>
        </Card>
      ))}
    </>
  );
};

export default Credits;
