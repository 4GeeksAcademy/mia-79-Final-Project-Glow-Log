import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import glowlogLogo from "../assets/img/glowlog-logo.png";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            if (email === "" || password === "") {
                setError("Please fill in all fields.");
                return;
            }

            const requestBody = {
                email,
                password,
            };

            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}api/users/login`,
                {
                    method: "POST",
                    body: JSON.stringify(requestBody),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || `Login failed. Status: ${response.status}`);
            }

            localStorage.setItem("token", data.token);
            // Assume token/session handling happens here
            setEmail("");
            setPassword("");
            setError("");
            navigate("/"); // Redirect after login

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div
            className="container d-flex justify-content-center align-items-center min-vh-100"
            style={{ backgroundColor: "#F7F6EC" }}
        >
            <div
                className="card p-4 shadow-sm"
                style={{
                    maxWidth: "400px",
                    width: "100%",
                    borderColor: "#CED9B4",
                    borderRadius: "20px",
                }}
            >
                <img
                    src={glowlogLogo}
                    alt="Glowlog Logo"
                    className="mx-auto d-block mb-3"
                    style={{
                        height: "80px",
                        width: "80px",
                        borderRadius: "50%",
                        objectFit: "cover",
                    }}
                />

                <h2
                    className="text-center mb-4"
                    style={{ color: "#5F7141", fontWeight: "bold" }}
                >
                    Welcome Back to Glow Log
                </h2>

                {error && (
                    <div
                        className="alert alert-danger py-2 text-center"
                        role="alert"
                    >
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mb-4">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn w-100"
                        style={{ backgroundColor: "#5F7141", color: "white" }}
                    >
                        Log In
                    </button>
                </form>

                <p className="text-center mt-3" style={{ color: "#5F7141" }}>
                    Don’t have an account?{" "}
                    <a
                        href="/signup"
                        style={{ color: "#A4B87F", textDecoration: "underline" }}
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
