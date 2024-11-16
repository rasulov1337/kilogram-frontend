import "./Ajax";
import Ajax from "./Ajax";
import { RECIPIENTS_MOCK } from "./Mocks";

export default class ApiClient {
    static BASE_URL = "/api/";
    static async getRecipients(name?: string) {
        try {
            let url = this.BASE_URL + "recipients/";
            if (name) {
                url += `?recipient-name=${name}`;
            }
            const response = await Ajax.get(url);
            const data = await response.json();
            return data;
        } catch {
            return RECIPIENTS_MOCK;
        }
    }

    static async getRecipient(id: string) {
        try {
            const response = await Ajax.get(
                this.BASE_URL + `recipients/${id}/`
            );
            const data = await response.json();
            return data;
        } catch {
            for (const rec of RECIPIENTS_MOCK) {
                if (rec.id === parseInt(id)) {
                    return rec;
                }
            }
            return {};
        }
    }
}