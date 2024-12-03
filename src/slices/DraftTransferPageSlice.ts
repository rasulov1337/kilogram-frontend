import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../modules/Types";
import { useSelector } from "react-redux";
import { api } from "../modules/ApiClient";
import { getCookie, getCsrfToken } from "../modules/Utils";
import { RecipientData } from "./RecipientsPageSlice";

interface TransferData {
    id: number;
    moderator: string;
    file: string;
    created_at: string;
    completed_at: string;
    formed_at: string;
    recipients: RecipientsDataInsideTransfer[];
    sender: string;
    status: string;
}

interface RecipientsDataInsideTransfer extends RecipientData {
    comment: string;
}

export const getTransferData = createAsyncThunk<void, string>(
    "draft/getData",
    async (id: string) => {
        const { data } = await api.transfers.transfersRead(id, {
            withCredentials: true,
        });
        return data;
    }
);

export const removeFromTransfer = createAsyncThunk<
    void,
    { transferId: string; recipientId: string }
>(
    "draft/removeRecipient",
    async ({ transferId, recipientId }, { dispatch }) => {
        try {
            await api.transfers.transfersRecipientsDelete(
                transferId,
                recipientId,
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCsrfToken(),
                    },
                }
            );

            // Refresh the recipient list after successful addition
            dispatch(getTransferData(transferId)); // No need to pass recipientNameQuery if it's already in the state
        } catch (error) {
            console.error("Error adding recipient:", error);
            // Optionally, re-throw the error to be handled by the component
            throw error;
        }
    }
);

export const updateComment = createAsyncThunk<
    void,
    { transferId: string; recipientId: number }
>(
    "draft/updateComment",
    async ({ transferId, recipientId }, { dispatch, getState }) => {
        try {
            const state = getState() as RootState;

            const recipientIndex = state.draftTransferPage.recipients.findIndex(
                (recipient) => recipient.id === recipientId
            );

            console.log(state.draftTransferPage.recipients, recipientIndex);

            await api.transfers.transfersRecipientsUpdate(
                transferId,
                "" + recipientId,
                {
                    comment:
                        state.draftTransferPage.recipients[recipientIndex]
                            .comment,
                },
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCsrfToken(),
                    },
                }
            );

            // Refresh the recipient list after successful addition
            dispatch(getTransferData(transferId)); // No need to pass recipientNameQuery if it's already in the state
        } catch (error) {
            console.error("Error adding recipient:", error);
            // Optionally, re-throw the error to be handled by the component
            throw error;
        }
    }
);

const draftTransferSlice = createSlice({
    name: "draftTransferSlice",
    // в initialState мы указываем начальное состояние нашего глобального хранилища
    initialState: {
        recipients: [] as RecipientsDataInsideTransfer[],
    },
    // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
    reducers: {
        setComment(
            state,
            {
                payload,
            }: {
                payload: { recipientId: number; comment: string };
            }
        ) {
            const { recipientId, comment } = payload;

            const recipientIndex = state.recipients.findIndex(
                (recipient) => recipient.id === recipientId
            );

            if (recipientIndex !== -1) {
                state.recipients[recipientIndex].comment = comment;
            } else {
                console.warn(`Recipient with ID ${recipientId} not found`);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTransferData.fulfilled, (state, { payload }) => {
            state.recipients = payload.recipients;
        });
    },
});

export const useRecipients = () =>
    useSelector((state: RootState) => state.draftTransferPage.recipients);

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { actions: draftTransferActions } = draftTransferSlice;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default draftTransferSlice.reducer;
