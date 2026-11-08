
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import { Mail, Phone, MapPin } from "lucide-react";

const translations = {
  en: {
    eyebrow: "WE WOULD LOVE TO HEAR FROM YOU",
    title: "Contact FurniHouse",
    phone: "Phone",
    email: "Email",
    location: "Location",
    country: "Ethiopia",
    name: "Your name",
    phoneNumber: "Phone number",
    message: "Your message",
    send: "Send Message",
    success: "Thank you! Your message has been received.",
  },
  am: {
    eyebrow: "ከእርስዎ መስማት እንወዳለን",
    title: "ፈርኒሀውስን ያግኙ",
    phone: "ስልክ",
    email: "ኢሜይል",
    location: "አድራሻ",
    country: "ኢትዮጵያ",
    name: "ሙሉ ስም",
    phoneNumber: "ስልክ ቁጥር",
    message: "መልዕክትዎ",
    send: "መልዕክት ይላኩ",
    success: "እናመሰግናለን! መልዕክትዎ ደርሶናል።",
  },
  om: {
    eyebrow: "ISIN WALIIN HAASA'UU NI BARBAADNA",
    title: "FurniHouse Quunnamaa",
    phone: "Bilbila",
    email: "Imeelii",
    location: "Teessoo",
    country: "Itoophiyaa",
    name: "Maqaa keessan",
    phoneNumber: "Lakkoofsa bilbilaa",
    message: "Ergaa keessan",
    send: "Ergaa Ergaa",
    success: "Galatoomaa! Ergaan keessan nu gaheera.",
  },
};

export default function ContactPage() {
  const { language, notify } = useApp();

  const text = translations[language] || translations.en;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  function submit(e) {
    e.preventDefault();

    notify(text.success);

    setForm({
      name: "",
      phone: "",
      message: "",
    });
  }

  return (
    <>
      <Navbar />

      <main className="section container">
        <p className="eyebrow">{text.eyebrow}</p>

        <h1 className="section-title">{text.title}</h1>

        <div className="contact-layout">
          <div className="contact-info">
            <div>
              <Phone />
              <span>
                {text.phone}
                <br />
                <strong>+2519 4242 5447</strong>
              </span>
            </div>

            <div>
              <Mail />
              <span>
                {text.email}
                <br />
                <strong>elizabethdebebe1234@gmail.com</strong>
              </span>
            </div>

            <div>
              <MapPin />
              <span>
                {text.location}
                <br />
                <strong>{text.country}</strong>
              </span>
            </div>
          </div>

          <form className="contact-form" onSubmit={submit}>
            <label>{text.name}</label>

            <input
              required
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder={text.name}
            />

            <label>{text.phoneNumber}</label>

            <input
              required
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              placeholder={text.phoneNumber}
            />

            <label>{text.message}</label>

            <textarea
              required
              rows="6"
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              placeholder={text.message}
            />

            <button type="submit" className="primary-btn">
              {text.send}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
