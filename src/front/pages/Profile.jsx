import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}api/profile`;

export default function Profile() {
  const { store, dispatch } = useGlobalReducer();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = store.token;

  useEffect(() => {
    document.title = "Glow Log - Profile";

    const fetchProfile = async () => {
      try {
        const res = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${store.token}`,
            "Content-Type": "application/json"
          }
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setName(data.name || "");
        setEmail(data.email || "");
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [store.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${store.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, password })
      });

      const data = await res.json();
      alert("Profile updated!");
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${store.token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      alert("Account deleted.");
    } catch (err) {
      console.error("Failed to delete profile:", err);
    }
  };

  return (
    // todo: refactor css with css custom properties
    // add more responsive design bootstrap classes
    <div className="container-lg pb-3" >
      <div className="text-start mt-5 ">
        <div className="row">
          <div className="col-4 mx-auto">
            <h1 className="display-4">User Profile</h1>
            <form>

              {/* NAME - Input */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter a Name" />

              </div>

              {/* {EMAIL - Input} */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" class="form-control" id="email" placeholder="name@example.com" />
              </div>

              {/* PASSWORD Input */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input class="form-control" id="password" rows="3" />
              </div>

              {/* PHOTO - BIO */}
              <div className="mb-3">
                <img className="img-thumbnail" src="https://placehold.co/200x200/png" alt="Bio Image" />
              </div>


              <div className="mb-3">
                <label htmlFor="formFileSm" className="form-label">Upload Bio 200x200 Image </label>
                <input className="form-control form-control-sm" id="formFileSm" type="file" />
              </div>

              {/* BUTTONS  */}
              <div className="button-wrap d-flex justify-content-center pb-3">
                <button className="btn btn-primary" type="submit">Save</button>
                <button className="ms-3 btn btn-outline-secondary" type="button">Exit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div >
  );
};