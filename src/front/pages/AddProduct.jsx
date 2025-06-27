import React, { useState } from "react";
import glowlogLogo from "../assets/img/glowlog-logo.png";

const API_URL = "https://improved-space-system-v6r4wr67wx44hp9gx-3001.app.github.dev/";

export default function AddProduct() {
  const [photo, setPhoto] = useState(null);
  const [productName, setProductName] = useState("");
  
  // Existing categories and brands arrays, can come from props or API in the future
  const [categories, setCategories] = useState([
    "Make Up",
    "SunScreen",
    "Fragance",
  ]);
  const [brands, setBrands] = useState([
    "Brand A",
    "Brand B",
  ]);

  // State for selected values
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  // States to handle adding new category/brand
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [addingBrand, setAddingBrand] = useState(false);
  const [newBrand, setNewBrand] = useState("");

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.readyState === 2) {
        setPhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add products.");
      return;
    }

    // Decide which category & brand to send:
    const finalCategory = addingCategory ? newCategory.trim() : category;
    const finalBrand = addingBrand ? newBrand.trim() : brand;

    if (!finalCategory) {
      alert("Please select or add a category.");
      return;
    }
    if (!finalBrand) {
      alert("Please select or add a brand.");
      return;
    }

    const productData = {
      name: productName,
      category: finalCategory,
      opened_date: purchaseDate,
      expiration_date: expirationDate,
      brand: finalBrand,
      photo,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert("Product added successfully!");
        // If new category or brand was added, update the lists so next time it's in the dropdown
        if (addingCategory && newCategory.trim()) {
          setCategories((prev) => [...prev, newCategory.trim()]);
        }
        if (addingBrand && newBrand.trim()) {
          setBrands((prev) => [...prev, newBrand.trim()]);
        }

        // Reset all form fields
        setProductName("");
        setCategory("");
        setPurchaseDate("");
        setExpirationDate("");
        setBrand("");
        setPhoto(null);

        // Reset adding states
        setAddingCategory(false);
        setNewCategory("");
        setAddingBrand(false);
        setNewBrand("");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Error submitting product:", err);
      alert("Failed to submit product.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "#d4fcd4" }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white border border-dark rounded shadow"
        style={{ width: "320px" }}
      >
        {/* PHOTO UPLOAD */}
        <div className="text-center mb-3 position-relative">
          <label htmlFor="photo-upload" className="d-block">
            <img
              src={photo ? photo : glowlogLogo}
              alt="Preview"
              style={{ width: "3cm", height: "3cm", objectFit: "cover" }}
              className="border border-dark rounded-circle mb-2"
            />
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="d-none"
          />
          <button
            type="button"
            onClick={() => document.getElementById("photo-upload").click()}
            className="btn btn-dark btn-sm rounded-circle position-absolute"
            style={{
              top: "calc(50% + 0.5cm)",
              left: "calc(50% + 1.2cm)",
              width: "30px",
              height: "30px",
              lineHeight: "15px",
              padding: 0,
              fontSize: "1.2rem",
            }}
          >
            +
          </button>
        </div>

        {/* PRODUCT NAME */}
        <div className="mb-2">
          <input
            className="form-control"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        {/* CATEGORY */}
        <div className="mb-2">
          {!addingCategory ? (
            <select
              className="form-select"
              value={category}
              onChange={(e) => {
                if (e.target.value === "__add_new__") {
                  setAddingCategory(true);
                  setCategory("");
                } else {
                  setCategory(e.target.value);
                }
              }}
              required
            >
              <option value="">Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="__add_new__">+ Add new category</option>
            </select>
          ) : (
            <div className="d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="New category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary ms-2"
                onClick={() => {
                  setAddingCategory(false);
                  setNewCategory("");
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* PURCHASE DATE */}
        <div className="mb-2">
          <label className="form-label">Opened/Purchase Date:</label>
          <input
            type="date"
            className="form-control"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
        </div>

        {/* EXPIRATION DATE */}
        <div className="mb-2">
          <label className="form-label">Expiration Date:</label>
          <input
            type="date"
            className="form-control"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </div>

        {/* BRAND */}
        <div className="mb-3">
          {!addingBrand ? (
            <select
              className="form-select"
              value={brand}
              onChange={(e) => {
                if (e.target.value === "__add_new__") {
                  setAddingBrand(true);
                  setBrand("");
                } else {
                  setBrand(e.target.value);
                }
              }}
              required
            >
              <option value="">Brand</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
              <option value="__add_new__">+ Add new brand</option>
            </select>
          ) : (
            <div className="d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="New brand"
                value={newBrand}
                onChange={(e) => setNewBrand(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary ms-2"
                onClick={() => {
                  setAddingBrand(false);
                  setNewBrand("");
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-outline-dark w-50 me-1">
            Save
          </button>
          <button
            type="button"
            className="btn btn-outline-dark w-50 ms-1"
            onClick={() => {
              // You can customize exit behavior here, like clearing or navigating away
              setProductName("");
              setCategory("");
              setPurchaseDate("");
              setExpirationDate("");
              setBrand("");
              setPhoto(null);
              setAddingCategory(false);
              setNewCategory("");
              setAddingBrand(false);
              setNewBrand("");
            }}
          >
            Exit
          </button>
        </div>
      </form>
    </div>
  );
}
