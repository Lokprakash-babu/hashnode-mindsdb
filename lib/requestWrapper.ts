export const requestWrapper = async (url: string, options = {}) => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/${url}`,
      options
    );
    return await data.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};
