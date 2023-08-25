import { NextFunction, Request, Response } from "express";
import { Token } from "../utils/auth_token";


export interface AuthorizedRequest extends Request {
  userID?: string; 
}


export const auth = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  var userID = new Token().getUserIdFromToken(req.headers["x-auth-token"] as string);
  if (userID) {
    req.userID = userID;
    next();
  } else {

    
    res.status(401).json({ message: "Invalid Token" });
  }
};
