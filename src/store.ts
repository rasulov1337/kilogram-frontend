import { combineReducers, configureStore } from "@reduxjs/toolkit";
import recipientsPageDataReducer from "./slices/RecipientsPageSlice";
import usernameReducer from "./slices/HeaderSlice";
import transferPageReducer from "./slices/DraftTransferPageSlice";
import transfersPageSlice from "./slices/TransfersPageSlice";
import profilePageSlice from "./slices/ProfilePageSlice";

export default configureStore({
    reducer: combineReducers({
        recipientsPage: recipientsPageDataReducer,
        header: usernameReducer,
        transferPage: transferPageReducer,
        transfersPage: transfersPageSlice,
        profilePage: profilePageSlice,
    }),
});
