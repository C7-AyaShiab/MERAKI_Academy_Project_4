import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Project 4 </h1>
      </header>
      <Routes>
      <Route path="/" element={<Home />} /> 
      </Routes>
    </div>
  );
}

export default App;
