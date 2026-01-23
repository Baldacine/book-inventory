import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 24px 16px;
`;

export const BackButtonWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 16px;
  display: flex;
  justify-content: flex-start;
`;

export const BookCard = styled.div`
  color: ${({ theme }) => theme.colors.text};
  padding: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  max-width: 700px;
  width: 100%;
`;

export const BookCover = styled.img`
  display: block;
  margin: 0 auto 24px auto;
  max-width: 150px;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  object-fit: cover;
`;

export const BookTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
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
  font-size: ${({ theme }) => theme.typography.fontSizes.md};

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
