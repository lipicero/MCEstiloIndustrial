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
  // Asume que el backend está en el mismo host, puerto 3001 (o se puede ajustar si es necesario)
  // Si el backend está en el mismo dominio/puerto (proxy), se podría devolver solo '/api' o similar.
  // Por ahora, mantenemos la lógica de puerto 3001 pero con el hostname correcto.
  return `${protocol}//${hostname}:3001`;
};

export const API_URL = getApiUrl();
