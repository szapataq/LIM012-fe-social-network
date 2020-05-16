// FUNCIÓN UTILITARIA PARA DETECTAR EL DISPOSITIVO
export const device = () => {
  const dv = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|SymbianOS|Windows Phone/i.test(window.navigator.userAgent) ? 'Mobile' : 'Desktop';
  return dv;
};

export const deviceNoIPad = () => {
  const dv = /Android|webOS|iPhone|iPod|BlackBerry|BB|PlayBook|SymbianOS|Windows Phone/i.test(window.navigator.userAgent) ? 'Mobile' : 'Desktop';
  return dv;
};
