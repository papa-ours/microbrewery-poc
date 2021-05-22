FROM python:3.8

COPY ./src /usr/src/server/src
COPY ./requirements.txt /usr/src/server/

WORKDIR /usr/src/server/

EXPOSE 5001

RUN pip install -r ./requirements.txt

CMD [ "python", "./src/main.py" ]