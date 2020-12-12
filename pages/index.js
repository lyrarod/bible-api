import { useState } from "react";
import useSWR from "swr";

import Link from "next/link";
import style from "../styles/home.module.css";

import Layout from "../components/Layout";
import Loading from "../components/Loading";

import { FaBook } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";

const iconClose = <FaBook size={"1.1rem"} />;
const iconOpen = <FaBookReader size={"1.1rem"} />;

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

  const btnStyleVT = {
    boxShadow:
      testament === "VT" &&
      "1px 1px 1px rgba(255, 255, 255, 0.6), -1px -1px 1px rgba(0, 0, 0, 0.3)",
    background: testament === "VT" && "linear-gradient(#2980b9, #3498db)",
    color: testament === "VT" && "whitesmoke",
    cursor: testament === "VT" && "default",
  };

  const btnStyleNT = {
    boxShadow:
      testament === "NT" &&
      "1px 1px 1px rgba(255, 255, 255, 0.6), -1px -1px 1px rgba(0, 0, 0, 0.3)",
    background: testament === "NT" && "linear-gradient(#2980b9, #3498db)",
    color: testament === "NT" && "whitesmoke",
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
          <span style={{ marginLeft: "8px" }}>Novo Testamento</span>
        </button>

        <button
          style={btnStyleVT}
          className={style.btn_testament}
          onClick={() => setTestament("VT")}
        >
          {testament === "VT" ? iconOpen : iconClose}
          <span style={{ marginLeft: "8px" }}>Velho Testamento</span>
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
                      // style={{
                      //   color: "#fff",
                      //   background:
                      //     testament === "VT"
                      //       ? "linear-gradient(#2980b9, #3498db)"
                      //       : testament === "NT"
                      //       ? "linear-gradient(#2980b9, #3498db)"
                      //       : null,
                      // }}
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
