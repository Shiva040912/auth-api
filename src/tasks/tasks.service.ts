import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Task } from './task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { BoardGateway } from '../gateway/board.gateway';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>,

    private boardGateway: BoardGateway,
  ) {}

  async create(createTaskDto: CreateTaskDto) {

    const task= await this.taskModel.create(createTaskDto)

    this.boardGateway.server
     .to(task.board.toString())
     .emit("taskCreated", task)

    console.log(`Task Created Event Set to Board:${task.board}`)
    return task
    
  }

  async findByBoard(boardId: string) {
    return this.taskModel.find({
      board: boardId,
    });
  }

  async remove(id: string) {
   const deletedTask= await this.taskModel.findByIdAndDelete(id);

   if (deletedTask){
     this.boardGateway.server
      .to(deletedTask.board.toString())
      .emit("taskDeleted",deletedTask._id)

      console.log(`Task Deleted Event Sent To Board:${deletedTask.board}`)

    }
    return deletedTask
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      id,
      updateTaskDto,
      { new: true },
    );

    if (updatedTask) {
      this.boardGateway.server
        .to(updatedTask.board.toString())
        .emit('taskUpdated', updatedTask);

      console.log(
        `Task Updated Event Sent To Board: ${updatedTask.board}`,
      );
    }

    return updatedTask;
  }
}