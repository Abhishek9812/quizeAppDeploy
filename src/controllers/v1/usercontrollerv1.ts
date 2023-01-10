
import { NextFunction, Response } from 'express';
import { BaseController } from "../basecontroller";
import { IFilteredRequest } from "../../interfaces";
import { userServicesV1 } from "../../services/v1/userservicesv1";
import { UserLogin, IUserLogin } from "../../models/users/login.model";
import { ApiPath, SwaggerDefinitionConstant, ApiOperationPost } from "swagger-express-ts"
import { ICreateQuestion } from '../../models/questions/question.model';
import { ICreateQuize } from '../../models/quizes/quize.model';

@ApiPath({
    path: "/api/v1",
    name: "User API Calls",
    security: { apiKeyHeader: [] },
})



class UserControllerV1 extends BaseController {

    public async signUpcustomer(req: IFilteredRequest<IUserLogin>, res: Response, next: NextFunction) {
        try {
            const requestResult = await userServicesV1.signUpcustomer(req.body);
            return res.json(requestResult);
        } catch (error: any) {
            return res.send(null);
        }
    }
    public async logincustomer(req: IFilteredRequest<IUserLogin>, res: Response, next: NextFunction) {
        try {
            const requestResult: any = await userServicesV1.logincustomer(req.body);
            res.status(200).send(requestResult);
        } catch (error: any) {
            return res.send(error);
        }
    }

    public async createQuestion(req: IFilteredRequest<ICreateQuestion>, res: Response, next: NextFunction) {
        try {
            const requestResult: any = await userServicesV1.createQuestion(req.body);
            res.status(200).send(requestResult);
        } catch (error: any) {
            return res.send(error);
        }
    }

    public async getAllQuestions(req: IFilteredRequest<ICreateQuestion>, res: Response, next: NextFunction) {
        try {
            const requestResult: any = await userServicesV1.getAllQuestions(req.body);
            res.status(200).send(requestResult);
        } catch (error: any) {
            return res.send(error);
        }
    }

    public async getAllQuize(req: IFilteredRequest<ICreateQuestion>, res: Response, next: NextFunction) {
        try {
            const requestResult: any = await userServicesV1.getAllQuize(req.body);
            res.status(200).send(requestResult);
        } catch (error: any) {
            return res.send(error);
        }
    }

    public async createQuize(req: IFilteredRequest<ICreateQuize>, res: Response, next: NextFunction) {
        try {
            const requestResult: any = await userServicesV1.createQuize(req.body);
            res.status(200).send(requestResult);
        } catch (error: any) {
            return res.send(error);
        }
    }

    public async getTest(req: IFilteredRequest<ICreateQuize>, res: Response, next: NextFunction) {
        try {
            const requestResult: any = await userServicesV1.getTest(req.body);
            res.status(200).send(requestResult);
        } catch (error: any) {
            return res.send(error);
        }
    }



}


export const userControllerV1 = new UserControllerV1();
