import { combineReducers } from "redux";
import { TeachersListReducer } from "./teachersReducer";
import { PromotionRequestReducer, CreatePromotionRequestReducer } from "./promotionRequestReducer";
import { PromotionCommitteeReducer } from "./promotionCommitteeReducer";
import { UserReducer } from "./userReducer";


const reducers = combineReducers({
    teachersList: TeachersListReducer,
    promotionRequest: PromotionRequestReducer,
    createFormFiles: CreatePromotionRequestReducer,
    promotionCommittee: PromotionCommitteeReducer,
    user: UserReducer,
});
export default reducers;