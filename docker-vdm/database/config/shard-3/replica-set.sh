sleep 15
mongo --eval 'rs.initiate(
  {
    _id: "shard3servers",
    members: [
      { _id : 0, host : "vdm-database-shard3server1:27017" },
      { _id : 1, host : "vdm-database-shard3server2:27017" },
      { _id : 2, host : "vdm-database-shard3server3:27017" }
    ]
  }
)'