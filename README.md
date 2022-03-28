# Node.js recruitment task

- Created `movies-server` with two endpoint:-

  1. `POST /movies`

     1. Allows creating a movie object based on `movieTitle` passed in the request body
     2. Fetch the data from https://omdbapi.com/ and saved to the database. Data we would like you to
        fetch from OMDb API:
        ```
        Title: string
        Released: date
        Genre: string
        Director: string
        ```
     3. If For basic users only allow to create 5 movies per calender month
     4. For premium users there is no limits of movies creating
     5. If movie is already create it's return movie title is already exists
     6. Only authorized users can create movies

  2. `GET /movies`
     1. Fetch a list of all movies created by an authorized user.

```
authorization: Bearer <token>
```

## Prerequisites

Need to have `docker` and `docker-compose` installed on your computer to run the service

## Run locally for movies-server

1. Clone this repository
1. Run from root dir

```
JWT_SECRET=secret MONGO_URI=`mongo db uri` API_KEY=`API key of https://omdbapi.com/` docker-compose up -d
```

By default the movies service will start on port `3001` but you can override
the default value by setting the `APP_PORT` env var

```
APP_PORT=3005 JWT_SECRET=secret MONGO_URI=`mongo db uri` API_KEY=`API key of https://omdbapi.com/` docker-compose up -d
```

To stop the authorization service run

```
docker-compose down
```

## Technology

- JavaScript
- expeess (Node.js Framework)
- mongoDB (used atlas)
- jest
- github action
