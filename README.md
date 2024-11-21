# API to Google Sheet

Этот проект предназначен для извлечения данных из API, обработки их и записи в Google Таблицу.

---

## Установка и запуск

1. **Клонировать репозиторий:**
   ```bash
   git clone https://github.com/gremwiz1/api-to-google-sheet.git
   ```
2. **Перейти в папку проекта:**

```bash
cd api-to-google-sheet
```

3.  **Установить зависимости:**

```bash
npm install
```

4. Создать файл .env в корневой директории: Пример содержимого .env:
   GOOGLE_CREDENTIALS=./google-credentials.json GOOGLE_SHEET_ID=1jX6jPkz1lF7XVpARGpYyek6Agr3MPggp8GxRSdAqqfc

5. **Добавить Google JSON файл:**

   - Скачайте файл с учетными данными сервисного аккаунта Google из Google Cloud Console.
   - Сохраните его в корне проекта под именем `google-credentials.json`.

6. **Запустить проект:**  
   Выполните команду:
   ```bash
   node src/index.js
   ```
   ## Результат работы

После выполнения скрипта данные будут записаны в Google Таблицу по следующей ссылке:  
[Результат работы](https://docs.google.com/spreadsheets/d/1jX6jPkz1lF7XVpARGpYyek6Agr3MPggp8GxRSdAqqfc/edit?gid=0#gid=0)


