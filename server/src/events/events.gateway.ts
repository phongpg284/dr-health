import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { PatientStats } from 'src/modules/mqtt/transformers.ts/transformToDeviceStats';
import { Notification } from 'src/modules/notification/entities/notification.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('notification')
  findAll(@MessageBody() data: { patientId: number }): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map((item) => ({ event: 'events', data: item })));
  }

  async sendNotification(notification: Notification): Promise<boolean> {
    return this.server.emit('notification', notification);
  }

  async sendDeviceStats(deviceStats: PatientStats) {
    return this.server.emit('device-stats', deviceStats);
  }

  async sendTest(message: string): Promise<boolean> {
    return this.server.emit('test', message);
  }

  async sendStat(stat: any): Promise<boolean> {
    return this.server.emit('stat', JSON.stringify(stat));
  }
}
