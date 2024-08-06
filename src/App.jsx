
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/Profile";
import BookingPage from "./pages/Booking";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact={true} element={<LoginPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/book" element={<BookingPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
