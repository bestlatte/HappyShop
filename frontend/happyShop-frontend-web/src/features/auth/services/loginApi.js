import {apiRequest} from "../../../app/api/apiClient.js";

export async function fetchLogin({ email, password }) {
    return await apiRequest("/login", {
        method: "POST",
        body: {
            email: email.trim(),
            password,
        },
    });
}