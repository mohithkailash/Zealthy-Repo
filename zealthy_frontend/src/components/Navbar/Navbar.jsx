import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a href="/" className="navbar-logo">
                    <h2>Zealthy-logo</h2>
                </a>
                <div className="menu-icon" onClick={toggleMobileMenu}>
                    <i
                        className={
                            mobileMenuOpen ? "fas fa-times" : "fas fa-bars"
                        }
                    ></i>
                </div>
                <ul className={mobileMenuOpen ? "nav-menu active" : "nav-menu"}>
                    <li className="nav-item">
                        <a href="/" className="nav-links">
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/about" className="nav-links">
                            About
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/services" className="nav-links">
                            Services
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/contact" className="nav-links">
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
