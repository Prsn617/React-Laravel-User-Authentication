import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState(0);

  const navigate = useNavigate();
  const userData = localStorage.getItem("user") || null;
  if (userData) {
    navigate("/profile");
  }

  const login = async (e, email, password) => {
    try {
      const res = await axios.post("http://localhost:8000/api/users/login", {
        email: email,
        password: password,
      });

      console.log(res.data.user);
      e.target.reset();
      localStorage.setItem(
        "user",
        JSON.stringify([
          { name: res.data.user.name, email: res.data.user.email },
        ])
      );
      navigate("/profile");
    } catch (err) {
      if (err.response.data?.errors) {
        const newErr = err.response.data.errors;
        setErrors({
          name: newErr.name ?? "",
          email: newErr.email ?? "",
          password: newErr.password ?? "",
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value ?? "";
    const password = e.target[1].value ?? "";

    login(e, email, password);
  };

  return (
    <div>
      <div className="loginform">
        <form action="" onSubmit={handleSubmit}>
          <input type="email" name="" placeholder="Email" />
          <p className="error-p">{errors.email}</p>
          <input type="password" name="" placeholder="Password" />
          <p className="error-p">{errors.password}</p>
          <button>Register</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <b style={{ color: "green" }}>
          {status === 200 && `User registered successfully`}
        </b>
      </div>
    </div>
  );
};

export default Login;
