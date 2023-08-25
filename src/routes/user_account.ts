import { log } from "console";
import { Response, Router } from "express";
import { auth } from "../middlewares/authentication";
import { UserModel } from "../model/user_model";
import { sendMessage } from "../utils/push_notification";

const router = Router();

router.post("/profile/change-dp", auth, async (req: any, res: Response) => {
  // console.log(req.body);

  const { avatar } = req.body;
  try {
    let user = await UserModel.findById(req.userID);
    if (user != null) {
      user.avatar = avatar;
      user = await user.save();
      res.status(200).json(user);
    } else {
      console.log("user not found");
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});
router.post("/app-token", auth, async (req: any, res) => {
  const { app_token } = req.body;
  console.log(app_token);

  try {
    let user = await UserModel.findById(req.userID);
    if (user != null) {
      user.appToken = app_token;
      user = await user.save();
      res.status(200).json(user);
    } else {
      res.status(400);
      console.log("user not found");
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});
router.get("/sendmessage", async (req: any, res) => {
  sendMessage({
    title: "heej",
    body: "husain nothing  in here",
    username: "safvanHusian",
  });
  res.send("mm");
});
export { router as ProfileRouter };
