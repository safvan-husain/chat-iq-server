import {UserModel} from "../model/user_model";
import * as dotenv from "dotenv";

dotenv.config();

var FCM = require('fcm-node');
var serverKey = process.env.ServerKey; 
var fcm = new FCM(serverKey);


// Send message
export async function sendMessage({title,body,username}:{title: string,body: string, username: string}) {
    console.log('send message caled');
    
    try {
        var user = await UserModel.findOne({ username: username });
        var event = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: user?.appToken, 
            
            notification: {
                title: title, 
                body: body
            },
            
            
        };
        
        fcm.send(event, function(err: any, response: any){
            if (err) {
                console.log("Something has gone wrong!");
                console.log(err);
                
            } else {
                console.log(`Successfully sent to ${user?.username}: `, response);
                console.log(response.results);
                
            }
        });
    } catch (error) {
        console.log(error);
        
    }
} 
// Send message
export async function makeCall(username: string, caller:string) {
    console.log(' make caled');
    
    try {
        var user = await UserModel.findOne({ username: username });
        var event = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: user?.appToken, 
            
            data: {  //you can send only notification or only data(or include both)
                caller: caller,
                event: "incomingCall"
            }
        };
        
        fcm.send(event, function(err: any, response: any){
            if (err) {
                console.log("Something has gone wrong!");
                console.log(err);
                
            } else {
                console.log(`Successfully sent to ${user?.username}: `, response);
                console.log(response.results);
                
            }
        });
    } catch (error) {
        console.log(error);
        
    }
} 


