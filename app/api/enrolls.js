import client from "./client";

const endpoint = "/enrolls";

const getEnrolls = () => client.get(endpoint);

const deleteEnroll = async (enroll) => {
  const data = new FormData();
  data.append("userId", enroll.userId);
  data.append("enrollId", enroll.id);
  return client.delete(endpoint, data);
};

export const addEnroll = (enroll, userImageUrl, price, onUploadProgress) => {
  const data = new FormData();
  // data.append("courseId", listing.courseName.value);
  // data.append("title", listing.title);
  data.append("courseId", enroll.course.value);
  data.append("levelId", enroll.level.value);
  data.append("gradeId", enroll.grade.value);
  data.append("kidName", enroll.name);
  data.append("phone", enroll.phone);
  data.append("price", price);

  data.append("userId", enroll.userId);

  const imageObject = {
    name: "image0",
    type: "image/jpeg",
    uri: userImageUrl,
  };
  const imageArray = [imageObject];
  data.append("images", imageArray);

  // console.log("userImageUrl:", userImageUrl);
  // enroll.images.forEach((image, index) =>
  //   data.append("images", {
  //     name: "image" + index,
  //     type: "image/jpeg",
  //     uri: image,
  //   })
  // );

  // console.log(JSON.stringify(data));
  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      // console.log(progress.loaded / progress.total),
      // onUploadProgress: (progress) =>

      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addEnroll: addEnroll,
  getEnrolls: getEnrolls,
  deleteEnroll: deleteEnroll,
};
