import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userName = userData ? userData[0]?.name : "";
  const navigate = useNavigate();

  useEffect(() => {
    if (userData === null) {
      navigate("/login");
    }
  }, []);

  const logOut = () => {
    localStorage.clear();
    window.location.reload(false);
  };

  console.log(userData);
  console.log(userName);

  return (
    <div className="profContainer">
      <h1>Welcome, {userName}</h1>
      <Link to="/">
        <button className="btn-1">Go to HomePage</button>
      </Link>
      <button onClick={logOut} className="btn-1">
        Log Out
      </button>
    </div>
  );
};

export default Profile;
