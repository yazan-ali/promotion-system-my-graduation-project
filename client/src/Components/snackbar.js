import React, { useState, useEffect } from 'react';
import './Style/snackbar.css';

function Snackbar({ message, type, direction, duration, closeSnackbar }) {

    const handleCloseSnackbar = () => {
        closeSnackbar();
    }

    setTimeout(() => handleCloseSnackbar(), duration)

    return (
        <div className={`notification-container ${direction}`} >
            <div className={`notification-message ${type}`}>
                {
                    type === "fail" ?
                        <i className="fas fa-exclamation-circle"></i>
                        :
                        <i className="fas fa-check-circle"></i>
                }
                <span>{message}</span>
                <button onClick={handleCloseSnackbar} type="button" className="close-btn">x</button>
            </div>
        </div >
    )
}

export default Snackbar;