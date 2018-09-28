# book-library

A book library developed using MongoDB 3.6, Express 4, Angular 6 and Node 8

## Overview

Angular application designed to give a simple UI where user can search books by title/author/isbn.

The search results are showed as a grid of book-cards, each card will have author, title and isbn details on it. It comes with Show details option, when clicked opens up a modal with all the details related to that book.

## How to run ?

1. Clone the repo
2. npm install
3. Ensure Mongo service is running
4. mongoimport --db book-library --collection books --file src/node/mock-data/books.json
5. npm run start (This will start backend services at port 3000 and then serves the frontend app at default port 4200)

## API Details

BaseURL: http://localhost:3000/api

1. GET http://localhost:3000/api/books?author={pattern}&title={pattern}&isbn={pattern}
2. GET http://localhost:3000/api/books/{id}/location
3. PUT http://localhost:3000/api/books/{id}/location
4. POST http://localhost:3000/api/books/issue
5. PUT http://localhost:3000/api/book/{id}/issue
6. GET http://localhost:3000/api/book/{id}/issue
