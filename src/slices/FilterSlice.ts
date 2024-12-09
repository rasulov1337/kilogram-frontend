import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface RecipientsPageState {
    recipientNameQuery: string;
}

export interface RootState {
    ourData: RecipientsPageState;
}

const recipientsPageSlice = createSlice({
    name: "recipientsPageData",
    // в initialState мы указываем начальное состояние нашего глобального хранилища
    initialState: {
        recipientNameQuery: "",
    },
    // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
    reducers: {
        setRecipientNameQuery(state, { payload }) {
            state.recipientNameQuery = payload;
        },
    },
});

export const useRecipientNameQuery = () =>
    useSelector((state: RootState) => state.ourData.recipientNameQuery);

export const { setRecipientNameQuery: setRecipientNameQuery } =
    recipientsPageSlice.actions;

export default recipientsPageSlice.reducer;
