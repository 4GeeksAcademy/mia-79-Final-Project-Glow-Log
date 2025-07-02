import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import glowlogLogo from "../assets/img/glowlog-logo.png";


const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    async function addUser() {
        if (email === "" || password === "") throw new Error (
            "missing a field"
        );
        const requestBody = {
            email: email, 
            password: password,
        };
        const response = await fetch(`https://psychic-yodel-r46jvg6vg4q4c5wqj-3001.app.github.dev/users`, {
            method: "POST", 
            body: JSON.stringify(requestBody), 
            headers: {
                "Content-Type": "application/json"
            }
        });
        const body = await response.json();
        if (!response.ok) throw new Error(`status:${response.status}, message: ${body}`);
        setEmail(""); 
        setPassword("");
        navigate("/");
    }
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (!email || !password) {
    //         setError("Please fill in all fields.");
    //         return;
    //     }

    //     try {
    //         localStorage.setItem("glowlogUser", JSON.stringify({ email }));
    //         navigate("/product-log");
    //     } catch (err) {
    //         setError("Signup failed. Try again later.");
    //     }
    // };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "#F7F6EC" }}>
            <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%", borderColor: "#CED9B4", borderRadius: "20px" }}>
                <img
                    src={glowlogLogo}
                    alt="Glowlog Logo"
                    className="mx-auto d-block mb-3"
                    style={{
                        height: "80px",
                        width: "80px",
                        borderRadius: "50%",
                        objectFit: "cover"
                    }}
                />



                <h2 className="text-center mb-4" style={{ color: "#5F7141", fontWeight: "bold" }}>
                    Create Your Glow Log Account
                </h2>

                {error && (
                    <div className="alert alert-danger py-2 text-center" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
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
                    onClick={(event) => addUser()}
                    >Sign Up
                    </button>
                </form>

                <p className="text-center mt-3" style={{ color: "#5F7141" }}>
                    Already have an account?{" "}
                    <a href="/login" style={{ color: "#A4B87F", textDecoration: "underline" }}>
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;