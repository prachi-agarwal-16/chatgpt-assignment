import React from "react";

const index = ({
  prompt,
  placeholder = "Enter your prompt...",
  onChange = () => {},
  styles,
  className = "",
  handleSubmit = () => {},
  isFetchingAnswer,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log({ e });
      handleSubmit();
    }
  };
  return (
    <div className=" w-full h-[12vh]  px-8 sm:px-[150px] lg:px-[300px] flex flex-col items-center justify-center gap-2 ">
      <div className="w-full relative">
        <input
          type="text"
          placeholder={placeholder}
          style={styles}
          value={isFetchingAnswer ? "" : prompt}
          className={
            "border border-gray-600 rounded-lg p-2 primary-bg w-full text-white text-sm " +
            className
          }
          onChange={onChange}
          onKeyDown={handleKeyDown}
          disabled={isFetchingAnswer}
        />
        <div
          className="w-[25px] h-[25px]  text-white flex items-center justify-center absolute right-2 top-2 cursor-pointer"
          onClick={handleSubmit}
        >
          <span className="text-white">&#8593;</span>
        </div>
      </div>
      <span className="text-gray-500 text-xs">
        ChatGPT can make mistakes. Consider checking important information.
      </span>
    </div>
  );
};

export default index;
