import Introduction from "@/components/Introduction";
import Layout from "@/components/Layout";
import Head from "next/head";
import config from "config";
import AuthTabs from "@/components/AuthTabs";

const { title, features, testAccount, pageTitles } = config.appData;

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>
          {title} &trade; | {pageTitles[0]}
        </title>
      </Head>
      <Introduction features={features} testAccount={testAccount}>
        <AuthTabs />
      </Introduction>
    </Layout>
  );
};

export default Home;
