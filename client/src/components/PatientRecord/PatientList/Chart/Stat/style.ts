import styled, { css } from "styled-components/macro";

const roundWrapper = css`
  border-radius: 20px;
  margin: 20px;
`;

export const StatWrapper = styled.div<{ color: string; selected: boolean }>`
  ${roundWrapper}
  text-align: left;
  padding: 20px;
  width: 250px;
  font-size: 16px;
  background-color: ${({ color }) => color};
  opacity: ${({ selected }) => (selected ? "1" : "0.5")};
  border: ${({ selected, color }) => (selected ? `3px solid ${color}` : "none")};
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
`;

export const StatPercentage = styled.div`
  margin-top: 5px;
  font-size: 0.9rem;
  font-style: italic;
`;

export const StatValue = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 32px;
  font-weight: 500;
`;
