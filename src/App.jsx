import React from "react";
import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import Problem1 from "./pages/Problem1.jsx";
import Problem2 from "./pages/Problem2.jsx";

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Problem1 />} />
        <Route path="/problem-2" element={<Problem2 />} />
      </Route>
    </Routes>
  );
};

export default App;
