import Head from "next/head";
import HomePage from "./home/page";

export default async function General() {
  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="Kgwc7apwSgQ78KHX9S3HLqqZCET7TAQk-OGZJGVJ1mg"
        />
      </Head>
      <HomePage />;
    </>
  );
}
