// src/components/AuthPage.jsx
import React, { useState } from "react";
import "./AuthPage.css";
import Header from "./headerFooter/HeaderPage";
import Footer from "./headerFooter/FooterPage";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Regex patterns
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate email and password
    if (!emailPattern.test(email)) {
      setError("Invalid email format");
      return;
    }

    if (!passwordPattern.test(password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters"
      );
      return;
    }

    // Mock authentication
    if (email === "user@example.com" && password === "Password@123") {
      localStorage.setItem("auth", "true");
      window.location.href = "/";
    } else {
      setError("Invalid email or password");
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="auth-container">
      <Header></Header>
      <form className="form-container" onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="input-group-email">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group-password">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>

        <button type="button" onClick={togglePopup} className="mock-button">
          Show Mock Credentials
        </button>
      </form>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Mock Credentials</h2>
            <p>Email: user@example.com</p>
            <p>Password: Password@123</p>
            <button onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
      <Footer></Footer>
    </div>
  );
};

export default AuthPage;
