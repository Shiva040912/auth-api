import {Prop,Schema,SchemaFactory} from "@nestjs/mongoose";
import {Document , Types} from "mongoose"

export type ProjectDocument = Project & Document;

@Schema({timestamps:true})
export class Project{

    @Prop({required:true})
    name!:string;
    @Prop()
    description!:string

    @Prop({
        type:Types.ObjectId,
        ref:"User",
        required:true,
    })
    user!:Types.ObjectId;

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
        default:[]
    })
    members!:{
        userId:Types.ObjectId
        role:string
    }[]

    

}
export const ProjectSchema = SchemaFactory.createForClass(Project);

