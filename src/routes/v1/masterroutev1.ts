import express, { NextFunction, Request, Response } from 'express';
import {userControllerV1 } from '../../controllers/v1/usercontrollerv1';
import { BaseRoutes } from "../baseroutes";
import cores from 'cors';
import bodyParser from 'body-parser';
import middleware from './middleware';
class MasterRouteV1 extends BaseRoutes {
    public path = '/';

    constructor() {
        super();
        this._configure();
    }

    /**
     * @description Connect routes to their matching controller endpoints.
     */
    private _configure() {
        this.router.use(bodyParser.json())
        this.router.use(bodyParser.urlencoded({ extended: false }))

        this.router.use(cores())
        
        this.router.post("/signUpcustomer", (req: Request, res: Response, next: NextFunction) => {
            userControllerV1.signUpcustomer(req, res, next);
        });  
        this.router.post("/logincustomer" , (req: Request, res: Response, next: NextFunction) => {
            userControllerV1.logincustomer(req, res, next);
        });  
        this.router.post("/createQuestion" ,middleware, (req: Request, res: Response, next: NextFunction) => {
            userControllerV1.createQuestion(req, res, next);
        });  
        this.router.get("/getAllQuestions" ,middleware, (req: Request, res: Response, next: NextFunction) => {
            userControllerV1.getAllQuestions(req, res, next);
        });  
        this.router.get("/getAllQuize" ,middleware, (req: Request, res: Response, next: NextFunction) => {
            userControllerV1.getAllQuize(req, res, next);
        });  
        this.router.post("/createQuize" ,middleware, (req: Request, res: Response, next: NextFunction) => {
            userControllerV1.createQuize(req, res, next);
        });  
        this.router.post("/getTest" ,middleware, (req: Request, res: Response, next: NextFunction) => {
            userControllerV1.getTest(req, res, next);
        });  

    }
}

export const masterRouteV1 = new MasterRouteV1();