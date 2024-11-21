require('dotenv').config();

// Проверяем, что все обязательные переменные окружения заданы
const requiredEnvVariables = ['GOOGLE_CREDENTIALS', 'GOOGLE_SHEET_ID'];
requiredEnvVariables.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Переменная окружения ${key} не задана!`);
  }
});

module.exports = {
  GOOGLE_CREDENTIALS: process.env.GOOGLE_CREDENTIALS,
  GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID,
};
