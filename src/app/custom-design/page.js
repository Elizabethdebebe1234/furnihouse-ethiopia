
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomDesignModal from "@/components/CustomDesignModal";
import { useApp } from "@/context/AppContext";

export default function CustomDesignPage() {
  const { t } = useApp();
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      <Navbar/>
      <main className="section container custom-page">
        <p className="eyebrow">MADE AROUND YOUR IDEAS</p>
        <h1 className="section-title">{t.customize}</h1>
        <p className="muted">
          Choose your furniture type, share your preferences and book an appointment.
          Our team will help bring your idea to life.
        </p>
        <button className="primary-btn" onClick={() => setShowModal(true)}>
          {t.request}
        </button>
      </main>
      <Footer/>
      {showModal && <CustomDesignModal onClose={() => setShowModal(false)}/>}
    </>
  );
}
