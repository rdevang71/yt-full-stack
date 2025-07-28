import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Call loginUser API here
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #48dbfb, #1dd1a1)",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg p-5 animate__animated animate__fadeInUp"
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ fontWeight: "bold", color: "#1dd1a1" }}
        >
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label
              className="form-label"
              style={{ fontWeight: "600", color: "#333", fontSize: "15px" }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label
              className="form-label"
              style={{ fontWeight: "600", color: "#333", fontSize: "15px" }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            style={{
              fontWeight: "bold",
              borderRadius: "10px",
              transition: "0.3s",
            }}
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4" style={{ fontSize: "14px", color: "#555" }}>
          Don’t have an account?{" "}
          <a
            href="/register"
            style={{ color: "#1dd1a1", fontWeight: "bold", textDecoration: "none" }}
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
