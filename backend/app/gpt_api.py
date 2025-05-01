import os
from dotenv import load_dotenv
import openai
import anthropic
from anthropic import Anthropic, HUMAN_PROMPT, AI_PROMPT
load_dotenv()


openai.api_key = os.getenv("OPENAI_API_KEY")
anthropic_api_key = os.getenv("ANTHROPIC_API_KEY")

def get_gpt_response(system_prompt, user_input, model):
    try:
        response = openai.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_input},
            ],
            max_tokens=150,
            temperature=0.7,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"OpenAI API error: {e}")
        return f"Error: {str(e)}"

def get_anthropic_response(system_prompt, user_input, model):
    try:
        client = Anthropic(api_key=anthropic_api_key)
        if model.startswith("claude-3"):
            response = client.messages.create(
                model=model,
                max_tokens=1024,
                system=system_prompt,
                messages=[
                    {"role": "user", "content": user_input}
                ]
            )
            return response.content[0].text.strip()

    except Exception as e:
        print(f"Anthropic API error: {e}")
        return f"Error: {str(e)}"