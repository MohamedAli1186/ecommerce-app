import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";
import Header from "./headerFooter/HeaderPage";
import Footer from "./headerFooter/FooterPage";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // To toggle between login and register
  const navigate = useNavigate();

  // Regex patterns
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Function to handle user login
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

    // Mock authentication (Login logic)
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (email === "admin@admin.com" && password === "Admin@123") {
      localStorage.setItem("auth", "admin");
      navigate("/admin");
    } else if (
      registeredUser &&
      email === registeredUser.email &&
      password === registeredUser.password
    ) {
      localStorage.setItem("auth", "true");
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  // Function to handle user registration
  const handleRegister = (e) => {
    e.preventDefault();

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

    // Save the registered user's data (Mock registration)
    localStorage.setItem("registeredUser", JSON.stringify({ email, password }));
    alert("Registration successful! You can now log in.");
    setIsRegistering(false);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="auth-container">
      <Header />

      <form className="form-container" onSubmit={isRegistering ? handleRegister : handleLogin}>
        <h1>{isRegistering ? "Register" : "Login"}</h1>
        <div className="input-group-email">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
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
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>

        {!isRegistering && (
            <button type="button" onClick={() => setIsRegistering(true)} className="switch-button">
              Don't have an account? Register
            </button>
        )}

        {isRegistering && (
          <button type="button" onClick={() => setIsRegistering(false)} className="switch-button">
            Already have an account? Login
          </button>
        )}
      </form>

      {/* Mock credentials popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Mock Credentials</h2>
            <p>Admin Email: admin@admin.com</p>
            <p>Admin Password: Admin@123</p>
            <p>User Email: user@example.com</p>
            <p>User Password: Password@123</p>
            <button onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AuthPage;
