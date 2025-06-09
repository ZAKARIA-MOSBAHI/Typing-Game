import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import Popover, { PopoverContent, PopoverTrigger } from "../ui/Popover";
import { Clock12 } from "lucide-react";
export default function TimePicker({ localTimerRef }) {
  const { setLocalTimer } = useContext(GameContext);
  const setTime = (time) => {
    setLocalTimer(time);
    localTimerRef.current = time;
  };
  const timeOptions = [15, 30, 60];
  return (
    <Popover className="h-full flex items-center">
      <PopoverTrigger
        className={`group relative cursor-pointer items-center justify-center`}
      >
        <Clock12 className="w-6" />
      </PopoverTrigger>
      <PopoverContent
        className={`flex divide-y w-24 flex-col h-fit my-2 transition-all duration-300 cursor-pointer`}
      >
        {timeOptions.map((option, index) => {
          return (
            <button
              key={index}
              className={`font-bold cursor-pointer  bg-transparent  text-xl px-4 transition-all duration-500 hover:text-[#1E1E1E] dark:hover:text-[#eeeeee] 
                  ${
                    localTimerRef?.current === option
                      ? "text-[#1E1E1E] dark:text-[#eeeeee]"
                      : "text-[#808080] dark:text-[#1E1E1E]"
                  }`}
              onClick={() => setTime(option)}
            >
              {option}
            </button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
