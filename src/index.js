require('dotenv').config();
const { registerUser, loginUser } = require('./api/auth');
const { getAllClients } = require('./api/clients');
const { getStatusesInBatches } = require('./api/statuses');
const { writeToSheet } = require('./google/sheets');
const { logInfo, logSuccess, logError } = require('./utils/logger');

const { GOOGLE_SHEET_ID } = require('./config/dotenv');
const SHEET_NAME = 'Лист1'; 

async function main() {
  try {
    logInfo('Регистрация пользователя...');
    const username = `user_${Date.now()}`;
    await registerUser(username);

    logInfo('Авторизация...');
    const token = await loginUser(username);

    logInfo('Получение списка всех клиентов...');
    const clients = await getAllClients(token);

    logInfo('Получение статусов клиентов...');
    const userIds = clients.map(client => client.id);
    const statuses = await getStatusesInBatches(userIds, token);

    logInfo('Объединение данных...');
    const mergedData = clients.map(client => {
      const statusData = statuses.find(status => status.id === client.id);
      return {
        ...client,
        status: statusData ? statusData.status : 'Unknown',
      };
    });

    logInfo('Запись данных в Google Таблицу...');
    const values = [
      ['ID', 'First Name', 'Last Name', 'Gender', 'Address', 'City', 'Phone', 'Email', 'Status'],
      ...mergedData.map(client => [
        client.id,
        client.firstName,
        client.lastName,
        client.gender,
        client.address,
        client.city,
        client.phone,
        client.email,
        client.status,
      ]),
    ];
    await writeToSheet(GOOGLE_SHEET_ID, SHEET_NAME, values);

    logSuccess('Данные успешно записаны в Google Таблицу!');
  } catch (error) {
    logError(error);
  }
}

main();
