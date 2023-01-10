import { BaseModel } from "../basemodel";
import { Document, Schema, model, Types } from "mongoose"
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
import { secretUtil } from '../../utils/secretutil';


export interface IUserLogin extends Document {
    _id: Types.ObjectId;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    role: number;
    phone: number;
}

export class UserLogin extends BaseModel {
    _id?: Types.ObjectId;
    firstname?: string;
    lastname?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
    email?: string;
    phone?: number;
    role?: number;
    default_password?: string;
}

const UserLoginSchema: Schema = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    confirmPassword: {
        type: String
    },
    email: {
        unique: true,
        type: String
    },
    phone: {
        type: Number
    },
    role: {
        type: Number
    },
    tokens: [
        {
            token:{
                type:String
            }
        }
    ],
    default_password: {
        type: String
    }

}, { timestamps: true });

UserLoginSchema.pre<IUserLogin>('save', async function (next) {
    console.log("password crypted hone wala hai");
    if (this.isModified('password')) {
        console.log("password crypted ho gya");

        this.password = await bcrypt.hash(this.password, 12);
        this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12);
    }
    next();
});

UserLoginSchema.method({
    async generateToken() {
        try {
            let token = jwt.sign({ id: this._id }, secretUtil.SECRET_KEY);
            return token;
        } catch (error) {
            throw(error)
            console.log(error);
        }

    }
});

export const userLoginModel = model<UserLogin>('userlogins', UserLoginSchema)
