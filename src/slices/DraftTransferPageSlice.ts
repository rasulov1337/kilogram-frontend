import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../modules/Types";
import { useSelector } from "react-redux";
import { api } from "../modules/ApiClient";
import { getCsrfToken } from "../modules/Utils";
import { RecipientData } from "./RecipientsPageSlice";
import { ContentType } from "../api/Api";

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

export interface RecipientsDataInsideTransfer extends RecipientData {
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

export const deleteTransfer = createAsyncThunk<void, string>(
    "draft/self-delete",
    async (transferId) => {
        try {
            const response = await api.transfers.transfersDelete(transferId, {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": getCsrfToken(),
                },
            });
            console.log(response);
        } catch (error) {
            console.error(
                `Error while deleting transfer with id: ${transferId}`
            );
            throw error;
        }
    }
);

export const formTransfer = createAsyncThunk<void, string>(
    "draft/form",
    async (transferId) => {
        try {
            await api.transfers.transfersFormUpdate(transferId, {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": getCsrfToken(),
                },
            });
        } catch (error) {
            console.error(
                `Error while forming transfer with id: ${transferId}`
            );
            throw error;
        }
    }
);

export const uploadFile = createAsyncThunk<
    void,
    { transferId: string; file: File }
>("draft/uploadFile", async ({ transferId, file }, { dispatch }) => {
    const formData = new FormData();
    formData.append("file_obj", file);

    try {
        const response = await api.transfers.transfersUpdate(
            transferId,
            formData,
            {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": getCsrfToken(),
                },
                type: ContentType.FormData,
            }
        );
        return response.data.file;
    } catch (error) {
        console.error(`Error while sending file with id: ${transferId}`);
        throw error;
    }
});

interface TransferState {
    file: string | null;
    recipients: RecipientsDataInsideTransfer[];
}

const draftTransferSlice = createSlice({
    name: "draftTransferSlice",
    // в initialState мы указываем начальное состояние нашего глобального хранилища
    initialState: {
        recipients: [] as RecipientsDataInsideTransfer[],
        file: null,
    } as {
        file: string | null;
        recipients: RecipientsDataInsideTransfer[];
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
        builder
            .addCase(getTransferData.fulfilled, (state, { payload }) => {
                state.recipients = payload.recipients;
                state.file = payload.file;
            })
            .addCase(uploadFile.fulfilled, (state, { payload }) => {
                state.file = payload as string;
            });
    },
});

export const useRecipients = () =>
    useSelector((state: RootState) => state.draftTransferPage.recipients);
export const useFile = () =>
    useSelector((state: RootState) => state.draftTransferPage.file);

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { actions: draftTransferActions } = draftTransferSlice;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default draftTransferSlice.reducer;