[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)

# Mesto project frontend + backend
* Continuation of work on the Mesto project, if the part responsible for the front of the application was written in previous sprints, including the creation of pages responsible for user registration and authorization. Then in this part of the course, the server part of the project will be written, to which the user part will be connected later.

## The following technologies and tools are used in this project
* Node.js as a server part of the JS language
* framework express
* non-relational database (NOSQL) MongoDB
* Object Document Mapper - Mongoose is used to communicate
* with the MongoDB database
* Api request creation service - Postman and/or Thunder Client
## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
