import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTasksService = {
    create: jest.fn().mockResolvedValue({ id: '1', title: 'Test Task' }),
    findByBoard: jest.fn().mockResolvedValue([{ id: '1', title: 'Test Task' }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        { provide: TasksService, useValue: mockTasksService },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should call service.findByBoard when findByBoard is invoked', async () => {
    const result = await controller.findByBoard('board123');
    expect(service.findByBoard).toHaveBeenCalledWith('board123');
    expect(result).toEqual([{ id: '1', title: 'Test Task' }]);
  });
});