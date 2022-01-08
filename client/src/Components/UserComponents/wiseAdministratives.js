import React from 'react';
import Administrative from './administrative';

function WiseAdministratives({ selectedRank }) {

    return (
        <div className="college-administrative">
            {
                selectedRank && <Administrative
                    rank={
                        selectedRank === "رئاسة الجامعة" ?
                            3
                            :
                            selectedRank === "مجلس العمداء" ?
                                4
                                :
                                selectedRank === "أمانة سر المجالس" ?
                                    5
                                    :
                                    6
                    }
                />
            }
        </div>
    )
}

export default WiseAdministratives;