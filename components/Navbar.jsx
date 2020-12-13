import Link from "next/link";

import { BiMenuAltRight } from "react-icons/bi";

export default function Navbar() {
  return (
    <div style={styleDiv}>
      <Link href={`/`}>
        <a>
          <h1 style={{ color: "#111" }}>
            <span style={{ color: "#3498db" }}>on</span>Bíblia
          </h1>
        </a>
      </Link>

      <BiMenuAltRight size={`2rem`} style={{ cursor: "default" }} />
    </div>
  );
}

const styleDiv = {
  position: "sticky",
  top: "0",
  left: "0",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0.5rem 1rem",
  background: "#fff",
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
  zIndex: "100",
};
