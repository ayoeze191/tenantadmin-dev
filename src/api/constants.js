const BASE_URL = {
  production: import.meta.env.VITE_API_BASE_URL_PRODUCTION,
  staging: import.meta.env.VITE_API_BASE_URL_STAGING,
  dev: import.meta.env.VITE_API_BASE_URL_STAGING,
};

export const MIXPANEL_KEY = {
  // dev: import.meta.env.VITE_API_MIXPANEL_KEY_DEV,
  // staging: import.meta.env.VITE_API_MIXPANEL_KEY_STAGING,
  // production: import.meta.env.VITE_API_MIXPANEL_KEY_PRODUCTION
};

export default BASE_URL;
