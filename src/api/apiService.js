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
        console.log("Create account post to springboot " + content);
        const response = await axios.post(`${API_URL}/register/`, content);
        console.log("Springboot response" + response.status);
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
}

export const getMyInvestmentHeaders = async () => {
    try {
        // console.log("Investment Header API is called!")
        const response = await api.get(`${API_URL}/investments/headers/`)
        return response.data;
    } catch (error) {
        console.error("Error: Failed to retrieve Investment header data!");
        throw error;
    }
}

export const getInvestmentChartIncomeData = async (graphType, valueType, spousePercentage, outcomeValue, retirementAge, percentageLumpsum,
                                                   incomeStrategy, strategyParameters) => {
    console.log(`GraphType: ${graphType}\n
                ValueType: ${valueType}\n
                SpousePercentage:${spousePercentage}\n
                outcomeValue:${outcomeValue}\n
                retirementAge: ${retirementAge}\n
                percentageLumpsum: ${percentageLumpsum}\n
                incomeStrategy: ${incomeStrategy.incomeStrategy}\n`)
    try {
        // console.log("Investment Chart data!")
        const investmentCalcParameters = {graphType, valueType, spousePercentage, outcomeValue, retirementAge,
        percentageLumpsum, incomeStrategy, strategyDetails: {
            strategy: incomeStrategy,
            parameters: strategyParameters
            }};
        const jsonRequest = JSON.stringify(investmentCalcParameters, null, 2);
        console.log("Investment Chart parameters ",jsonRequest);
        const response = await api.post(`${API_URL}/investments/chartIncome`, investmentCalcParameters, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("Investment Calc request sent");
        // console.log("Investment data", response.data);
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

