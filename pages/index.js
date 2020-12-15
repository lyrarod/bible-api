import { useState } from "react";
import useSWR from "swr";

import Link from "next/link";
import style from "../styles/home.module.css";

import Layout from "../components/Layout";
import Loader from "../components/Loader";

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

  const iconOpen = <FaBookReader size={"1rem"} color="#636e72" />;
  const iconClose = <FaBook size={"1rem"} />;

  const { data, error } = useSWR(
    `https://www.abibliadigital.com.br/api/books`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  // if (!data) return <div>Loading. . .</div>;

  const btnStyleVT = {
    boxShadow: testament === "VT" && "inset 2px 2px 3px rgba(0, 0, 0, 0.2)",
    // background: testament === "VT" && "#81ecec",
    color: testament === "VT" && "#636e72",
    cursor: testament === "VT" && "default",
  };

  const btnStyleNT = {
    boxShadow: testament === "NT" && "inset 2px 2px 3px rgba(0, 0, 0, 0.2)",
    // background: testament === "NT" && "#81ecec",
    color: testament === "NT" && "#636e72",
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
        <Loader />
      </div>
    </Layout>
  ) : (
    <Layout title={"onBíblia - Sua Bíblia Online"}>
      <div className={style.container_testament}>
        <button
          style={btnStyleVT}
          className={`${style.btn_testament} ${style.btn_VT}`}
          onClick={() => {
            setTestament("VT");
            testament !== "VT" && window.scrollTo(0, 0);
          }}
        >
          {testament === "VT" ? iconOpen : iconClose}
          <p
            style={{
              marginLeft: "6px",
              fontSize: testament === "VT" && "0.63rem",
            }}
          >
            Velho Testamento
          </p>
        </button>

        <button
          style={btnStyleNT}
          className={`${style.btn_testament} ${style.btn_NT}`}
          onClick={() => {
            setTestament("NT");
            testament !== "NT" && window.scrollTo(0, 0);
          }}
        >
          {testament === "NT" ? iconOpen : iconClose}
          <p
            style={{
              marginLeft: "6px",
              fontSize: testament === "NT" && "0.63rem",
            }}
          >
            Novo Testamento
          </p>
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
                      <li>
                        <a
                          style={{
                            color:
                              testament === "NT"
                                ? "#fff"
                                : testament === "VT"
                                ? "#fff"
                                : null,
                          }}
                        >
                          {book.name === "Lamentações de Jeremias"
                            ? "Lamentações"
                            : book.name}
                        </a>
                      </li>
                    </Link>
                  );
                })
            : data?.map((book, i) => {
                return (
                  <Link key={i} href={`/${book.abbrev.pt}`}>
                    <li>
                      <a>
                        {book.name === "Lamentações de Jeremias"
                          ? "Lamentações"
                          : book.name}
                      </a>
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
