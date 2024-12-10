import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../modules/Types";
import { useSelector } from "react-redux";

const authPageSlice = createSlice({
    name: "authPageSlice",
    // в initialState мы указываем начальное состояние нашего глобального хранилища
    initialState: {
        username: "",
        password: "",
        error: null as string | null,
        authPageState: "signin" as "signup" | "signin",
        validated: false,
    },
    // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
    reducers: {
        setUsername(state, { payload }) {
            state.username = payload;
        },
        setPassword(state, { payload }) {
            state.password = payload;
        },
        setError(state, { payload }) {
            state.error = payload;
        },
        setValidated(state, { payload }) {
            state.validated = payload;
        },
        toggleAuthPageState(state) {
            if (state.authPageState === "signin") {
                state.authPageState = "signup";
            } else {
                state.authPageState = "signin";
            }
        },
    },
});

export const useUsername = () =>
    useSelector((state: RootState) => state.authPage.username);

export const usePassword = () =>
    useSelector((state: RootState) => state.authPage.password);

export const useAuthPageState = () =>
    useSelector((state: RootState) => state.authPage.authPageState);

export const useAuthPageError = () =>
    useSelector((state: RootState) => state.authPage.error);

export const useAuthPageValidated = () =>
    useSelector((state: RootState) => state.authPage.validated);

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { actions: authPageActions } = authPageSlice;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default authPageSlice.reducer;
