
import React from 'react';
import './ClockSpinner.scss';

const ClockSpinner = () => {
    return (
        <div className="clock-spinner-container">
            <div className="clock-face">
                <div className="hand hour-hand"></div>
                <div className="hand minute-hand"></div>
                <div className="hand second-hand"></div>
                <div className="center-dot"></div>
            </div>
            <p className="loading-text-spinner">Loading...</p>
        </div>
    );
};
export default ClockSpinner;