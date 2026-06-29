import { ExceptionFilter , Catch , ArgumentsHost ,HttpException , HttpStatus } from "@nestjs/common";
import { Request , Response } from "express";
import { timestamp } from "rxjs";



@Catch()
export class GlobalExceptionFilter implements ExceptionFilter{

    catch(exception:unknown , host:ArgumentsHost){
        
        const context = host.switchToHttp()
       
        const response = context.getResponse<Response>();
        const request = context.getRequest<Request>();

        const status = exception instanceof HttpException ?
        exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const exceptionResponse = exception instanceof HttpException ? exception.getResponse() : "Internal Server Error"

        const message = typeof exceptionResponse ==="string" ? 
        exceptionResponse : (exceptionResponse as any).message




        response.status(status).json({
            statusCode : status,
            message,
            timestamp: new Date().toISOString(),
            path: request.url,
        })



    }

}