import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import SubmitTicket from "../pages/SubmitTicket/SubmitTicket";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import ActionPage from "../pages/ActionPage/ActionPage";
import NotFoundPage from "../pages/404/404";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit-ticket" element={<SubmitTicket />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/process/:id" element={<ActionPage />} />

        <Route path="*" element={<NotFoundPage />} />
    </Routes>
);

export default AppRoutes;
