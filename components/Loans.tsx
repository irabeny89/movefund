import Layout from "@/components/Layout";
import Head from "next/head";

const LoansStyle = {
  paddingBottom: "20rem",
};
const Loans = () => (
  <Layout>
    <Head>
      <title>MoveMoney | Loans History</title>
    </Head>
    <div style={LoansStyle}>
    <h2 className="display-3">Loans History</h2>
      <hr />
      <br />
    </div>
  </Layout>
);

export default Loans;
