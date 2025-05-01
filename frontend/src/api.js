export const askModel = async (model, systemPrompt, input) => {
  const res = await fetch("http://localhost:5000/" + (model.startsWith("claude") ? "ask_anthropic" : "ask"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, systemPrompt, input }),
  });

  const data = await res.json();
  if (data.response) return data.response;
  else throw new Error("Failed to fetch response");
};
//for streaming purposes
export const askModelStream = async (model, systemPrompt, input, onChunk) => {
  const res = await fetch("http://localhost:5000/ask_stream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, systemPrompt, input }),
  });

  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let done = false;
  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;
    const chunk = decoder.decode(value);
    onChunk(chunk);
  }
};
