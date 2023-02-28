import styled from "styled-components";

export const Container = styled.button`
  font-size: 16px;
  line-height: 21px;
  font-weight: 400;

  color: ${({ theme, isActive }) => isActive ? theme.COLORS.ORANGE : theme.COLORS.GRAY_100};
  background: none;
  border: none;
`;