import { Lexend } from "next/font/google";
import "../styles/globals.css";
import Footer from "./components/Footer";

export default function CustomerLayout({ children }) {
  return (
    <div className="bg-white overflow-hidden">
      <title>Huge Bites</title>
      <div className="h-fit w-full">{children}</div>
      <section>
        <div className="h-fit" style={{ width: "100vw" }}>
          <Footer />
        </div>
      </section>
    </div>
  );
}
