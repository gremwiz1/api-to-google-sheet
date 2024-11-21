const axios = require('axios');
const { logInfo, logSuccess, logError } = require('../utils/logger');
const { retry } = require('../utils/retry');

const API_URL = 'http://94.103.91.4:5000';

// Получение всех клиентов с пагинацией
async function getAllClients(token) {
  let offset = 0;
  const limit = 1000;
  let allClients = [];
  let hasMore = true;

  while (hasMore) {
    try {
      logInfo(`Запрос клиентов с offset ${offset} и limit ${limit}...`);

      // Оборачиваем запрос в retry
      const response = await retry(() =>
        axios.get(`${API_URL}/clients`, {
          headers: { Authorization: `${token}` },
          params: { limit, offset },
        })
      );

      const clients = response.data;
      allClients = [...allClients, ...clients];
      offset += limit;
      hasMore = clients.length === limit;
    } catch (error) {
      logError(error);
      throw error;
    }
  }

  logSuccess(`Получено ${allClients.length} клиентов.`);
  return allClients;
}

module.exports = { getAllClients };
