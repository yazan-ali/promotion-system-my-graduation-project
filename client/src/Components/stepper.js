import React from 'react';
import Step from './step';
import './Style/stepper.css';
import { ranks } from '../constants'

function Stepper({ currentStep, process_level_number, hideStep }) {
    return (
        <div className="stepper" style={{ flexDirection: process_level_number === 2 && "row-reverse" }}>
            {
                Array.from({ length: 6 }).map((step, idx) => {
                    if ((idx + 1) === hideStep) return
                    else if (process_level_number === 2 && (idx + 1) === 6) {
                        return <Step
                            title={idx + 1}
                            description={ranks[idx + 1]}
                            completed={
                                process_level_number === 1 ? currentStep > idx + 1 && true
                                    :
                                    currentStep < idx + 1 && true
                            }
                            active={currentStep === idx + 1}
                            description={`${currentStep === 6 ? `يتم مراجعة طلبك من قبل ${ranks[7]}` : `المقيمين`}`}
                            lastStep={true}
                        />
                    }
                    else {
                        return <Step
                            title={idx + 1}
                            description={ranks[idx + 1]}
                            completed={
                                process_level_number === 1 ? currentStep > idx + 1 && true
                                    :
                                    currentStep < idx + 1 && true
                            }
                            active={currentStep === idx + 1}
                            description={currentStep === idx + 1 ? `يتم مراجعة طلبك من قبل ${ranks[idx + 1]}` : ranks[idx + 1]}
                            lastStep={(idx + 1) === 6 && true}
                        />
                    }
                })
            }
        </div>
    )
}

export default Stepper;