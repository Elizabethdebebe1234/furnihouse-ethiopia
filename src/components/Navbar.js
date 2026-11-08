
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const { language, setLanguage, t, orders } = useApp();

  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: t.home },
    { href: "/admin", label: t.admin },
    { href: "/custom-design", label: t.custom },
    { href: "/contact", label: t.contact },
  ];

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="navbar">
      <div className="container nav-inner">

        {/* LOGO */}
        <Link href="/" className="brand" onClick={closeMenu}>
          <span className="brand-icon">F</span>

          <span>
            FurniHouse<span className="brand-gold">.</span>
            <small>ETHIOPIA</small>
          </span>
        </Link>

        {/* NAVIGATION LINKS */}
        <nav
          id="main-navigation"
          className={open ? "nav-links active" : "nav-links"}
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE ACTIONS */}
        <div className="nav-actions">

          {/* LANGUAGE */}
          <select
            aria-label="Choose language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="language-select"
          >
            <option value="en">EN</option>
            <option value="am">አማ</option>
            <option value="om">OR</option>
          </select>

          {/* SHOPPING BAG */}
          <Link
            href="/"
            className="cart-link"
            title="Customer orders"
            aria-label={`Customer orders: ${orders.length}`}
          >
            <ShoppingBag size={21} />
            <span>{orders.length}</span>
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setOpen((current) => !current)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="main-navigation"
          >
            {open ? <X size={25} /> : <Menu size={25} />}
          </button>

        </div>
      </div>
    </header>
  );
}
