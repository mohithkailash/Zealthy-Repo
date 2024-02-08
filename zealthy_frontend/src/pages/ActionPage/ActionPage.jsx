import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import "./ActionPage.css";

import { useParams } from "react-router-dom";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

const ActionPage = () => {
    const [processData, setProcessData] = useState(null);
    const [status, setStatus] = useState("");
    const [response, setResponse] = useState("");
    const navigate = useNavigate();

    const progress = [
        { label: "New", value: 0 },
        { label: "In progress", value: 1 },
        { label: "Complete", value: 2 },
    ];

    const params = useParams();

    const fetchData = async (userId) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_ADDRESS}/process`,
                {
                    userId,
                }
            );
            setProcessData(response.data);

            setStatus(response.data.status);
        } catch (error) {
            console.error("Error fetching process data:", error);
        }
    };

    const handleClick = async () => {
        const id = processData._id;

        console.log(processData);
        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_ADDRESS}/confirm`,
                {
                    id,
                    status,
                }
            );
        } catch (error) {
            console.error("Error updating status:", error);
        }
        alert("Status updated and Email sent");
        navigate("/admin");
    };

    useEffect(() => {
        console.log(params.id);
        const userId = params.id;
        fetchData(userId);
    }, []);

    const handleStatusChange = (id, newStatus) => {
        setStatus(newStatus);
    };

    console.log(status);

    return (
        <div className="container">
            <div className="process-container">
                <h1>Ticket Details</h1>
                {processData && (
                    <div className="process-details">
                        <form>
                            <p className="text"><strong>Name:</strong> {processData.name}</p>
                            <p className="text"><strong>Email:</strong> {processData.email}</p>
                            <p className="text"><strong>Description:</strong> {processData.description}</p>
                            <p className="text">
                            <strong>Attachments:</strong>
                                {processData.attachment !== "None" ? (
                                    <a
                                        href={processData.attachment}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Click here to download
                                    </a>
                                ) : (
                                    "None"
                                )}
                            </p>
                            <p className="text">
                                <strong>Status:</strong>
                                
                                <select
                                    value={status}
                                    onChange={(e) =>
                                        handleStatusChange(
                                            processData._id,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="NEW">NEW</option>
                                    <option value="In Progress">
                                        In Progress
                                    </option>
                                    <option value="Complete">Complete</option>
                                </select>
                            </p>
                        </form>
                        <div className="name">
                            <Input
                                label="Send response in email:"
                                placeholder="Enter details to be sent over email"
                                isTextArea={true}
                                onChange={(e) => setResponse(e.target.value)}
                            />
                        </div>
                        <div><Button onClick={handleClick}>Submit</Button></div>
                        <div><Link to="/admin" style={{ marginTop: "10%" }}>
                                Click here to go back to Admin Page
                            </Link></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActionPage;
