import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  background-color: ${({theme}) => theme.COLORS.BACKGROUND_900};
  color: ${({theme}) => theme.COLORS.GRAY_300};

  margin-bottom: 8px;
  border-radius: 10px;

  > input {
    height: 56px;
    width: 100%;

    padding: 12px;

    color: ${({theme}) => theme.COLORS.WHITE};
    background: transparent;
    border: none;
    
    &::placeholder {
      color: ${({theme}) => theme.COLORS.GRAY_300};
    }
  }

  >input:-webkit-autofill {
    box-shadow:inset 0 0 0 50px ${({theme}) => theme.COLORS.BACKGROUND_900};
    }

  >input:-webkit-autofill {
    -webkit-text-fill-color: white !important;
  }

  > svg {
      margin-left:16px;
    }
`;