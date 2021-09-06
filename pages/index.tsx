import Head from "next/head";
import Link from "next/link";
import { Button, ButtonGroup } from "react-bootstrap";

const Home = () => (
  <div className="pt-3 px-2">
    <Head>
      <title>Home | MoveMoney</title>
    </Head>
    <h1 className="display-3">MoveMoney</h1>
    <h2>Features</h2>
    <ul>
      <li>Send money to other users</li>
      <li>Receive money from users</li>
      <li>Request loan from app</li>
      <li>Withdraw money - coming soon</li>
    </ul>
    <div className="text-center pt-5">
      <ButtonGroup>
        <Link href="/register">
          <Button variant="outline-secondary">Register</Button>
        </Link>
        <Link href="/login">
          <Button variant="outline-primary">Login</Button>
        </Link>
        <Button variant="light">Test Account</Button>
      </ButtonGroup>
    </div>
  </div>
);

export default Home;
