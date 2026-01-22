import styled from "styled-components";
import { useAppTheme } from "./app/providers/ThemeProvider";
import { Header } from "./shared/designSystem/Header/Header";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition: background-color 0.3s ease;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

function App() {
  const { themeMode, toggleTheme } = useAppTheme();

  return (
    <LayoutWrapper>
      <Header themeMode={themeMode} toggleTheme={toggleTheme} />
      <MainContent>
        <h1>Hello</h1>
      </MainContent>
    </LayoutWrapper>
  );
}

export default App;
