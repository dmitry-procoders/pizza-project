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

const patchQuery = async (path: string, data = {}) => {
  const response = await axios.patch(getClientUrl(path), data);
  return handleResponse(response);
}

export const fetchOrdersReadyForPrepare = async () => {
  return getQuery('kitchen/ready-preparing');
};

export const fetchOrdersPreparing = async () => {
  return getQuery('kitchen/preparing');
};

export const fetchOrdersReadyForPickUp = async () => {
  return getQuery('kitchen/ready-pick-up');
};

export const sendOrderForPrepare = async (id: number) => {
  return patchQuery(`kitchen/prepare/${id}`);
};