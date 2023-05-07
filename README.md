# CRUD Implementation with Node.js and Docker

## Build Docker Container and Connect to Database

Build the docker container and database while in this directory:

`docker compose up -d`

## Start the application

The application is serverd at `http://localhost:3000/employees`

You can make different HTTP requests to the server:

### Retrieve all employees

send a `GET` request to the `/employees` endpoint

### Add a new employee

send a `POST` request to the `/employees` endpoint with the employee data in the request body

### Delete a employee

send a `DELETE` request to the `/employees/:name` endpoint, where :name is the name of the employee to be deleted

### Update an employee

send a `PUT` request to the `/employees` endpoint with the updated employee data in the request body
