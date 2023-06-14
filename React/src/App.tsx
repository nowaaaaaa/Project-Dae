import { Routes, Route } from "react-router-dom";
import "./index.css";
import { Home } from "./Pages/Home/Home";
import { Edit } from "./Pages/Edit/Edit";
import { DepSearch } from "./Pages/DepSearch/DepSearch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DepSearch />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/oldPage" element={<Home />} />
    </Routes>
  );
}

export default App;
