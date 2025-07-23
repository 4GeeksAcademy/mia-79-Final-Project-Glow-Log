import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}api/profile`;

export default function Profile() {
  const { store, dispatch } = useGlobalReducer();
  const token = store.token
  const [name, setName] = useState(store.user.name)
  const [email, setEmail] = useState(store.user.email);
  const [password, setPassword] = useState("");
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");


  useEffect(() => {
    document.title = "Glow Log - Profile";

    const fetchProfile = async () => {
      try {
        const res = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    e.preventDefault()
    try {
      const res = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, password }),
      })
      if (!res.ok) throw new Error(res.statusText)
      await res.json()
      alert("Profile updated!")
    } catch (err) {
      console.error("Update error:", err)
      alert("Could not update profile")
    }
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(API_URL, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error(res.statusText)
      await res.json()
      alert("Account deleted.")
      // dispatch logout or redirect here
    } catch (err) {
      console.error("Delete error:", err)
      alert("Could not delete account")
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmNewPassword,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      alert("Password updated successfully!");
      setShowPasswordUpdate(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      alert(err.message || "Failed to update password.");
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
                <input type="email" class="form-control" id="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>


              <div className="mb-3 d-flex align-items-center">
                <div style={{ flexGrow: 1 }}>
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value="••••••••"
                    disabled
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-outline-secondary ms-3"
                  onClick={() => setShowPasswordUpdate(!showPasswordUpdate)}
                >
                  Update Password
                </button>
              </div>

              {showPasswordUpdate && (
                <form onSubmit={handlePasswordChange} className="mt-4">
                  <h5>Change Password</h5>
                  <div className="mb-3">
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirm New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-warning">Save New Password</button>
                  <button
                    type="button"
                    className="btn btn-outline-dark ms-2"
                    onClick={() => setShowPasswordUpdate(false)}
                  >
                    Cancel
                  </button>
                </form>
              )}


              {/* PASSWORD Input
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input class="form-control" id="password" rows="3" />
              </div> */}

              {/* PHOTO - BIO
							<div className="mb-3">
								<img className="img-thumbnail" src="https://placehold.co/200x200/png" alt="Bio Image" />
							</div>


							<div className="mb-3">
								<label htmlFor="formFileSm" className="form-label">Upload Bio 200x200 Image </label>
								<input className="form-control form-control-sm" id="formFileSm" type="file" />
							</div> */}

              {/* BUTTONS  */}
              <div className="button-wrap d-flex justify-content-center pb-3">
                <button className="btn btn-primary" type="submit">Save</button>
                <button className="ms-3 btn btn-outline-danger" type="button" onClick={handleDelete}>Delete Account</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div >
  );
};