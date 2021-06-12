from db_handler.db_handler import DBHandler
from passlib.context import CryptContext
import uuid

class LoginException(Exception):
    pass

class LoginService:
    __pwd_context = None
    USER_REQUIRED_FIELDS = ['Username', 'Password', 'FirstName', 'LastName', 'Email']

    @classmethod
    def __get_pwd_context(cls):
        if not cls.__pwd_context:
            cls.__pwd_context = CryptContext(
                schemes=["pbkdf2_sha256"],
                default="pbkdf2_sha256",
                pbkdf2_sha256__default_rounds=30000
            )
        
        return cls.__pwd_context

    @classmethod
    def __get_user(cls, username):
        cursor = DBHandler.get_cursor(dictionary=True)

        user_query = f'SELECT Username, Password FROM User WHERE Username="{username}"'
        cursor.execute(user_query)
        
        return cursor.fetchone()

    @classmethod
    def login(cls, username = '', password = ''):
        if not username or not password:
            return {
                'success': False,
                'error': 'No usename or password received',
            }
        
        try:
            user = cls.__get_user(username)
            if not user:
                raise LoginException('Username does not match any user')

            success = cls.__get_pwd_context().verify(password, user['Password'])
            if not success:
                raise LoginException('Password does not match user password')

            return {
                'success': True,
                'error': None,
            }
        except LoginException as e: 
            return {
                'success': False,
                'error': str(e),
            }
        except Exception as e: 
            return {
                'success': False,
                'error': str(e),
            }

    @classmethod
    def __validate_user(cls, user):
        not_present_fields = list(filter(lambda f: f not in user, cls.USER_REQUIRED_FIELDS))

        if len(not_present_fields):
            return ', '.join(not_present_fields) + ' are required'

        MIN_PASSWORD_LEN = 8
        MAX_PASSWORD_LEN = 32

        password = user['Password']
        if len(password) < MIN_PASSWORD_LEN:
            return f'Password must be at least {MIN_PASSWORD_LEN} characters long'
        elif len(password) > MAX_PASSWORD_LEN:
            return f'Password must be at most {MAX_PASSWORD_LEN} characters long'

        MAX_USERNAME_LEN = 24
        MIN_USERNAME_LEN = 1

        username = user['Username']
        if len(username) < MIN_USERNAME_LEN:
            return f'Username must be at least {MIN_USERNAME_LEN} characters long'
        elif len(username) > MAX_USERNAME_LEN:
            return f'Username must be at most {MAX_USERNAME_LEN} characters long'
        elif not username.isalnum():
            return 'Username must be alpha numeric characters only'

    @classmethod
    def __create_user(cls, user):
        user['uid'] = uuid.uuid4().hex
        user['Password'] = cls.__get_pwd_context().encrypt(user['Password'])

        fields = 'uid,' + ','.join(cls.USER_REQUIRED_FIELDS)

        values = f'"{user.get("uid")}",'
        values += ','.join([f'"{user.get(field)}"' for field in cls.USER_REQUIRED_FIELDS])

        query = f'INSERT INTO User ({fields}) VALUES ({values})'
        print(query)
        cursor = DBHandler.get_cursor()
        cursor.execute(query)
        DBHandler.commit()

    @classmethod
    def signup(cls, user):
        error = cls.__validate_user(user)
        if error:
            return {
                'success': False,
                'error': error,
            }

        cls.__create_user(user)
        
        return {
            'success': True,
            'error': None,
        }