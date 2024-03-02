import React from "react";

const index = ({ handleSetConversation, handleNewPrompt, setShowSidebar }) => {
  const conversations = JSON.parse(localStorage.getItem("conversations")) ?? [];
  return (
    <div className="min-w-[100%] flex flex-col gap-4 ">
      <span
        className="text-white hover:underline md:hidden block cursor-pointer"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        Close history
      </span>
      <div
        className="truncate cursor-pointer w-full p-2 rounded-lg bg-neutral-500 "
        onClick={() => handleNewPrompt()}
      >
        + New Prompt
      </div>
      {conversations.map(({ id, conversation }) => (
        <div
          key={id}
          className="truncate cursor-pointer w-full p-2 rounded-lg bg-neutral-500"
          onClick={() => handleSetConversation(id)}
        >
          {conversation?.[0].prompt}
        </div>
      ))}
    </div>
  );
};

export default index;
