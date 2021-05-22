from .can_detector import CanDetector
from image_utils.image_loader import ImageLoader

from http import HTTPStatus
from flask import Flask, request, jsonify

class CanDetectionController:
    @classmethod
    def add_routes(cls, app: Flask):
        CanDetector.load()
    
        @app.route('/api/can/detect', methods = ['GET', 'POST'])
        def detect_cans():
            image_data = request.json.get('image', '')
            image = ImageLoader.load_image_from_base64(image_data)
            
            return jsonify(CanDetector.detect(image))
