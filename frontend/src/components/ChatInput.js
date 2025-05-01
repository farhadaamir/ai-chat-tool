
import React, { useState } from "react";

function ChatInput({ input, setInput, handleSend }) {
  return (
    <form onSubmit={handleSend} className="flex p-4 bg-[#f5f0e6] border-t border-gray-300">
      <input
        className="flex-1 p-2 border rounded-lg border-gray-400"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 rounded bg-[#d9cbb2] hover:bg-[#cbbca5]"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
