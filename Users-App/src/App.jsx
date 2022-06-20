import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Users } from "./Components/Users";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
