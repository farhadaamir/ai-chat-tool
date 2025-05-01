# AI Chat Tool

A web-based chat interface that allows users to interact with all currently available OpenAI and Anthropic models. Supports real-time streaming responses from OpenAI models, and clean, minimalist UI with model switching, system prompts, and input fields.

---

## Features

- Select from handpicked current **OpenAI** and **Anthropic** models.
- Enter a system prompt and user input.
- Real-time streaming for OpenAI models.
- Clean, centered beige UI for minimal distraction.
- Error handling and feedback for failed model responses.

---

## Tech Stack

- **Frontend**: React + TailwindCSS
- **Backend**: Flask (Python)
- **APIs**: OpenAI, Anthropic
- **Environment Management**: dotenv

---

## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/ai-chat-tool.git
cd beige-ai-chat-ui
2. Backend Setup (Flask)
bash
Copy
Edit
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
Create a .env file in the backend directory:

ini
Copy
Edit
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
SECRET_KEY=your-secret-key
Then run the Flask server:

bash
Copy
Edit
python run.py
3. Frontend Setup (React)
bash
Copy
Edit
cd frontend
npm install
npm start
Frontend runs on http://localhost:3000
Backend runs on http://localhost:5000

Notes
Claude models (Anthropic) do not support streaming — responses are shown after full generation.

Make sure you have API access to the models you select.

For OpenAI streaming to work, models like gpt-3.5-turbo, gpt-4, gpt-4o, etc., must be used.

