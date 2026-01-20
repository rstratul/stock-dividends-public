import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import StockDetail from "./pages/StockDetail";
import "./App.css";

const App = () => {
  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stocks/:ticker" element={<StockDetail />} />
      </Routes>
    </main>
  );
};

export default App;
