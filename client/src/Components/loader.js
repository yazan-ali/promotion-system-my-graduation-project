import React from 'react';

function Loader({ color, size }) {
    return (
        <div style={{ width: "100%", color: color }}>
            <i className={`fas fa-${size}x fa-circle-notch fa-spin`}></i>
            <h3>Loading...</h3>
        </div>
    )
}

export default Loader;