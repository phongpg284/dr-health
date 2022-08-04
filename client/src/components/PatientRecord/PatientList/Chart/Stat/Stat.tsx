import { isArray } from "lodash";
import { StatEdge, StatIcon, StatName, StatPercentage, StatValue, StatWrapper } from "./style";
const StatTracking = ({ icon, edge, color, selectedType, value, unit, textColor, onClick, type, date }: any) => {
  return (
    <StatWrapper color={color} onClick={() => onClick(type)} selected={type?.key === selectedType?.key}>
      <StatIcon src={icon} />
      <StatEdge src={edge} />
      <StatName>{type?.label}</StatName>
      <StatValue color={textColor}>
        {isArray(value) ? `${value[0]}/${value[1]}` : value} {unit}
      </StatValue>
      <StatPercentage>Cập nhật: {date}</StatPercentage>
    </StatWrapper>
  );
};

export default StatTracking;
