# Mongo (is just pawn in game of life)

Following steps in [Nana's video](https://www.youtube.com/watch?v=3c-iBn73dDE).

# Phase 1
Beginning with using `docker run` commands to build containers. See below.

#1 Create the network
```
docker network create mongo-network
```

#2 Start the MongoDB container (to store the data)
```
docker run -d
	-p 27017:27017
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

# Phase 2
Now we no longer need to run `docker run` commands. We have built a docker-compose file that handles all of that configuration.

All that we have to do is run the following command:
```
docker-compose up
```
And we will be up and running just like before.

# Next
Next we'll move the NodeJS app in and do some other things. But my next goal will be understand volumes, so I don't lose my db everytime.