sleep 15
mongo --eval 'rs.initiate(
  {
    _id: "shard2servers",
    members: [
      { _id : 0, host : "vdm-database-shard2server1:27017" },
      { _id : 1, host : "vdm-database-shard2server2:27017" },
      { _id : 2, host : "vdm-database-shard2server3:27017" }
    ]
  }
)'