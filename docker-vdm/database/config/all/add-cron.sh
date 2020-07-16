#!/bin/sh
echo "0 1 * * * /bin/sh /scripts/backup.sh" >> /scripts/backup-cron-script
chmod +x /scripts/backup-cron-script
crontab /scripts/backup-cron-script
cron
rm /scripts/backup-cron-script