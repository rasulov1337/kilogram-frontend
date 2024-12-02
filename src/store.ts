import { combineReducers, configureStore } from "@reduxjs/toolkit";
import recipientsPageDataReducer from "./slices/FilterSlice";
import usernameReducer from "./slices/HeaderSlice";

export default configureStore({
    reducer: combineReducers({
        pageData: recipientsPageDataReducer,
        header: usernameReducer,
    }),
});
