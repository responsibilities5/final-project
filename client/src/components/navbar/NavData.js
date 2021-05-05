import React from "react";
import { AiFillHome } from "react-icons/ai";
import { FcAbout } from "react-icons/fc";
import { GrResources } from "react-icons/gr";

export const NavData = [
  {
    title: "Home",
    path: "/",
    icon: <AiFillHome />,
    class: "nav-text",
  },

  {
    title: "About",
    path: "/about",
    icon: <FcAbout />,
    class: "nav-text",
  },

  {
    title: "Resources",
    path: "/resources",
    icon: <GrResources />,
  },
];
