// import React from 'react';
// import { Step } from 'semantic-ui-react';
// import { ranks, ranks_2 } from '../constants'

// function Stepper({ currentStep, process_level_number }) {

//     return (
//         <Step.Group size='small' vertical ordered>
//             {
//                 process_level_number === 1 && Array.from({ length: currentStep }).map((rank, idx) => {
//                     if (process_level_number === 1 && (idx + 1) === 4) {
//                         return
//                     } else {
//                         return <Step active={currentStep === (idx + 1) && true} completed={currentStep > (idx + 1) && true}>
//                             <Step.Content>
//                                 <Step.Title>{ranks[idx + 1]}</Step.Title>
//                                 <Step.Description>
//                                     {
//                                         currentStep > (idx + 1) ? `تمت مراجعة طلبك من قبل ${ranks[idx + 1]}`
//                                             :
//                                             currentStep === (idx + 1) ? `يتم مراجعة طلبك حالياً من قبل ${ranks[idx + 1]}`
//                                                 :
//                                                 ""
//                                     }
//                                 </Step.Description>
//                             </Step.Content>
//                         </Step>
//                     }
//                 })
//             }

//             <div style={{ display: "flex", flexDirection: "column-reverse" }}>
//                 {
//                     process_level_number === 2 && Array.from({ length: 7 }).map((rank, idx) => {
//                         if (currentStep === 6 && (idx + 1) === 7) {
//                             return <Step active>
//                                 <Step.Content>
//                                     <Step.Title>{ranks_2[7]}</Step.Title>
//                                     <Step.Description>
//                                         {`يتم مراجعة طلبك حالياً من قبل ${ranks_2[7]}`}
//                                     </Step.Description>
//                                 </Step.Content>
//                             </Step>
//                         }
//                         else if (currentStep === 6 && (idx + 1) === 6) {
//                             return <Step>
//                                 <Step.Content>
//                                     <Step.Title>{ranks_2[6]}</Step.Title>
//                                 </Step.Content>
//                             </Step>
//                         } else {
//                             return <Step active={currentStep === (idx + 1) && true} completed={currentStep < (idx + 1) && true}>
//                                 <Step.Content>
//                                     <Step.Title>{ranks_2[idx + 1]}</Step.Title>
//                                     <Step.Description>
//                                         {
//                                             currentStep < (idx + 1) ? `تمت مراجعة طلبك من قبل ${ranks_2[idx + 1]}`
//                                                 :
//                                                 currentStep === (idx + 1) ? `يتم مراجعة طلبك حالياً من قبل ${ranks_2[idx + 1]}`
//                                                     :
//                                                     ""
//                                         }
//                                     </Step.Description>
//                                 </Step.Content>
//                             </Step>
//                         }
//                     })
//                 }
//             </div>
//         </Step.Group>
//     )
// }

// export default Stepper;


import React from 'react';
import Step from './step';
import './Style/stepper.css';
import { ranks, ranks_2 } from '../constants'

export default function Stepper({ currentStep, process_level_number, hideStep }) {
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
                            description={`يتم مراجعة طلبك من قبل ${ranks[7]}`}
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






            {/* {
                Array.from({ length: 6 }).map((step, idx) => {
                    if ((idx + 1) === hideStep) return
                    else {
                        return <Step
                            title={idx + 1}
                            description={ranks[idx + 1]}
                            completed={currentStep > idx + 1 && true}
                            description={currentStep === idx + 1 ? `يتم مراجعة طلبك من قبل ${ranks[idx + 1]}` : ranks[idx + 1]}
                            lastStep={(idx + 1) === 6 && true}
                        />
                    }
                })
            } */}



            {/* <Step
                title={"1"}
                description={"رئيس القسم"}
                completed={true}
            />

            <Step
                title={"2"}
                description={"العميد"}
                completed={false}
                active={true}
            />

            <Step
                title={"3"}
                description={"رئاسة الجامعة"}
                completed={false}
                active={false}
            />

            <Step
                title={"3"}
                description={"رئاسة الجامعة"}
                completed={false}
                active={false}
            />

            <Step
                title={"3"}
                description={"رئاسة الجامعة"}
                completed={false}
                active={false}
            />

            <Step
                title={"3"}
                description={"رئاسة الجامعة"}
                completed={false}
                active={false}
            /> */}
        </div>
    )
}
