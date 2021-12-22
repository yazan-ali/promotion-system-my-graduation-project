import React from 'react';
import Administrative from './administrative';

function CollegeAdministratives({ college, sections }) {

    return (
        <div className="college-administrative">
            {
                college && <Administrative
                    rank={2}
                    college={college}
                />
            }
            {
                sections && <div className="sections-administrative">
                    {
                        sections.map(section => {
                            return <Administrative
                                key={section.key}
                                rank={1}
                                college={college}
                                section={section.value}
                            />
                        })
                    }
                </div>
            }
        </div>
    )
}

export default CollegeAdministratives;