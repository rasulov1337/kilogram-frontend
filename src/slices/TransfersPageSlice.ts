import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../modules/Types";
import { useSelector } from "react-redux";

const transfersSlice = createSlice({
    name: "transfersSlice",
    // в initialState мы указываем начальное состояние нашего глобального хранилища
    initialState: {
        status: "",
        dateFrom: "",
        dateTo: "",
    },
    // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
    reducers: {
        setStatus(state, { payload }) {
            state.status = payload;
        },

        setDateFrom(state, { payload }) {
            state.dateFrom = payload;
        },

        setDateTo(state, { payload }) {
            state.dateTo = payload;
        },
    },
});

export const useStatus = () =>
    useSelector((state: RootState) => state.transfersPage.status);

export const useFormedAtDateFrom = () =>
    useSelector((state: RootState) => state.transfersPage.dateFrom);

export const useFormedAtDateTo = () =>
    useSelector((state: RootState) => state.transfersPage.dateTo);

export const { actions: transfersPageActions } = transfersSlice;

export default transfersSlice.reducer;
