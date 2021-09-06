import Layout from "@/components/Layout";
import Head from "next/head";
import { FormControl, Button } from "react-bootstrap";

const loginStyle = {
  paddingBottom: "20rem",
};

const Login = () => (
  <Layout>
    <Head>
      <title>MoveMoney | Login</title>
    </Head>
    <div style={loginStyle}>
      <h2 className="display-3">Login</h2><hr />
      <br />
      <FormControl aria-label="email" placeholder="Email" size="lg" />
      <br />
      <FormControl
        type="password"
        aria-label="password"
        placeholder="Password"
        size="lg"
      />
      <br />
      <br />
      <Button size="lg">Submit</Button>
    </div>
  </Layout>
);

export default Login;
