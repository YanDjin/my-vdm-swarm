sleep 10
mongo --eval 'rs.initiate(
  {
    _id: "configServers",
    configsvr: true,
    members: [
      { _id : 0, host : "vdm-database-configServer1:27017" },
      { _id : 1, host : "vdm-database-configServer2:27017" },
      { _id : 2, host : "vdm-database-configServer3:27017" }
    ]
  }
)'