# Container stack for a js frontend, a fastapi backend, with mariadb and redis databases, all using a reverse-proxy 

This is the bare minimum needed to plug this all together. You can choose the JS frontend framework, though it is assumed that you'll be running a Vite webserver. If this is not the case, change the port in `images/app.Dockerfile` and in `docker-compose.yml`

# How to stand this up

## Setup your framework of choice

Run: `docker compose run app bash` and then something like `npm create vue@latest`

## Standup the entire thing

Run `docker compose up --build` (possibly include the `-d` if you want to run the process in the background so you can still use that terminal window)

## Enter whatever container you need to do your work

E.g. `docker compose exec app bash` 