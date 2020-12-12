import Link from "next/link";

import { BiMenuAltRight } from "react-icons/bi";

const iconMenu = <BiMenuAltRight size={`2rem`} />;

export default function Navbar() {
  return (
    <>
      <div
        style={{
          position: "sticky",
          top: "0",
          left: "0",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.5rem 1rem",
          background: "#fff",
          boxShadow: "0 1px 1px rgba(0, 0, 0, .15)",
          zIndex: "100",
        }}
      >
        <Link href={`/`}>
          <a>
            <h1 style={{ color: "#111" }}>
              <span style={{ color: "#3498db" }}>on</span>Bíblia
            </h1>
          </a>
        </Link>

        <button
          style={{
            border: "0",
            background: "transparent",
            outline: "0",
            cursor: "pointer",
          }}
        >
          {iconMenu}
        </button>
      </div>
    </>
  );
}
