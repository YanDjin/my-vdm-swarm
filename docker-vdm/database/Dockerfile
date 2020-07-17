FROM mongo

RUN apt-get update && apt install cron -y

RUN pwd

COPY ./config/scripts ./scripts

RUN chmod -R 777 ./scripts