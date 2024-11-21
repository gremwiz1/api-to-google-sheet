const { google } = require('googleapis');
const { authorizeGoogle } = require('./auth');
const { logInfo, logSuccess, logError } = require('../utils/logger');

// Запись данных в Google Таблицу
async function writeToSheet(sheetId, sheetName, data) {
  logInfo(`Запись данных в Google Таблицу (${sheetName})...`);
  try {
    const auth = authorizeGoogle();
    const sheets = google.sheets({ version: 'v4', auth: await auth.getClient() });

    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${sheetName}!A1`,
      valueInputOption: 'RAW',
      resource: { values: data },
    });

    logSuccess('Данные успешно записаны в Google Таблицу.');
  } catch (error) {
    logError(error);
    throw error;
  }
}

module.exports = { writeToSheet };
