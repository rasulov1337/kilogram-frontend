import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const recipientsPageSlice = createSlice({
    name: "recipientsPageData",
    // в initialState мы указываем начальное состояние нашего глобального хранилища
    initialState: {
        pageData: [],
        recipientNameQuery: "",
    },
    // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
    reducers: {
        setPageData(state, { payload }) {
            state.pageData = payload;
        },
        setRecipientNameQuery(state, { payload }) {
            state.recipientNameQuery = payload;
        },
    },
});

export const usePageData = () => useSelector((state) => state.ourData.pageData);
export const useRecipientNameQuery = () =>
    useSelector((state) => state.ourData.recipientNameQuery);

export const {
    setPageData: setPageDataAction,
    setRecipientNameQuery: setRecipientNameQuery,
} = recipientsPageSlice.actions;

export default recipientsPageSlice.reducer;
