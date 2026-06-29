import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,

} from "@nestjs/common"

import { Observable } from "rxjs"

@Injectable()
export class LoggingInterceptor implements NestInterceptor{

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>{

        const request = context.switchToHttp().getRequest();
        console.log("INTERCEPTOR WORKING")

        console.log(`[${request.method}] ${request.url}`,

        )
        return next.handle()
        
    }

}