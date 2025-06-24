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
    <div className="text-center mt-5">
      <h1 className="display-4">GlowLog</h1>
      <ul className="list-group m-2">
        <li
          className="list-group-item d-flex justify-content-between align-items-center position-relative"
        >
          <img src="https://placehold.co/200x200" className="rounded-circle" />
          <div className="container">
            <h5 className="text-start">Product Name</h5>
            <p className="text-start">
              <i className="fa-solid fa-pump-soap"></i>
              Product Brand/Type
            </p>
            <p className="text-start">
              Product Expiration Date 
            </p>
            <p className="text-start">
              Product Opened Date
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};
