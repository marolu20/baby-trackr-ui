import { API_BASE_URL, USER_ID } from "./api.js"

export const ENDPOINTS = {
    babies: `${API_BASE_URL}/v1/users/${USER_ID}`,
    baby: (id) => `${API_BASE_URL}/v1/users/${USER_ID}/babies/${id}`,
}
