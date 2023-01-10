import { BaseModel } from "../basemodel";
import { Document, Schema, model, Types } from "mongoose"


export interface ICreateQuestion extends Document {
    _id: Types.ObjectId;
    title: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correct: Array<String>;
    level: number;
}

export class CreateQuestion extends BaseModel {
    _id?: Types.ObjectId;
    title?: string;
    option1?: string;
    option2?: string;
    option3?: string;
    option4?: string;
    correct?: Array<String>;
    level?: number;
}

const CreateQuestionSchema: Schema = new Schema({
    title: {
        type: String
    },
    option1: {
        type: String
    },
    option2: {
        type: String
    },
    option3: {
        type: String
    },
    option4: {
        type: String
    },
    correct: {
        type: Array
    },
    level: {
        type: Number
    },

}, { timestamps: true });


export const createQuestionModel = model<CreateQuestion>('questions', CreateQuestionSchema)
