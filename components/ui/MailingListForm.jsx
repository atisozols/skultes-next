"use client";

import { useState } from "react";
import { FaArrowRight, FaSpinner } from "react-icons/fa";

export default function MailingListForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/mailing-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.msg);
      setEmail("");
    } catch (error) {
      console.error("Submission error:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center w-3/4">
        <input
          type="email"
          name="email"
          placeholder="Ievadi savu e-pastu"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded-l border-accent border text-xs w-full"
        />
        <button
          type="submit"
          className="bg-accent text-background font-bold py-2 px-4 rounded-r h-full w-[50px] flex items-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <FaSpinner className="text-sm animate-spin" />
          ) : (
            <FaArrowRight className="text-sm" />
          )}
        </button>
      </form>
      {message && <p className="text-alternate text-sm">{message}</p>}
    </>
  );
}
