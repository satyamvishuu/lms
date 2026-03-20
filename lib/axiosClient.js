/**
 * Axios instance for calling our own Next.js API routes from client components.
 *
 * In Next.js, Clerk session cookies are sent automatically on same-origin requests,
 * so `auth()` on the server side just works. We still attach the Bearer token as a
 * fallback for environments where cookies might be blocked (e.g. some mobile browsers).
 *
 * Usage:
 *   import { createApiClient } from '@/lib/axiosClient'
 *   const api = await createApiClient(getToken)
 *   const { data } = await api.get('/api/user/data')
 */

import axios from 'axios';

export async function createApiClient(getToken) {
  let token = null;
  try {
    token = await getToken();
  } catch {
    // getToken may fail if user is not signed in — that's fine for public routes
  }

  return axios.create({
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });
}

/**
 * Simple helper for one-off calls — avoids repeating the token boilerplate.
 *
 * Usage:
 *   const data = await apiCall(getToken, 'get', '/api/user/data')
 *   const data = await apiCall(getToken, 'post', '/api/user/purchase', { courseId })
 */
export async function apiCall(getToken, method, url, body = null) {
  const api = await createApiClient(getToken);
  const res = method === 'get'
    ? await api.get(url)
    : await api[method](url, body);
  return res.data;
}