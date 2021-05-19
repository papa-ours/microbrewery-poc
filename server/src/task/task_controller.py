from task.task_manager import TaskManager

from http import HTTPStatus
from flask import Flask, request, jsonify

class TaskController:
    @classmethod
    def add_routes(cls, app: Flask):
        @app.route('/api/task', methods = ['POST'])
        def create_task():
            image_base64 = request.json.get('image', '')
            
            return jsonify({
                'task_uid': TaskManager.get_instance().create_task(image_base64),
            })

        @app.route('/api/task/<string:uid>', methods = ['GET'])
        def get_task(uid):
            task = TaskManager.get_instance().get_task_by_uid(uid)
            if task is not None:
                return jsonify(task.to_json())
        
            return ''
