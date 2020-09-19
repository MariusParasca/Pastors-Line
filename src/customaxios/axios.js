import axios from 'axios';

const customAxios = axios.create({ baseURL: process.env.REACT_APP_API });

customAxios.interceptors.request.use((config) => {
  const headers = {
    Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
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
