import axios from 'axios';
import { ENDPOINTS } from "../config/endpoints.js"

export async function getBaby(babyId) {
    try {
        const response = await axios.get(ENDPOINTS.baby(babyId));
        return response.data;
    } catch (error) {
        if (error.message === "NOT_FOUND") {
            setBaby(null)
            setHasBaby(false)
        } else {
            throw error;
        }
    }
}

export default getBaby;
