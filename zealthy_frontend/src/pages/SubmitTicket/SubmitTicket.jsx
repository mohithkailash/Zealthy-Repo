import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SubmitTicket.css";

import AttachFiles from "../../components/AttachFiles/AttachFiles";
import Input from "../../components/Input/Input";

const SubmitTicket = () => {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [attachment, setAttachment] = useState(null);
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        const validFields = validateFields();

        if (validFields) {
            return;
        }

        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("file", attachment);
        formData.append("description", description);

        axios
            .post(
                `${process.env.REACT_APP_BACKEND_ADDRESS}/user`,

                formData
            )
            .then((response) => {
                if (response) {
                    // Handle successful response, e.g., show thank you message
                    console.log(response.data);
                    setName("");
                    setEmail("");
                    setAttachment(null);
                    setDescription("");
                    setSubmitted(true);
                } else {
                    // Handle error response
                    console.error("Failed to submit ticket");
                }
            })
            .catch((error) => {
                // Handle network error
                console.error("Network error:", error);
            });
        // Set submitted state to true to display thank you message
    };

    const handleAnotherQuery = () => {
        setSubmitted(false);
    };

    const handleFileChange = (event) => {
        console.log(event);
        const file = event[0];
        setAttachment(file);
    };

    const validateFields = () => {
        let error = false;
        if (name === "") {
            setNameError("Name is required");
            error = true;
        } else {
            setNameError("");
        }
        if (email === "") {
            setEmailError("Email is required");
            error = true;
        } else {
            setEmailError("");
        }
        if (description === "") {
            setDescriptionError("Description is required");
            error = true;
        } else {
            setDescriptionError("");
        }
        return error;
    };

    return (
        <div className="userpage-container">
            {submitted ? (
                <div className="thank-you-message">
                    <p>Thank you for submitting your query!</p>
                    <div>
                        <button onClick={handleAnotherQuery}>
                            Submit Another Query
                        </button>
                    </div>
                    <div>
                        <Link to="/admin" style={{ marginTop: "10%" }}>
                            Go to Admin Page
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="title-container">
                        <p className="title">Submit a Ticket</p>
                        <p className="subtitle">
                            Please enter your details below to submit a ticket{" "}
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Please enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required={true}
                            placeholder={"Enter your name"}
                            errorLabel={nameError}
                        />

                        <Input
                            label="Please enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required={true}
                            placeholder={"Enter your email"}
                            errorLabel={emailError}
                        />

                        <Input
                            label="Please describe your issue in detail"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            isTextArea={true}
                            required={true}
                            placeholder={"Enter your issue"}
                            errorLabel={descriptionError}
                        />

                        <AttachFiles onFileChange={handleFileChange} />

                        <div className="submit-container">
                            <button type="submit" className="submit">
                                Submit
                            </button>
                        </div>
                        <br />
                        <div>
                            <Link to="/" style={{ marginTop: "10%" }}>
                                Click here to go back to Home Page
                            </Link>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default SubmitTicket;
