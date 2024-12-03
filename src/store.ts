import { combineReducers, configureStore } from "@reduxjs/toolkit";
import recipientsPageDataReducer from "./slices/RecipientsPageSlice";
import usernameReducer from "./slices/HeaderSlice";
import draftTransferPageReducer from "./slices/DraftTransferPageSlice";

export default configureStore({
    reducer: combineReducers({
        recipientsPage: recipientsPageDataReducer,
        header: usernameReducer,
        draftTransferPage: draftTransferPageReducer,
    }),
});
