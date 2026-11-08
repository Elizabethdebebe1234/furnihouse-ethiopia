
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomDesignModal from "@/components/CustomDesignModal";
import { getLocalizedCategories } from "@/data/products";
import { useApp } from "@/context/AppContext";
import { ArrowRight, Sparkles } from "lucide-react";

const categoryImages = {
  sofas: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900",
  "chairs-tables": "https://images.unsplash.com/photo-1503602642458-232111445657?w=900",
  beds: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900",
  doors: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=900",
};

const homeText = {
  en: {
    eyebrow: "FURNITURE • CRAFT • COMFORT",
    title: "Make Your Home",
    titleSecond: "Feel Like Home.",
    subtitle: "Discover furniture that reflects your style.",
    shop: "Shop Now",
    customize: "Customize",
    caption: "DESIGNED FOR EVERYDAY LIVING",
    collections: "OUR COLLECTIONS",
    explore: "Explore Our Collections",
    collectionDescription: "Find the right pieces to make every room special.",
    bannerEyebrow: "YOUR SPACE. YOUR STYLE.",
    bannerTitle: "Dream it. Design it. We'll make it.",
    bannerDescription: "Have a special idea? Share your measurements, color preferences and inspiration with us.",
    request: "Request a Custom Design",
    values: [
      ["Thoughtful Design", "Furniture that combines beauty and function."],
      ["Made for You", "Personalized choices for your space."],
      ["Comfort First", "Pieces designed for everyday living."],
    ],
  },
  am: {
    eyebrow: "የቤት እቃዎች • ጥበብ • ምቾት",
    title: "ቤትዎን",
    titleSecond: "የሚያምር ያድርጉት።",
    subtitle: "የእርስዎን የቅጥ ምርጫ የሚያንጸባርቁ የቤት እቃዎችን ያግኙ።",
    shop: "አሁን ይግዙ",
    customize: "የራስዎን ያስዘጋጁ",
    caption: "ለዕለታዊ ኑሮ የተነደፈ",
    collections: "የእኛ ስብስቦች",
    explore: "ስብስቦቻችንን ይመልከቱ",
    collectionDescription: "እያንዳንዱን ክፍል ልዩ የሚያደርጉ እቃዎችን ያግኙ።",
    bannerEyebrow: "የእርስዎ ቦታ። የእርስዎ ቅጥ።",
    bannerTitle: "ያስቡት። ይንደፉት። እኛ እንሰራዋለን።",
    bannerDescription: "ልዩ ሀሳብ አለዎት? መጠኖችዎን፣ የቀለም ምርጫዎን እና ሀሳቦችዎን ያጋሩን።",
    request: "የግል ዲዛይን ይጠይቁ",
    values: [
      ["ውብ ዲዛይን", "ውበትንና ጥቅምን የሚያጣምሩ የቤት እቃዎች።"],
      ["ለእርስዎ የተዘጋጀ", "ለቦታዎ የሚስማሙ የግል ምርጫዎች።"],
      ["ምቾት ቅድሚያ ነው", "ለዕለታዊ ኑሮ የተዘጋጁ እቃዎች።"],
    ],
  },
  om: {
    eyebrow: "MEESHAA MANAA • OGUMMAA • MIIRA GAARII",
    title: "Mana Keessan",
    titleSecond: "Mana Gammachuu Godhaa.",
    subtitle: "Meeshaalee mana keessaa akkaataa keessan calaqqisiisan argadhaa.",
    shop: "Amma Bitaa",
    customize: "Akka Fedhii Keessaniitti",
    caption: "JIREENYA GUYYUU GARA GARAATIIF KAN QOPHAA'E",
    collections: "WALITTI QABAMA KEENYA",
    explore: "Walitti Qabama Keenya Ilaalaa",
    collectionDescription: "Kutaa mana keessanii hunda bareechuuf meeshaalee sirrii filadhaa.",
    bannerEyebrow: "IDDOO KEESSAN. AKKAATAA KEESSAN.",
    bannerTitle: "Yaadaa. Karoorsaa. Nuti isiniif hojjanna.",
    bannerDescription: "Yaada addaa qabduu? Safara, filannoo halluu fi fakkeenya isin barbaaddan nuuf ergaa.",
    request: "Dizaayinii Addaa Gaafadhaa",
    values: [
      ["Dizaayinii Gaarii", "Meeshaalee bareedinaa fi hojii walitti fidaniidha."],
      ["Isiniif Qophaa'e", "Filannoowwan iddoo keessaniif mijatan."],
      ["Mijannaa Dursa", "Meeshaalee jireenya guyyaa guyyaatiif qophaa'an."],
    ],
  },
};

export default function HomePage() {
  const { language } = useApp();
  const [showDesign, setShowDesign] = useState(false);

  const text = homeText[language] || homeText.en;
  const translatedCategories = getLocalizedCategories(language);

  return (
    <>
      <Navbar />

      <main>
        <section className="hero">
          <div className="hero-background" />

          <div className="container hero-content">
            <p className="eyebrow">{text.eyebrow}</p>

            <h1>
              {text.title}
              <br />
              <span>{text.titleSecond}</span>
            </h1>

            <p>{text.subtitle}</p>

            <div className="hero-actions">
              <a href="#collections" className="primary-btn">
                {text.shop} <ArrowRight size={17} />
              </a>

              <button
                className="hero-outline"
                onClick={() => setShowDesign(true)}
              >
                <Sparkles size={17} /> {text.customize}
              </button>
            </div>
          </div>

          <div className="hero-caption">{text.caption}</div>
        </section>

        <section className="section container" id="collections">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{text.collections}</p>
              <h2 className="section-title">{text.explore}</h2>
              <p className="muted">{text.collectionDescription}</p>
            </div>
          </div>

          <div className="category-grid">
            {translatedCategories.map((category, index) => (
              <Link
                href={`/products/${category.id}`}
                key={category.id}
                className={`category-card category-${index}`}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 650px) 100vw, 50vw"
                  unoptimized
                />

                <div className="category-overlay">
                  <span>{category.icon}</span>
                  <h3>{category.name}</h3>

                  <span className="category-explore">
                    {text.shop} <ArrowRight size={17} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="design-banner">
          <div className="container design-banner-inner">
            <div>
              <p className="eyebrow">{text.bannerEyebrow}</p>
              <h2>{text.bannerTitle}</h2>
              <p>{text.bannerDescription}</p>

              <button
                className="primary-btn"
                onClick={() => setShowDesign(true)}
              >
                {text.request} <ArrowRight size={17} />
              </button>
            </div>

            <div className="design-banner-icon">✦</div>
          </div>
        </section>

        <section className="section container values-section">
          {text.values.map((value, index) => (
            <div key={index}>
              <span>0{index + 1}</span>
              <h3>{value[0]}</h3>
              <p>{value[1]}</p>
            </div>
          ))}
        </section>
      </main>

      <Footer />

      {showDesign && (
        <CustomDesignModal onClose={() => setShowDesign(false)} />
      )}
    </>
  );
}
