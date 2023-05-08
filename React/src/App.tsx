import { Routes, Route } from "react-router-dom";
import "./index.css";
import { Home } from "./Pages/Home/Home";
import { Edit } from "./Pages/Edit/Edit";
import { Test } from "./Pages/Home/Test";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
