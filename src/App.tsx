import React, { useRef, useState } from "react";
import "./index.css";
import SideBar from "./components/SideBar";
import { Route, Routes } from "react-router-dom";
import TinderPage from "./pages/tinder";
import PrivateRouter from "./auth/auth";
import ExplorePage from "./pages/Explore";

function App() {
    return (
        <div className="flex bg-[var(--color-secondary)]">
            <SideBar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRouter>
                            <h1>Home</h1>
                        </PrivateRouter>
                    }
                ></Route>
                <Route
                    path="/explore"
                    element={
                        <PrivateRouter>
                            <ExplorePage />
                        </PrivateRouter>
                    }
                ></Route>
                <Route
                    path="/tinder"
                    element={
                        <PrivateRouter>
                            <TinderPage />
                        </PrivateRouter>
                    }
                ></Route>
            </Routes>
        </div>
    );
}

export default App;
