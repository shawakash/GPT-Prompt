import wrapResponse from "@/utils/wrapResponse";
import connectDb from "../../../middleware/connectDb"
import User from "../../../models/User";
import * as jwt from "jsonwebtoken";
var CryptoJS = require('crypto-js');


const handler = async (req, res) => {
    if(req.method == 'POST') {
        const { email, name, username, phone, password } = req.body;

        if(!email || !name || !username || !password || email == '' || name == '' || username == '' || password == '' ) {
            return res.status(400).send(wrapResponse.error(400, 'Necessary Fields are missing :('));
        }

        try {
            const conditions = [{email, username}]
            const existingUser = await User.find({ $or: conditions }); 
            if(existingUser.length != 0) {
                return res.status(400).send(wrapResponse.error(400, 'User with that credential already exists :)'));;
            } 

            const encodedPassword = CryptoJS.AES.encrypt(password, `${process.env.CRYPTO_KEY}`).toString();

            const user = new User({
                email,
                username,
                phone,
                name,
                password: encodedPassword
            });

            const createdUser = await user.save();

            
            if(createdUser) {
                const accessToken = jwt.sign({ email, name, password: createdUser.password, username }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '10d' });
                return res.status(200).send(wrapResponse.success(200, { user: createdUser, accessToken}));;
            }

        } catch (e) {
            return res.status(500).send(wrapResponse.error(500, e.message))
        }

        
    } else {
        return res.status(500).send(wrapResponse.error(500, "It's a Post Api :)"));
    }
}

export default connectDb(handler);