
"use client";

import { useApp } from "@/context/AppContext";
import { useEffect, useState } from "react";

export default function Footer() {
  const { t } = useApp();

  const [year, setYear] = useState("");

useEffect(() => {
  setYear(new Date().getFullYear());
}, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <h3>
            FurniHouse<span className="brand-gold">.</span>
          </h3>

          <p>{t.footerText}</p>
        </div>

        <p className="copyright">
          © {year} FurniHouse Ethiopia. {t.rights}
        </p>
      </div>
    </footer>
  );
}
