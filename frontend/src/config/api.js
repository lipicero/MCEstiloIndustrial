// Detectar automáticamente la URL del backend basándose en el hostname actual
const getApiUrl = () => {
  // 1. Prioridad: Variable de entorno (útil para producción)
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  const hostname = window.location.hostname;
  const protocol = window.location.protocol;

  // 2. Desarrollo local estándar
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:3001';
  }

  // 3. Fallback para producción y red local (IP dinámica):
  // Asume que el backend está en el mismo host, puerto 3001 en desarrollo, 443 en producción (HTTPS).
  // Si el backend está en el mismo dominio/puerto (proxy), se podría devolver solo '/api' o similar.
  // Por ahora, mantenemos la lógica de puerto dinámico.
  return `${protocol}//${hostname}${protocol === 'https' ? '' : ':3001'}`;
};

export const API_URL = getApiUrl();
