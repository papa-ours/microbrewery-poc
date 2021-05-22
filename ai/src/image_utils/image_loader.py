import base64
import cv2
import numpy as np

class ImageLoader:
    @staticmethod
    def load_image_from_base64(base64_str):
        # Use only the data, not the data URI prefix
        try:
            encoded_data = base64_str.split(',')[1]
        except:
            encoded_data = base64_str
    
        raw_data = base64.b64decode(encoded_data)
        arr = np.frombuffer(raw_data, dtype=np.uint8)
        image = cv2.imdecode(arr, flags=cv2.IMREAD_COLOR)
                
        return image

    @staticmethod
    def image_to_base64(image):
        try:
            raw_data_str = cv2.imencode('.jpg', image)[1].tostring()
            raw_data = base64.b64encode(raw_data_str)
            
            return 'data:image/jpeg;base64,' + raw_data.decode()
        except:
            return ''
