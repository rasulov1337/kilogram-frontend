import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../modules/Types";
import { useSelector } from "react-redux";
import { api } from "../modules/ApiClient";
import { getCookie } from "../modules/Utils";

interface HeaderData {
    username: string;
}

export const getHeaderData = createAsyncThunk<HeaderData>(
    "header/getData",
    async () => {
        const { data } = await api.session.sessionList({
            withCredentials: true,
        });
        return { username: data["username"] || null };
    }
);

export const signOut = createAsyncThunk("auth/signout", async () => {
    await api.signout.signoutCreate({
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
        },
        withCredentials: true,
    });
});

const headerSlice = createSlice({
    name: "headerSlice",
    // в initialState мы указываем начальное состояние нашего глобального хранилища
    initialState: {
        username: null as string | null,
    },
    // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
    reducers: {
        setUsername(state, { payload }) {
            state.username = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHeaderData.fulfilled, (state, action) => {
                state.username = action.payload.username;
            })
            .addCase(signOut.fulfilled, (state) => {
                state.username = null;
            });
    },
});

export const useUsername = () =>
    useSelector((state: RootState) => state.header.username);

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { setUsername: setUsernameAction } = headerSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default headerSlice.reducer;
