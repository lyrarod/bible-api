import { useState } from "react";
import useSWR from "swr";

import Link from "next/link";
import style from "../styles/home.module.css";

import Layout from "../components/Layout";
import Loading from "../components/Loading";

import { FcReadingEbook } from "react-icons/fc";

const iconBible = <FcReadingEbook size={"2rem"} />;

const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IldlZCBOb3YgMTggMjAyMCAwMDozMDo1OCBHTVQrMDAwMC41ZmI0Njg0OTNlZDFiZDAwMjM4MjQxMjQiLCJpYXQiOjE2MDU2NTk0NTh9.6qkfu8HtQSCFmD8n4Dw3aGaeiW4QzMUFXYLShoNiqqI",
    },
  }).then((res) => res.json());

export default function Home() {
  const [testament, setTestament] = useState("");

  const btnStyleVT = {
    background: testament === "VT" && "linear-gradient(#2980b9, #3498db)",
    color: testament === "VT" && "#fff",
  };

  const btnStyleNT = {
    background: testament === "NT" && "linear-gradient(#2980b9, #3498db)",
    color: testament === "NT" && "#fff",
  };

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
          height: "50vh",
        }}
      >
        <Loading />
      </div>
    </Layout>
  ) : (
    <Layout title={"onBíblia - Sua Bíblia Online!"}>
      <div className={style.container_testament}>
        <button
          style={btnStyleVT}
          className={style.btn_testament}
          onClick={() => setTestament("VT")}
        >
          {iconBible} <br />
          Velho Testamento
        </button>
        <button
          style={btnStyleNT}
          className={`${style.btn_testament} ${style.btn_NT}`}
          onClick={() => setTestament("NT")}
        >
          {iconBible} <br />
          Novo Testamento
        </button>
      </div>

      <div className={style.container_books}>
        <ul>
          {testament
            ? data
                ?.filter((t) => t.testament === testament)
                .map((book, i) => {
                  return (
                    <Link key={i} href={`/${book.abbrev.pt}`}>
                      <li
                        style={{
                          color: "#fff",
                          background:
                            testament === "VT"
                              ? "linear-gradient(#2980b9, #3498db)"
                              : testament === "NT"
                              ? "linear-gradient(#2980b9, #3498db)"
                              : null,
                        }}
                      >
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
