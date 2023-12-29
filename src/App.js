import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer"
import Home from "./pages/Home";
import Register from './pages/Register'
import Login from "./pages/Login";
import CountryRankings from "./pages/CountryRankings";
import HappinessFactors from "./pages/HappinessFactors";
import NotFound from "./pages/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  const API_URL = "https://d2h6rsg43otiqk.cloudfront.net/prod"

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (
    <Router>
      <div className="app | d-flex flex-column">
        <Header isLoggedIn={isLoggedIn} onLoginChanged={setIsLoggedIn}/>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>} />
          <Route path="/register" element={<Register apiUrl={API_URL} />} />
          <Route path="/login" element={<Login apiUrl={API_URL} isLoggedIn={isLoggedIn} onLoginChanged={setIsLoggedIn} />} />
          <Route path="/country-rankings" element={<CountryRankings apiUrl={API_URL} isLoggedIn={isLoggedIn} /> } />
          <Route path="/happiness-factors" element={<HappinessFactors apiUrl={API_URL} isLoggedIn={isLoggedIn} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
