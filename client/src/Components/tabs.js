import React, { useState } from 'react';
import { Tab } from 'semantic-ui-react';
import TeachersList from './UserComponents/teachersList';


function Tabs({ TeachersList, PromotionCommitteePromotions }) {

    const [activeIndex, setActiveIndex] = useState(TeachersList ? 1 : 0)

    const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex)

    const panes = [
        PromotionCommitteePromotions && {
            menuItem: 'طلبات الترقية', render: () =>
                <Tab.Pane>
                    {PromotionCommitteePromotions}
                </Tab.Pane>
        },
        TeachersList && {
            menuItem: 'أعضاء الهيئة التدريسية', render: () =>
                <Tab.Pane>
                    {TeachersList}
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