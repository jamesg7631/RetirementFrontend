import axios from 'axios';
import { useNavigate } from "react-router";

const API_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL
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

export const registerUser = async (content) => {
  try {
    console.log("Register account to springboot " + content);
    const response = await api.post(`${API_URL}/users/`, content, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("Register user Springboot response" + response.status);
    return response.data;
  } catch (error) {
    console.error('Error registering user: ', error);
    throw error;
  }
}
export const modifyUserDetails = async (content) => {
  try {
    console.log("Register account to springboot " + content);
    const response = await api.post(`${API_URL}/users/modify`, content, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("Register user Springboot response" + response.status);
    return response.data;
  } catch (error) {
    console.error('Error registering user: ', error);
    throw error;
  }
}

export const createNewDcPension = async (content, currentTab) => {
  try {
    console.log("Attempt to create new DCPension" + content);
    const response = await api.post(`${API_URL}/investments/dc/${currentTab}`, content, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("Create new DC pension response" + response.status);
    return response.data;
  } catch (error) {
    console.error('Error creating DC pension: ', error);
    throw error;
  }
}

export const logoutUser = () => {
  localStorage.removeItem("token");
}

export const amendNewDcPension = async (content, explored) => {
  try {
    console.log("Attempt to amend DC Pension" + content);
    const response = await api.post(`${API_URL}/investments/dc/amend/${explored}`, content, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("Create new DC pension response" + response.status);
    return response.data;
  } catch (error) {
    console.error('Error creating DC pension: ', error);
    throw error;
  }
}

export const getAllDcPensions = async (explored) => {
  try {
    console.log("Attempt to get All Dc Pensions");
    const response = await api.get(`${API_URL}/investments/dc/${explored}`);
    return response.data;
  } catch (error) {
    console.error("Error: Failed to retrieve all portfolios");
    throw error;
  }
}

export const getRegisteredUser = async (explored) => {
  try {
    const response = await api.get(`${API_URL}/users/registered`);
    return response.data;
  } catch (error) {
    console.error("Error: Failed to retrieve all portfolios");
    throw error;
  }
}



export const getStatePension = async () => {
  try {
    console.log("Attempt to get All Dc Pensions");
    const response = await api.get(`${API_URL}/investments/state-pension`)
    return response.data;
  } catch (error) {
    console.error("Error: Failed to retrieve State Pension");
    throw error;
  }
}

export const moveToExploredScenario = async () => {
  try {
    console.log("API: Attempt to update from Current Situation to Explored Scenario");
    const response = await api.get(`${API_URL}/investments/explored-scenario`);
    if (response.data === "success") {
      return response.data;
    }
    throw new Error("API: Failed to update DC Pensions when moving from Current Situation to Explore Scenario tab");
  } catch (error) {
    console.error(e);
  }
}

export const deleteDcPension = async (content, explored) => {
  try {
    console.log("Attempt to delete Dc pension");
    const response = await api.post(`${API_URL}/investments/dc/delete/${explored}`, content, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Failed to delete pension from the database " + error);
  }
}

export const createNewPortfolio = async (content) => {
  try {
    console.log("Register account to springboot " + content);
    const response = await api.post(`${API_URL}/portfolios/add`, content, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("Register user Springboot response" + response.status);
    return response.data;
  } catch (error) {
    console.error('Error registering user: ', error);
    throw error;
  }
}

export const editPortfolio = async (content) => {
  try {
    const response = await api.post(`${API_URL}/portfolios/edit`, content, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating User portfolio: ', error);
    throw error;
  }
}

export const getAllPortfolios = async () => {
  try {
    console.log("Attempt to get All potfolios api");
    const response = await api.get(`${API_URL}/portfolios/all`)
    return response.data;
  } catch (error) {
    console.error("Error: Failed to retrieve all portfolios");
    throw error;
  }
}

export const getMyPortfolios = async () => {
  try {
    console.log("Attempt to get my portfolios api");
    const response = await api.get(`${API_URL}/portfolios/mine`)
    return response.data;
  } catch (error) {
    console.error("Error: Failed to retrieve my portfolios");
    throw error;
  }
}

export const deleteMyPortfolio = async (portfolioId) => {
  try {
    console.log("Attempt to delete portfolio", portfolioId);
    const response = await api.delete(`${API_URL}/portfolios/delete`, {
      data: portfolioId,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data;
  } catch (error) {
    console.error("Error: Delete my portfolio");
    throw error;
  }
}

export const getMyInvestmentHeaders = async (pathVariable) => {
  try {
    const response = await api.get(`${API_URL}/investments/headers/${pathVariable}`)
    return response.data;
  } catch (error) {
    console.error("Error: Failed to retrieve Investment header data!");
    throw error;
  }
}

export const getInvestmentChartIncomeData = async (explored, graphType, valueType, spousePercentage, outcomeValue, retirementAge, percentageLumpsum,
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
    const investmentCalcParameters = {
      graphType, valueType, spousePercentage, outcomeValue, retirementAge,
      percentageLumpsum, incomeStrategy, strategyDetails: {
        strategy: incomeStrategy,
        parameters: strategyParameters
      }
    };
    const jsonRequest = JSON.stringify(investmentCalcParameters, null, 2);
    console.log("Investment Chart parameters ", jsonRequest);
    const response = await api.post(`${API_URL}/investments/chartIncome/${explored}`, investmentCalcParameters, {
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
    console.log("Login object: ", response)
    const token = response.data.token
    localStorage.setItem('token', token);
    console.log("Stored token: " + localStorage.getItem('token'));
    return response.data;
  } catch (error) {
    console.error("Error: Failed to login", error);
    return "loginFailure"
  }
}

