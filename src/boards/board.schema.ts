import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import {Document , Types} from "mongoose";

export type BoardDocument = Board & Document;
@Schema({timestamps:true})
export class Board{

    @Prop({required:true})
    title!:string;

    @Prop({
        type: Types.ObjectId, 
        ref:"Project",
        required:true,
    })
    project!: Types.ObjectId;

    @Prop({
        type:[
            {
                userId:{
                    type:Types.ObjectId,
                    ref:"User",
                },
                role:{
                    type:String,
                    enum:["admin","member"],
                    default:"member",
                }
            }

        ],
        default:[],
    })
    members!:{
        userId:Types.ObjectId
        role:String
    }[]
}
export const BoardSchema = SchemaFactory.createForClass(Board);