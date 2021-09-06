import Layout from "@/components/Layout";
import Head from "next/head";
import { FormControl, Button } from "react-bootstrap";

const registerStyle = {
  paddingBottom: "20rem",
};

const Register = () => (
  <Layout>
    <Head>
      <title>MoveMoney | Register</title>
    </Head>
    <div style={registerStyle}>
      <h2 className="display-3">Register</h2><hr />
      <br />
      <FormControl aria-label="first name" placeholder="First name" size="lg" />
      <br />
      <FormControl aria-label="last name" placeholder="Last name" size="lg" />
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
      <FormControl aria-label="Phone" placeholder="Phone" size="lg" />
      <br />
      <br />
      <Button size="lg">Submit</Button>
    </div>
  </Layout>
);

export default Register;
