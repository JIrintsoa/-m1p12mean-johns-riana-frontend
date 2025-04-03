import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true, // Indique que c'est l'environnement de production
  apiUrl: 'https://web-m1-backend.vercel.app/api', // URL de l'API de production
};
