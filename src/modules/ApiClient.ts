import { RECIPIENTS_MOCK } from "./Mocks";

import { Api } from "../api/Api";

export const api = new Api({
    baseURL: "http://192.168.119.141:8000",
});

export default class ApiClient {
    static async getRecipients(name?: string) {
        return await api.recipients
            .recipientsList({ "recipient-name": name })
            .catch(() => {
                if (!name) return RECIPIENTS_MOCK;

                name = name.toLowerCase();
                return [
                    ...RECIPIENTS_MOCK.slice(0, -1).filter((x) =>
                        x.name!.toLowerCase().startsWith(name!)
                    ),
                    RECIPIENTS_MOCK.at(-1),
                ];
            });
    }

    static async getRecipient(id: string) {
        return await api.recipients.recipientsRead(id).catch(() => {
            for (const rec of RECIPIENTS_MOCK) {
                if (rec.id === parseInt(id)) {
                    return rec;
                }
            }
            return {};
        });
    }
}
