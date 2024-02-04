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
            <h1>Do you want access ...</h1>
            <div className="buttons-container">
                <button className="gooey-button" onClick={userClick}> User query page</button>
                <button className="gooey-button" onClick={adminClick}> Admin dashboard</button>
            </div>
        </div>
    );
};

export default Home;