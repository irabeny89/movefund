import Layout from "@/components/Layout";
import Head from "next/head";
import Link from "next/link";
import { Badge, Button, ButtonGroup } from "react-bootstrap";

const homeStyle = {
  paddingBottom: "25rem",
};

const Home = () => (
  <Layout>
    <div style={homeStyle}>
      <Head>
        <title>MoveMoney | Home</title>
      </Head>
      <h1 className="display-3">MoveMoney</h1>
      <hr />
      <br />
      <h2>Features</h2>
      <ul>
        <li>Send money to other users</li>
        <li>Receive money from users</li>
        <li>Request loan from us</li>
        <li>
          Withdraw money - <Badge className="bg-info">coming soon</Badge>
        </li>
      </ul>
      <div className="text-center pt-5">
        <ButtonGroup>
          <Link href="/member/register">
            <Button variant="outline-warning">Register</Button>
          </Link>
          <Link href="/member/login">
            <Button variant="outline-primary">Login</Button>
          </Link>
          <Button variant="light">Test Account</Button>
        </ButtonGroup>
      </div>
    </div>
  </Layout>
);

export default Home;
