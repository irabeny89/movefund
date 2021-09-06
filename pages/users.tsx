import Layout from "@/components/Layout";
import Head from "next/head";

const usersStyle = {
  paddingBottom: "20rem",
};
const users = () => (
  <Layout>
    <Head>
      <title>MoveMoney | All Users</title>
    </Head>
    <div style={usersStyle}>
    <h2 className="display-3">All Users</h2>
      <hr />
      <br />
    </div>
  </Layout>
);

export default users;
