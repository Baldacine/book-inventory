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
  max-width: 900px;
  margin-bottom: 16px;
  display: flex;
  justify-content: flex-start;
`;

export const BookCard = styled.div`
  color: ${({ theme }) => theme.colors.text};
  padding: 24px;
  max-width: 900px;
  width: 100%;
`;

export const BookContent = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const BookCover = styled.img`
  width: 250px;
  height: auto;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  object-fit: cover;

  @media (max-width: 768px) {
    width: 150px;
  }
`;

export const BookHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BookTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin: 0;
`;

export const BookMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};

  span {
    display: flex;
    gap: 4px;
  }
`;

export const BookOverview = styled.p`
  margin-top: 16px;
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`;

export const FooterButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;
