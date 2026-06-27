import {Module} from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import {
    Board,
    BoardSchema,

} from "./board.schema";

import {
  Column,
  ColumnSchema,
} from '../columns/column.schema';

import {BoardsController} from './boards.controller';
import {BoardsService} from "./boards.service";

import {User , UserSchema} from "../users/users.schema"


@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:Board.name,
                schema:BoardSchema,


            },
            {
                name:Column.name,
                schema:ColumnSchema,
            },
            {
                name:User.name,
                schema:UserSchema,
            }


        ]),
    ],
    controllers:[BoardsController],
    providers:[BoardsService],
})
export class BoardsModule{}