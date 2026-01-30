import { Sun, Moon } from "lucide-react";
import { Button } from "../Button/Button";
import { StyledHeader, HeaderActions } from "./styles";
import type { HeaderProps } from "./types";
import { useEffect, useState } from "react";

export function Header({ themeMode, toggleTheme }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <StyledHeader $isScrolled={isScrolled}>
      <h1></h1>
      <HeaderActions>
        <Button variant="circle" size="small" onClick={toggleTheme}>
          {themeMode === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </Button>
      </HeaderActions>
    </StyledHeader>
  );
}
