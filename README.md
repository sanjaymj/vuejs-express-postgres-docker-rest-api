# vuejs-express-postgres-docker-rest-api

This is a simple full-stack web app developed with a vuejs frontend, typescript node backend and a postgres database.

# Starting backend app for local development

For local development of the backend, go the the backend directory and run `npm i`. This should install all dependencies. Postgres should also be intsalled locally.

After all dependencies have been installed, run `npm run start`. This starts the app in dev mode and listens to port 3000. Open Postman or any other Httpclient and start making REST api calls.

# Starting frontend app for local development

For local development of the frontend , go the the frontend directory and run `npm i`. This should install all dependencies. 

After all dependencies have been installed, run `npm run serve`. This starts the app in dev mode and listens to port 8080. Open `localhost:8080` to view the frontend app.

# Starting the app in a docker container

## The entire application is dockerized

To start both the frontend and backend apps, clone the repository and just run following the docker command

`docker-compose up --build -d && docker-compose logs -f`.

