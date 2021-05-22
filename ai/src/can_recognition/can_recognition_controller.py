from .can_recognizer import CanRecognizer
from image_utils.image_loader import ImageLoader

from http import HTTPStatus
from flask import Flask, request, jsonify

class CanRecognitionController:
    @classmethod
    def add_routes(cls, app: Flask):
        CanRecognizer.load()
    
        @app.route('/api/can/recognize', methods = ['GET', 'POST'])
        def recognize_can():
            try:
                image_data = request.json.get('image', '')
                image = ImageLoader.load_image_from_base64(image_data)
                
                return jsonify({
                    'can': CanRecognizer.get_match(image),
                }), 200
            except Exception as e:
                return jsonify({
                    'error': str(e)
                }), 200
