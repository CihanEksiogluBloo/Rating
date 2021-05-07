const createFormData = (ResultObj,others) => {
  const data = new FormData();
  

  data.append("datas", {
    name: "image.jpg",
    type: "image/jpeg",
    uri:
      Platform.OS === "android" ? ResultObj.uri : ResultObj.uri.replace("file://", "")
  });

  Object.keys(others).forEach(key => {
      data.append(key, others[key]);
    });

  

  return data;
};

export default createFormData;
