import axios from 'axios';
import {useNavigate} from "react-router";

const API_URL = "http://localhost:8080";

const api = axios.create({
    baseURL:API_URL
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export const createAccount = async (content) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {content});
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
}

export const getMyInvestmentHeaders = async () => {
    try {
        // console.log("Investment Header API is called!")
        const response = await api.get('/investments/headers/')
        return response.data;
    } catch (error) {
        console.error("Error: Failed to retrieve Investment header data!");
        throw error;
    }
}

export const getInvestmentChartIncomeData = async () => {
    try {
        console.log("Investment Chart data!")
        const response = await api.get('/investments/chartIncome')
        console.log("Investment data", response.data);
        return response.data;
    } catch (error) {
        console.error("Error: Failed to retrieve Income graph data!");
        return error;
    }
}



export const loginUser = async (credentials) => {
    try {
        console.log(`Credentials ${JSON.stringify(credentials, null, 2)}`);
        const response = await axios.post(`${API_URL}/user-login/`, credentials);
        localStorage.setItem('token', response.data);
        console.log("Stored token: " + localStorage.getItem('token'));
        return response.data;
    } catch (error) {
        console.error("Error: Failed to login", error);
        throw error;
    }
}

