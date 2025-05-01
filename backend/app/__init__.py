from flask import Flask
from flask_cors import CORS
from .config import SECRET_KEY

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.secret_key = SECRET_KEY

    from .routes import main_bp
    app.register_blueprint(main_bp)

    return app