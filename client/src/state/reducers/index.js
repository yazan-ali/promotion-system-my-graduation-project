import { combineReducers } from "redux";
import { TeachersReducer } from "./teachersReducer";
import { PromotionRequestReducer, CreatePromotionRequestReducer } from "./promotionRequestReducer";
import { PromotionCommitteeReducer } from "./promotionCommitteeReducer";
import { TeacherDataReducer } from './teacherDataReducer'
import { UserReducer } from "./userReducer";


const reducers = combineReducers({
    teachers: TeachersReducer,
    promotionRequest: PromotionRequestReducer,
    createFormFiles: CreatePromotionRequestReducer,
    promotionCommittee: PromotionCommitteeReducer,
    teacherData: TeacherDataReducer,
    user: UserReducer,
});
export default reducers;