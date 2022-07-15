import { StatEdge, StatIcon, StatName, StatPercentage, StatValue, StatWrapper } from "./style";
const StatTracking = ({ icon, edge, color, name, value, unit, textColor }: any) => {
  return (
    <StatWrapper color={color}>
      <StatIcon src={icon} />
      <StatEdge src={edge} />
      <StatName>{name}</StatName>
      <StatPercentage>80%</StatPercentage>
      <StatValue color={textColor}>
        {value} {unit}
      </StatValue>
    </StatWrapper>
  );
};

export default StatTracking;
