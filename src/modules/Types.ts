import store from "../store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface RecipientData {
    id: number;
    name: string;
    desc: string;
    birthdate: string;
    city: string;
    phone: string;
    uni: string;
    avatar: string;
}
