import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="login-container">
      <h1> Barber Shop</h1>
      <h2>Login to your Account</h2>
      <div className="othermeth">
        <button>Google</button>
        <button>Facebook</button>
      </div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input type="checkbox" name="rempass" id="rempass" className="checkbox" />
        <button type="submit">Login</button>
      </form>
      <p>
        Dont have an account? <a href="/register">Sign up</a>
      </p>
      <p>Forgot Password? <a href="#">Reset Password</a></p>
    </div>
  );
};

export default LoginPage;
