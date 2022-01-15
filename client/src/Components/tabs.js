import React, { useState } from 'react';
import { Tab } from 'semantic-ui-react';

function Tabs({ activeTab, isLoading, tabs }) {

    const [activeIndex, setActiveIndex] = useState(activeTab)

    const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex)


    const panes = tabs.map(tab => {
        if (tab.tab) {
            return {
                menuItem: tab.label, render: () =>
                    <Tab.Pane loading={isLoading}>
                        {tab.tab}
                    </Tab.Pane>
            }
        }
    })

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