import os
import torch
from flask import request

class CanDetector:
    MODEL_FILE_NAME = 'can_detection_model.pt'
    model = None
    
    @classmethod
    def load(cls):
        if cls.model == None:
            model_path = os.path.join(os.path.dirname(__file__), cls.MODEL_FILE_NAME)
            cls.model = torch.hub.load('ultralytics/yolov5', 'custom', path=model_path)

    @classmethod
    def parse_detections(cls, detections):
        parsed = []
        for pred in detections.pred:
            # xyxy, confidence, class
            for *box, conf, pred_class in pred:
                parsed.append({
                    'x1': int(box[0]),
                    'y1': int(box[1]),
                    'x2': int(box[2]),
                    'y2': int(box[3]),
                    'confidence': float(conf),
                    'class': detections.names[int(pred_class)],
                })
        
        return parsed
    
    @classmethod
    def detect(cls, image):
        return CanDetector.parse_detections(cls.model(image))

    @classmethod
    def get_region(cls, d, im):
        return im[d['y1']:d['y2'], d['x1']:d['x2']]

    @classmethod
    def extract_cans(cls, image):
        detections = cls.detect(image)

        return sorted(detections, key=lambda d: d['confidence'], reverse=True)
