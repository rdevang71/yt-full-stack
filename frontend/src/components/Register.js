import React, { useState } from "react";
import { registerUser, loginUser } from "../api/auth.js";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "", username: "", email: "", password: "",
    avatar: null, coverImage: null,
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
      await registerUser({
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        avatarFile: formData.avatar,
        coverImageFile: formData.coverImage,
      });

      // Auto login after registration
      await loginUser({ email: formData.email, password: formData.password });
      localStorage.setItem("isLoggedIn", "true");
      alert("Registration & Login successful! 🎉");
      window.location.href = "/";
    } catch (error) {
      alert("Registration failed: " + (error.response?.data?.message || "Server error"));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #97becaff, #32439bff)",
        padding: "20px",
      }}>
      <div className="card shadow-lg p-5"
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.95)",
        }}>
        <h2 className="text-center mb-4" style={{ fontWeight: "bold", color: "#6c5ce7" }}>
          Create Account
        </h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="fullName" className="form-control mb-3" placeholder="Full Name" onChange={handleChange} required />
          <input type="text" name="username" className="form-control mb-3" placeholder="Username" onChange={handleChange} required />
          <input type="email" name="email" className="form-control mb-3" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" className="form-control mb-3" placeholder="Password" onChange={handleChange} required />
          <input type="file" name="avatar" className="form-control mb-3" accept="image/*" onChange={handleChange} required />
          <input type="file" name="coverImage" className="form-control mb-4" accept="image/*" onChange={handleChange} />
          <button type="submit" className="btn btn-primary w-100" style={{ fontWeight: "bold", borderRadius: "10px" }}>
            Register
          </button>
        </form>
        <p className="text-center mt-4">
          Already a user? <a href="/login" style={{ color: "#6c5ce7", fontWeight: "bold" }}>Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
