import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: null,
    coverImage: null,
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Call registerUser API here
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ff6b6b, #feca57)",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg p-5 animate__animated animate__fadeInUp"
        style={{
          width: "100%",
          maxWidth: "600px", // widened the card
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ fontWeight: "bold", color: "#ff6b6b" }}
        >
          Create Account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label
              className="form-label"
              style={{ fontWeight: "600", color: "#333", fontSize: "15px" }}
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter your username"
              onChange={handleChange}
              required
            />
          </div>

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

          <div className="form-group mb-3">
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
              placeholder="Create a strong password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label
              className="form-label"
              style={{ fontWeight: "600", color: "#333", fontSize: "15px" }}
            >
              Avatar
            </label>
            <input
              type="file"
              name="avatar"
              className="form-control"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <div className="form-group mb-4">
            <label
              className="form-label"
              style={{ fontWeight: "600", color: "#333", fontSize: "15px" }}
            >
              Cover Image
            </label>
            <input
              type="file"
              name="coverImage"
              className="form-control"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-danger w-100"
            style={{
              fontWeight: "bold",
              borderRadius: "10px",
              transition: "0.3s",
            }}
          >
            Register
          </button>
        </form>

        {/* Login link at the bottom */}
        <p className="text-center mt-4" style={{ fontSize: "14px", color: "#555" }}>
          Already a user?{" "}
          <a
            href="/login"
            style={{ color: "#ff6b6b", fontWeight: "bold", textDecoration: "none" }}
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
