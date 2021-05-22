from flask import Flask, request, jsonify
import requests

class TaskController:
    @classmethod
    def add_routes(cls, app: Flask):
        @app.route('/api/task', methods = ['POST'])
        def create_task():
            response = requests.post('http://ai/api/task', json=request.json)

            return response.json()
            
        @app.route('/api/task/<string:uid>', methods = ['GET'])
        def get_task(uid):
            response =  requests.get(f'http://ai/api/task/{uid}')
            
            return response.json()
