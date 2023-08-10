import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [status, setStatus] = useState(0);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passError, setPassError] = useState("");

  const postData = async (e, name, email, password, rePassword) => {
    if (password !== rePassword) {
      setPassError("Passwords does not match");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8000/api/users", {
        name: name,
        email: email,
        password: password,
      });
      console.log(res);
      setStatus(res.status);
      e.target.reset();
    } catch (err) {
      console.log(err.response);
      if (err.response?.data?.errors) {
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
    const name = e.target[0].value ?? "";
    const email = e.target[1].value ?? "";
    const password = e.target[2].value ?? "";
    const rePassword = e.target[3].value ?? "";

    console.log(email);

    setRegisterData((prev) => ({
      name: name,
      email: email,
      password: password,
      rePassword: rePassword,
    }));

    postData(e, name, email, password, rePassword);
  };
  return (
    <div>
      <div className="loginform">
        <form action="" onSubmit={handleSubmit}>
          <input type="text" name="" placeholder="Username" />
          <p className="error-p">{errors.name}</p>
          <input type="email" name="" placeholder="Email" />
          <p className="error-p">{errors.email}</p>
          <input type="password" name="" placeholder="Password" />
          <p className="error-p">{errors.password}</p>
          <input type="password" name="" placeholder="Re-type Password" />
          <p className="error-p">{passError}</p>
          <button>Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <b style={{ color: "green" }}>
          {status === 200 && `User registered successfully`}
        </b>
      </div>
    </div>
  );
};

export default Register;
