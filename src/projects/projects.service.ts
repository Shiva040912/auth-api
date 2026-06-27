import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateProjectDto } from './dto/update-project.dto';

import { Project, ProjectDocument } from './project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { User, UserDocument } from '../users/users.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<ProjectDocument>,

    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto, userId: string) {
    return this.projectModel.create({
      ...createProjectDto,
      user: userId,

      members: [
        {
          userId,
          role: 'admin',
        },
      ],
    });
  }

  async findAll(userId: string) {
    return this.projectModel.find({
      user: userId,
    });
  }
  async findOne(id: string) {
    return this.projectModel.findById(id);
  }
  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.projectModel.findByIdAndUpdate(id, updateProjectDto, {
      new: true,
    });
  }
  async remove(id: string) {
    return this.projectModel.findByIdAndDelete(id);
  }

  async inviteMember(projectId: string, email: string, role: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    const project = await this.projectModel.findById(projectId);

    if (!project) {
      throw new Error('Project not found');
    }

    project.members.push({
      userId: user._id as any,
      role,
    });

    return project.save();
  }

  async getMembers(id: string) {
     return this.projectModel
     .findById(id)
     .populate('members.userId', 'name email');
  }
}
