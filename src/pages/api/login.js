import wrapResponse from "@/utils/wrapResponse";
import connectDb from "../../../middleware/connectDb"
import User from "../../../models/User";
var CryptoJS = require('crypto-js');
import * as jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    if(req.method == 'POST') {
        const { username,  password } = JSON.parse(req.body);
        if( !username || !password || username == '' || password == '' ) {
            return res.status(400).send(wrapResponse.error(400, 'Necessary Fields are missing :('));
        }
        
        try {
            
            const existingUser = await User.findOne({ username }); 
            if(!existingUser) {
                return res.status(400).send(wrapResponse.error(400, 'No Such User :('));
            } 
            
            const bytes = CryptoJS.AES.decrypt(existingUser.password, `${process.env.CRYPTO_KEY}`);
            const decodedPassword = bytes.toString(CryptoJS.enc.Utf8)
            
            if(decodedPassword != password) {
                return res.status(400).send(wrapResponse.error(400, 'Incorrect Password :('));
            }
            const accessToken = jwt.sign({ email: existingUser.email, username: existingUser.username, password: decodedPassword, name: existingUser.name }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '10d' })
            const user = {
                name: existingUser.name,
                email: existingUser.email,
                username: existingUser.username
            }
            return res.status(200).send(wrapResponse.success(200, { user, accessToken }))

        } catch (e) {
            return res.status(500).send(wrapResponse.error(500, e.message))
        }

        
    } else {
        return res.status(500).send(wrapResponse.error(500, "It's a Post Api :)"));
    }
}

export default connectDb(handler);