import { Routes, Route } from "react-router-dom";
import "./index.css";
import { Home } from "./Pages/Home/Home";
import { Edit } from "./Pages/Edit/Edit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/edit" element={<Edit />} />
    </Routes>
  );
}

export default App;
