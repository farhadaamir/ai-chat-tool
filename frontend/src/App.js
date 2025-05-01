// src/App.js
import React, { useEffect, useRef, useState } from "react";
import ChatBubble from "./components/ChatBubble";
import ChatInput from "./components/ChatInput";
import { askModel, askModelStream } from "./api";

function App() {
  const [messages, setMessages] = useState([]);
  const [model, setModel] = useState("gpt-4o");
  const [systemPrompt, setSystemPrompt] = useState("You are a helpful assistant.");
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages([...newMessages, { role: "assistant", content: "" }]);
    setLoading(true);
    setIsTyping(true);
    setInput("");

    let accumulated = "";
    try {
      if (model.startsWith("claude")) {
        const res = await askModel(model, systemPrompt, input);
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "assistant", content: res }
        ]);
      } else {
        await askModelStream(model, systemPrompt, input, (chunk) => {
          accumulated += chunk;
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "assistant", content: accumulated };
            return updated;
          });
          setIsTyping(false);
        });
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: "Streaming failed." }
      ]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen bg-[#f5f0e6] text-black flex flex-col items-center">
      <div className="w-full max-w-3xl flex flex-col h-full">
        <div className="p-4 border-b bg-white">
          <form className="flex flex-wrap gap-4 items-center justify-center">
            <select
              className="border rounded p-2"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
              <option value="gpt-3.5-turbo-16k">gpt-3.5-turbo-16k</option>
              <option value="gpt-4">gpt-4</option>
              <option value="gpt-4-turbo">gpt-4-turbo</option>
              <option value="gpt-4o">gpt-4o</option>
              <option value="gpt-4o-mini">gpt-4o-mini</option>
              <option value="o1">o1</option>
              <option value="o3-mini">o3-mini</option>
              <option value="o4-mini">o4-mini</option>
              <option value="claude-3-5-haiku-20241022">claude-3.5-haiku</option>
              <option value="claude-3-5-sonnet-20241022">claude-3.5-sonnet</option>
              <option value="claude-3-5-sonnet-20240620">claude-3.5-sonnet (June)</option>
              <option value="claude-3-haiku-20240307">claude-3-haiku</option>
              <option value="claude-3-7-sonnet-20250219">claude-3.7-sonnet</option>
              <option value="claude-3-opus-20240229">claude-3-opus</option>
            </select>
            <input
              className="flex-1 border p-2 rounded max-w-lg"
              placeholder="System prompt"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
            />
          </form>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center">
          {messages.map((msg, idx) => (
            <div key={idx} className="w-full max-w-lg">
              <ChatBubble role={msg.role} content={msg.content} />
            </div>
          ))}
          
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSend} className="flex p-4 bg-[#f5f0e6] border-t border-gray-300 justify-center">
          <input
            className="flex-1 p-2 border rounded-lg border-gray-400 max-w-lg"
            placeholder="Hi NAVI, How can I help?"
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
      </div>
    </div>
  );
}

export default App;

