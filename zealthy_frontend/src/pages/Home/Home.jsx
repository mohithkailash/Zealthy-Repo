import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import Button from "../../components/Button/Button";

const Home = () => {
    const navigate = useNavigate();

    const userClick = () => {
        navigate("/submit-ticket");
    };
    const adminClick = () => {
        navigate("/admin");
    };
    return (
        <div className="container">
            <div className="title-container">
                <p className="title-primary">Welcome to Zealthy</p>
                <p className="title-secondary">Take Home Assignment</p>
            </div>

            <div>
                <p>
                    This is a take home assignment for the role of Full-Stack
                    Developer at Zealthy. The task is to create a ticketing
                    system where users can submit their issues and admin can
                    manage them.
                </p>
            </div>
            
            <br />
            <br />
            <div>
                <h3>Do you want to ...</h3>
                <div className="buttons-container">
                    <Button onClick={userClick}> Submit a ticket</Button>
                    <Button onClick={adminClick}> Access Admin Dashboard</Button>
                </div>
            </div>
        </div>
    );
};

export default Home;
