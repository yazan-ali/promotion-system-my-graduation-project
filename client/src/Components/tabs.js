// import React, { useState } from 'react';
// import { Tab } from 'semantic-ui-react';

// function Tabs({ TeachersList, PromotionCommitteePromotions }) {

//     const [activeIndex, setActiveIndex] = useState(TeachersList ? 1 : 0)

//     const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex)

//     const panes = [
//         PromotionCommitteePromotions && {
//             menuItem: 'طلبات الترقية', render: () =>
//                 <Tab.Pane>
//                     {PromotionCommitteePromotions}
//                 </Tab.Pane>
//         },
//         TeachersList && {
//             menuItem: 'أعضاء الهيئة التدريسية', render: () =>
//                 <Tab.Pane>
//                     {TeachersList}
//                 </Tab.Pane>
//         },
//     ]

//     return (
//         <div className="tabs">
//             <Tab
//                 panes={panes}
//                 activeIndex={activeIndex}
//                 onTabChange={handleTabChange}
//             />
//         </div>
//     )
// }

// export default Tabs;

import React, { useState } from 'react';
import { Tab } from 'semantic-ui-react';

function Tabs({ tab1, tab1_label, tab2, tab2_label }) {

    const [activeIndex, setActiveIndex] = useState(tab1 ? 1 : 0)

    const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex)

    const panes = [
        tab1 && {
            menuItem: `${tab1_label}`, render: () =>
                <Tab.Pane>
                    {tab1}
                </Tab.Pane>
        },
        tab2 && {
            menuItem: `${tab2_label}`, render: () =>
                <Tab.Pane>
                    {tab2}
                </Tab.Pane>
        },
    ]

    return (
        <div className="tabs">
            <Tab
                panes={panes}
                activeIndex={activeIndex}
                onTabChange={handleTabChange}
            />
        </div>
    )
}

export default Tabs;