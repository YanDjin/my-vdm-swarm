FROM mongo

RUN apt-get update && apt install cron -y

RUN mkdir /scripts

COPY ./config/all/* /scripts/

RUN chmod +x /scripts/backup.sh

RUN /bin/sh /scripts/add-cron.sh