import {Prop,Schema,SchemaFactory} from "@nestjs/mongoose"

import { Types } from "mongoose"

@Schema({timestamps:true})
export class Column{
    @Prop({required:true})
    name!:string;

    @Prop({
        type: Types.ObjectId,
        ref:"Board",
        required:true,
    })
    board!:Types.ObjectId


}
export const ColumnSchema = SchemaFactory.createForClass(Column);