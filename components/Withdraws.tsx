import Layout from "@/components/Layout";
import Head from "next/head";

const withdrawsStyle = {
  paddingBottom: "20rem",
};
const Withdraws = () => (
  <Layout>
    <Head>
      <title>MoveMoney | Withdraws History</title>
    </Head>
    <div style={withdrawsStyle}>
    <h2 className="display-3">Withdraws History</h2>
      <hr />
      <br />
      <p>Coming soon...</p>
    </div>
  </Layout>
);

export default Withdraws;
