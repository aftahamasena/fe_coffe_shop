import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginAdmin from "./components/LoginAdmin";
import Item from "./components/item";
import Navigation from "./navbar";
import History from "./components/history";

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/admin-login" element={<LoginAdmin />} />
        <Route path="/item" element={<Item />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
};

export default App;
