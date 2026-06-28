import {apiRequest} from "../../../app/api/apiClient.js";

export async function fetchRegister({ email, password }) {
    return await apiRequest("/members", {
        method: "POST",
        body: {
            email: email.trim(),
            password,
        },
    });
}