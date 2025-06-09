import React, { useContext, useState } from "react";
import { GameContext } from "../../context/GameContext";
import { FR, US, DE } from "country-flag-icons/react/3x2";
import Popover, { PopoverContent, PopoverTrigger } from "../ui/Popover";

export default function LangPicker() {
  const { language, setLanguage } = useContext(GameContext);
  const LanguageOptions = [
    { name: "English", image: US },
    { name: "French", image: FR },
    { name: "German", image: DE },
  ];
  return (
    <Popover className="h-full flex items-center">
      <PopoverTrigger
        className={`group relative cursor-pointer items-center justify-center`}
      >
        {LanguageOptions.map((l) =>
          l.name === language
            ? React.createElement(l.image, {
                key: l.name,
                className: "w-6",
              })
            : null
        )}
      </PopoverTrigger>
      <PopoverContent
        className={`w-fit flex divide-y flex-col h-fit my-2 transition-all duration-300 cursor-pointer`}
      >
        {LanguageOptions.map((lang, index) => {
          return (
            <button // how can i give this button the ability to close the popover
              key={index}
              className="flex gap-2 px-8 justify-center py-2 hover:text-[#1E1E1E] dark:hover:text-[#eeeeee]  "
              onClick={() => {
                setLanguage(lang.name);
              }}
            >
              <lang.image className="w-4" />
              {lang.name}
            </button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
