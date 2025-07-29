import React, { useState } from "react";
import { loginUser } from "../api/auth.js";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await loginUser(formData);
    console.log("Login success:", res.data);
    alert("Logged in successfully! ✅");
  } catch (error) {
    console.error("Login error:", error.response?.data?.message || error.message);
    alert("Login failed: " + (error.response?.data?.message || "Server error"));
  }
};

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #48dbfb, #1dd1a1, #10ac84)",
        padding: "20px",
        animation: "fadeIn 1s ease-in-out",
      }}
    >
      <div
        className="card shadow-lg p-5 animate__animated animate__fadeInUp"
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.97)",
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.2)",
          transition: "all 0.4s ease-in-out",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            fontWeight: "bold",
            color: "#1dd1a1",
            fontSize: "2rem",
            letterSpacing: "1px",
          }}
        >
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label
              className="form-label"
              style={{
                fontWeight: "600",
                color: "#2d3436",
                fontSize: "15px",
                transition: "color 0.3s ease",
              }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              style={{
                borderRadius: "8px",
                transition: "box-shadow 0.3s ease",
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 8px #1dd1a1")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label
              className="form-label"
              style={{
                fontWeight: "600",
                color: "#2d3436",
                fontSize: "15px",
                transition: "color 0.3s ease",
              }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              style={{
                borderRadius: "8px",
                transition: "box-shadow 0.3s ease",
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 8px #10ac84")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              fontWeight: "bold",
              borderRadius: "12px",
              background: "linear-gradient(to right, #10ac84, #1dd1a1)",
              color: "white",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 15px rgba(16, 172, 132, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            Login
          </button>
        </form>

        <p
          className="text-center mt-4"
          style={{
            fontSize: "14px",
            color: "#555",
            animation: "fadeIn 2s",
          }}
        >
          Don’t have an account?{" "}
          <a
            href="/register"
            style={{
              color: "#1dd1a1",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
