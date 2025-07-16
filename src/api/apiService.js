import axios from 'axios';

const API_URL = "http://localhost:8080";

export const createAccount = async (content) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {content});
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
}

