import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItems";
import "./Dropdown.css";

const Dropdown = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <React.Fragment>
      <ul
        onClick={() => setToggle(!toggle)}
        className={toggle ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className="dropdown-link"
                to={item.path}
                onClick={() => setToggle(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default Dropdown;
