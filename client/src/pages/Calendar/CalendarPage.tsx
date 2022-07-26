import styled from "styled-components";
import Calendar from "../../components/Calender";

const CalendarPageWrapper = styled.div`
  max-width: 1200px;
  margin: auto;
`;

export default function CalendarPage() {
  return (
    <CalendarPageWrapper>
      <Calendar />
    </CalendarPageWrapper>
  );
}
