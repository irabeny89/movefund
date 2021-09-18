import Layout from "@/components/Layout";
import Head from "next/head";
import { CSSProperties } from "react";
import ClientOnly from "./ClientOnly";
import LoginForm from "./LoginForm";

const Login = () => (
  <div className="py-5">
    <h2 className="display-4">Login</h2>
    <br />
    <ClientOnly>
      <LoginForm />
    </ClientOnly>
  </div>
);

export default Login;
