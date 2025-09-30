"use client";

import "./app.css";
import "@appwrite.io/pink-icons";
import { useState, } from "react";
import { client } from "@/lib/appwrite";

export default function Home() {
  const [status, setStatus] = useState("");

  async function sendPing() {
    if (status === "loading") return;
    setStatus("loading");
    try {
      const result = await client.ping();
      setStatus(result.message);
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <main>
      <section className="mt-12 flex h-52 flex-col items-center">
        {status === "loading" ? (
          <div>
            Loading...</div>
        ) : status === "error" ? (
          <div>
            Nope
          </div>
        ) : status}

        <button
          onClick={sendPing}
          className={`cursor-pointer rounded-md bg-[#FD366E] px-2.5 py-1.5 ${status === "loading" ? "hidden" : "visible"}`}
        >
          <span className="text-white">Get a code</span>
        </button>
      </section>
    </main>
  );
}
