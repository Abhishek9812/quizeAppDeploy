const jwt = require('jsonwebtoken');
import { UserLogin, userLoginModel, IUserLogin } from "../../models/users/login.model";
import { secretUtil } from "../../utils/secretutil";

const middleware = async (req, res, next)=>{
    try {
        const token = req.get("authorization");
        if(!token) {
            throw new Error("User not found");
        }
        const varifyToken = jwt.verify(token, secretUtil.SECRET_KEY);

        const rootUser = await userLoginModel.findOne({_id: varifyToken.id, "tokens.token": token});
        if(!rootUser) {
            throw new Error("User not found");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser?._id;
        next();

    } catch (error) {
        return res.status(401).send({msg: error});
        console.log(error);
    }
}

export default middleware;