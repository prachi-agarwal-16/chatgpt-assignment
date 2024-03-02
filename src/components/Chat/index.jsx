import React, { useEffect, useRef } from "react";
import Avatar from "react-avatar";

import ChatGpt from "../../assets/icons/chatgpt.svg";

import PulseLoader from "../PulseLoader";

const Index = ({ conversation, isFetchingAnswer, currentPrompt }) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [conversation, isFetchingAnswer]);

  return (
    <div
      className="h-[88vh] overflow-auto p-8 py-16 sm:px-[100px] lg:px-[200px]  flex flex-col gap-8 text-white"
      ref={chatContainerRef}
    >
      {conversation.length > 0
        ? conversation.map((chat) => (
            <AnswerBox
              user={chat.user}
              prompt={chat.prompt}
              answer={chat.answer}
            />
          ))
        : isFetchingAnswer === false &&
          conversation.length === 0 && <NoConversationBox />}
      {isFetchingAnswer && (
        <AnswerBox
          user={"User"}
          prompt={currentPrompt}
          isFetchingAnswer={isFetchingAnswer}
        />
      )}
    </div>
  );
};

export default Index;

const AnswerBox = ({ user, prompt, answer, isFetchingAnswer }) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4 ">
        <div className="mt-2">
          <Avatar name={user} size="35px" textSizeRatio={2} round={true} />
        </div>
        <div>
          <div className="font-bold">{user}</div>
          <div>{prompt}</div>
        </div>
      </div>
      <div className="flex gap-4 ">
        <div className="min-w-[35px]">
          <img
            src={ChatGpt}
            alt="chatgpt icon"
            height={"35px"}
            width={"35px"}
          />
        </div>
        <div>
          <div className="font-bold">Chat GPT</div>
          {isFetchingAnswer ? <PulseLoader /> : <div>{answer}</div>}
        </div>
      </div>
    </div>
  );
};

const NoConversationBox = () => (
  <div className="text-gray-400 text-lg flex flex-col items-center justify-center gap-10 mt-48">
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="min-w-[50px]">
        <img src={ChatGpt} alt="chatgpt icon" height={"50px"} width={"50px"} />
      </div>
      <div className="font-bold text-gray-300">How can I assist you today?</div>
    </div>
    <div>Enter a prompt to start the conversation</div>
  </div>
);
