export const sendResponseWithoutPassword = (user) => {
  const { password, ...response } = user;
  return response;
};

export const defaultImageUrl =
  "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081";
