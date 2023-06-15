import { React } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Heightmap from "../pages/Dashboard/Dashboard";
import StartScreen from "../pages/StartScreen/StartScreen";
import Dashboard from "../pages/Dashboard/Dashboard";

function App() {
  return (
    <>
      <Router>
        <div id="container">
          <Routes>
            <Route exact path="/" element={<StartScreen />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
