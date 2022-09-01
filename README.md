# Patients Care - Web application for managing patients in clinics

Patients Care is a dashboard application that helps users to manage their patients. Main technologies used: React, TypeScript.
Forms were created using formik and yup. Three languages are available (English, Polish, German) by using i18n package.
Application state is handled by Redux-Toolkit.


## Main Features

- Register/Login with JWT session management.
- Account management (user is able to change avatar, personal data and password),
- Patients management (user can add/edit/remove patients),
- Delete Account.

## Other Features
- Auto logout when user session has expired or user tries to perform an action with expired refresh token,
- Auto access token refresh functionality that refreshes the JWT access token when needed,
- Switch language button,


## Screenshots

![App Screenshot](https://i.imgur.com/q474AOq.png)

## Demo
LIVE: [Prod-Build-Live](https://patients-care-hubert-sajdak.netlify.app)

To login to the dashboard use these credentials or simply create a new account:
- Login: test0@test.com
- Password: Password@2


