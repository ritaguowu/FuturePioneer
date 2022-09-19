import client from "./client";

const register = (userInfo) => client.post("/users", userInfo);

const endpoint = "/users";

const getUsers = () => client.get(endpoint);

const getUser = (userId) => client.get("/user/" + userId);

const updateUserImage = async (newUri, email) => {
  const data = new FormData();
  //   const imageObject = {
  //     name: "image0",
  //     type: "image/jpeg",
  //     uri: newUri,
  //   };
  //   data.append("images", [imageObject]);
  data.append("images", {
    uri: newUri,
    name: "test.jpg",
    type: "image/jpeg",
  });

  data.append("email", email);

  // console.log(JSON.stringify(data));
  return client.put(endpoint, data);
};

export default { register, getUser, getUsers, updateUserImage };
