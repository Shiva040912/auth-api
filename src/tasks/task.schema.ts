import {Prop , Schema , SchemaFactory} from "@nestjs/mongoose"
import {Types} from "mongoose";

@Schema({timestamps:true})
export class Task{
    @Prop({required:true})
    title!:string;

    @Prop()
    description!:string;

    @Prop({
        type: Types.ObjectId,
        ref:"Board",
        required:true,

    })
    board!:Types.ObjectId;

    @Prop({
        type:Types.ObjectId,
        ref:"Column",
        required:true,
    })
    column!:Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
