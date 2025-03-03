import ReloadIcon from "./ReloadIcon";

export default function Reload({ newGame }) {
  return (
    <div className={`relative my-4`}>
      <button
        className={`group mx-4 border-0 bg-transparent cursor-pointer `}
        onClick={newGame}
      >
        <ReloadIcon />
        <span
          className={`group-hover:top-[-110%] group-hover:z-[5] group-hover:opacity-100 opacity-0 absolute p-2 dark:text-[#1e1e1e] dark:bg-gray-200 
            bg-[#1E1E1E] text-[#eeeeee] rounded-lg top-[-100%] left-[50%] whitespace-nowrap 
            translate-y-[-50%] translate-x-[-50%] z-[-1] transition-all duration-500 after:content-[" "] 
            after:absolute after:z-0 after:top-[100%]  after:left-[50%] after:translate-y-[-50%] 
            after:translate-x-[-50%]  after:border-4  after:rotate-45 dark:after:border-[#eeeeee]
             after:border-[#1E1E1E]`}
        >
          Restart Test
        </span>
      </button>
    </div>
  );
}
