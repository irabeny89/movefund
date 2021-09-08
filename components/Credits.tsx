import Layout from "@/components/Layout";
import Head from "next/head";

const creditsStyle = {
  paddingBottom: "20rem",
};
const Credits = () => (
  <Layout>
    <Head>
      <title>MoveMoney | Credits History</title>
    </Head>
    <div style={creditsStyle}>
    <h2 className="display-3">Credits History</h2>
      <hr />
      <br />
    </div>
  </Layout>
);

export default Credits;
