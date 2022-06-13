import { Logger } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { MQTT_BROKER } from '../config';
import { ATTRIBUTE_TOPIC, DEVICE_TOPIC, NODE_TOPIC, PROPERTY_TOPIC } from '../config/topic';
import { MqttController } from './mqtt.controller';

const logger = new Logger('MQTT');
const mqttController = new MqttController();

const mqttConnect = async () => {
  const mqttClient = mqtt.connect('mqtt://localhost:1883');
  mqttClient.on(
    'connect',
    function (
      connectionAck: mqtt.Packet & {
        retain: boolean;
        qos: 0 | 1 | 2;
        dup: boolean;
        topic: string | null;
        payload: string | null;
        sessionPresent: boolean;
        returnCode: number;
      },
    ) {
      if (!connectionAck.sessionPresent) {
        mqttClient?.subscribe(DEVICE_TOPIC, { qos: 2 }, (error, response) => {
          if (error) {
            logger.error(`Subscribe DEVICE_TOPIC error: ${error}`);
          } else {
            response.forEach(({ topic }) => {
              logger.log(`Subscribe DEVICE_TOPIC successfully: ${topic}`);
            });
          }
        });
        mqttClient?.subscribe(PROPERTY_TOPIC, { qos: 2 }, (error, response) => {
          if (error) {
            logger.error(`Subscribe PROPERTY_TOPIC error: ${error}`);
          } else {
            response.forEach(({ topic }) => {
              logger.log(`Subscribe PROPERTY_TOPIC successfully: ${topic}`);
            });
          }
        });
        mqttClient?.subscribe(NODE_TOPIC, { qos: 2 }, (error, response) => {
          if (error) {
            logger.error(`Subscribe NODE_TOPIC error: ${error}`);
          } else {
            response.forEach(({ topic }) => {
              logger.log(`Subscribe NODE_TOPIC successfully: ${topic}`);
            });
          }
        });
        mqttClient?.subscribe(ATTRIBUTE_TOPIC, { qos: 2 }, (error, response) => {
          if (error) {
            logger.error(`Subscribe ATTRIBUTE_TOPIC error: ${error}`);
          } else {
            response.forEach(({ topic }) => {
              logger.log(`Subscribe ATTRIBUTE_TOPIC successfully: ${topic}`);
            });
          }
        });
      }
    },
  );

  mqttClient.on('reconnect', () => {
    logger.log(`Reconnect to MQTT Broker ${MQTT_BROKER}`);
  });

  mqttClient.on('disconnect', () => {
    logger.log('Disconnect to MQTT Broker');
  });

  mqttClient.on('offline', () => {
    logger.log('MQTT Client offline');
  });

  mqttClient.on('error', (error) => {
    logger.error('Connect MQTT Broker error: ', error);
  });

  mqttClient.on('end', () => {
    logger.log('MQTT client end');
  });

  mqttClient.on('message', function (topic, buffer) {
    const payload = buffer.toString();
    logger.log('Receive message topic: ', topic);
    logger.log('Receive message payload: ', payload);
    mqttController.handleMQTTMessage(topic, payload);
  });
};

export default mqttConnect;
