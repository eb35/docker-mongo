# Mongo (is just pawn in game of life)

Following steps in [Nana's video](https://www.youtube.com/watch?v=3c-iBn73dDE).

Beginning with using `docker run` commands to build containers. See below.

#1 Create the network
```
docker run -d
	-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin
	-e ME_CONFIG_MONGODB_ADMINPASSWORD=password
	--net mongo-network
```

#2 Start the MongoDB container (to store the data)
```
docker run -p 27017:27017 -d
	-e MONGO_INITDB_ROOT_USERNAME=admin
	-e MONGO_INITDB_ROOT_PASSWORD=password
	--name mongodb
	--net mongo-network
	mongo
```

#3 Start the MongoExpress container (to view the data)
```
docker run -d
	-p 8081:8081
	-e ME_CONFIG_MONGODB_SERVER="mongodb"
	-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin
	-e ME_CONFIG_MONGODB_ADMINPASSWORD=password
	--net mongo-network
	--name mongoexpress
	mongo-express
```

Next steps will be simplifying my container creation