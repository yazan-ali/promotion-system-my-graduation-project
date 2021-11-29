import React, { useState, useEffect } from 'react';

function Accordion({ items, removeRejectionReason, showAccordionItems, isAdministrative }) {

    // const [collapse, setCollapse] = useState(showAccordionItems);

    // const collapseItems = () => {
    //     setCollapse(prev => !prev)
    // }

    // const collapseCondition = collapse || showAccordionItems


    return (
        <div className="accordion">
            <div className="accordion-btn">
                <p>
                    <i className="fas fa-exclamation-triangle"></i>
                    يرجى تعديل الآتي لإستكمال إجراءات الطلب
                </p>
            </div>
            <ul>
                {
                    items.map(item => (
                        <li key={item.id} >
                            {item.reason}
                            {isAdministrative && <i
                                className="fas fa-times"
                                style={{ marginRight: 20, cursor: 'pointer' }}
                                onClick={() => removeRejectionReason(item.id)}></i>}
                        </li>
                    ))
                }
            </ul>
        </div >
    )
}

export default Accordion;