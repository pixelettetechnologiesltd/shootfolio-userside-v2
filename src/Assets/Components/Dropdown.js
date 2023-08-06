import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { RxHamburgerMenu } from "react-icons/rx";
import "../Css/Dropdown.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "./../../store/actions";

function BasicExample() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authReducer);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <span className="sethamburg">
          <RxHamburgerMenu />
        </span>
        Menu
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => navigate("/")}>Home</Dropdown.Item>
        {user && (
          <Dropdown.Item onClick={() => navigate("/profile")}>
            View my Profile
          </Dropdown.Item>
        )}
         {user && (
          <Dropdown.Item onClick={() => navigate("/gamehome")}>
            Play Game
          </Dropdown.Item>
        )}
        <Dropdown.Item onClick={() => navigate("/about")}>
          About Us
        </Dropdown.Item>
        <Dropdown.Item onClick={() => navigate("/contact")}>
          Contact Us
        </Dropdown.Item>
        {/* {user && (
          <Dropdown.Item onClick={() => navigate("/portfolio")}>
            Portfolio
          </Dropdown.Item>
        )} */}
        {/* {user && (
          <Dropdown.Item onClick={() => navigate("/performance")}>
            Performance
          </Dropdown.Item>
        )} */}
       
       
        {/* {user && (
          <Dropdown.Item onClick={() => navigate("/add-payment-card")}>
            Add Payment Card
          </Dropdown.Item>
        )} */}
        {user && (
          <Dropdown.Item onClick={() => dispatch(logOut())}>
            {loading ? "..." : "Log Out"}
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BasicExample;
