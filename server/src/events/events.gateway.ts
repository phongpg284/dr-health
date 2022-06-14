import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('notification')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log(data);
    return;
    // return from([1, 2, 3]).pipe(map((item) => ({ event: 'events', data: item })));
  }

  async sendNotification(): Promise<number> {
    console.log('send');
    this.server.emit('notification', ['fhkdhf']);
    return;
  }
}
