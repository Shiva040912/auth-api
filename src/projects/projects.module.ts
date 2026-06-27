import {Module} from "@nestjs/common"
import {ProjectsService} from "./projects.service"
import {ProjectsController} from "./projects.controller";

import {MongooseModule} from "@nestjs/mongoose"
import {Project,ProjectSchema} from "./project.schema"
import { User, UserSchema } from "../users/users.schema";

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:Project.name,
                schema:ProjectSchema,

            },
            {
                name:User.name,
                schema:UserSchema,
            }
        ]),
    ],
    controllers:[ProjectsController],
    providers:[ProjectsService]
})
export class ProjectsModule{}