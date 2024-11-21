const axios = require('axios');
const { logInfo, logError } = require('../utils/logger');

const API_URL = 'http://94.103.91.4:5000';

// Регистрация пользователя
async function registerUser(username) {
  try {
    logInfo(`Регистрация пользователя: ${username}`);
    await axios.post(`${API_URL}/auth/registration`, { username });
  } catch (error) {
    logError(error);
    throw error;
  }
}

// Авторизация пользователя
async function loginUser(username) {
  try {
    logInfo(`Авторизация пользователя: ${username}`);
    const response = await axios.post(`${API_URL}/auth/login`, { username });
    return response.data.token;
  } catch (error) {
    logError(error);
    throw error;
  }
}

module.exports = { registerUser, loginUser };
