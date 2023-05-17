import wrapResponse from "@/utils/wrapResponse";
import connectDb from "../../../middleware/connectDb"

const handler = (req, res) => {
    if(req.method == 'POST') {
        const { email, name, username, phone, password } = req.body;
        return res.status(200).send(wrapResponse.success(200, email))
    } else {
        return res.status(500).send(wrapResponse.error(500, "It's a Post Api :)"));
    }
}

export default connectDb(handler);