import React from "react";
import "./Badge.css";

const Badge = ({text}) => {
    const badgeText = text || 'Badge';

    let badgeClass = ""

    if (text === "NEW") {
        badgeClass = "new"
    } else if (text === "In Progress") {
        badgeClass = "in-progress"
    } else if (text === "Complete") {
        badgeClass = "complete"
    }
    return (
        <div className={badgeClass}>
            <span>{badgeText.toLowerCase()}</span>
        </div>
    );
};

export default Badge;
