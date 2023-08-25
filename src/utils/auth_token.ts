import * as jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config()
export class Token {

    public generate(userId: string): string {
        
        // console.log(process.env.JWTsecret);
        return jwt.sign({ userId },'secret-key' );
    }
    public getUserIdFromToken(token: string): any {
        
        const decoded:any = jwt.verify(token,'secret-key')
        return decoded.userId;
    }
}
