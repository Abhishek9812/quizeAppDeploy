import { BaseModel } from "../basemodel";
import { Document, Schema, model, Types } from "mongoose"


export interface ICreateQuize extends Document {
    _id: Types.ObjectId;
    title: string;
    userId: string;
    questions: Array<Object>;
    level: number;
}

export class CreateQuize extends BaseModel {
    _id?: Types.ObjectId;
    title?: string;
    userId?: string;
    questions?: Array<Object>;
    level?: number;
}

const CreateQuizeSchema: Schema = new Schema({
    title: {
        type: String
    },
    userId: {
        type: String
    },
    questions: {
        type: Array
    },
    level: {
        type: Number
    },

}, { timestamps: true });


export const createQuizeModel = model<CreateQuize>('quize', CreateQuizeSchema)
