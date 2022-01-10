import React, { useState } from 'react';
import { Tab } from 'semantic-ui-react';

function Tabs({ tab1, tab1_label, tab2, tab2_label, tab3, tab3_label, activeTab, isLoading }) {

    const [activeIndex, setActiveIndex] = useState(activeTab)

    const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex)

    const panes = [
        tab1 && {
            menuItem: `${tab1_label}`, render: () =>
                <Tab.Pane loading={isLoading}>
                    {tab1}
                </Tab.Pane>
        },
        tab2 && {
            menuItem: `${tab2_label}`, render: () =>
                <Tab.Pane loading={isLoading}>
                    {tab2}
                </Tab.Pane>
        },
        tab3 && {
            menuItem: `${tab3_label}`, render: () =>
                <Tab.Pane loading={isLoading}>
                    {tab3}
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