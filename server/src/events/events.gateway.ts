import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { Notification } from 'src/modules/notification/entities/notification.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  // @SubscribeMessage('notification')
  // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
  //   console.log(data);
  //   return from([1, 2, 3]).pipe(map((item) => ({ event: 'events', data: item })));
  // }

  async sendNotification(notification: Notification): Promise<boolean> {
    return this.server.emit('notification', notification);
  }
}
