# Chronos

Work in progress :)

**Table of content**

- [The goal of this project](#the-goal-of-this-project)
- [Tech stack behind Chronos](#tech-stack-behind-chronos)
- [Getting Started](#getting-started)
- - [Installation](#installation)
- [GIT commit guidelines](#git-commit-guidelines)

## The goal of this project

My main goal behind for this project is to learn something new, build something useful and improve my skills. Since I’m mainly a frontend developer, I’ve decided to build backend on top of NestJS.

While working for different clients and companies I’ve noticed a strange pattern of them often using excel sheet to track hours, so I’ve decided to build an open-source dockerized app to track hours easily.

This tool is ideal for individual freelancers or small companies that wish to keep track of their work.

Chronos is completely free and created as a part of a learning journey, there is no plan to monetize this project and it is forbidden to use it in commercial purposes. For detailed information on usage check [LICENSE.txt](https://github.com/kresohr/chronos/blob/master/LICENSE.txt)

## Tech stack behind Chronos

- **Frontend** - [VueJS](https://vuejs.org/)
- **Backend** - [NestJS](https://docs.nestjs.com/)
- **Auth** - [Keycloak](https://www.keycloak.org/)
- **DB** - [PostgreSQL](https://www.postgresql.org/) (Keycloak also uses its own instance of PostgreSQL through Docker)
- **Docker** - [Docker](https://www.docker.com/) using Docker to containerize everything and to ease the process of running Chronos
- **Icons** - [FontAwesome](https://docs.fontawesome.com/) using Font Awesome for icons across the project.
- **UI Component Library** - [PrimeVue](https://primevue.org/) using PrimeVue for the majority of UI components

## Getting Started

### Installation

The steps will be updated with proper links, for now here is an example .env file that you can place inside your /backend for docker backend to work

`DATABASE_URL="postgresql://postgres:postgres@db_backend:5432/chronos?schema=public`

In case you want to run backend locally through terminal, you can use this example for your .env file (make sure you run `npx prisma generate` before starting the backend server.)

`DATABASE_URL="postgresql://postgres:postgres@localhost:15432/chronos?schema=public"`

## GIT commit guidelines

The idea is to keep GIT commits clean and structured in a way that it is easier to find what you are looking for.

- **UI-FIX**: Used for small UI fixes like changes in the margin, padding, color, etc.
- **FIX**: Bugfixes, improvements
- **REFACTOR**: Technical debt and code refactoring
- **WIP**: Work in progress

**Note:** Component implementation and progress has no tag
