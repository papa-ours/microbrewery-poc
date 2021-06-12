import csv
import os

class CanData:
    FILENAME = 'final_beers.txt'
    beers = {}
    
    @classmethod
    def load(cls):
        with open(os.path.join(os.path.dirname(__file__), cls.FILENAME), 'r') as csvfile:
            reader = csv.DictReader(csvfile)
            for beer in reader:
                cls.beers[beer['uid']] = beer
    
    @classmethod
    def get_beer_by_uid(cls, uid):
        return cls.beers.get(uid, None)
