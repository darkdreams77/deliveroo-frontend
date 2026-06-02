import logo from "../assets/img/logo.svg";
import { Container } from "./Layout";
import ThemeToggle from "./ThemeToggle";

export const Header = () => {
  return (
    <header className="min-h-16 border-b border-b-gray-200 dark:border-b-gray-950 flex items-center">
      <Container className="flex justify-between items-center">
        <a href="/">
          <img src={logo} alt="Logo Deliveroo" className="h-12" />
        </a>
        <ThemeToggle />
      </Container>
    </header>
  );
};
