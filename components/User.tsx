import { Card } from "react-bootstrap";
import { UserType } from "types";

type UserProps = {
  summary: Pick<
    UserType,
    | "firstname"
    | "lastname"
    | "balance"
    | "createdAt"
    | "email"
    | "phone"
    | "currency"
    | "_id"
  >;
};

const User = ({
  summary: {
    firstname,
    lastname,
    balance,
    createdAt,
    email,
    phone,
    currency,
    _id,
  },
}: UserProps) => {
  return (
    <Card className="bg-dark mb-3">
      <Card.Header>
        {firstname} {lastname} {_id}
      </Card.Header>
      <Card.Body>
        <p>
          Balance: &#8358; {balance}
        </p>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
      </Card.Body>
      <Card.Footer>
        Registered: {new Date(+createdAt!).toUTCString()}
      </Card.Footer>
    </Card>
  );
};

export default User;
