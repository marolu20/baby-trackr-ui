import { API_BASE_URL, REPORTING_API_BASE_URL, USER_ID } from "./api.js"

export const ENDPOINTS = {
    dashboard: (id) =>`${REPORTING_API_BASE_URL}/v1/reports/babies/${id}/dashboard`,
    babies: `${API_BASE_URL}/v1/users/${USER_ID}`,
    baby: (id) => `${API_BASE_URL}/v1/users/${USER_ID}/babies/${id}`,
    events: (id) => `${API_BASE_URL}/v1/babies/${id}/events`,
}
