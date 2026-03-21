

import axios from 'axios';

export async function createApiClient(getToken) {
  let token = null;
  try {
    token = await getToken();
  } catch {
    // getToken may fail if user is not signed in 
  }

  return axios.create({
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });
}


export async function apiCall(getToken, method, url, body = null) {
  const api = await createApiClient(getToken);
  const res = method === 'get'
    ? await api.get(url)
    : await api[method](url, body);
  return res.data;
}