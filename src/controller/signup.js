import validate from "../helper/validateSchema.js";
import userValidation from "../model/user.js";
import signUpService from "../service/signUp_srvc.js";
import crypt from "../helper/cryptHelper.js";

const signUp = async (req, res) => {
  try {
    await validate(req.body, userValidation);
    const {
      userName,
      password,
      email,
      age,
      address,
      phone,
    } = req.body
    console.log("req.body : ", req.body);
    const data = {
      userName,
      password: crypt.encryptedPassword(password),
      email: crypt.encryptData(email),
      age,
      address,
      phone: crypt.encryptData(phone),
    }
    const signUpProsess =  signUpService(data);
    res.status(200).send(data);
  } catch (error) {
    console.log("error : ", error);
    res.status(error.statusCode || 400).send(error.message);
  }
};

export default signUp;
