
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import { LockKeyhole } from "lucide-react";

export default function AdminPage() {
  const { t, notify } = useApp();
  const router = useRouter();

  const [password, setPassword] = useState("");

  async function login(e) {
  e.preventDefault();

  try {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();

    if (response.ok) {
      notify("Login successful!");
      router.push("/admin/dashboard");
    } else {
      notify(data.message || "Incorrect password.");
    }
  } catch (error) {
    notify("Unable to connect. Please try again.");
  }
}

  return (
    <>
      <Navbar/>
      <main className="admin-login-section">
        <form className="admin-login-card" onSubmit={login}>
          <div className="admin-icon"><LockKeyhole size={30}/></div>
          <p className="eyebrow">FURNIHOUSE MANAGEMENT</p>
          <h1>{t.login}</h1>
          <p className="muted">Authorized personnel only.</p>

          <label>{t.password}</label>
          <input type="password" required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"/>

          <button className="primary-btn full-btn">{t.login}</button>

          
          <Link href="/" className="back-home">← Back to home</Link>
        </form>
      </main>
      <Footer/>
    </>
  );
}
