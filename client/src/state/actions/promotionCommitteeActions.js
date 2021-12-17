export const setPromotionCommittee = (promotionCommittee) => {
    return {
        type: "SET_PROMOTION_COMMITTEE",
        payload: promotionCommittee,
    };
}

export const setTeachers = (teachers) => {
    return {
        type: "SET_TEACHERS",
        payload: teachers,
    };
}

export const clearSelectedTeachers = () => {
    return {
        type: "CLEAR_SELECTED_TEACHERS",
    };
}

export const setMembers = (members) => {
    return {
        type: "SET_MEMBERS",
        payload: members,
    };
}

export const setMember = (member) => {
    return {
        type: "SET_MEMBER",
        payload: member,
    };
}

export const removeMember = (id) => {
    return {
        type: "REMOVE_MEMBER",
        payload: id,
    };
}

export const setPromotionRequestsForMember = (promotionRequestsList) => {
    return {
        type: "SET_PROMOTION_REQUESTES_FOR_MEMBER",
        payload: promotionRequestsList
    }
}

export const setCommitteePromotionRequest = (promotionRequest) => {
    return {
        type: "SET_COMMITTEE_PROMOTION_REQUESTE",
        payload: promotionRequest
    }
}

export const addMemberRejectionReason = (payload) => {
    return {
        type: "ADD_MEMBER_REJECT_REASON",
        payload: payload,
    };
}

export const removeMemberRejectionReason = (id) => {
    return {
        type: "REMOVE_MEMBER_REJECT_REASON",
        payload: id,
    };
}