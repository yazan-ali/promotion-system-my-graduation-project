import React, { useState } from 'react';
import '../Style/promotionRequest.css';
import PromotionRequestEditForm from './promotionRequestEditForm';
import { Button } from 'semantic-ui-react'
import DeleteButton from './deleteButton';
import { Link } from 'react-router-dom';
import { ranks } from '../../constants';
import RejectionReasons from './rejectionReasons';
import UserFilesList from './userFilesList';
import AdministrativeFilesList from './administrativeFilesList';
import Stepper from '../stepper';

function PromotionRequest({ promotionRequest, handleAlert, user, promotionCommitteeID }) {

    const [toggleEditForm, setToggleEditForm] = useState(false);

    const editCondition = (user.id === promotionRequest.created_by.id
        && promotionRequest.current_phase_number === 0);

    const handleToggleEditForm = () => {
        setToggleEditForm(prevState => !prevState);
    }

    return (
        <>
            {
                toggleEditForm ? (
                    <PromotionRequestEditForm
                        handleToggleEditForm={handleToggleEditForm}
                        handleAlert={handleAlert}
                        user={user}
                    />
                ) : (
                    <div className="promotion-request-card">
                        {
                            !promotionCommitteeID && <Stepper
                                currentStep={promotionRequest.current_phase_number}
                                process_level_number={promotionRequest.process_level_number}
                                hideStep={promotionRequest.process_level_number === 1 && 4}
                            />
                        }
                        <div>
                            {/* <div className="promotion-request-card-header">
                                {
                                    promotionRequest.current_phase_number > 0 && !promotionCommitteeID && (
                                        <p style={{ color: "green" }}>
                                            يتم مراحعة طلبك من قبل {
                                                (promotionRequest.current_phase_number === 6 &&
                                                    promotionRequest.process_level_number === 2) ? [ranks[7]]
                                                    :
                                                    ranks[promotionRequest.current_phase_number]
                                            }
                                        </p>
                                    )
                                }
                            </div> */}
                            <p>{promotionRequest.promotion_request_status}</p>
                            <div style={{ maxHeight: 420, overflow: "auto" }}>
                                <div style={{ width: "98%" }}>
                                    <UserFilesList user_files={promotionRequest.user_files} />
                                    <AdministrativeFilesList
                                        administrative_files={promotionRequest.administrative_files}
                                        rank={user.administrativeRank}
                                        current_phase_number={promotionRequest.current_phase_number}
                                        process_level_number={promotionRequest.process_level_number}
                                    />
                                </div>
                            </div>
                            {
                                promotionRequest.rejectionReasons.length > 0 &&
                                < RejectionReasons reasons={promotionRequest.rejectionReasons} />
                            }
                        </div>
                        <div className="btns-container">
                            {
                                editCondition && (
                                    <>
                                        {
                                            user.id === promotionRequest.created_by.id && (
                                                <DeleteButton
                                                    id={promotionRequest._id}
                                                    handleAlert={handleAlert}
                                                />
                                            )
                                        }

                                        {promotionRequest.process_level_number === 1 &&
                                            <Button style={{ backgroundColor: "#098D9C" }} primary>
                                                <Link style={{ color: "#fff" }} to="/edit">تعديل</Link>
                                            </Button>
                                        }
                                    </>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default PromotionRequest;