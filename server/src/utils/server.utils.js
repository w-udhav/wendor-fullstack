export const sendResponseWithoutPassword = (user) => {
  const { password, ...response } = user;
  return response;
};
