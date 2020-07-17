sleep 15
mongo --eval 'rs.initiate(
  {
    _id: "configServers",
    configsvr: true,
    members: [
      { _id : 0, host : "vdm_vdm-database-configServer.1:27017" },
      { _id : 1, host : "vdm_vdm-database-configServer.2:27017" },
      { _id : 2, host : "vdm_vdm-database-configServer.3:27017" }
    ]
  }
)'