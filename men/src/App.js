import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import MenHome from "./pages/MenHome";
import MenInfo from "./pages/MenInfo";
function App() {
  return (
    <>
        <Routes>
            <Route path="/" element={<MenHome />} />

            <Route path="/:docId" element={<MenInfo />} />

            <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
    </>
  );
}

export default App;
