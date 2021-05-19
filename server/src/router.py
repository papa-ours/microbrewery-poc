from flask import Flask
from can_detection.can_detection_controller import CanDetectionController
from can_recognition.can_recognition_controller import CanRecognitionController
from task.task_controller import TaskController

class Router:
    def __init__(self, app: Flask):
        @app.route('/api')
        def hello():
            return 'Hello World!'
        
        CanDetectionController.add_routes(app)
        CanRecognitionController.add_routes(app)
        TaskController.add_routes(app)
