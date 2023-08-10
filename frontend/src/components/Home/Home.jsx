import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const userList = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="home">
      <h2>Hi, everyone!</h2>
      <b>This is a simple User Authentication made with React and Laravel</b>
      <Link to="register">
        <button className="btn-1">Register</button>
      </Link>
      <Link to="login">
        <button className="btn-1">Login</button>
      </Link>
      {userList === null ? (
        <></>
      ) : (
        <Link to="profile">
          <button className="btn-1">Profile</button>
        </Link>
      )}
    </div>
  );
};

export default Home;
