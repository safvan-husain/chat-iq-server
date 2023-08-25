import { Router } from "express";
import { deleteMessagesDB, getAllUnredMessagesDB, markMessagesReaded, saveMessageDB } from "../utils/data_base_methods";
import { auth, AuthorizedRequest} from "../middlewares/authentication";

const router =  Router();

router.post('/messages',auth,async (req:AuthorizedRequest, res) => {
    const {reciever, message } = req.body;
    try {
        await saveMessageDB( req.userID!,reciever, message);
        res.status(200).json({message});
    } catch (error) {
        res.status(504).json({ "error":error})
    }
})

router.get('/message', auth,async (req: AuthorizedRequest, res) => {
    try {
        let messages = await getAllUnredMessagesDB(req.userID!);
        res.status(200).json(messages)
        await markMessagesReaded(messages)
    } catch (error) {
        res.status(500).json({ error: error});
    }
})

router.delete('/message', auth,async (req: AuthorizedRequest, res) => {
    try {
        console.log('delete');
        
        await deleteMessagesDB(req.userID!)
        res.status(200).send("deleted successfully")
    } catch (error) {
        res.status(500).json({ error: error});
    }
})
export { router as messageRouter }