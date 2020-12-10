import { useState } from "react";
import useSWR from "swr";

import Link from "next/link";
import style from "../styles/abbrev.module.css";

import Layout from "../components/Layout";
import Loading from "../components/Loading";

import { FaBible } from "react-icons/fa";

const iconBible = <FaBible className={"icon"} size={"1rem"} />;

const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IldlZCBOb3YgMTggMjAyMCAwMDozMDo1OCBHTVQrMDAwMC41ZmI0Njg0OTNlZDFiZDAwMjM4MjQxMjQiLCJpYXQiOjE2MDU2NTk0NTh9.6qkfu8HtQSCFmD8n4Dw3aGaeiW4QzMUFXYLShoNiqqI",
    },
  }).then((res) => res.json());

export default function Home() {
  const [testament, setTestament] = useState("");

  const { data, error } = useSWR(
    `https://www.abibliadigital.com.br/api/books`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  // if (!data) return <div>Loading. . .</div>;

  return !data ? (
    <Layout title={"onBíblia - Sua Bíblia Online !"}>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          height: "100vh",
        }}
      >
        <Loading />
      </div>
    </Layout>
  ) : (
    <Layout title={"onBíblia - Sua Bíblia Online !"}>
      {/* <div className={style.container_testament}>
        <button
          className={"btn_testament btn_VT"}
          onClick={() => setTestament("VT")}
        >
          Velho Testamento
        </button>
        <button
          className={"btn_testament btn_NT"}
          onClick={() => setTestament("NT")}
        >
          Novo Testamento
        </button>
      </div> */}

      <div className={"container_books"}>
        <ul>
          {testament
            ? data
                ?.filter((t) => t.testament === testament)
                .map((book, i) => {
                  return (
                    <Link key={i} href={`/${book.abbrev.pt}`}>
                      <li>
                        <a>{book.name}</a>
                      </li>
                    </Link>
                  );
                })
            : data?.map((book, i) => {
                return (
                  <Link key={i} href={`/${book.abbrev.pt}`}>
                    <li>
                      <a>{book.name}</a>
                    </li>
                  </Link>
                );
              })}
        </ul>
      </div>
    </Layout>
  );
}

// export async function getStaticProps() {
//   const res = await fetch(
//     `https://www.abibliadigital.com.br/api/books`,

//     {
//       headers: {
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IldlZCBOb3YgMTggMjAyMCAwMDozMDo1OCBHTVQrMDAwMC41ZmI0Njg0OTNlZDFiZDAwMjM4MjQxMjQiLCJpYXQiOjE2MDU2NTk0NTh9.6qkfu8HtQSCFmD8n4Dw3aGaeiW4QzMUFXYLShoNiqqI",
//       },
//     }
//   );

//   const books = await res.json();

//   return {
//     props: {
//       books,
//     },
//   };
// }

// name: "lyrarod"
// email: "lyrarod@gmail.com"
// password: "rla1983",
// token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IldlZCBOb3YgMTggMjAyMCAwMDozMDo1OCBHTVQrMDAwMC41ZmI0Njg0OTNlZDFiZDAwMjM4MjQxMjQiLCJpYXQiOjE2MDU2NTk0NTh9.6qkfu8HtQSCFmD8n4Dw3aGaeiW4QzMUFXYLShoNiqqI"
