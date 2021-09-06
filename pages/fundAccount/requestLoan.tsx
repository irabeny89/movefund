import Layout from "@/components/Layout";
import Head from "next/head";
import { FormControl, Button, Alert, Badge } from "react-bootstrap";

const requestLoanStyle = {
  paddingBottom: "20rem",
};

const badgeStyle = { fontSize: "0.9rem" };
const RequestLoan = () => (
  <Layout>
    <Head>
      <title>MoveMoney | Request Loan</title>
    </Head>
    <div style={requestLoanStyle}>
      <h2 className="display-3">Request Loan</h2>
      <hr />
      <br />
      <FormControl aria-label="amount" placeholder="Amount" size="lg" />
      <br />
      <br />
      <Button size="lg">Submit</Button>
      <hr />
      <br />
      <Alert variant="info">
        <Alert.Heading>Note</Alert.Heading><hr />
        <ul>
          <li>
            Maximum loan:{" "}
            <Badge className="bg-primary" style={badgeStyle}>
              &#8358; 10,000
            </Badge>
          </li>
          <li>
            Interest rate: <Badge className="bg-primary" style={badgeStyle}>3 %</Badge> every
            month.
          </li>
        </ul>
      </Alert>
    </div>
  </Layout>
);

export default RequestLoan;
