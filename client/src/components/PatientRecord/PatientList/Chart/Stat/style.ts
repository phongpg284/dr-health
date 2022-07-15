import styled, { css } from "styled-components/macro";

const roundWrapper = css`
  border-radius: 20px;
  margin: 20px;
`;

export const StatWrapper = styled.div<{ color: string }>`
  ${roundWrapper}
  text-align: left;
  padding: 20px;
  width: 250px;
  font-size: 16px;
  background-color: ${({ color }) => color};
  position: relative;
`;

export const StatIcon = styled.img`
  height: 40px;
`;

export const StatEdge = styled.img`
  height: 80px;
  position: absolute;
  right: 0;
  top: 0;
`;

export const StatName = styled.div`
  font-weight: 600;
  color: #323a42;
  font-size: 24px;
  margin-top: 15px;
  margin-bottom: 10px;
`;

export const StatPercentage = styled.div`
  color: #929aad;
  margin-top: 5px;
  margin-bottom: 10px;
`;

export const StatValue = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 28px;
  font-weight: 500;
`;
