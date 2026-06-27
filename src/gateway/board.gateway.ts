import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from "@nestjs/websockets"

import {Server , Socket} from "socket.io"

@WebSocketGateway({
    cors:{
        origin: '*',
    },
})
export class BoardGateway{

    
    @WebSocketServer()
    server! :Server;

    @SubscribeMessage('joinBoard')
    handleJoinBoard(
        @MessageBody() boardId:string,
        @ConnectedSocket() client: Socket,
    ){
        client.join(boardId);

        console.log(`Client Joined Board :${boardId}`);

        return{
            event:"joinedBoard",
            data:boardId
        }
    }

}