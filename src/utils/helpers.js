import customAxios from 'customaxios/axios';

export async function fetchFromAPI(url, options = { queryParams: {} }) {
  const { queryParams } = options;
  try {
    const response = await customAxios.get(url, {
      params: queryParams,
    });
    return { data: response.data };
  } catch (error) {
    return { error };
  }
}
