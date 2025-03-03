import "./TimePicker.css";
export default function TimePicker({ setLocalTimer, localTimerRef }) {
  const setTime = (time) => {
    setLocalTimer(time);
    localTimerRef.current = time;
  };
  const timeOptions = [15, 30, 60];
  return (
    <div>
      <ul className={`timeOptions list-none flex justify-center mb-0`}>
        {timeOptions.map((option, index) => {
          return (
            <li key={index}>
              <button
                className={` font-bold cursor-pointer  bg-transparent  text-xl px-4 transition-all duration-500 hover:text-[#1E1E1E] dark:hover:text-[#eeeeee] 
                  ${
                    localTimerRef.current === option
                      ? "text-[#1E1E1E] dark:text-[#eeeeee]"
                      : "text-[#808080] dark:text-[#1E1E1E]"
                  }`}
                onClick={() => setTime(option)}
              >
                {option}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
