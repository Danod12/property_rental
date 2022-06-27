import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import LandingMain from "./pages/Landing_main";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import Share from "./pages/Share";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Navbar />
      <div className="my-navbar">
        <Routes>
          <Route path="/" element={<LandingMain />}></Route>
          <Route path="/buy" element={<Buy />}></Route>
          <Route path="/rent" element={<Rent />}></Route>
          <Route path="/share" element={<Share />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
