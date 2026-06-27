import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Column } from './column.schema';
import { Types } from 'mongoose';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectModel(Column.name)
    private columnModel: Model<Column>,
  ) {}

  async findByBoard(boardId: string) {
    return this.columnModel.find({
      board: new Types.ObjectId(boardId),
    });
  }
}
