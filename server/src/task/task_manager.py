from .task import Task

import uuid

class TaskManager:
    __instance = None
    
    @classmethod
    def get_instance(cls):
        if cls.__instance is None:
            cls.__instance = TaskManager()
            
        return cls.__instance
    
    def __init__(self):
        self.__tasks = {}
        
    def create_task(self, image):
        uid = uuid.uuid4().hex
        task = Task(image)
        self.__tasks[uid] = task
        
        return uid

    def get_task_by_uid(self, uid):
        return self.__tasks.get(uid, None)
