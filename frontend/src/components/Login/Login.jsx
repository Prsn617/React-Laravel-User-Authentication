import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState(0);

  const handleSubmit = () => {
    console.log("Bruh");
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
