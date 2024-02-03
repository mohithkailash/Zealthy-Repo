import React from "react";
import {Routes, Route} from "react-router-dom";

import Home from "../pages/Home";
import User from "../User";
import AdminPage from "../AdminPage";
import Userpage from "../Userpage";
import Process from "../Process";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<Userpage />} />
        <Route path="/admin" element = {<AdminPage/>} />
        <Route path="/admin/process/:id" element = {<Process/>}/>
    </Routes>
);

export default AppRoutes;