const { google } = require('googleapis');
const path = require('path');

const GOOGLE_CREDENTIALS = process.env.GOOGLE_CREDENTIALS;

function authorizeGoogle() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.resolve(GOOGLE_CREDENTIALS),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return auth;
}

module.exports = { authorizeGoogle };
