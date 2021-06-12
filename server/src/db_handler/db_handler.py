import mysql.connector
import os

class DBHandler:
    db = None
    
    @classmethod
    def get_cursor(cls, **kwargs):
        cls.__reset()

        return cls.db.cursor(**kwargs)
        
    @classmethod
    def __reset(cls):
        if cls.db is None:
            cls.db = mysql.connector.connect(
                host = os.getenv('DB_HOST', 'db'),
                user = os.getenv('DB_USER', 'root'),
                password = os.getenv('DB_ROOT_PASSWORD', 'MicroBrew'),
                database = os.getenv('DB_NAME', 'dev'),
            )

    @classmethod
    def commit(cls):
        cls.__reset()
        cls.db.commit()
