import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";

import Layout from "../../components/Layout";
import style from "../../styles/verses.module.css";

import { TiArrowBackOutline } from "react-icons/ti";
import Loader from "../../components/Loader";

const iconArrow = <TiArrowBackOutline size={"2rem"} />;

const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IldlZCBOb3YgMTggMjAyMCAwMDozMDo1OCBHTVQrMDAwMC41ZmI0Njg0OTNlZDFiZDAwMjM4MjQxMjQiLCJpYXQiOjE2MDU2NTk0NTh9.6qkfu8HtQSCFmD8n4Dw3aGaeiW4QzMUFXYLShoNiqqI",
    },
  }).then((res) => res.json());

export default function Chapter() {
  const router = useRouter();
  const { abbrev, chapter } = router.query;

  const { data, error } = useSWR(
    abbrev && chapter
      ? [
          `https://www.abibliadigital.com.br/api/verses/acf/${abbrev}/${chapter}`,
        ]
      : null,
    fetcher
  );

  if (error) return <div>failed to load</div>;

  return !data ? (
    <Layout title={"onBíblia"}>
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
    <Layout title={`onBíblia - ${data.book?.name} ${data.chapter?.number}`}>
      <div className={style.container_title}>
        <h2>
          {data.book?.name === "Lamentações de Jeremias"
            ? "Lamentações"
            : data.book?.name}{" "}
          {data.chapter?.number}
        </h2>
        <Link href={`/${data.book?.abbrev.pt}`}>
          <a>{iconArrow}</a>
        </Link>
      </div>

      <ol className={style.ol_verses}>
        {data.verses?.map(({ text, number }) => (
          <li key={number}>
            {`${number}) `}
            {text}
          </li>
        ))}
      </ol>
    </Layout>
  );
}

// export async function getServerSideProps({ params: { abbrev, chapter } }) {
//   const url = `https://www.abibliadigital.com.br/api/verses/acf/${abbrev}/${chapter}`;
//   const res = await fetch(url, {
//     headers: {
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IldlZCBOb3YgMTggMjAyMCAwMDozMDo1OCBHTVQrMDAwMC41ZmI0Njg0OTNlZDFiZDAwMjM4MjQxMjQiLCJpYXQiOjE2MDU2NTk0NTh9.6qkfu8HtQSCFmD8n4Dw3aGaeiW4QzMUFXYLShoNiqqI",
//     },
//   });

//   const verses = await res.json();

//   return {
//     props: {
//       verses,
//     },
//   };
// }
