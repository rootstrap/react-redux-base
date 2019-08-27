export const getLanguageFromHeader = header => {
  const supportedLangages = ['en', 'es'];
  const languages = header.split(';');

  for (let i = 0; i < languages.length; i += 1) {
    const lang = languages[i];
    const options = lang.split(',');
    for (let j = 0; j < options.length; j += 1) {
      const opt = options[j];
      if (supportedLangages.includes(opt)) {
        return opt;
      }
    }
  }

  return 'es';
};

export const getSessionData = req => {
  const rc = req.get('cookie');
  rc &&
    rc.split(';').forEach(cookie => {
      const parts = cookie.split('=');
      if (parts[0].trim() === 'SESSION_STORAGE') {
        return JSON.parse(decodeURIComponent(parts[1]));
      }
    });
};
