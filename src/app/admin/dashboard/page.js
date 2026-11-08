
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import { formatETB } from "@/data/products";
import {
  Package,
  Palette,
  LogOut,
  CalendarDays,
  Phone,
  User,
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

export default function AdminDashboard() {
  const { ready, t } = useApp();

const [orders, setOrders] = useState([]);
const [designs, setDesigns] = useState([]);
const [submissionsLoading, setSubmissionsLoading] = useState(false);
const [submissionsError, setSubmissionsError] = useState("");

  const router = useRouter();
  const [activeTab, setActiveTab] = useState("orders");
  const [products, setProducts] = useState([]);
const [productLoading, setProductLoading] = useState(false);
const [showProductForm, setShowProductForm] = useState(false);
const [editingId, setEditingId] = useState(null);
const [authChecked, setAuthChecked] = useState(false);

const emptyProduct = {
  name: "",
  description: "",
  category: "sofas",
  price: "",
  image: "",
  stock: 1,
};

const [productForm, setProductForm] = useState(emptyProduct);

async function fetchProducts() {
  setProductLoading(true);

  try {
    const response = await fetch("/api/products");
    const data = await response.json();

    setProducts(data.products || []);
  } catch (error) {
    alert("Failed to load products");
  } finally {
    setProductLoading(false);
  }
}

async function fetchSubmissions() {
  setSubmissionsLoading(true);
  setSubmissionsError("");

  try {
    const [ordersResponse, designsResponse] = await Promise.all([
      fetch("/api/admin/orders"),
      fetch("/api/admin/designs"),
    ]);

    const ordersData = await ordersResponse.json();
    const designsData = await designsResponse.json();

    if (!ordersResponse.ok || !ordersData.success) {
      throw new Error(ordersData.message || "Failed to load orders.");
    }

    if (!designsResponse.ok || !designsData.success) {
      throw new Error(designsData.message || "Failed to load designs.");
    }

    setOrders(ordersData.orders || []);
    setDesigns(designsData.designs || []);
  } catch (error) {
    setSubmissionsError(error.message || "Unable to load customer submissions.");
  } finally {
    setSubmissionsLoading(false);
  }
}

function editProduct(product) {
  setEditingId(product._id);

  setProductForm({
    name: product.name,
    description: product.description,
    category: product.category,
    price: product.price,
    image: product.image,
    stock: product.stock,
  });

  setShowProductForm(true);
}

async function saveProduct(e) {
  e.preventDefault();

  const url = editingId
    ? `/api/products/${editingId}`
    : "/api/products";

  const method = editingId ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productForm),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to save product");
      return;
    }

    alert("Product saved successfully!");

    setShowProductForm(false);
    setEditingId(null);
    setProductForm(emptyProduct);

    fetchProducts();
  } catch (error) {
    alert("Something went wrong");
  }
}

async function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to delete product");
      return;
    }

    alert("Product deleted successfully!");
    fetchProducts();
  } catch (error) {
    alert("Something went wrong");
  }
}

