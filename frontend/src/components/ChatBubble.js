
import React from "react";

function ChatBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}>
      <div className={`max-w-md p-3 rounded-lg shadow ${isUser ? "bg-[#e0d6c5]" : "bg-white"} text-black`}>
        {content}
      </div>
    </div>
  );
}

export default ChatBubble;
