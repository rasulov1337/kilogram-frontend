import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../modules/Types";
import { getCsrfToken } from "../modules/Utils";
import axios from "axios";

export const updateProfile = createAsyncThunk<
    void,
    { username: string; password: string }
>("profile/update", async ({ username, password }) => {
    const response = await axios.put(
        "/api/user/update_profile/",
        {
            username: username,
            password: password ? password : undefined,
        },
        {
            withCredentials: true,
            headers: {
                "X-CSRFToken": getCsrfToken(),
            },
        }
    );
    return response.data;
});

const profilePageSlice = createSlice({
    name: "profilePageSlice",

    initialState: {
        username: null as string | null,
        password: "",
        isFetchingData: false,
    },

    reducers: {
        setUsername(state, { payload }) {
            state.username = payload;
        },

        setPassword(state, { payload }) {
            state.password = payload;
        },

        setIsFetchingData(state, { payload }) {
            state.isFetchingData = payload;
        },

        reset(): any {
            return profilePageSlice.getInitialState();
        },
    },
});

export const useUsername = () =>
    useSelector((state: RootState) => state.profilePage.username);
export const usePassword = () =>
    useSelector((state: RootState) => state.profilePage.password);
export const useIsFetchingData = () =>
    useSelector((state: RootState) => state.profilePage.isFetchingData);

export const { actions: profilePageActions } = profilePageSlice;

export default profilePageSlice.reducer;
