import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "../src/Assets/Pages/Home";
import About from "./Assets/Pages/About";
import Portfolio from "./Assets/Pages/Portfolio";
import Login from "./Assets/Pages/Login";
import Signup from "./Assets/Pages/Signup";
import Forget from "./Assets/Pages/Forget";
import Performance from "./Assets/Pages/Performance";
import Gamehome from "./Assets/Pages/Game/Gamehome";
import Playgame from "./Assets/Pages/Game/Playgame";
import Gamemode from "./Assets/Pages/Game/Gamemode";
import Joinleague from "./Assets/Pages/Game/Joinleague";
import Profile from "./Assets/Pages/Game/Profile";
import Portfoliocreation from "./Assets/Pages/Game/Portfoliocreation";
import Contact from "./Assets/Pages/Contact";
import Joinclub from "./Assets/Pages/Game/Joinclub";
import CompeteClub from "./Assets/Pages/Game/CompeteClub";
import Play from "./Assets/Pages/Game/Play";
import Stripe from "./Assets/Pages/Stripe";
import { Toaster } from "react-hot-toast";
import { NotFound, ProtectedRoutes, ProtectedloginRoutes } from "./protection";

function App() {
  return (
    <HashRouter>
      <Toaster
        toastOptions={{
          style: {
            fontSize: "18px",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/portfolio" element={<Portfolio />}></Route>
        <Route element={<ProtectedloginRoutes />}>
          <Route path="/signin" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/forget" element={<Forget />}></Route>
        </Route>
        <Route path="/performance" element={<Performance />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/gamehome" element={<Gamehome />}></Route>
          <Route path="/add-payment-card" element={<Stripe />} />
        </Route>
        <Route path="/playgame" element={<Playgame />}></Route>
        <Route path="/gamemode/:id?" element={<Gamemode />}></Route>
        <Route path="/joinleague/:id?" element={<Joinleague />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route
          path="/portfoliocreation/:id?"
          element={<Portfoliocreation />}
        ></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/joinclub/:id?" element={<Joinclub />}></Route>
        <Route path="/competeclub/:id?" element={<CompeteClub />}></Route>
        <Route path="/play/:id?" element={<Play />}></Route>
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
