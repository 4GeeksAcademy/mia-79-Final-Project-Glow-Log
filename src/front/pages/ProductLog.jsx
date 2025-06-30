import React, { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const ProductLog = () => {
  const { store, dispatch } = useGlobalReducer();


  const loadMessage = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      if (!backendUrl)
        throw new Error("VITE_BACKEND_URL is not defined in .env file");

      const response = await fetch(backendUrl + "/api/hello");
      const data = await response.json();

      if (response.ok) dispatch({ type: "set_hello", payload: data.message });

      return data;
    } catch (error) {
      if (error.message)
        throw new Error(
          `Could not fetch the message from the backend.
                Please check if the backend is running and the backend port is public.`
        );
    }
  };

  useEffect(() => {
    loadMessage();
  }, []);

  return (
    <div className="text-center" style={{ backgroundColor: 'rgb(221, 230, 196)' }}>
      <div className="d-flex justify-content-between p-4">
        <h6>Filter</h6>
        <h6>Sort</h6>
      </div>
      <ul className="list-group m-2">
        {store.products.map((product) => {
          return (
            <li
              className="list-group-item d-flex justify-content-between align-items-center position-relative"
              style={{ backgroundColor: 'rgb(157, 175, 122)' }}
            >
              <img src="https://placehold.co/200x200" className="rounded-circle" />
              <div className="container">
                <h5 className="text-start">{product.name}</h5>
                <p className="text-start">
                  {product.brand}
                </p>
                <p className="text-start">
                  {product.category}
                </p>
                <p className="text-start">
                  {product.expiration_date}
                </p>
                <p className="text-start">
                  {product.opened_date}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
};