import {apiRequest} from "../../../app/api/apiClient.js";


export async function fetchForgetPassword({ email }) {
    return await apiRequest("/forgetPassword", {
        method: "POST",
        body: {
            email: email.trim(),
        },
    });
}