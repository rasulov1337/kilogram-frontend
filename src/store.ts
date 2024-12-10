import { combineReducers, configureStore } from "@reduxjs/toolkit";
import recipientsPageDataReducer from "./slices/RecipientsPageSlice";
import usernameReducer from "./slices/HeaderSlice";
import transferPageReducer from "./slices/DraftTransferPageSlice";
import TransfersPageSlice from "./slices/TransfersPageSlice";

export default configureStore({
    reducer: combineReducers({
        recipientsPage: recipientsPageDataReducer,
        header: usernameReducer,
        transferPage: transferPageReducer,
        transfersPage: TransfersPageSlice,
    }),
});
