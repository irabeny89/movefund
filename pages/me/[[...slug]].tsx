import AuthScope from "@/components/AuthScope";
import ClientOnly from "@/components/ClientOnly";
import Dashboard from "@/components/Dashboard";
import ErrorPage from "@/components/ErrorPage";
import FundAccount from "@/components/FundAccount";
import Layout from "@/components/Layout";
import PaybackLoan from "@/components/PaybackLoan";
import SendMoney from "@/components/SendMoney";
import Users from "@/components/Users";
import { usePayload } from "hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import config from "config";

const { title, pageTitles } = config.appData;

const Me = () => {
  const { query, replace } = useRouter();
  const { jwtPayload } = usePayload();

  useEffect(() => {
    if (!jwtPayload?.id) replace("/");
  });

  // route /me
  if (!query.slug)
    return (
      <Layout>
        <ClientOnly>
          <AuthScope>
            <Head>
              <title>
                {title} | {pageTitles[1]}
              </title>
            </Head>
            <Dashboard />
          </AuthScope>
        </ClientOnly>
      </Layout>
    );
  // route /me/fundAccount
  switch (query.slug[0]) {
    case "fundAccount":
      return (
        <Layout>
          <ClientOnly>
            <AuthScope>
              <Head>
                <title>
                  {title} | {pageTitles[2]}
                </title>
              </Head>
              <FundAccount />
            </AuthScope>
          </ClientOnly>
        </Layout>
      );
    // route /me/sendMoney
    case "sendMoney":
      return (
        <Layout>
          <ClientOnly>
            <AuthScope scope="user">
              <Head>
                <title>
                  {title} | {pageTitles[3]}
                </title>
              </Head>
              <SendMoney />
            </AuthScope>
          </ClientOnly>
        </Layout>
      );
    // route /me/paybackLoan
    case "paybackLoan":
      return (
        <Layout>
          <ClientOnly>
            <AuthScope scope="user">
              <Head>
                <title>
                  {title} | {pageTitles[4]}
                </title>
              </Head>
              <PaybackLoan />
            </AuthScope>
          </ClientOnly>
        </Layout>
      );
    // route /me/users
    case "users":
      return (
        <Layout>
          <ClientOnly>
            <AuthScope scope="admin">
              <Head>
                <title>
                  {title} | {pageTitles[5]}
                </title>
              </Head>
              <Users />
            </AuthScope>
          </ClientOnly>
        </Layout>
      );
    // else 404
    default:
      return (
        <ErrorPage title="Page Not Found" message="404 - Page Not Found" />
      );
  }
};

export default Me;
