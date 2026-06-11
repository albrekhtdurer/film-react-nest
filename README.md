# FILM!

Single-page application for an online cinema theatre. This is an educational project. The app can be found at https://albrekhtdurer.nomorepartiessite.ru (NOTE: data is currently being translated to English).

## Project information and features

The project was developed on top of a pre-existing frontend. I delivered the backend functionality and CI/CD features.

**Tech Stack** : Nest.js, PostgreSQL (via TypeORM), nginx, Docker.

### Features:

- **DB**: I developed entities, DTOs, and a service implementing the Repository pattern to access the database in endpoints.
- **Services and controllers**: Two controllers were developed for the project: one handling films data (get all films, get a particular film schedule by film ID) and one handling order creation. The corresponding services were also developed.
- **Tests**: Controller functionality is covered by unit tests (based on Jest).
- **Logging**: According to the task, three loggers were implemented: a console logger for developers, a JSON logger, and a TSKV logger. Developers can choose a logger by configuring `.env`.
- **CI/CD**: I created Dockerfiles for the frontend and backend parts and a GitHub workflow for publishing. When a push is made to the main branch, new frontend and backend Docker images are built and sent to the ghcr registry.
- **CI/CD**: A `docker-compose` file was created for deployment.


## How to launch

1. Prepare an `.env` file in the project folder, following the example.

2. Run the docker-compose file:

```bash
docker compose up
```

3. Fill the database with data:

```bash
docker exec -i postgres_container psql -U exampleuser -d exampledb < backend/test/prac.init.sql
docker exec -i postgres_container psql -U exampleuser -d exampledb < backend/test/prac.films.sql
docker exec -i postgres_container psql -U exampleuser -d exampledb < backend/test/prac.schedules.sql
```

The app will be available at `localhost`.
