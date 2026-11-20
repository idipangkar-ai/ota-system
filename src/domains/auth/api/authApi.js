import {
  clearFrappeSession,
  extractSessionId,
  frappeRequest,
  saveFrappeSession,
} from '../../../config/frappe';

export const login = async (email, password) => {
  const body = new URLSearchParams({
    usr: email.trim(),
    pwd: password,
  }).toString();

  const {data, response} = await frappeRequest('/api/method/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  const sid = extractSessionId(response);
  if (!sid) {
    throw new Error('Frappe login succeeded but did not provide a session cookie.');
  }
  await saveFrappeSession(sid);
  return data;
};

export const logout = async () => {
  try {
    return await frappeRequest('/api/method/logout', {method: 'POST'});
  } finally {
    await clearFrappeSession();
  }
};

export const register = async (fullName, email) => {
  const body = new URLSearchParams({
    full_name: fullName.trim(),
    email: email.trim(),
    redirect_to: '',
  }).toString();
  const {data} = await frappeRequest(
    '/api/method/frappe.core.doctype.user.user.sign_up',
    {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body,
    },
  );
  return data;
};

export const requestPasswordReset = async email => {
  const body = new URLSearchParams({user: email.trim()}).toString();
  const {data} = await frappeRequest(
    '/api/method/frappe.core.doctype.user.user.reset_password',
    {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body,
    },
  );
  return data;
};
