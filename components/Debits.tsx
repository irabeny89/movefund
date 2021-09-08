import Layout from "@/components/Layout";
import Head from "next/head";

const debitsStyle = {
  paddingBottom: "20rem",
};
const Debits = () => (
  <Layout>
    <Head>
      <title>MoveMoney | Debits History</title>
    </Head>
    <div style={debitsStyle}>
    <h2 className="display-3">Debits History</h2>
      <hr />
      <br />
    </div>
  </Layout>
);

export default Debits;
