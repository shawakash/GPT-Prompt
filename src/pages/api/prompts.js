import wrapResponse from "@/utils/wrapResponse";
import connectDb from "../../../middleware/connectDb"
import User from "../../../models/User";

const handler = async (req, res) => {
    if(req.method == 'POST') {
        
        const { username } = JSON.parse(req.body);
        if(!username || username == '') {
            return res.status(400).send(wrapResponse.error(400, 'User Id Not provided :('));
        }
        try {
            const user = await User.findOne({ username }).populate({ path: 'prompts' });
            if(!user) {
                return res.status(404).send(wrapResponse.error(404, 'No Such User :('));
            }
            return res.status(200).send(wrapResponse.success(200, user.prompts))
        } catch (e) {
            return res.status(500).send(wrapResponse.error(500, e.message));
        }

    } else {
        return res.status(500).send(wrapResponse.error(500, 'Internal Server Error'));
    }
}

export default connectDb(handler);