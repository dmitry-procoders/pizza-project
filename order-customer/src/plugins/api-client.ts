const baseUrl = 'http://localhost:3000';

const getClientUrl = (path: string) => {
  return `${baseUrl}/${path}`;
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

const getQuery = async (path: string) => {
  const response = await fetch(getClientUrl(path));
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