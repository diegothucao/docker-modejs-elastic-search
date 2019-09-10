# Nginx, Docker, NodeJS/ Express, ElasticSearch and Kibana

This is an essential example to build docker with ElasticSearch, Kibana and NodeJS/ Express.

Step to run
1. Clone the [repo](https://github.com/diegothucao/docker-modejs-elastic-search)
2. Run development mode `docker-compose up --build`. (Can consider to delete all containers and images for sure by `rm $(docker ps -aq) -f` and `rm $(docker images -a -q) -f` before running `docker-compose up --build`).
3. Open [localhost](http://localhost:9200) to see if ElasticSearch works
4. If it works then open source code folder, open terminal (command) then `cd` to `data` folder 
5. Run Bulk `curl -H 'Content-Type: application/x-ndjson' -XPOST 'localhost:9200/bank/account/_bulk?pretty' --data-binary @accounts.json` to import test data to ElasticSearch
6. Run open browser `http://localhost/states/CA`, it searches state by `CA`, `CA` can be replaced by another text.

Create docker-compose

```javascript 
version: '3.7'
services:
  diego-elasticsearch-nginx:
    container_name: diego-elasticsearch-nginx
    build:
      dockerfile: Dockerfile
      context: ./nginx
    ports:
      - "80:80"
    networks:
      - diego

  diego-elasticsearch-server:
    build:
      context: .
      dockerfile: ./Dockerfile
    container_name: diego-elasticsearch-server
    restart: always
    ports:
      - "8080:8080"
    volumes:
      - .:/diego
    tty: true
    environment:
      PORT: 8080
    networks:
      - diego

  diego-elasticsearch:
    restart: always
    image: docker.elastic.co/elasticsearch/elasticsearch:7.3.1
    container_name: diego-elasticsearch
    environment:
      - node.name=diego-elasticsearch
      - discovery.seed_hosts=diego-elasticsearch-second
      - cluster.initial_master_nodes=diego-elasticsearch,diego-elasticsearch-second
      - cluster.name=docker-cluster
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - esdata01:/usr/share/elasticsearch/data
    ports:
      - 9200:9200
    networks:
      - diego
  
  diego-elasticsearch-second:
    restart: always
    image: docker.elastic.co/elasticsearch/elasticsearch:7.3.1
    container_name: diego-elasticsearch-second
    environment:
      - node.name=diego-elasticsearch-second
      - discovery.seed_hosts=diego-elasticsearch
      - cluster.initial_master_nodes=diego-elasticsearch,diego-elasticsearch-second
      - cluster.name=docker-cluster
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - esdata02:/usr/share/elasticsearch/data
    networks:
      - diego

  diego-kibana:
    restart: always
    container_name: diego-kibana
    image: docker.elastic.co/kibana/kibana:7.3.1
    ports:
      - "5601:5601"   
    networks:
      - diego
    environment:
      ELASTICSEARCH_HOSTS: http://diego-elasticsearch:9200

volumes:
  esdata01:
    driver: local
  esdata02:
    driver: local

networks:
  diego:
    driver: bridge
```

And Simple NodeJS if needed 
```Javascript 
import cors from 'cors'
import { urlencoded, json } from 'body-parser'
import dotenv from 'dotenv'
import express from 'express'

dotenv.load()

const app = express()
app.use(urlencoded({ extended: true, limit: '500mb'}))
app.use(json({ extended: true, limit: '500mb'}))
app.use(cors())

app.get('/', (_, res) => {
	res.send('Diego Cao: Hello')
  })

let server = app.listen(process.env.PORT || 8080)
server.setTimeout(500000)
```

If you see any issue, please do not hesitate to create an issue here or can contact me via email cao.trung.thu@gmail.com or [Linkedin](https://www.linkedin.com/in/diegothucao/)

Thanks
	
references
 1. https://docs.docker.com/install/
 2. https://www.elastic.co


