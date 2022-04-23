import validate from "../helper/validateSchema.js";
import userValidation from "../model/user.js";
import signUpService from "../service/signUp_srvc.js";

const signUp = async (req, res) => {
  try {
    const data = await validate(req.body, userValidation);
    const signUpProsess =  signUpService(data);
    res.status(200).send(data);
  } catch (error) {
    res.status(error.statusCode || 400).send(error.message);
  }
};

export default signUp;
