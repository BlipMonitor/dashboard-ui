import React from "react";
import Image from "next/image";
import RealTimeUpdates from "./components/RealTimeUpdates";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RealTimeUpdates />
    </main>
  );
}
