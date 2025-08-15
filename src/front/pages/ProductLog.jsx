import React, { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate } from "react-router-dom";

export const ProductLog = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const getProducts = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/purchase-details`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${store.token}`
      }
    });
    if (!response.ok) {
      console.error("could not retrieve purchase details")
      return
    }
    const data = await response.json();
    dispatch({ type: "set_purchase_details", payload: data })
    return data
  }
  const deleteProduct = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/purchase-details/${id}`,
      {
        method: "DELETE", headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${store.token}`
        }
      }
    );
    if (!response.ok) {
      console.error("could not delete product")
      return
    }
    console.log("delete successful")
    getProducts()
    return
  }
  useEffect(() => {
    // this next line redirects the user to signup if there it no 
    // token in the store; use this on the use effect of pages that
    // should only be available for logged in users.
    if (!store.token) return navigate("/signup");
    getProducts();
  }, [store.token])


  return (
    <div className="text-center" style={{ backgroundColor: 'rgb(221, 230, 196)' }}>
      <div className="d-flex justify-content-between p-4">
        <div className="d-flex justify-content-start">
          <h6 className="m-2">Filter</h6>
          <h6 className="m-2">Sort</h6>
        </div>
        <div>
          <Link className="nav-link" to="/addProduct">Add Product</Link>
        </div>
      </div>
      <ul className="list-group m-2">
        {store.products.map((purchase_detail) => {
          return (
            <li
              className="list-group-item d-flex justify-content-between align-items-center position-relative"
              style={{ backgroundColor: 'rgb(157, 175, 122)' }}
              key={purchase_detail.id}
            >
              <div className=" product-photo rounded-circle">
                <img src={purchase_detail.product.image_URL} className="rounded-circle product-photo" />
              </div>
              <div className="container">
                <h5 className="text-start">{purchase_detail.product.name}</h5>
                <p className="text-start">
                  {purchase_detail.product.brand}
                </p>
                <p className="text-start">
                  {purchase_detail.product.type}
                </p>
                <p className="text-start">
                  {purchase_detail.expiration_date}
                </p>
                <p className="text-start">
                  {purchase_detail.purchase_date}
                </p>
              </div>
              <div className="d-flex">
                <button
                  type="button"
                  className="btn"
                  onClick={(event) => navigate(`/EditProduct/${purchase_detail.id}`)}
                >
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => deleteProduct(purchase_detail.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
};