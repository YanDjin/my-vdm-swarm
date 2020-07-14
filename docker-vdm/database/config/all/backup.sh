#!/bin/sh
mongo --eval "db.fsyncLock()"
tar -zcvf /backup/"$(date '+%Y-%m-%d').tar.gz" /data/db
mongo --eval "db.fsyncUnlock()"