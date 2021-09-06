import Layout from "@/components/Layout";
import Head from "next/head";

const loanRequestsStyle = {
  paddingBottom: "20rem",
};
const loanRequests = () => (
  <Layout>
    <Head>
      <title>MoveMoney | Loan Requests</title>
    </Head>
    <div style={loanRequestsStyle}>
    <h2 className="display-3">Loan Requests</h2>
      <hr />
      <br />
    </div>
  </Layout>
);

export default loanRequests;
