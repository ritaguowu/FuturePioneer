import client from "./client";

const register = (pushToken, user) =>
  client.post("/expoPushTokens", { token: pushToken, user: user });

export default {
  register,
};
