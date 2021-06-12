from flask import Flask, json, request, jsonify
from .login_service import LoginService

class LoginController:
    @classmethod
    def add_routes(cls, app: Flask):
        @app.route('/api/user/login', methods = ['POST'])
        def login():
            credentials = {
                'username': request.json.get('username', ''),
                'password': request.json.get('password', ''),
            }

            result = LoginService.login(**credentials)
            
            return jsonify(result), 200 if result['error'] is None else 400

        @app.route('/api/user/signup', methods = ['POST'])
        def sign_up():
            result = LoginService.signup(request.json)
            
            return jsonify(result), 200 if result['error'] is None else 400
