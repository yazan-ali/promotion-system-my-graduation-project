import React from 'react';

function Step({ title, description, completed, active, lastStep }) {
    return (
        <>
            <div className="step">
                <div className={`step-title ${active && "active"} ${completed && "completed"} `}>
                    {completed ?
                        <i className="fas fa-check"></i>
                        :
                        <p>{title}</p>
                    }
                </div>
                <p className="description">{description}</p>
            </div>

            {!lastStep && <span className="step-line"></span>}
        </>
    )
}

export default Step;