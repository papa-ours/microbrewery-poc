from unittest import TestCase
import requests
import json
import os
import base64

from ..constants import SERVER_URL

class TestTask(TestCase):
    
    def setUp(self):
        pass
    
    def test_create_task(self):
        image_file = open(os.path.join(os.path.dirname(__file__), 'image.jpeg'), 'rb')
        raw_data = image_file.read()
        uri = 'data:image/jpeg;base64,' + base64.b64encode(raw_data).decode('utf-8')
        
        body = {
            "image": uri
        }
        response = requests.post(f'{SERVER_URL}task/create', json=body)
        data = response.text
        
        EXPECTED_LENGTH = 32
        
        self.assertEqual(len(data), EXPECTED_LENGTH)
