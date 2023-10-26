import { Lexend } from "next/font/google";
import "../styles/globals.css";

export default function CustomerLayout({ children }) {
  return (
    <div className="bg-white overflow-hidden">
      <title>Huge Bites</title>
      {children}
    </div>
  );
}
