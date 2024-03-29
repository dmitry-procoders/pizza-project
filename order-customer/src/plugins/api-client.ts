import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!baseUrl) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}

const getClientUrl = (path: string) => {
  return `${baseUrl}/${path}`;
}

const handleResponse = async (response: any) => {
  return response.data;
}

const getQuery = async (path: string) => {
  const response = await axios.get(getClientUrl(path));
  return handleResponse(response);
}

const postQuery = async (path: string, data: any) => {
  const response = await axios.post(getClientUrl(path), data);
  return handleResponse(response);
}

export const fetchSizesData = async () => {
  return getQuery('pizza-size');
};

export const fetchTypesData = async () => {
  return getQuery('pizza-type');
};

export const fetchExtraComponentsData = async () => {
  return getQuery('pizza-extra-component');
};

export const placeOrder = async (data: any) => {
  return postQuery('order', data);
};