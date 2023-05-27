import { Routes, Route } from "react-router-dom";
import "./index.css";
import { Home } from "./Pages/Home/Home";
import { Edit } from "./Pages/Edit/Edit";
import { DepSearch } from "./Pages/DepSearch/DepSearch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/dependencies" element={<DepSearch />} />
    </Routes>
  );
}

export default App;
