FROM python:3.8

COPY ./src /usr/src/ai/src
COPY ./requirements.txt /usr/src/ai/

WORKDIR /usr/src/ai/

RUN pip install -r ./requirements.txt
RUN apt-get upgrade
RUN apt update && apt install -y libsm6 libxext6 ffmpeg libfontconfig1 libxrender1 libgl1-mesa-glx

CMD [ "python", "./src/main.py" ]