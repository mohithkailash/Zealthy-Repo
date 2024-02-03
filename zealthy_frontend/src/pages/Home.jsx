import React from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const userClick = () => {
        navigate("/user")
    }
    const adminClick = () => {
        navigate("/admin")
    }
    return (
        <div className="container">
            <h1>Are you ....</h1>
            <div className="buttons-container">
                <button className="gooey-button" onClick={userClick}> an user want to submit a query</button>
                <button className="gooey-button" onClick={adminClick}> an back-admin team member</button>
            </div>
        </div>
    );
};

export default Home;