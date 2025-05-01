from flask import Blueprint, request, jsonify, render_template, Response, stream_with_context
from .gpt_api import get_gpt_response, get_anthropic_response
import openai


main_bp = Blueprint('main', __name__)

@main_bp.route("/")
def home():
    print("Home route accessed")
    return render_template("index.html")

@main_bp.route("/ask", methods=["POST"])
def ask():
    data = request.json
    print(f"Received request at /ask: {data}")  

    model = data.get("model")
    system_prompt = data.get("systemPrompt")
    user_input = data.get("input")

    if not all([model, system_prompt, user_input]):
        print("Error: Missing required fields") 
        return jsonify({"error": "Missing required fields"}), 400

    valid_models = [
    "gpt-3.5-turbo",
    "gpt-3.5-turbo-16k",
    "gpt-4",
    "gpt-4-turbo",
    "gpt-4o",
    "gpt-4o-mini",
    "o1",
    "o3-mini",
    "o4-mini",
    "claude-3-5-haiku-20241022",
    "claude-3-5-sonnet-20241022",
    "claude-3-5-sonnet-20240620",
    "claude-3-haiku-20240307",
    "claude-3-7-sonnet-20250219",
    "claude-3-opus-20240229"
]

    if model not in valid_models:
        print(f"Error: Unsupported model {model}") 
        return jsonify({"error": f"Unsupported model: {model}"}), 400

    response = get_gpt_response(system_prompt, user_input, model)
    print(f"GPT Response: {response}")  
    return jsonify({"response": response})

@main_bp.route("/ask_anthropic", methods=["POST"])
def ask_anthropic():
    data = request.json
    print(f"Received request at /ask_anthropic: {data}") 

    model = data.get("model")
    system_prompt = data.get("systemPrompt")
    user_input = data.get("input")

    if not all([model, system_prompt, user_input]):
        print("Error: Missing required fields") 
        return jsonify({"error": "Missing required fields"}), 400

    response = get_anthropic_response(system_prompt, user_input, model)
    print(f"Anthropic Response: {response}")  
    return jsonify({"response": response})


@main_bp.route("/ask_stream", methods=["POST"])
def ask_stream():
    data = request.json
    model = data.get("model")
    system_prompt = data.get("systemPrompt")
    user_input = data.get("input")

    def generate():
        try:
            stream = openai.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_input},
                ],
                stream=True,
            )
            for chunk in stream:
                delta = chunk.choices[0].delta
                content = getattr(delta, "content", "")
                if content:
                    print("Chunk:", content)
                    yield content
        except Exception as e:
            print("Streaming error:", e)
            yield f"[STREAM ERROR] {str(e)}"


    return Response(stream_with_context(generate()), content_type="text/plain")
