import { React } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChooseMode from "../pages/LoadImages/LoadImages";
import Heightmap from "../components/Heightmap/Heightmap";


function App() {
  return (
    <Router>
      <div id="container">
        <Routes>
          <Route exact path="/" element={<ChooseMode />} />
          <Route path="/heightmap" element={<Heightmap />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
