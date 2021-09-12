import Introduction from "@/components/Introduction";
import Layout from "@/components/Layout";
import Head from "next/head";

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>MoveMoney &trade; | Home</title>
      </Head>
      <Introduction />
    </Layout>
  );
};

export default Home;
