import { combineReducers, configureStore } from "@reduxjs/toolkit";
import recipientsPageDataReducer from "./slices/RecipientsPageSlice";
import authDataReducer from "./slices/AuthDataSlice";
import transferPageReducer from "./slices/DraftTransferPageSlice";
import transfersPageSlice from "./slices/TransfersPageSlice";
import profilePageSlice from "./slices/ProfilePageSlice";

export default configureStore({
    reducer: combineReducers({
        recipientsPage: recipientsPageDataReducer,
        auth: authDataReducer,
        transferPage: transferPageReducer,
        transfersPage: transfersPageSlice,
        profilePage: profilePageSlice,
    }),
});
