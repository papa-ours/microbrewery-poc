from flask import Flask
from task.task_controller import TaskController

class Router:
    def __init__(self, app: Flask):
        @app.route('/api')
        def hello():
            return 'Hello World!'
        
        TaskController.add_routes(app)
