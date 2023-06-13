import React from "react";
import { useOutlet } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";

const RootLayout = (props) => {
  const outlet = useOutlet();

  return (
    <div className="flex">
      <NavBar />
      <div className="p-8 flex-grow">{outlet}</div>
    </div>
  );
};

export default RootLayout;
