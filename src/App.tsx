import styled from "styled-components";
import { Header } from "@/shared/designSystem/Header/Header";
import { useAppTheme } from "@/app/providers/ThemeProvider";
import { AppRoutes } from "@/app/routes";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition: background-color 0.3s ease;
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`;

function App() {
  const { themeMode, toggleTheme } = useAppTheme();

  return (
    <LayoutWrapper>
      <Header themeMode={themeMode} toggleTheme={toggleTheme} />
      <MainContent>
        <AppRoutes />
      </MainContent>
    </LayoutWrapper>
  );
}

export default App;
