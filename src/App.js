import Input from "./components/Input";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import "./App.css";
import { useState } from "react";
import { dummyData } from "./data";
import Menu from "./assets/icons/menu.svg";

function App() {
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [isFetchingAnswer, setIsFetchingAnswer] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const getAnswer = async () => {
    setIsFetchingAnswer(true);

    setTimeout(() => {
      const randomAnswer =
        dummyData[Math.floor(Math.random() * dummyData.length)];

      const conversationsFromLocalStorage =
        localStorage.getItem("conversations");

      const parsedConversations = conversationsFromLocalStorage
        ? JSON.parse(conversationsFromLocalStorage)
        : [];

      if (conversation.length === 0) {
        const randomId = Math.floor(Math.random() * 100000);
        setCurrentConversationId(randomId);
        localStorage.setItem(
          "conversations",
          JSON.stringify([
            ...parsedConversations,
            {
              id: randomId,
              conversation: [
                {
                  user: "User",
                  prompt,
                  answer: randomAnswer.answer,
                },
              ],
            },
          ])
        );
      } else {
        if (conversationsFromLocalStorage) {
          const foundConversationIndex =
            parsedConversations.findIndex(
              (conversation) => conversation.id === currentConversationId
            ) ?? -1;

          if (foundConversationIndex !== -1) {
            parsedConversations.splice(foundConversationIndex, 1);
            localStorage.setItem(
              "conversations",
              JSON.stringify([
                ...parsedConversations,
                {
                  id: currentConversationId,
                  conversation: [
                    ...conversation,
                    {
                      user: "User",
                      prompt,
                      answer: randomAnswer.answer,
                    },
                  ],
                },
              ])
            );
          }
        }
      }

      setIsFetchingAnswer(false);
      setConversation((prev) => [
        ...prev,
        {
          user: "User",
          prompt,
          answer: randomAnswer.answer,
        },
      ]);
      setPrompt("");
    }, 3000);
  };

  const handleSetConversation = (id) => {
    const conversations =
      JSON.parse(localStorage.getItem("conversations")) ?? [];

    const foundConversation = conversations.find(
      (conversation) => conversation.id === id
    );
    if (foundConversation) {
      setConversation(foundConversation.conversation);
    }
  };

  const handleNewPrompt = () => {
    setPrompt("");
    setConversation([]);
    setIsFetchingAnswer(false);
    setCurrentConversationId(null);
  };

  return (
    <div className="w-[100vw] h-[100vh] flex relative ">
      {showSidebar && (
        <div
          className="absolute w-[25px] h-[25px] left-5  top-5 md:hidden block cursor-pointer"
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          <img src={Menu} alt="menu icon" width={"25px"} height="25px" />
        </div>
      )}
      <div
        className={
          "min-w-[200px] h-full bg-neutral-700 border-box p-2   " +
          (!showSidebar ? "" : "md:block hidden")
        }
      >
        <Sidebar
          setShowSidebar={setShowSidebar}
          handleSetConversation={handleSetConversation}
          handleNewPrompt={handleNewPrompt}
        />
      </div>
      <div className="md:w-[85vw] w-[100vw]">
        <Chat
          conversation={conversation}
          isFetchingAnswer={isFetchingAnswer}
          currentPrompt={prompt}
        />
        <Input
          prompt={prompt}
          isFetchingAnswer={isFetchingAnswer}
          onChange={(e) => setPrompt(e.target.value)}
          handleSubmit={() => {
            if (prompt.length === 0) return;
            getAnswer();
          }}
        />
      </div>
    </div>
  );
}

export default App;
