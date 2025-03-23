"use client"; // Mark this as a client component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import "./login.css"; // Import the CSS file

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); // Initialize the router

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate login logic
    if (email === "admin@example.com" && password === "password") {
      // Redirect to the User Management Page
      router.push("/userManagement");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="overlay">
      <div className="popupContainer">
        <form onSubmit={handleSubmit} className="form">
          <div className="loginText">Login</div>
          <div className="inputGroup">
            <label htmlFor="email" className="label">
              Email address or phone number
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="showPasswordButton"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button type="submit" className="loginButton">
            Login
          </button>
          <p className="passwordHint">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </p>
        </form>
      </div>
    </div>
  );
}
