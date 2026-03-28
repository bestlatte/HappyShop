import {apiRequest} from "../../../app/api/apiClient.js";

export async function fetchRegister({ email, password }) {
    return await apiRequest("/register", {
        method: "POST",
        body: {
            email: email.trim(),
            password,
        },
    });
}