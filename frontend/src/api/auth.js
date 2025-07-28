const API_URL = process.env.REACT_APP_API_URL;

// ---------------- REGISTER USER (with files) ----------------
export const registerUser = async (formData) => {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Registration failed");
    return json;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

// ---------------- LOGIN USER ----------------
export const loginUser = async (data) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // To handle refresh token cookies if used
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Login failed");
    return json;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

// ---------------- LOGOUT USER ----------------
export const logoutUser = async () => {
  try {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // or cookie if you're using httpOnly
      },
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Logout failed");
    return json;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};



// ---------------- CHANGE PASSWORD ----------------
export const changePassword = async (passwords) => {
  try {
    const res = await fetch(`${API_URL}/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      credentials: "include",
      body: JSON.stringify(passwords), // { oldPassword, newPassword }
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Password change failed");
    return json;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};



// ---------------- GET CURRENT USER ----------------
export const getCurrentUser = async () => {
  try {
    const res = await fetch(`${API_URL}/auth/current-user`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed to fetch user");
    return json;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};


export const updateAccountDetails = async (data) => {
  try {
    const res = await fetch(`${API_URL}/auth/update-account`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      credentials: "include",
      body: JSON.stringify(data), // e.g., { username, email, bio }
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Account update failed");
    return json;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};


export const updateUserAvatar = async (avatarFile) => {
  try {
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    const res = await fetch(`${API_URL}/auth/avatar`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      credentials: "include",
      body: formData,
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Avatar update failed");
    return json;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};


export const updateUserCoverImage = async (coverFile) => {
  try {
    const formData = new FormData();
    formData.append("coverImage", coverFile);

    const res = await fetch(`${API_URL}/auth/cover-image`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      credentials: "include",
      body: formData,
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Cover image update failed");
    return json;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};



export const getUserChannelProfile = async (username) => {
  try {
    const res = await fetch(`${API_URL}/auth/c/${username}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed to load channel");
    return json;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};


export const getWatchHistory = async () => {
  try {
    const res = await fetch(`${API_URL}/auth/history`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed to fetch watch history");
    return json;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

