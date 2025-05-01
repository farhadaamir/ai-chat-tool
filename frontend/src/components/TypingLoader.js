
import React from "react";

function TypingLoader() {
  return (
    <div className="flex justify-start my-2">
      <div className="px-4 py-2 bg-white text-black rounded-lg max-w-md">
        <span className="animate-pulse">Typing...</span>
      </div>
    </div>
  );
}

export default TypingLoader;
