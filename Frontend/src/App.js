import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registre from "./Autho/Register";
import Login from "./Autho/Login";
import Home from "./component/Home";
import Dashbord from "./component/Dashbord";
import AdminDashbord from "./component/AdminDashbord";
import EditInfo from "./component/EditInfo";
import AddBook from "./component/AddBook";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Registre />} />
          <Route path="/admin" element={<AdminDashbord />} />
          <Route path="/user" element={<Dashbord />} />
          <Route path="/edit/:id" element={<EditInfo />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="*" element={<h1>404 not found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
