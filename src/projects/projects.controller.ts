import {
  Body,
  Controller,
  Patch,
  Post,
  Request,
  UseGuards,
  Delete,
} from '@nestjs/common';

import { Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { UpdateProjectDto } from './dto/update-project.dto';

import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Request() req: any) {
    return this.projectsService.create(createProjectDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: any) {
    return this.projectsService.findAll(req.user.userId);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
  @Post(':id/invite')
  inviteMember(@Param('id') id: string, @Body() body: any) {
    return this.projectsService.inviteMember(id, body.email, body.role);
  }
  @Get(':id/members')
  getMembers(@Param('id') id: string) {
    return this.projectsService.getMembers(id);
  }
}
