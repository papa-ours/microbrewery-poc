from .task_result import TaskResult
from image_utils.image_loader import ImageLoader
from can_detection.can_detector import CanDetector
from can_recognition.can_recognizer import CanRecognizer
from can_recognition.can_data import CanData

from enum import Enum
from multiprocessing import Process

class TaskState(Enum):
    PENDING = 'pending'
    LOADING = 'loading'
    DONE = 'done'
    
class Task:
    
        
    CONFIDENECE_THRESHOLD = 0.76
    
    def __init__(self, image_base64):
        self.image_base64 = image_base64
        self.results = []
        self.state = TaskState.PENDING

        self.start()
        
    def start(self):
        self.process()
    #     process = Process(target=self.__process, args=(self,))
    #     process.start()
        
    def process(self):
        self.state = TaskState.LOADING
        image = ImageLoader.load_image_from_base64(self.image_base64)
        detections = CanDetector.extract_cans(image)
        for detection in detections:
            try:
                if detection['confidence'] > Task.CONFIDENECE_THRESHOLD:
                    detection_image = CanDetector.get_region(detection, image)
                    can_uid = CanRecognizer.get_match(detection_image)
                    can = CanData.get_beer_by_uid(can_uid)
                    
                    encoded_image = ImageLoader.image_to_base64(detection_image)
                    result = TaskResult(detection, can, encoded_image)
                    
                    self.results.append(result)
            except Exception as e:
                print(e)
                
        self.state = TaskState.DONE

    def to_json(self):
        return {
            'image': 'data:image/jpeg;base64,' + self.image_base64,
            'results': [result.to_json() for result in self.results],
            'state': self.state.name,
        }
