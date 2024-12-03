import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../modules/Types";
import { api } from "../modules/ApiClient";
import { getCsrfToken } from "../modules/Utils";

export interface DraftTransferInfo {
    draftId: number | null;
    draftRecipientsLen: number;
}

export interface RecipientData {
    id: number;
    name: string;
    avatar: string;
    phone: string;
}

type DataArray = (RecipientData | DraftTransferInfo)[];

export const getRecipientsData = createAsyncThunk<
    DataArray,
    string | undefined
>("recipients/getData", async (recipientName?: string) => {
    const { data } = await api.recipients.recipientsList(
        { "recipient-name": recipientName },
        { withCredentials: true }
    );

    return data as unknown as DataArray;
});

export const addRecipientToDraft = createAsyncThunk(
    "recipients/addRecipientToDraft",
    async (recipientId: number, { dispatch }) => {
        try {
            const { data } = await api.recipients.recipientsDraftCreate(
                "" + recipientId,
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCsrfToken(),
                    },
                }
            );

            // Refresh the recipient list after successful addition
            dispatch(getRecipientsData()); // No need to pass recipientNameQuery if it's already in the state

            return data; // Return any data from the API if needed
        } catch (error) {
            console.error("Error adding recipient:", error);
            // Optionally, re-throw the error to be handled by the component
            throw error;
        }
    }
);

const recipientsPageSlice = createSlice({
    name: "recipientsPageData",
    // в initialState мы указываем начальное состояние нашего глобального хранилища
    initialState: {
        recipients: [] as RecipientData[],
        draftOrderInfo: {
            orderId: 0,
            recipipentsCount: 0,
        },
        recipientNameQuery: "",
    },
    // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
    reducers: {
        setRecipientNameQuery(state, { payload }) {
            state.recipientNameQuery = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRecipientsData.fulfilled, (state, action) => {
                state.recipients = action.payload.slice(0, -1);

                const { draftId, draftRecipientsCount } = action.payload.at(-1);

                state.draftOrderInfo.orderId = draftId;
                state.draftOrderInfo.recipipentsCount = draftRecipientsCount;
            })
            .addCase(addRecipientToDraft.fulfilled, (state, action) => {
                const recipientId = action.meta.arg;
                // Update state if needed based on returned data
                console.log(action.payload);
            });
    },
});

export const useRecipients = () =>
    useSelector((state: RootState) => state.pageData.recipients);
export const useDraftOrderInfo = () =>
    useSelector((state: RootState) => state.pageData.draftOrderInfo);
export const useRecipientNameQuery = () =>
    useSelector((state: RootState) => state.pageData.recipientNameQuery);

export const { actions: recipientsPageActions } = recipientsPageSlice;

export default recipientsPageSlice.reducer;
