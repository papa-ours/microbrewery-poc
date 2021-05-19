from flask import Flask
from time import sleep

if __name__ == "__main__":

    flask_app = Flask(__name__)

    from app import App
    main_app = App(flask_app)

    main_app.run(host="0.0.0.0", port=5001)
