import { React } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import LoadImages from "../pages/LoadImages/LoadImages";
import { ImageProvider } from "../store/ImageContext";
import { PosenetProvider } from "../store/PosenetContext";

function App() {
  return (
    <PosenetProvider>
      <ImageProvider>
        <Router>
          <div id="container">
            <Routes>
              <Route exact path="/" element={<LoadImages />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </Router>
      </ImageProvider>
    </PosenetProvider>
  );
}

export default App;
