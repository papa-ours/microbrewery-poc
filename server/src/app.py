from router import Router

from flask import Flask
from flask_cors import CORS

class App:
    def __init__(self, app):
        self.app = app
        CORS(self.app)
        Router(self.app)

    def run(self, debug: bool = True, host=None, port=None):
        self.app.debug = debug
        self.app.run(host=host, port=port)
