import axios from 'axios';

export async function getDashboard(babyId) {
    const BASE_URL = "http://localhost:8081/v1/reports/babies";
    try {
        const response = await axios.get(`${BASE_URL}/${babyId}/dashboard`);
        return response.data;
    } catch (error) {
        throw new Response("Baby Not Found", { status: 404 });
    }

}

export default getDashboard;
