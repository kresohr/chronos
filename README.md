# Chronos

Work in progress :)

**Table of content**

- [The goal of this project](#the-goal-of-this-project)
- [Tech stack behind Chronos](#tech-stack-behind-chronos)

## The goal of this project

My main goal behind for this project is to learn something new, build something useful and improve my skills. Since I’m mainly a frontend developer, I’ve decided to build backend on top of NestJS.

While working for different clients and companies I’ve noticed a strange pattern of them often using excel sheet to track hours, so I’ve decided to build an open-source dockerized app to track hours easily.

## Tech stack behind Chronos

- **Frontend** - [VueJS](https://vuejs.org/)
- **Backend** - [NestJS](https://docs.nestjs.com/)
- **Auth** - [Keycloak](https://www.keycloak.org/)
- **DB** - [PostgreSQL](https://www.postgresql.org/) (Keycloak also uses its own instance of PostgreSQL through Docker)
- **UI-UX** - [Quant-UX](https://github.com/KlausSchaefers/quant-ux) self hosted via docker for UI-UX mocking
- **Docker** - [Docker](https://www.docker.com/) using Docker to containerize everything and to ease the process of running Chronos
- **Icons** - [FontAwesome](https://docs.fontawesome.com/) using Font Awesome for icons across the project.
