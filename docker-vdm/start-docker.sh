#!//bin//sh
docker-compose up -d

docker exec vdm-database-configServer1 //bin//sh -c "/docker-entrypoint-initdb.d/replica-set.sh" & \
docker exec vdm-database-shard1server1 //bin//sh -c "/docker-entrypoint-initdb.d/replica-set.sh" & \
docker exec vdm-database-shard2server1 //bin//sh -c "/docker-entrypoint-initdb.d/replica-set.sh" & \
docker exec vdm-database-shard3server1 //bin//sh -c "/docker-entrypoint-initdb.d/replica-set.sh" & \
docker exec vdm-database-mongos //bin//sh -c "/docker-entrypoint-initdb.d/add-shards.sh" &

docker exec vdm-database-configServer1 //bin//sh -c "cron"
docker exec vdm-database-configServer2 //bin//sh -c "cron"
docker exec vdm-database-configServer3 //bin//sh -c "cron"
docker exec vdm-database-shard1server1 //bin//sh -c "cron"
docker exec vdm-database-shard1server2 //bin//sh -c "cron"
docker exec vdm-database-shard1server3 //bin//sh -c "cron"
docker exec vdm-database-shard2server1 //bin//sh -c "cron"
docker exec vdm-database-shard2server2 //bin//sh -c "cron"
docker exec vdm-database-shard2server3 //bin//sh -c "cron"
docker exec vdm-database-shard3server1 //bin//sh -c "cron"
docker exec vdm-database-shard3server2 //bin//sh -c "cron"
docker exec vdm-database-shard3server3 //bin//sh -c "cron"
docker exec vdm-database-mongos //bin//sh -c "cron"