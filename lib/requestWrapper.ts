export const requestWrapper = async (url: string, options = {}) => {
  try {
    console.log(`/api/${url}`);
    const data = await fetch(`/api/${url}`, options);
    return await data.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
