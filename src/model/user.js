const userValidation = {
  userName: {
    regex: /[a-zA-Z0-9]{3,}$/,
    notNull: false,
  },
  age: {
    regex: /([0-9]{1,})/,
    notNull: false,
  },
  email: {
    regex: /[a-zA-Z0-9]{3,}@[a-zA-Z]{3,}\.com$/,
    notNull: false,
  },
  address: {
    regex: /(){5}\w+/,
    notNull: false,
  },
  password: {
    regex: /^(.){8,16}$/,
    notNull: false,
  },
  phone: {
    regex: /^[1-9]{1}[0-9]{0,12}$/,
    notNull: true,
  },
};

export default userValidation;