mongo --eval 'rs.initiate(
  {
    _id: "shard1servers",
    configsvr: true,
    members: [
      { _id : 0, host : "vdm-database-shard1server1:27017" },
      { _id : 1, host : "vdm-database-shard1server2:27017" },
      { _id : 2, host : "vdm-database-shard1server3:27017" }
    ]
  }
)'