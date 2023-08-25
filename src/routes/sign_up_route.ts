import { Router } from "express";
import {User, UserModel} from "../model/user_model";
import { Token } from "../utils/auth_token";
import { Password } from "../utils/password_hash";
import { registerUserDB } from "../utils/data_base_methods";
import { DataBaseException } from "../exception/exceptions";

const router = Router();

router.post("/auth/sign-up",async (req, res) => {
  const { email, username, password, apptoken } = req.body;
  console.log(`${email} tried to sign up`); 
  
  
try {
    new Password().hash(password).then(async (hashed)=> {
      let user = await registerUserDB(email,username,hashed,apptoken);
      let token = new Token().generate(user._id)
      console.log(user);
      res.status(200).json({"user": user, "token": token}); 
    })
  } catch (error : any) {
    if (error instanceof DataBaseException) {
      res.status(500).json({"error": error});
    }
    console.log(error.message); 
    
  }  
}); 

export { router as SignUpRouter };
