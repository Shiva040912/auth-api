import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {TasksController} from "./tasks.controller"
import {TasksService} from "./tasks.service";
import {Task , TaskSchema} from "./task.schema"
import { GatewayModule } from "../gateway/gateway.module";

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: Task.name,
                schema: TaskSchema,
            },
        ]),
        GatewayModule,

    ],
    controllers:[TasksController],
    providers:[TasksService],
    exports:[TasksService],

})
export class TasksModule{}