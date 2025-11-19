// Detectar automáticamente la URL del backend basándose en el hostname actual
const getApiUrl = () => {
  const hostname = window.location.hostname;
  
  // Si estamos accediendo desde la IP de red, usar el backend en esa IP
  if (hostname === '192.168.1.94') {
    return 'http://192.168.1.94:3001';
  }
  
  // Por defecto, usar localhost
  return 'http://localhost:3001';
};

export const API_URL = getApiUrl();
