import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../modules/Types";
import { useSelector } from "react-redux";
import { api } from "../modules/ApiClient";

interface Transfer {
    id: number;
    moderator: string;
    file: string;
    created_at: string;
    completed_at: string;
    formed_at: string;
    sender: string;
    status: string;
}

export const getTransfers = createAsyncThunk<
    void,
    { status: string; formedAtDateRange: string | undefined }
>("transfers/getAll", async ({ status, formedAtDateRange }) => {
    const { data } = await api.transfers.transfersList(
        {
            status,
            "formed-at-range": formedAtDateRange,
        },
        { withCredentials: true }
    );

    return data;
});

const transfersSlice = createSlice({
    name: "transfersSlice",
    // в initialState мы указываем начальное состояние нашего глобального хранилища
    initialState: {
        transfers: [] as Transfer[],
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
    extraReducers: (builder) => {
        builder.addCase(getTransfers.fulfilled, (state, { payload }: any) => {
            state.transfers = payload;
        });
    },
});

export const useStatus = () =>
    useSelector((state: RootState) => state.transfersPage.status);

export const useFormedAtDateFrom = () =>
    useSelector((state: RootState) => state.transfersPage.dateFrom);

export const useFormedAtDateTo = () =>
    useSelector((state: RootState) => state.transfersPage.dateTo);

export const useTransfers = () =>
    useSelector((state: RootState) => state.transfersPage.transfers);

export const { actions: transfersPageActions } = transfersSlice;

export default transfersSlice.reducer;
