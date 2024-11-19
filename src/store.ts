import { combineReducers, configureStore } from "@reduxjs/toolkit";
import recipientsPageDataReducer from "./slices/FilterSlice";

export default configureStore({
    reducer: combineReducers({
        ourData: recipientsPageDataReducer,
    }),
});
