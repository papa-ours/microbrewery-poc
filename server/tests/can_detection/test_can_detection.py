# from unittest import TestCase
# import requests
# import json
# import os
# import base64

# from ..constants import SERVER_URL

# class TestCanDetection(TestCase):
    
#     def setUp(self):
#         pass
    
#     def test_detect_cans(self):
#         image_file = open(os.path.join(os.path.dirname(__file__), 'image.jpeg'), 'rb')
#         raw_data = image_file.read()
#         uri = 'data:image/jpeg;base64,' + base64.b64encode(raw_data).decode('utf-8')
        
#         body = {
#             "image": uri
#         }
#         response = requests.post(f'{SERVER_URL}can/detect', json=body)
#         data = response.json()
        
#         STATUS_CODE = 200
#         NUMBER_OF_CANS = 4
#         CLASS = 'Can'
        
#         self.assertEqual(response.status_code, STATUS_CODE)
#         self.assertTrue(len(data), NUMBER_OF_CANS)
#         self.assertEqual(data[0]['class'], CLASS)
