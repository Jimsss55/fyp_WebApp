"use client";

import React, { useState } from "react";
import { loginUser } from "./api/auth/loginUser";
import Image from "next/image";
import "./login/login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(username, password); // Send credentials to backend
      document.cookie = `accessToken=${data.access_token}; path=/; secure; max-age=3600`;
      window.location.href = "./userManagement";
    } catch (err) {
      setError("Invalid username or password");
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="login-container">
      {/* Left Container with Image and Text */}
      <div className="login-left-container">
        <div className="login-image-text">Admin Login</div>
        <h1>Dzongkha Letters and Numbers Tracing</h1>
        <div className="login-image-container">
          <Image
            src="/images/logo.png"
            alt="App icon"
            layout="intrinsic"
            width={500}
            height={500}
            onError={(e) => {
              console.error("Image failed to load:", e);
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </div>

      {/* Login Form */}
      <div>
        <form onSubmit={handleLogin} className="login-form">
          <div className="login-text">Login</div>
          {error && <div className="login-error">{error}</div>}
          <div className="login-input-group">
            <label htmlFor="username" className="login-label">
              Enter Username
            </label>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <div className="login-input-group password-input-container">
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                required
              />
              <span
                className={`password-toggle-icon ${
                  !showPassword ? "hidden" : ""
                }`}
                onClick={() => setShowPassword(!showPassword)}
              >
                👁️‍🗨️
              </span>
            </div>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
