# README #

# Introduction #

* Crime Alert Application | Back-end, postgres and email components 

# Setup #

## Install and initialize node
* npm install
* npm start
* separate package.json files for node-server and mail-server

## Install and initialize postgres
* Database: crime_alert_db
* Collections: incidents, users


# Run in development mode #

Check all possible endpoints in swagger: 
* http://localhost:8000/api-docs/#/
* http://localhost:8000/api

## Users endpoints
* http://localhost:8000/api/users/addUser
* http://localhost:8000/api/users/loginUser
* http://localhost:8000/api/users/logoutUser
* http://localhost:8000/api/users/modifyUserInfo
* http://localhost:8000/api/users/deleteUser

## Incidents endpoints
* http://localhost:8000/api/incidents/addIncident
* http://localhost:8000/api/incidents/modifyIncident
* http://localhost:8000/api/incidents/validateIncident
* http://localhost:8000/api/incidents/myIncidents
* http://localhost:8000/api/incidents/findIncidentBySeverity
* http://localhost:8000/api/incidents/findIncidentByLocation
* http://localhost:8000/api/incidents/findIncidentByTimestamp

## Examples for pagination
* http://localhost:8000/api/incidents/myIncidents --> this one uses the default values page = 1, limit = 10
* http://localhost:8000/api/incidents/myIncidents?page=1&limit=5 --> return incidents 1-5
* http://localhost:8000/api/incidents/myIncidents?page=2&limit=5 --> returns incidents 6-10
* http://localhost:8000/api/incidents/myIncidents?page=3&limit=5  --> returns incidents 11-15

## Examples for filtering
* http://localhost:8000/api/incidents/showAll?severity=Minor
* http://localhost:8000/api/incidents/showAll?severity=Major&page=1&limit=10
* http://localhost:8000/api/incidents/showAll?page=1&limit=10&severity=Major&startDate=2024-01-01&endDate=2025-12-31

## Example for map endpoint
* http://localhost:8000/api/incidents/map?north=38.05&south=37.90&east=23.80&west=23.60
* http://localhost:8000/api/incidents/map?north=38.05&south=37.90&east=23.80&west=23.60&severity=Major
* http://localhost:8000/api/incidents/map?north=38.05&south=37.90&east=23.80&west=23.60&from=2025-01-01&to=2025-04-20&verify_status=Unverified&limit=2

## Info pages endpoints
* http://localhost:8000/organization
* http://localhost:8000/api/contact
* http://localhost:8000/termsOfUse
* http://localhost:8000/privacyPolicy

## Email server endpoint
* /notifyUser
* Require: nodemailer
* Service: gmail
* Node server triggers email with required information through endpoint

* Sender: crime.alert.hua@protonmail.com 
* Receiver: citizen's registration email

## Accounts created
* crime.alert.hua@protonmail.com
* crime.police.hua@protonmail.com
* crime.alert.user.hua@proton.me
* crime.alert.user2.hua@proton.me

# Postgres #
* username: postgres, password: postges
* port number: 5432


# Run the app in production mode #

# Node-server #

## Create docker image from specific Dockerfile and tag it with a name
* docker build -f nodeServer.Dockerfile . --tag node-server

## Create container from specific image
* docker run --name node-server-container -p 8000:8000 -d node-server

## Check that localhost:8000 is reachable
* curl localhost:8000

## Get into container
* docker exec -it node-server-container bash

# Postgres #

## Create docker image
* docker build -f postgres.Dockerfile -t postgres-docker .

## Create container from specific image
* docker run --name postgres-docker -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres

## Launch the psql utility
* psql -d postgres -h localhost -p 5432 -U postgres

## Launch an interactive shell inside our container
* docker exec -it postgres-docker psql -U postgres
* \l --> list all databases
* \c crime_alert_db --> connect to crime_alert_db
* \d --> show all tables
* \d incidents --> show applications table schema
* \dy  --> show types
* SELECT * FROM users;
* SELECT * FROM incidents;

# Mail server #

## Create docker image from specific Dockerfile and tag it with a name
* docker build -f mailServer.Dockerfile . --tag mail-server

## Create container from specific image
* docker run --name mail-server-container -p 5000:5000 -d mail-server

# Dockercompose #

* docker-compose up --build -d
* docker-compose.yml files
** service db for postgres
** service web for node server
** service mail for mail-server

## Solve Problem 
* proxy: listen tcp 0.0.0.0:5432: bind: address already in use.
* netstat -anp | grep 5432      
unix  2      [ ACC ]     STREAM     LISTENING     19616    -                   /var/run/postgresql/.s.PGSQL.5432
* Solved by running: sudo service postgresql stop

## Application URL
* https://christinageo.cloudns.cl/

## Code repository
* https://github.com/cgeorgala/crimeAlertApp

## DNS hosting
* ClouDNS

## SSL certificate
* zeroSSL

# User accounts #

## Admin email
* email: crime.alert.hua@protonmail.com

## Police 
* username: crimePolice | password: police123
* email: crime.police.hua@protonmail.com


## Citizens 
* User1
* username: christinageo | password: christina123
* email: crime.alert.user.hua@proton.me

* User2
* username: giannis | password: giannis123
* email: crime.alert.user2.hua@proton.me

