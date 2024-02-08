import React, { useState } from "react";
import "./AttachFiles.css";

const AttachFiles = ({ onFileChange }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        setSelectedFiles(Array.from(files));
        onFileChange(files);
    };

    return (
        <div className="attach-files-container">
            <label htmlFor="file-upload" className="file-upload-label">
                <i className="fas fa-paperclip"></i> Click here to Attach Files
            </label>
            <input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileChange}
                className="file-upload-input"
            />
            {selectedFiles.length > 0 && (
                <div className="file-list">
                    {selectedFiles.map((file, index) => (
                        <div key={index} className="file-list-item">
                            {file.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AttachFiles;
