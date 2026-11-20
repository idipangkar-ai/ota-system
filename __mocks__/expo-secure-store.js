const values = new Map();

export const getItemAsync = async key => values.get(key) || null;
export const setItemAsync = async (key, value) => values.set(key, value);
export const deleteItemAsync = async key => values.delete(key);
