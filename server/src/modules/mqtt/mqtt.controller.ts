import { Controller, Inject, Logger } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, MqttContext } from '@nestjs/microservices';
import { ClientProxy } from '@nestjs/microservices';
import { NODE_TOPIC } from 'src/config/topic';
import { MedicalStatService } from 'src/modules/medical-stat/medical-stat.service';
import { MqttService } from './mqtt.service';

const logger = new Logger('MQTT');
@Controller('mqtt')
export class MqttController {
  constructor(
    @Inject('MQTT_SERVICE') private client: ClientProxy,
    private readonly mqttService: MqttService,
    private readonly medicalStatService: MedicalStatService,
  ) {}

  @MessagePattern(NODE_TOPIC)
  async getDevicePayload(@Payload() data: string, @Ctx() context: MqttContext) {
    const topic = context.getTopic();
    logger.log(`Receive message Topic: ${topic}`);
    logger.log(`Receive message Payload: ${data}`);
    await this.mqttService.handleMQTTNodeTopic(topic, data);
    return;
  }

  sendMessage(topic: string, payload: string) {
    logger.log(`Send message Topic: ${topic}`);
    logger.log(`Send message Payload: ${payload}`);
    return this.client.send(topic, payload);
  }
}
