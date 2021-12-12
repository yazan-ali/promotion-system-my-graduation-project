const TeachersListReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_TEACHERS":
            return action.payload
        case "PROMOTION_REQUEST_APPROVE":
            const updatedTeacherList = state.teachers.map(teacher => {
                if (teacher._id === teacher_id) {
                    const updatedPromotionRequest =
                        { ...teacher.promotionRequest, current_phase_number: teacher.promotionRequest.current_phase_number - 1 }
                    return { ...teacher, promotionRequest: updatedPromotionRequest }
                }
                else {
                    return teacher
                }
            })
            setTeachers(updatedTeacherList);
        default:
            return state
    }
};