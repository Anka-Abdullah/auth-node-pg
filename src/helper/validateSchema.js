const addDate = (data) => {
  const date = {
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  };
  data.createdAt ? (data.updatedAt = date.updatedAt) : "";
  return data.createdAt ? data : { ...data, ...date };
};
const validate = (data, validation) => {
  let newData = {}

  Object.keys(validation).map((key) => {
    let v = validation[key],
      w = data[key]

    if (data[key]) {
      newData[key] = typeof w === "string" ? w.trim() : w;
    }
    if (!v.notNull) {
      if (!newData[key]) {
        throw new Error(`ERROR : ${key} is null`);
      }
      if (!v.regex.test(newData[key])) {
        throw new Error(`ERROR : ${key} is not valid`);
      }
    } else if (!v.regex.test(newData[key])) {
      throw new Error(`ERROR : ${key} is not valid`);
    }
  });
  return addDate(newData);
};

export default validate;
