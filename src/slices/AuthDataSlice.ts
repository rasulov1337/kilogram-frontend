import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../modules/Types";
import { useSelector } from "react-redux";
import { api } from "../modules/ApiClient";
import { getCookie } from "../modules/Utils";
import { recipientsPageActions } from "./RecipientsPageSlice";
import { transfersPageActions } from "./TransfersPageSlice";
import { profilePageActions } from "./ProfilePageSlice";

export const signIn = createAsyncThunk<
    any,
    { username: string; password: string }
>("auth/signin", async ({ username, password }) => {
    try {
        const response = await api.signin.signinCreate(
            {
                username: username,
                password: password,
            },
            {
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                },
                withCredentials: true,
            }
        );
        return response.data;
    } catch {
        return null;
    }
});

export const signOut = createAsyncThunk("auth/signout", async (_, thunkAPI) => {
    const response = await api.signout.signoutCreate({
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
        },
        withCredentials: true,
    });

    // if successful
    thunkAPI.dispatch(recipientsPageActions.setRecipientNameQuery(null));
    thunkAPI.dispatch(transfersPageActions.reset());
    thunkAPI.dispatch(profilePageActions.reset());
});

const authSlice = createSlice({
    name: "authSlice",
    // в initialState мы указываем начальное состояние нашего глобального хранилища
    initialState: {
        username: null as string | null,
        loggedIn: false,
    },
    // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
    reducers: {
        setUsername(state, { payload }) {
            state.username = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.fulfilled, (state, action) => {
                state.username = action.payload.username;
                state.loggedIn = true;
            })
            .addCase(signOut.fulfilled, (state) => {
                state.username = null;
                state.loggedIn = false;
            });
    },
});

export const useUsername = () =>
    useSelector((state: RootState) => state.auth.username);

export const useLoggedIn = () =>
    useSelector((state: RootState) => state.auth.loggedIn);

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { actions: authActions } = authSlice;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default authSlice.reducer;
