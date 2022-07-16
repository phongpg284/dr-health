import { MQTT_BRAND } from 'src/config';

const topicParse = (topics: string): [boolean, string, string, string, string] => {
  let isValidTopic = true;
  const topicElement = topics.split('/');
  const nodeBrand = topicElement[0];
  const deviceCode = topicElement[1];
  const nodeType = topicElement[2];
  const nodeStat = topicElement[3];
  if (nodeBrand !== MQTT_BRAND) isValidTopic = false;
  return [isValidTopic, nodeBrand, deviceCode, nodeType, nodeStat];
};

export default topicParse;
