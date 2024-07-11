import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Header.scss";

function Header() {
  const [userActive, setUserActive] = useState(false);
  const navigate = useNavigate();

  const LogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const user_email = localStorage.getItem("user_email");

  useEffect(() => {
    if (document.documentElement.scrollHeight > window.innerHeight) {
      const header = document.querySelector("header");
      header.classList.add("scrollyes");
    } else {
      const header = document.querySelector("header");
      header.classList.add("scrollno");
    }
  }, []);

  return (
    <header>
      <div className={`user_wrapper ${userActive ? "user_active" : ""}`}>
        <div
          className="user_wrapper_inner"
          onClick={() => setUserActive(!userActive)}
        >
          <div className="user_img_wrapper">
            <i className="fa-solid fa-user"></i>
          </div>
          <h3>{user_email}</h3>
        </div>
        <div className="leave_acc">
          <button onClick={LogOut}>
            <i className="fa-solid fa-right-from-bracket"></i> Log out
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
