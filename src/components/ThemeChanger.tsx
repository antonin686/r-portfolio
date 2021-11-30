import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import { IoIosSunny as Light } from "react-icons/io";
import { FaMoon as Dark } from "react-icons/fa";

function ThemeChanger() {
  const [theme, setTheme] = useState<string | null>(localStorage.getItem("theme"));
  let icon = theme === "dark" ? <Light /> : <Dark />;

  const handleModeClick = () => {
    const element: any = document.getElementById("theme-changer");
    if (theme === "dark" || theme === null) {
      element.href = "theme.css";
      setTheme("light");
      localStorage.setItem("theme", "light");
    } else {
      element.href = "#";
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }    
  };

  return (
    <div className="theme-changer-wrapper">
      <IconButton title="Change Theme" className="theme-icon" onClick={handleModeClick}>
        {theme && icon}
      </IconButton>
    </div>
  );
}

export default ThemeChanger;
