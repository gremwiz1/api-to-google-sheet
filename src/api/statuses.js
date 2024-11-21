const axios = require('axios');
const { logInfo, logSuccess, logError } = require('../utils/logger');
const { splitIntoBatches } = require('../utils/batch');
const { retry } = require('../utils/retry');

const API_URL = 'http://94.103.91.4:5000';

// Получение статусов клиентов частями
async function getStatusesInBatches(userIds, token) {
  const batchSize = 100; 
  const batches = splitIntoBatches(userIds, batchSize); 
  const statuses = [];

  for (const batch of batches) {
    logInfo(`Запрос статусов для батча из ${batch.length} клиентов...`);

    try {
      // Оборачиваем запрос в retry для повторных попыток при ошибке
      const response = await retry(() =>
        axios.post(
          `${API_URL}/clients`,
          { userIds: batch },
          { headers: { Authorization: `${token}` } }
        )
      );
      statuses.push(...response.data);
    } catch (error) {
      logError(error);
      throw error;
    }
  }

  logSuccess('Все статусы успешно получены.');
  return statuses;
}

module.exports = { getStatusesInBatches };
