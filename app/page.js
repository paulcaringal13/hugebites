import { Button } from "@/components/ui/button";
import * as React from "react";
import "./styles/globals.css";

export default function Home() {
  const handleSeedData = async () => {
    try {
      const response = await fetch("/api/seed", {
        method: "POST",
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
      } else {
        console.error("Seeding failed:", response.statusText);
      }
    } catch (error) {
      console.error("Seeding error:", error.message);
    }
  };

  return (
    <>
      <Button variant="outline" onClick={() => handleSeedData()}>
        Seed
      </Button>
    </>
  );
}
