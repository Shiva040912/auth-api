import { Controller , Get ,Param } from "@nestjs/common";
import { ColumnsService } from "./columns.service";

@Controller("columns")
export class ColumnsController{

    constructor (
        private readonly columnsService : ColumnsService,

    ){}

    @Get("/board/:boardId")
    findByBoard(
        @Param('boardId') boardId:string,

    ){
        return this.columnsService.findByBoard(boardId)
    }
}