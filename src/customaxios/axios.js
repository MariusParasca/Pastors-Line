import axios from 'axios';

const customAxios = axios.create({ baseURL: 'https://api.dev.pastorsline.com/api' });

const ACCESS_TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNzEiLCJleHAiOjE2MDM3ODM0Mzd9.3ievseHtX0t3roGh7nBuNsiaQeSjfiHWyyx_5GlOLXk';

customAxios.interceptors.request.use((config) => {
  const headers = {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };

  return {
    ...config,
    headers: {
      ...config.headers,
      ...headers,
    },
  };
});

export default customAxios;
