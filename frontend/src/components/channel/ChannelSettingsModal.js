import React, { useState } from "react";
import {
  updateAccountDetails,
  changePassword,
  updateAvatar,
  updateCoverImage,
} from "../../api/user";

const ChannelSettingsModal = ({ user, onClose }) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdateDetails = async () => {
  setLoading(true);
  setMessage("");
  try {
    // Handle avatar first
    if (avatarFile) {
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      await updateAvatar(formData);
      setAvatarFile(null);
    }

    // Handle cover image
    if (coverFile) {
      const formData = new FormData();
      formData.append("coverImage", coverFile);
      await updateCoverImage(formData);
      setCoverFile(null);
    }

    // Then update name/email
    await updateAccountDetails({ fullName, email });

    // Then password (if provided)
    if (currentPassword && newPassword) {
      await changePassword({ currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
    }

    setMessage("✅ Account details updated successfully.");
  } catch (err) {
    console.error("Error updating channel settings", err);
    setMessage("❌ Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>🛠️ Channel Settings</h2>

        <div style={styles.section}>
          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Avatar Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files[0])}
            style={styles.fileInput}
          />

          <label style={styles.label}>Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files[0])}
            style={styles.fileInput}
          />

          <button
            onClick={handleUpdateDetails}
            style={styles.actionButton}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Details"}
          </button>

          {message && (
            <div style={styles.feedback}>{message}</div>
          )}
        </div>

        <div style={styles.closeWrapper}>
          <button onClick={onClose} style={styles.close}>
            ❌ Close
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    animation: "fadeIn 0.3s ease-in-out",
  },
  modal: {
    backgroundColor: "#1c1c1c",
    color: "#fff",
    padding: "34px",
    borderRadius: "14px",
    width: "440px",
    boxShadow: "0 0 60px rgba(0,0,0,0.6)",
    transform: "translateY(20px)",
    animation: "modalSlide 0.4s ease-out forwards",
  },
  title: {
    fontSize: "22px",
    marginBottom: "12px",
    textAlign: "center",
    animation: "fadeInUp 0.5s ease-in-out",
  },
  section: {
    marginBottom: "24px",
    animation: "fadeInUp 0.4s ease-in-out",
  },
  label: {
    display: "block",
    fontSize: "14px",
    color: "#bbb",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "14px",
    backgroundColor: "#2a2a2a",
    color: "#fff",
    border: "1px solid #444",
    borderRadius: "6px",
    outline: "none",
  },
  fileInput: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    backgroundColor: "#222",
    color: "#ccc",
    border: "1px solid #555",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
  },
  actionButton: {
    backgroundColor: "#333",
    color: "#fff",
    border: "1px solid #444",
    padding: "10px 16px",
    borderRadius: "8px",
    width: "100%",
    cursor: "pointer",
    fontWeight: "500",
    marginTop: "12px",
  },
  feedback: {
    marginTop: "12px",
    textAlign: "center",
    fontSize: "14px",
    color: "#0af",
  },
  closeWrapper: {
    marginTop: "28px",
    display: "flex",
    justifyContent: "center",
  },
  close: {
    backgroundColor: "#2a2a2a",
    color: "#bbb",
    border: "1px solid #444",
    padding: "8px 14px",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default ChannelSettingsModal;