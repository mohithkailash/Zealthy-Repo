import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

import Badge from "../../components/Badge/Badge";
import Button from "../../components/Button/Button";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState([]);

    const processId = (userId) => {
        // Send the user ID to port 8000
        navigate(`/admin/process/${userId}`);
    };

    //display the saved user information
    useEffect(() => {
        axios
            .post(`${process.env.REACT_APP_BACKEND_ADDRESS}/admin`)
            .then((response) => {
                console.log(response.data);
                setUserInfo(response.data);
            });
    }, []);

    const handleRowClick = (userId) => () => {
        navigate(`/admin/process/${userId}`);
    }

    return (
        <div className="admin-page-container">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <p>Click on the row to change the status and view more details about each ticket</p>
            </div>

            <div className="user-data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Description</th>
                            {/* <th>Attachment</th> */}
                            <th>Status</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {userInfo.map((user) => (
                            <tr key={user._id} onClick={handleRowClick(user._id)} className="table-row">
                                <td>{user.name}</td>
                                <td className="ellipsis">{user.email}</td>
                                <td className="ellipsis">{user.description}</td>
                                {/* <td className="ellipsis">
                                    {user.attachment !== "None" ? (
                                        <a
                                            href={user.attachment}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Click here to download
                                        </a>
                                    ) : (
                                        "None"
                                    )}
                                </td> */}
                                <td>
                                    <Badge text={user.status} />
                                </td>
                                {/* <td>
                                    <Button onClick={() => processId(user._id)}>
                                        Process
                                    </Button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Link to="/"> Return to Home </Link>
        </div>
    );
};

export default AdminDashboard;
