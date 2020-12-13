import { useState } from "react";
import useSWR from "swr";

import Link from "next/link";
import style from "../styles/home.module.css";

import Layout from "../components/Layout";
import Loading from "../components/Loading";

import { FaBook } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";

const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IldlZCBOb3YgMTggMjAyMCAwMDozMDo1OCBHTVQrMDAwMC41ZmI0Njg0OTNlZDFiZDAwMjM4MjQxMjQiLCJpYXQiOjE2MDU2NTk0NTh9.6qkfu8HtQSCFmD8n4Dw3aGaeiW4QzMUFXYLShoNiqqI",
    },
  }).then((res) => res.json());

export default function Home() {
  const [testament, setTestament] = useState("");

  const iconOpen = (
    <FaBookReader size={"2rem"} style={{ marginBottom: "5px" }} />
  );
  const iconClose = <FaBook size={"2rem"} style={{ marginBottom: "5px" }} />;

  const { data, error } = useSWR(
    `https://www.abibliadigital.com.br/api/books`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  // if (!data) return <div>Loading. . .</div>;

  const btnStyleVT = {
    // boxShadow:
    //   testament === "VT" &&
    //   "1px 1px 1px rgba(255, 255, 255, 0.6), -1px -1px 1px rgba(0, 0, 0, 0.3)",
    // background: testament === "VT" && "#2980b9",
    color: testament === "VT" && "#fff",
    cursor: testament === "VT" && "default",
  };

  const btnStyleNT = {
    // boxShadow:
    //   testament === "NT" &&
    //   "1px 1px 1px rgba(255, 255, 255, 0.6), -1px -1px 1px rgba(0, 0, 0, 0.3)",
    // background: testament === "NT" && "#3498db",
    color: testament === "NT" && "#fff",
    cursor: testament === "NT" && "default",
  };

  return !data ? (
    <Layout title={"onBíblia - Sua Bíblia Online"}>
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
    <Layout title={"onBíblia - Sua Bíblia Online"}>
      <div className={style.container_testament}>
        <button
          style={btnStyleNT}
          className={`${style.btn_testament} ${style.btn_NT}`}
          onClick={() => setTestament("NT")}
        >
          {testament === "NT" ? iconOpen : iconClose}
          <p>Novo Testamento</p>
        </button>

        <button
          style={btnStyleVT}
          className={`${style.btn_testament} ${style.btn_VT}`}
          onClick={() => setTestament("VT")}
        >
          {testament === "VT" ? iconOpen : iconClose}
          <p>Velho Testamento</p>
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
                            testament === "NT"
                              ? ""
                              : testament === "VT"
                              ? ""
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
