import { React } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Heightmap from "../components/Heightmap/Heightmap";
import LoadImages from "../pages/LoadImages/LoadImages";

function App() {
  return (
    <Router>
      <div id="container">
        <Routes>
          <Route exact path="/" element={<LoadImages />} />
          <Route path="/heightmap" element={<Heightmap />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
