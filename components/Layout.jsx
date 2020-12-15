import Head from "next/head";

import Navbar from "./Navbar";

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lemonada:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        <title>{title}</title>
      </Head>

      <Navbar />

      <main>{children}</main>
    </>
  );
}
