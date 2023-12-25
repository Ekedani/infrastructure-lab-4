import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SellersComponent from "./sellers/SellersComponent";
import TicketsComponent from "./tickets/TicketsComponent";
import ViewersComponent from "./viewer/ViewersComponent";
import "./App.css";
import Footer from "./footer/Footer";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/sellers">Sellers</Link>
            </li>
            <li>
              <Link to="/tickets">Tickets</Link>
            </li>
            <li>
              <Link to="/viewers">Viewers</Link>
            </li>
          </ul>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/sellers" element={<SellersComponent />} />
            <Route path="/tickets" element={<TicketsComponent />} />
            <Route path="/viewers" element={<ViewersComponent />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
