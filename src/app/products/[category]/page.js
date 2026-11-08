
"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import {
  categories,
  getLocalizedCategory,
} from "@/data/products";
import { useApp } from "@/context/AppContext";
import { ArrowRight } from "lucide-react";

function CategoryContent() {
  const params = useParams();
  const { t, language } = useApp();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/products", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load products."
          );
        }

        if (!cancelled) {
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error("Error loading products:", error);

        if (!cancelled) {
          setError(error.message || "Unable to load products.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const rawCategory = categories.find(
    (item) => item.id === params.category
  );

  if (!rawCategory) {
    return (
      <main className="container section">
        <h1>Category not found</h1>
        <Link href="/">Return home</Link>
      </main>
    );
  }

  const category = getLocalizedCategory(rawCategory, language);

  const categoryProducts = products.filter(
    (product) =>
      product.category?.toLowerCase() ===
      String(params.category).toLowerCase()
  );

  const otherCategories = categories
    .filter((item) => item.id !== category.id)
    .map((item) => getLocalizedCategory(item, language));

  return (
    <>
      <Navbar />

      <main>
        <section className="category-hero">
          <div className="container">
            <p className="eyebrow">FURNIHOUSE COLLECTION</p>
            <h1>{category.name}</h1>
            <p>{category.description}</p>
          </div>
        </section>

        <section className="section container">
          <div className="section-heading">
            <div>
              <h2 className="section-title">
                {category.name} Collection
              </h2>

              <p className="muted">
                {loading
                  ? "Loading designs..."
                  : `${categoryProducts.length} designs to explore`}
              </p>
            </div>
          </div>

          {loading ? (
            <p className="muted">Loading products...</p>
          ) : error ? (
            <p className="muted">{error}</p>
          ) : categoryProducts.length === 0 ? (
            <p className="muted">
              No products are available in this category yet.
            </p>
          ) : (
            <div className="product-grid">
              {categoryProducts.map((product) => (
                <ProductCard
                  key={product._id || product.id || product.legacyId}
                  product={product}
                />
              ))}
            </div>
          )}
        </section>

        <section className="section container">
          <h2 className="section-title">{t.other}</h2>

          <div className="other-categories">
            {otherCategories.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                className="other-category"
              >
                <span>{item.icon}</span>
                <strong>{item.name}</strong>
                <ArrowRight size={17} />
              </Link>
            ))}
          </div>

          <div className="center-action">
            <Link href="/custom-design" className="primary-btn">
              {t.request} <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default function CategoryPage() {
  return (
    <Suspense
      fallback={
        <p className="container section">Loading category...</p>
      }
    >
      <CategoryContent />
    </Suspense>
  );
}
