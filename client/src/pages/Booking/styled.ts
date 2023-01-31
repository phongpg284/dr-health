import styled from "styled-components/macro";

export const Wrapper = styled.div`
  padding: 10px;
  font: 14px/1.5 "Montserrat", sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

export const ContentWrapper = styled.div`
  max-width: 1050px;
  margin: auto;
  border-radius: 10px;
`;

export const SelectCityWrapper = styled.div`
  text-align: left;
  margin-bottom: 10px;
`;

export const Content = styled.div`
  background-color: #ffffff;
`;

export const ItemWrapper = styled.div`
  display: flex;
  background-color: #fff;
  box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
  border-radius: 8px;
  border-bottom: none;
  margin-bottom: 10px;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 15px;
  border-right: 1px solid #eee;
  flex: 1.05;
`;

export const Avatar = styled.img`
  width: 70px;
  border-radius: 50%;
  margin-right: 15px;
`;
export const Profile = styled.div`
  text-align: left;
  span {
    vertical-align: middle;
    margin-left: 5px;
  }
`;

export const Title = styled.div`
  font-size: 16px;
  line-height: 1.3;
  margin: 0px;
  padding: 0px;
  margin-bottom: 10px;
  color: #45c3d2;
  font-weight: bold;
  font-family: "Open Sans", sans-serif;
  font-family: "Roboto", sans-serif;
  text-align: left;
`;

export const Description = styled.div``;

export const BookingWrapper = styled.div`
  flex: 0.95;
  text-align: left;
`;

export const SelectDate = styled.p`
  color: #666;
  text-transform: uppercase;
  font-weight: bold;
  padding: 15px;
  margin: 0;
  select {
    background: transparent;
    border: none;
    color: #337ab7;
    border-bottom: 1px solid #999;
    border-radius: 0;
    font-weight: bold;
    padding: 3px;
    font: 14px/1.5 "Montserrat", sans-serif;
    outline: none;
  }
`;

export const Booking = styled.div`
  padding: 15px;
  border-top: 3px solid #eee;
  .calendar-icon {
    margin-right: 5px;
  }
  span {
    font: 14px/1.5 "Montserrat", sans-serif;
    vertical-align: middle;
    outline: none;
    text-transform: uppercase;
    font-size: 14px;
    color: #666;
    font-weight: 600;
  }
`;

export const TimeSlots = styled.div`
  margin-left: -4px;
  margin-top: 8px;
`;

export const TimeSlot = styled.div`
  margin: 2px;
  min-width: 26%;
  background: #eee;
  line-height: 1.3333;
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
  text-align: center;
  color: #333;
  font-weight: bolder;
  padding: 8px 10px;
  position: relative;
  box-sizing: border-box;
  border: #fff solid 2px;
  cursor: pointer;
  :hover {
    border: #45c3d2 solid 2px;
  }
`;

export const Address = styled.div`
  border-top: 1px solid #eee;
  padding-top: 10px;
  margin-top: 10px;
  font-size: 13px;
`;

export const Price = styled.div`
  color: #8b8b8b;
  font-size: 14px;
  border-top: 1px solid #eee;
  padding-top: 10px;
  margin-top: 10px;
`;
