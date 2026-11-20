import * as SecureStore from 'expo-secure-store';

export const FRAPPE_URL = 'http://127.0.0.1:8000';
const SESSION_KEY = 'frappe_session_id';

export const saveFrappeSession = async sid => {
  if (!sid || sid === 'Guest') {
    throw new Error('The backend did not return a valid Frappe session.');
  }
  await SecureStore.setItemAsync(SESSION_KEY, sid);
};

export const getFrappeSession = () => SecureStore.getItemAsync(SESSION_KEY);
export const clearFrappeSession = () => SecureStore.deleteItemAsync(SESSION_KEY);

export const frappeRequest = async (path, options = {}) => {
  const sid = await SecureStore.getItemAsync(SESSION_KEY);
  const response = await fetch(`${FRAPPE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(sid ? {Cookie: `sid=${sid}`} : {}),
      ...(options.headers || {}),
    },
  });

  const body = await response.text();
  let data;
  try {
    data = body ? JSON.parse(body) : {};
  } catch {
    data = {};
  }

  if (!response.ok) {
    const error = new Error(
      data?.message || data?.exception || `Request failed (${response.status})`,
    );
    error.status = response.status;
    throw error;
  }

  return {data, response};
};

export const extractSessionId = response => {
  const setCookie = response.headers?.get?.('set-cookie') || '';
  const match = setCookie.match(/(?:^|[,;\s])sid=([^;,\s]+)/i);
  return match?.[1] ? decodeURIComponent(match[1]) : null;
};
