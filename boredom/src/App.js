import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignIn from "./Users/SignIn";
import SignUp from "./Users/SignUp";
import Home from "./Home";

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <h1>Home</h1>
                            <Link to="about">About</Link>
                            <br />
                            <img src={logo} className="App-logo" alt="logo" />
                        </>
                    }
                />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
