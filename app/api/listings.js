import client from "./client";

const endpoint = "/listings";

const getListings = () => client.get(endpoint);

export const addListing = (listing, onUploadProgress) => {
  const data = new FormData();
  // data.append("courseId", listing.courseName.value);
  // data.append("title", listing.title);
  data.append("courseId", listing.course.value);
  data.append("levelId", listing.level.value);
  data.append("description", listing.description);
  data.append("userName", listing.userName);
  data.append("userId", listing.userId);

  // console.log("userName:" + listing.userName);

  listing.images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  if (listing.location)
    data.append("location", JSON.stringify(listing.location));

  // console.log(JSON.stringify(data));
  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      // console.log(progress.loaded / progress.total),
      // onUploadProgress: (progress) =>

      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addListing,
  getListings,
};
