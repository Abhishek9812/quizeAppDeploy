import { Mongoose } from "mongoose";
import { createQuestionModel, ICreateQuestion } from "../../models/questions/question.model";
import { createQuizeModel, ICreateQuize } from "../../models/quizes/quize.model";
import { UserLogin, userLoginModel, IUserLogin } from "../../models/users/login.model";
var ObjectId = require('mongoose').Types.ObjectId;
var mongoose = require('mongoose');
const bcrypt = require("bcrypt");

class UserServicesV1 {
    public signUpcustomer = async (req: IUserLogin) => {
        try {
            const { firstname, lastname, username, password, confirmPassword, email, phone } = req;
            if (!firstname || !lastname || !username || !password || !email || !phone) {
                return {code: 206,msg:"please fill all data"};
            }
            if (password != confirmPassword) {
                return { code: 206, msg: "password and confirm password is not same" };
            }
            let model = new userLoginModel();
            model.firstname = firstname;
            model.lastname = lastname;
            model.username = username;
            model.password = password;
            model.confirmPassword = confirmPassword;
            model.email = email;
            model.phone = phone;
            let data = await model.save();
            return {code: 200, data, msg: "user register successfully!!"};
        } catch (error) {
            return {code: 206,msg:"Somthing went wrong"};
        }
    };
    public logincustomer = async (req: IUserLogin) => {
        try {
            const { email, password } = req;
            if (!password || !email) {
                return { code: 206, msg: "please fill all data" };
            }

            const user: any = await userLoginModel.findOne({ email: email });
            if (!user) {
                return { code : 206,msg: "user not found"}
            }
            let isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return { code : 206, msg: "user not found" };
            }

            let token: any = await user.generateToken();
            await userLoginModel.updateOne({ email: email },{$push: {tokens: {token:token}} });

            return { code : 200, data: user, msg: "Login Successfully", token: token };


        } catch (error) {
            return { code : 206, msg: "Something went wrong" };
        }
    };

    public createQuestion = async (req: ICreateQuestion) => {
        try {
            const { title, option1, option2, option3, option4, correct, level } = req;
            if (!title|| !option1|| !option2|| !option3|| !option4|| !correct || !level) {
                return { code :206, msg: "please fill all data" };
            }

            let model = new createQuestionModel();
            model.title = title;
            model.option1 = option1;
            model.option2 = option2;
            model.option3 = option3;
            model.option4 = option4;
            model.correct = correct;
            model.level = level;
            
            let data = await model.save();

            return { code : 200, data: data, msg: "Question Created Successfully",};


        } catch (error) {
            return { code : 206, msg: "Something went wrong" };
        }
    };

    public getAllQuestions = async (req: ICreateQuestion) => {
        try {

            let data:any = await createQuestionModel.find({});
            return { code : 200, data: data};


        } catch (error) {
            return { code : 206, msg: "Something went wrong" };
        }
    };

    public getAllQuize = async (req: ICreateQuestion) => {
        try {

            let data:any = await createQuizeModel.find({});
            return { code : 200, data: data};

        } catch (error) {
            return { code : 206, msg: "Something went wrong" };
        }
    };

    public createQuize = async (req: ICreateQuize) => {
        try {
            const { title, userId, questions, level } = req;
            if (!title|| !userId || !questions || !level) {
                return { code :206, msg: "please fill all data" };
            }

            let model = new createQuizeModel();
            model.title = title;
            model.userId = userId;
            model.questions = questions;
            model.level = level;
            
            let data = await model.save();

            return { code : 200, data: data, msg: "Quize Created Successfully",};


        } catch (error) {
            return { code : 206, msg: "Something went wrong" };
        }
    };

    public getTest = async (req: ICreateQuize) => {
        try {
            const { _id } = req;
            if(!ObjectId.isValid(_id)){
                return {code : 206, msg: "Invalid id"};
            }
            let data = await createQuizeModel.findOne({_id: mongoose.Types.ObjectId(_id)});
            if(!data){
                return {code : 206, msg: "Invalid id"};
            }

            return { code : 200, data: data, msg: "Successfully",};


        } catch (error) {
            return { code : 206, msg: "Something went wrong" };
        }
    };

}

export const userServicesV1 = new UserServicesV1();