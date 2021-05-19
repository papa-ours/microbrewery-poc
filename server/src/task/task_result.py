class TaskResult:
    def __init__(self, detection, can, image):
        self.detection = detection
        self.can = can
        self.image = image
    
    def to_json(self):
        return {
            'detection': self.detection,
            'can': self.can,
            'image': self.image,
        }
