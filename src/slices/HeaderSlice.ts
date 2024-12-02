import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../modules/Types";
import { useSelector } from "react-redux";

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
});

export const useUsername = () =>
    useSelector((state: RootState) => state.header.username);

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { setUsername: setUsernameAction } = headerSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default headerSlice.reducer;
