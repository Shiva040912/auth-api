import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board, BoardDocument } from './board.schema';
import { CreateBoardDto } from './dto/create-board.dto';
import { Column } from '../columns/column.schema';
import { User , UserDocument } from '../users/users.schema';


@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name)
    private boardModel: Model<BoardDocument>,

    @InjectModel(Column.name)
    private columnModel: Model<Column>,

    @InjectModel(User.name)
    private userModel:Model<UserDocument>,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const board = await this.boardModel.create(createBoardDto);

    await this.columnModel.create([
      {
        name: 'To Do',
        board: board._id,
      },
      {
        name: 'In Progress',
        board: board._id,
      },
      {
        name: 'Done',
        board: board._id,
      },
    ]);

    return board;
  }

  async findByProject(projectId: string) {
    return this.boardModel.find({
      project: projectId,
    });
  }
  async update(id: string, updateBoardDto: UpdateBoardDto) {
    return this.boardModel.findByIdAndUpdate(id, updateBoardDto, { new: true });
  }
  async remove(id: string) {
    return this.boardModel.findByIdAndDelete(id);
  }
  async findOne(id: string) {
    return this.boardModel.findById(id);
  }
  async inviteMember(boardId: string , email:string){
    const user = await this.userModel.findOne({

      email,

    })
    if(!user){
      throw new Error('User not found')
    }

    const board = await this.boardModel.findById(boardId)

    if(!board){
      throw new Error("Board not found")
    }
    const alreadyMember = board.members?.some(
      (member)=>
        member.userId.toString()=== user._id.toString(),
    )

    if (alreadyMember){
      throw new Error('User already a member ')
    }

    board.members.push({
      userId:user._id,
      role:'member'
    })

    await board.save()

    return board


  }
}
