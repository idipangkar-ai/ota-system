import {frappeRequest} from '../../../config/frappe';

export const getCurrentUser = async () => {
  const {data} = await frappeRequest(
    '/api/method/frappe.auth.get_logged_user',
  );

  return data.message;
};
