export const TeachersListReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_TEACHERS":
            return action.payload
        default:
            return state
    }
};