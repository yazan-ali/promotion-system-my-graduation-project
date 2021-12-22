import React from 'react';
import Administrative from './administrative';

function WiseAdministratives({ selectedRank }) {

    return (
        <div className="college-administrative">
            {
                selectedRank && <Administrative
                    rank={selectedRank === "لجنة أمناء السر" ? 3 : selectedRank === "لجنة التعين والترقية" ? 4 : 5}
                />
            }
        </div>
    )
}

export default WiseAdministratives;