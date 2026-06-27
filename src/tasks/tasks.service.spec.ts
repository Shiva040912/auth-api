import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { TasksService } from "./tasks.service";
import { Task } from "./task.schema";
import { BoardGateway } from "../gateway/board.gateway";

describe('TasksService', () => {
    let service: TasksService;
    let taskModel: any;
    let boardGateway: any;

    const mockTask = {
        _id: "1",
        title: "Test Task",
        board: 'board123',
        description: 'Test Description',
        column: 'todo',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TasksService,
                {
                    provide: getModelToken(Task.name),
                    useValue: {
                        create: jest.fn(),
                        find: jest.fn(),
                        findByIdAndUpdate: jest.fn(),
                        findByIdAndDelete: jest.fn(),
                    },
                },
                {
                    provide: BoardGateway,
                    useValue: {
                        server: {
                            to: jest.fn().mockReturnThis(),
                            emit: jest.fn().mockReturnThis(),
                        },
                    },
                },
            ],
        }).compile();

        service = module.get<TasksService>(TasksService);
        taskModel = module.get(getModelToken(Task.name));
        boardGateway = module.get<BoardGateway>(BoardGateway);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

 
    it('should create a task and emit taskCreated event', async () => {
        const dto = {
            title: "Test Task",
            board: "board123",
            description: "Test Description",
            column: "todo",
        };

        taskModel.create.mockResolvedValue(mockTask);

        const result = await service.create(dto);

        expect(result).toEqual(mockTask);
        expect(taskModel.create).toHaveBeenCalledWith(dto);
        expect(boardGateway.server.to).toHaveBeenCalledWith(dto.board);
        expect(boardGateway.server.emit).toHaveBeenCalledWith(
            'taskCreated',
            mockTask
        );
    });

    
    it('should return tasks for a specific board', async () => {
        const mockTasksList = [mockTask];

        taskModel.find.mockResolvedValue(mockTasksList);

        const result = await service.findByBoard('board123');

        expect(result).toEqual(mockTasksList);
        expect(taskModel.find).toHaveBeenCalledWith({
            board: 'board123',
        });
    });

   
    it('should update a task and emit taskUpdated event', async () => {
        const updateDto = {
            title: 'Updated Title',
        };

        const updatedTask = {
            ...mockTask,
            title: 'Updated Title',
        };

        taskModel.findByIdAndUpdate.mockResolvedValue(updatedTask);

        const result = await service.update('1', updateDto);

        expect(result).toEqual(updatedTask);

        expect(taskModel.findByIdAndUpdate).toHaveBeenCalledWith(
            '1',
            updateDto,
            { new: true }
        );

        expect(boardGateway.server.to).toHaveBeenCalledWith(
            updatedTask.board
        );

        expect(boardGateway.server.emit).toHaveBeenCalledWith(
            'taskUpdated',
            updatedTask
        );
    });

    
    it('should return null if task not found during update', async () => {
        taskModel.findByIdAndUpdate.mockResolvedValue(null);

        const result = await service.update('999', {
            title: 'Updated Title',
        });

        expect(result).toBeNull();

        expect(boardGateway.server.to).not.toHaveBeenCalled();
        expect(boardGateway.server.emit).not.toHaveBeenCalled();
    });

    
    it('should remove a task and emit taskDeleted event', async () => {
        taskModel.findByIdAndDelete.mockResolvedValue(mockTask);

        const result = await service.remove('1');

        expect(result).toEqual(mockTask);

        expect(taskModel.findByIdAndDelete).toHaveBeenCalledWith('1');

        expect(boardGateway.server.to).toHaveBeenCalledWith(
            mockTask.board
        );

        expect(boardGateway.server.emit).toHaveBeenCalledWith(
            'taskDeleted',
            "1"
        );
    });

    
    it('should return null if task does not exist', async () => {
        taskModel.findByIdAndDelete.mockResolvedValue(null);

        const result = await service.remove('999');

        expect(result).toBeNull();

        expect(boardGateway.server.to).not.toHaveBeenCalled();
        expect(boardGateway.server.emit).not.toHaveBeenCalled();
    });
});