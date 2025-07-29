import React, { useState } from "react";
import { registerUser } from "../api/auth.js";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "", 
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

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await registerUser({
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      avatarFile: formData.avatar,
      coverImageFile: formData.coverImage,
    });

    console.log("Registered successfully:", res.data);
    alert("Registration successful! 🎉");
  } catch (error) {
    console.error("Registration failed:", error.response?.data?.message || error.message);
    alert("Registration failed: " + (error.response?.data?.message || "Server error"));
  }
};


  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #97becaff, #32439bff)",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg p-5 animate__animated animate__fadeInUp"
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ fontWeight: "bold", color: "#6c5ce7" }}
        >
          Create Account
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group mb-3">
            <label className="form-label" style={{ fontWeight: "600", color: "#333", fontSize: "15px" }}>
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              className="form-control"
              placeholder="Enter your full name"
              onChange={handleChange}
              required
            />
          </div>

          {/* Username */}
          <div className="form-group mb-3">
            <label className="form-label" style={{ fontWeight: "600", color: "#333", fontSize: "15px" }}>
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

          {/* Email */}
          <div className="form-group mb-3">
            <label className="form-label" style={{ fontWeight: "600", color: "#333", fontSize: "15px" }}>
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

          {/* Password */}
          <div className="form-group mb-3">
            <label className="form-label" style={{ fontWeight: "600", color: "#333", fontSize: "15px" }}>
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

          {/* Avatar */}
          <div className="form-group mb-3">
            <label className="form-label" style={{ fontWeight: "600", color: "#333", fontSize: "15px" }}>
              Avatar
            </label>
            <input
              type="file"
              name="avatar"
              className="form-control"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          {/* Cover Image */}
          <div className="form-group mb-4">
            <label className="form-label" style={{ fontWeight: "600", color: "#333", fontSize: "15px" }}>
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

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{
              fontWeight: "bold",
              borderRadius: "10px",
              transition: "0.3s",
            }}
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4" style={{ fontSize: "14px", color: "#555" }}>
          Already a user?{" "}
          <a href="/login" style={{ color: "#6c5ce7", fontWeight: "bold", textDecoration: "none" }}>
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
