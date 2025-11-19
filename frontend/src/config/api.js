// Detectar automáticamente la URL del backend basándose en el hostname actual
const getApiUrl = () => {
  // 1. Prioridad: Variable de entorno (útil para producción)
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  const hostname = window.location.hostname;
  const protocol = window.location.protocol;

  // 2. Desarrollo en red local (IP específica)
  if (hostname === '192.168.1.94') {
    return 'http://192.168.1.94:3001';
  }

  // 3. Desarrollo local estándar
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:3001';
  }

  // 4. Fallback para producción u otros entornos:
  // Asume que el backend está en el mismo host, puerto 3001 (o se puede ajustar si es necesario)
  // Si el backend está en el mismo dominio/puerto (proxy), se podría devolver solo '/api' o similar.
  // Por ahora, mantenemos la lógica de puerto 3001 pero con el hostname correcto.
  return `${protocol}//${hostname}:3001`;
};

export const API_URL = getApiUrl();
