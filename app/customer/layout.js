import "../styles/globals.css";
import Footer from "./components/Footer";

export default function CustomerLayout({ children }) {
  return (
    <div className="h-fit">
      <title>Huge Bites</title>
      <div className="h-fit">{children}</div>
      <div className="h-auto bottom-0" style={{ width: "100vw" }}>
        <Footer />
      </div>
    </div>
  );
}
