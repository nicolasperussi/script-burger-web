import React, { useEffect, useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

function ThemeSwitcher() {
  const [theme, setTheme] = useState(getInitialTheme);

  function getInitialTheme() {
    const savedTheme = localStorage.getItem("@SB/theme");
    return savedTheme ? savedTheme : "light";
  }

  useEffect(() => {
    localStorage.setItem("@SB/theme", theme);
    document.documentElement.className = theme;
    console.log(theme);
  }, [theme]);

  return (
    <div
      className="group flex flex-col justify-center items-center w-20 h-20 rounded-full hover:bg-orange-500 hover:bg-opacity-10 cursor-pointer select-none text-4xl"
      onClick={() =>
        setTheme((prev: string) => (prev === "light" ? "dark" : "light"))
      }
    >
      {theme === "dark" ? (
        <IoSunny className="group-hover:text-orange-500" />
      ) : (
        <IoMoon className="group-hover:text-orange-500" />
      )}
    </div>
  );
}

export default ThemeSwitcher;
