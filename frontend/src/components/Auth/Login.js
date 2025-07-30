import React, { useState } from "react";
import { loginUser } from "../../api/auth.js";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email && !formData.username) {
      alert("Please enter either username or email.");
      return;
    }

    try {
      const res = await loginUser(formData);
      console.log("Login success:", res.data);
      localStorage.setItem("isLoggedIn", "true");
      alert("Logged in successfully! ✅");
      window.location.href = "/";
    } catch (error) {
      alert(
        "Login failed: " + (error.response?.data?.message || "Server error")
      );
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #48dbfb, #1dd1a1, #10ac84)",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg p-5"
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.97)",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ fontWeight: "bold", color: "#1dd1a1" }}
        >
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Enter Your Email "
            onChange={handleChange}
            value={formData.email}
          />
          <p
            className="text-center mt-4"
            style={{ color: "#333", fontWeight: "700", fontSize: "1rem" }}
          >
            OR{" "}
          </p>
          <input
            type="text"
            name="username"
            className="form-control mb-3"
            placeholder="Enter Your Username "
            onChange={handleChange}
            value={formData.username}
          />
          <input
            type="password"
            name="password"
            className="form-control mb-4"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <button
            type="submit"
            className="btn w-100 animated-btn"
            style={{
              fontWeight: "bold",
              borderRadius: "12px",
              background: "linear-gradient(to right, #10ac84, #1dd1a1)",
              color: "white",
            }}
          >
            Login
          </button>
        </form>
        <p
          className="text-center mt-4"
          style={{ color: "#333", fontWeight: "400", fontSize: "1rem" }}
        >
          Don’t have an account?{" "}
          <a href="/register" style={{ color: "#1dd1a1", fontWeight: "bold" }}>
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