useEffect(() => {
  if (activeTab === "products" && ready) {
    fetchProducts();
  }
}, [activeTab, ready]);

  useEffect(() => {
  async function checkAdmin() {
    try {
      const response = await fetch("/api/admin/session");
      const data = await response.json();

      if (!data.authenticated) {
        router.replace("/admin");
        return;
      }

      setAuthChecked(true);
await fetchSubmissions();
    } catch {
      router.replace("/admin");
    }
  }

  if (ready) checkAdmin();
}, [ready, router]);

  async function logout() {
  await fetch("/api/admin/logout", { method: "POST" });
  router.replace("/admin");
}

 if (!ready || !authChecked) {
  return <main className="section container">Checking access...</main>;
}

  return (
    <>
      <Navbar/>
      <main className="section container dashboard">
        <div className="dashboard-heading">
          <div>
            <p className="eyebrow">FURNIHOUSE MANAGEMENT</p>
            <h1 className="section-title">{t.dashboard}</h1>
            <p className="muted">Manage customer orders and custom furniture requests.</p>
          </div>
          <button className="secondary-btn" onClick={logout}>
            <LogOut size={17}/> {t.logout}
          </button>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <Package/>
            <span>{t.orders}</span>
            <strong>{orders.length}</strong>
          </div>
          <div className="stat-card">
            <Palette/>
            <span>{t.designs}</span>
            <strong>{designs.length}</strong>
          </div>
        </div>

        <div className="dashboard-tabs">
          <button className={activeTab === "orders" ? "tab active-tab" : "tab"}
            onClick={() => setActiveTab("orders")}>
            <Package size={17}/> {t.orders} ({orders.length})
          </button>
          <button className={activeTab === "designs" ? "tab active-tab" : "tab"}
            onClick={() => setActiveTab("designs")}>
            <Palette size={17}/> {t.designs} ({designs.length})
          </button>
          <button
  className={activeTab === "products" ? "tab active-tab" : "tab"}
  onClick={() => setActiveTab("products")}
>
  <Package size={17}/> Products ({products.length})
</button>
        </div>

        {activeTab === "orders" && (
  <section className="dashboard-list">
    {submissionsLoading ? (
      <p className="empty-state">Loading customer orders...</p>
    ) : submissionsError ? (
      <p className="error-message" role="alert">{submissionsError}</p>
    ) : orders.length === 0 ? (
      <p className="empty-state">{t.empty}</p>
    ) : orders.map((order) => (
              <article className="dashboard-card" key={order.id}>
                <div className="dashboard-card-top">
                  <span className="status-pill">{order.status}</span>
                  <span className="muted">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>
                <h3>{order.productName}</h3>
                <p><strong>Category:</strong> {order.category}</p>
                <p><strong>{t.price}:</strong> {formatETB(order.price)}</p>
                <p><strong>{t.quantity}:</strong> {order.quantity}</p>
                <div className="customer-details">
                  <span><User size={16}/> {order.customerName}</span>
                  <span><Phone size={16}/> {order.phone}</span>
                </div>
              </article>
            ))}
          </section>
        )}

        {activeTab === "designs" && (
  <section className="dashboard-list">
    {submissionsLoading ? (
      <p className="empty-state">Loading design requests...</p>
    ) : submissionsError ? (
      <p className="error-message" role="alert">{submissionsError}</p>
    ) : designs.length === 0 ? (
      <p className="empty-state">{t.empty}</p>
    ) : designs.map((design) => (


              <article className="dashboard-card" key={design.id}>
                <div className="dashboard-card-top">
                  <span className="status-pill">{design.status}</span>
                  <span className="muted">
                    {new Date(design.createdAt).toLocaleString()}
                  </span>
                </div>
                <h3>{design.category}</h3>
                <p><strong>Length:</strong> {design.length || "Not specified"}</p>
                <p><strong>Width:</strong> {design.width || "Not specified"}</p>
                <p><strong>Color:</strong> {design.color || "Not specified"}</p>
                <p>
                  <CalendarDays size={16}/> <strong>Appointment:</strong>{" "}
                  {design.appointment || "Not selected"}
                </p>
                <p><strong>Additional details:</strong> {design.notes || "None"}</p>

                {design.photo && (
                  <a href={design.photo} target="_blank" rel="noreferrer">
                    <img className="design-preview" src={design.photo}
                      alt="Customer reference"/>
                  </a>
                )}

                <div className="customer-details">
                  <span><User size={16}/> {design.customerName}</span>
                  <span><Phone size={16}/> {design.phone}</span>
                </div>
              </article>
            ))}
          </section>
        )}
                {activeTab === "products" && (
          <section className="dashboard-list">

            <div className="dashboard-heading">
              <h2>Manage Products</h2>

              <button
                className="primary-btn"
                onClick={() => {
                  setEditingId(null);
                  setProductForm(emptyProduct);
                  setShowProductForm(!showProductForm);
                }}
              >
                <Plus size={17}/> Add Product
              </button>
            </div>

            {showProductForm && (
              <form className="dashboard-card" onSubmit={saveProduct}>
                <h3>{editingId ? "Edit Product" : "Add New Product"}</h3>

                <input
                  placeholder="Product name"
                  value={productForm.name}
                  onChange={(e) =>
                    setProductForm({ ...productForm, name: e.target.value })
                  }
                  required
                />

                <textarea
                  placeholder="Product description"
                  value={productForm.description}
                  onChange={(e) =>
                    setProductForm({ ...productForm, description: e.target.value })
                  }
                  required
                />

                <select
                  value={productForm.category}
                  onChange={(e) =>
                    setProductForm({ ...productForm, category: e.target.value })
                  }
                >
                  <option value="sofas">Sofas</option>
                  <option value="chairs">Chairs</option>
                  <option value="beds">Beds</option>
                  <option value="doors">Doors</option>
                </select>

                <input
                  type="number"
                  placeholder="Price in ETB"
                  value={productForm.price}
                  onChange={(e) =>
                    setProductForm({ ...productForm, price: e.target.value })
                  }
                  min="0"
                  required
                />

                <input
                  placeholder="Product image URL"
                  value={productForm.image}
                  onChange={(e) =>
                    setProductForm({ ...productForm, image: e.target.value })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Stock quantity"
                  value={productForm.stock}
                  onChange={(e) =>
                    setProductForm({ ...productForm, stock: e.target.value })
                  }
                  min="0"
                  required
                />

                <div className="hero-actions">
                  <button className="primary-btn" type="submit">
                    {editingId ? "Update Product" : "Save Product"}
                  </button>

                  <button
                    className="secondary-btn"
                    type="button"
                    onClick={() => {
                      setShowProductForm(false);
                      setEditingId(null);
                      setProductForm(emptyProduct);
                    }}
                  >
                    <X size={17}/> Cancel
                  </button>
                </div>
              </form>
            )}

            {productLoading ? (
              <p>Loading products...</p>
            ) : products.length === 0 ? (
              <p className="empty-state">No products found.</p>
            ) : (
              products.map((product) => (
                <article className="dashboard-card" key={product._id}>
                  <div className="dashboard-card-top">
                    <span className="status-pill">{product.category}</span>
                    <strong>{formatETB(product.price)}</strong>
                  </div>

                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Stock: {product.stock}</p>

                  <div className="hero-actions">
                    <button
                      className="secondary-btn"
                      onClick={() => editProduct(product)}
                    >
                      <Pencil size={16}/> Edit
                    </button>

                    <button
                      className="secondary-btn"
                      onClick={() => deleteProduct(product._id)}
                    >
                      <Trash2 size={16}/> Delete
                    </button>
                  </div>
                </article>
              ))
            )}
          </section>
        )}
      </main>
      <Footer/>
    </>
  );
}
