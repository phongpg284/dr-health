import { StatIcon, StatName, StatPercentage, StatValue, StatWrapper } from "./style";
const StatTracking = ({ icon, color, name, value, unit, textColor }: any) => {
  return (
    <StatWrapper color={color}>
      <StatIcon src={icon} />
      <StatName>{name}</StatName>
      <StatPercentage>80%</StatPercentage>
      <StatValue color={textColor}>
        {value} {unit}
      </StatValue>
    </StatWrapper>
  );
};

export default StatTracking;
