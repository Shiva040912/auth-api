import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InviteMemberDto } from './dto/invite-member.dto';


@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('project/:projectId')
  findByProject(@Param('projectId') projectId: string) {
    return this.boardsService.findByProject(projectId);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(id, updateBoardDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post(':boardId/invite')
  inviteMember(
    @Param('boardId')boardId:string,
    @Body() InviteMemberDto: InviteMemberDto,
  ){
    return this.boardsService.inviteMember(
      boardId,
      InviteMemberDto.email,
    )
  }
}
