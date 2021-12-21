import React from 'react';
import AdministrativeInfo from './administrativeInfo';

function CollegeAdministratives({ college, sections }) {

    return (
        <div className="college-administrative">
            {
                college && <AdministrativeInfo
                    rank={2}
                    college={college}
                />
            }
            {
                sections && <div className="sections-administrative">
                    {
                        sections.map(section => {
                            return <AdministrativeInfo
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