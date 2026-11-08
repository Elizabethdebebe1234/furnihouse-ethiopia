
"use client";

import { useState } from "react";
import { Eye, ShoppingBag, X } from "lucide-react";
import { getLocalizedProduct } from "@/data/products";
import { useApp } from "@/context/AppContext";

export default function ProductCard({ product }) {
  const { t, language, addOrder, formatPrice } = useApp();

  const localizedProduct = getLocalizedProduct(product, language);

  const [quickView, setQuickView] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function submitOrder(e) {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      await addOrder({
  productId: product._id || product.id || product.legacyId,
        productName: product.name,
        category: product.category,
        price: product.price,
        customerName: name.trim(),
        phone: phone.trim(),
        quantity: Number(quantity),
        status: "Pending",
      });

      setShowForm(false);
      setQuickView(false);
      setName("");
      setPhone("");
      setQuantity(1);
    } catch (error) {
      setSubmitError(error.message || "Unable to submit your order.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <article className="product-card">
        <div className="product-image">
          <img src={product.image} alt={localizedProduct.name} />
        </div>

        <div className="product-info">
          <p className="product-category">
            {t[product.category] || product.category}
          </p>

          <h3>{localizedProduct.name}</h3>

          <strong className="product-price">
            {formatPrice(product.price)}
          </strong>

          <div className="product-actions">
            <button
              className="secondary-btn"
              onClick={() => setQuickView(true)}
            >
              <Eye size={16} /> {t.quick}
            </button>

            <button
              className="primary-btn"
              onClick={() => setShowForm(true)}
            >
              <ShoppingBag size={16} /> {t.add}
            </button>
          </div>
        </div>
      </article>

      {quickView && (
        <div
          className="modal-overlay"
          onClick={() => setQuickView(false)}
        >
          <div
            className="modal quick-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setQuickView(false)}
            >
              <X />
            </button>

            <img src={product.image} alt={localizedProduct.name} />

            <div>
              <p className="product-category">
                {t[product.category] || product.category}
              </p>

              <h2>{localizedProduct.name}</h2>

              <p>{localizedProduct.description}</p>

              <h3>{formatPrice(product.price)}</h3>

              <button
                className="primary-btn"
                onClick={() => {
                  setQuickView(false);
                  setShowForm(true);
                }}
              >
                {t.add}
              </button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div
          className="modal-overlay"
          onClick={() => setShowForm(false)}
        >
          <form
            className="modal form-modal"
            onSubmit={submitOrder}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setShowForm(false)}
            >
              <X />
            </button>

            <p className="eyebrow">FURNITURE ORDER</p>

            <h2>{localizedProduct.name}</h2>

            <p className="muted">{formatPrice(product.price)}</p>

            {submitError && (
              <p className="error-message" role="alert">
                {submitError}
              </p>
            )}

            <label>{t.name} *</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.name}
            />

            <label>{t.phone} *</label>
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+251..."
              pattern="[0-9+ ()-]{7,20}"
            />

            <label>{t.quantity}</label>
            <input
              type="number"
              min="1"
              max="100"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />

            <button
              className="primary-btn full-btn"
              type="submit"
              disabled={submitting}
            >
              {submitting ? t.sending : t.submit}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
