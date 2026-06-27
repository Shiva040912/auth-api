import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {ProjectsModule} from "./projects/projects.module";
import {BoardsModule} from "./boards/boards.module";
import {ColumnsModule} from "./columns/columns.module"
import {TasksModule} from "./tasks/tasks.module"
import { GatewayModule } from './gateway/gateway.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGO_URL!),

    AuthModule,
    UsersModule,
    ProjectsModule,
    BoardsModule,
    ColumnsModule,
    TasksModule,
    GatewayModule,
  ],
})
export class AppModule {}