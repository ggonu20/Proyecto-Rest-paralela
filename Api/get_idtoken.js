const { google } = require('googleapis');

// Load the service account key JSON file.
const serviceAccount = require('./config/serviceAccountKey.json'); // Asegúrate de ajustar la ruta al archivo

// Define the required scopes.
const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/firebase.database',
];

// Autenticar un cliente JWT con la cuenta de servicio.
const jwtClient = new google.auth.JWT(
  serviceAccount.client_email,
  null,
  serviceAccount.private_key,
  scopes
);

// Utilizar el cliente JWT para generar un token de acceso.
jwtClient.authorize((error, tokens) => {
  if (error) {
    console.log('Error al hacer la solicitud para generar el token de acceso:', error);
  } else if (tokens.access_token === null) {
    console.log('La cuenta de servicio proporcionada no tiene permisos para generar tokens de acceso');
  } else {
    const accessToken = tokens.access_token;

    console.log('Token de acceso:', accessToken);
  }
});
