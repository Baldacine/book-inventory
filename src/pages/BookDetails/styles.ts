import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const LoadingMessage = styled(Container)`
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
`;

export const BookCard = styled.div`
  background-color: ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.text};
  padding: 32px;
  border-radius: 16px;
  max-width: 700px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const BookTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
`;

export const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InfoRow = styled.div`
  display: flex;
  gap: 12px;
  font-size: 1rem;

  strong {
    width: 140px;
  }

  span {
    flex: 1;
    word-break: break-word;
  }
`;

export const FooterButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
`;
