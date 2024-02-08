import React from "react";
import "./Input.css"; // Make sure this file is in the same directory

const Input = ({
    label,
    name,
    value,
    placeholder,
    onChange,
    errorLabel,
    isTextArea,
    required,
}) => {
    return (
        <div className="input-container">
            {label && (
                <label htmlFor={name} className="label">
                    {label}
                    {required && <span className="required-star">*</span>}
                </label>
            )}
            {isTextArea ? (
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`input-field ${errorLabel ? "error" : ""}`}
                    aria-required={required}
                    placeholder={placeholder}
                />
            ) : (
                <input
                    type="text"
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`input-field ${errorLabel ? "error" : ""}`}
                    aria-required={required}
                    placeholder={placeholder}
                />
            )}
            {errorLabel && <span className="error-label">{errorLabel}</span>}
        </div>
    );
};

export default Input;
