// src/pages/AddProduct.jsx
import React, { useState } from "react";

const API_URL = "https://improved-space-system-v6r4wr67wx44hp9gx-3001.app.github.dev/"; // WE need to update the API libk once we have it

export default function AddProduct() {
  const [photo, setPhoto] = useState(null);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [brand, setBrand] = useState("");

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(reader.result); // base64 string
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add products.");
      return;
    }

    const productData = {
      name: productName,
      category,
      opened_date: purchaseDate,
      expiration_date: expirationDate,
      brand,
      photo
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
        setProductName("");
        setCategory("");
        setPurchaseDate("");
        setExpirationDate("");
        setBrand("");
        setPhoto(null);
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
    <div className="add-product">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Add Photo:
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />
        </label>
        {photo && <img src={photo} alt="Preview" width="100" />}

        <label>
          Product Name:
          <input value={productName} onChange={(e) => setProductName(e.target.value)} required />
        </label>

        <label>
          Category:
          <input value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>

        <label>
          Opened/Purchase Date:
          <input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
        </label>

        <label>
          Expiration Date:
          <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
        </label>

        <label>
          Brand:
          <input value={brand} onChange={(e) => setBrand(e.target.value)} />
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
