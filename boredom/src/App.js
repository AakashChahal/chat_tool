import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Users/SignIn";
import SignUp from "./Users/SignUp";
import Home from "./Home";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
