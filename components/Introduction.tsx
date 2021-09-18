import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import { ReactNode } from "react";
import config from "config";

type IntroProps = {
  children: ReactNode;
  features: string[];
  testAccount: {
    email: string;
    password: string;
  }
};

const { title } = config.appData;

const Introduction = ({ children, features, testAccount }: IntroProps) => {
  return (
    <div>
      <h1 className="display-3">{title}&trade;</h1>
      <hr />
      <br />
      <h2>Features</h2>
      <ul className="pb-4">
        {features.map((feature, i) => {
          if (feature.includes(title))
            return <li key={i}>{feature}&trade;</li>;
          if (feature.includes("Withdraw money"))
            return (
              <li key={i}>
                {feature} - <Badge className="bg-info">coming soon</Badge>
              </li>
            );
          return <li key={i}>{feature}</li>;
        })}
      </ul>
      <hr />
      {children}
      <hr />
      <Card className="bg-dark">
        <Card.Header className="h4">Test Account</Card.Header>
        <Card.Body>
          <p>Email: {testAccount.email}</p>
          <p>Password: {testAccount.password}</p>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Introduction;
