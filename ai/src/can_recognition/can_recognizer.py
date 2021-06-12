import cv2
import numpy as np
import os
import glob
from collections import Counter
from .can_data import CanData

from can_detection.can_detector import CanDetector

class NoMatchFoundException(Exception):
    pass

class NoCanFoundException(Exception):
    pass

class CanRecognizer:
    KEYPOINTS_FOLDER = 'sift_keypoints'
    keypoints = {}
    
    @classmethod
    def load(cls):
        CanData.load()
        CanDetector.load()
        
        keypoints_folder = os.path.join(os.path.dirname(__file__), cls.KEYPOINTS_FOLDER)
        for filename in glob.glob(os.path.join(keypoints_folder, '*.txt')):
            uid = filename.split(keypoints_folder + '/')[1].split('.txt')[0]
            cls.keypoints[uid] = np.loadtxt(filename).astype(np.float32)
        
    @classmethod
    def get_keypoints(cls, image):
        image = cv2.resize(image, (416, 416))
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        sift = cv2.SIFT_create()
        
        return sift.detectAndCompute(gray, None)[1]    
    
    @classmethod
    def get_match(cls, query_image):
        kp = cls.get_keypoints(query_image)
        
        # Empty best match for every keypoint
        best_match = [(None, -1)] * kp.shape[0]

        for k in cls.keypoints:
            try:
                bf = cv2.BFMatcher(cv2.NORM_L2, crossCheck=False)
                matches = bf.knnMatch(kp, cls.keypoints[k], k=1)
                
                for i in range(kp.shape[0]):
                    dist = matches[i][0].distance
                    if best_match[i][1] == -1 or dist < best_match[i][1]:
                        best_match[i] = (k, dist)
            except:
                pass
        
        match_uids = [m[0] for m in best_match]
        counter = Counter(match_uids)
        N = 2
        most_common = counter.most_common(N)
        threshold = 0.8

        if most_common[1][1] / most_common[0][1] > threshold:
            raise NoMatchFoundException('No match')
        
        return most_common[0][0]
