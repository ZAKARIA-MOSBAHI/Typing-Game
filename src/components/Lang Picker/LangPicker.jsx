import { useState } from "react";
import LangIcon from "./LangIcon";

export default function LangPicker({ Language, setLanguage }) {
  const LanguageOptions = ["English", "French"];
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <div className="relative">
      <button
        className={`group border-0 whitespace-nowrap border-b border-[#808080] pb-2 bg-transparent w-auto bg-none flex items-center transition-all duration-300 cursor-pointer  dark:text-[#1E1E1E] text-[#808080]  `}
        type="button"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        <span
          className={`mr-4  transition-all duration-300 dark:group-hover:text-[#eeeeee] group-hover:text-[#1E1E1E]`}
        >
          {Language}
        </span>
        <LangIcon />
      </button>
      <div
        className={`${
          openDropdown ? "flex" : "hidden"
        } bg-[#E0E0E0] dark:bg-[#646464] dark:text-[#1E1E1E] flex-col items-center justify-center rounded-sm  w-full absolute top-[150%] right-0 text-[#808080]`}
      >
        {LanguageOptions.map((lang, index) => {
          return (
            <button
              key={index}
              className={`w-full py-2 hover:text-[#1E1E1E] dark:hover:text-[#eeeeee]  transition-all duration-300 cursor-pointer border-b border-[#1E1E1E]`}
              onClick={() => {
                setOpenDropdown(false);
                setLanguage(lang);
              }}
            >
              {lang}
            </button>
          );
        })}
      </div>
    </div>
  );
}
