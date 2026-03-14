import { apiRequest } from "../../../app/api/apiClient.jsx";

export async function fetchLogin({ email, password }) {
    const payload = await apiRequest("/login", {
        method: "POST",
        body: {
            email: email.trim(),
            password: password.trim(),
        },
    });

    if (!payload) {
        throw new Error("後端沒有回傳資料");
    }

    // 假設後端格式為：
    // { success: true, message: "登入成功", data: {...} }
    // { success: false, message: "帳號或密碼錯誤" }

    if (payload.success !== true) {
        throw new Error(payload.message || "登入失敗");
    }

    return payload;
}