import { Response, Router } from "express";
import { auth } from "../middlewares/authentication";
import {UserModel} from "../model/user_model";
import { Token } from "../utils/auth_token";
import { Password } from "../utils/password_hash";

const router = Router();

router.post("/auth/sign-in", async (req, res) => {
  const { username: usernameOrEmail, password, apptoken } = req.body;
  try {
    let user = await UserModel.findOne({ username: usernameOrEmail });
    if(user==null){
      user = await UserModel.findOne({ email:usernameOrEmail });
    }
    let token;
    if (user) {
      user.appToken = apptoken;
      user.save();

      if (await new Password().validate(password, user.password)) {
        token = new Token().generate(user._id);
        res.status(200).json({ user: user, token: token });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      res.status(401).json({ message: "User not found" });
      console.log("user not found");
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});


router.post("/auth/google-in", async (req, res) => {
  const { email, apptoken } = req.body;
  try {
    let user = await UserModel.findOne({ email: email });
    let token;
    if (user) {
      user.appToken = apptoken;
      user.save();
      token = new Token().generate(user._id); 
      res.status(200).json({ user: user, token: token });
    } else {
      res.status(401).json({ message: "User not found" });
      console.log("user not found");
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/auth/token", auth, async (req: any, res: Response) => {
  try {
    var user = await UserModel.findById(req.userID);
    res.status(200).json(user);
  } catch (error: any) {
    console.log(error);

    res.status(500).json({ error: error.message });
  }
});

export { router as SigninRouter };
