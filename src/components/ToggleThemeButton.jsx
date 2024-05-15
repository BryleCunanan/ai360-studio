import { Button } from "antd";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";

const ToggleThemeButton = ({ darkTheme, toggleTheme }) => {
  return (
    <div className="toggle-theme-btn">
      <Button onClick={toggleTheme}>
        {darkTheme ? <FaToggleOn /> : <FaToggleOff />}
      </Button>
    </div>
  );
};

export default ToggleThemeButton;
