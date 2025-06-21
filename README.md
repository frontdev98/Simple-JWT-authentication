# JWT-Authentication

The project demonstrates user authentication based on JWT (Json Web Token). 

## Project Stack
Environment:
- Ubuntu 22.04

Base:
- Node v22.16.0
- PostgreSQL 14.18
- Openssl

Modules:
- express
- express-validator
- nodemon
- dotenv
- bcrypt
- jsonwebtoken
- pg
- useragent

Tools:
- Postman
- Httpie

## Features

* User registration
* User login
* User list

## Get started

1. Clone the project and go to its directory:

```bash
git clone https://github.com/frontdev98/jwt-auth.git
```

```bash
cd jwt-auth
```

2. Create new user with priveleges to access to database, for example:

```bash
sudo -u postgres psql
```

```sql
CREATE USER userName WITH PASSWORD 'yourPassword' LOGIN;
CREATE DATABASE userName WITH OWNER=userName;
```

3. Create file ".env" and add next strings to it:

```bash
DB_HOST="localhost"    # postgresql server's address
DB_PORT=5432           # default port
DB_USER="yourUsername" # your created user from step 2
DB_PASS="yourPassword" # your created password for the user from step 2
DB_NAME="databaseName" # created database from step 2

PORT=5000 # The server will run on 5000 port, you can change

JWT_SECRET=$(openssl rand -base64 32) # Generate 256-bit key every time when server is started
```

4. Initialize database with data from step 3

```bash
npm run dbinit # it creates schema "jwt_auth" and table "persons"
```

6. Run the project in development mode

```bash
# This starts the project in development mode
npm run dev
```

## Project test
You will need "Postman" to make HTTP requests. If you have lots of fun
from console, use httpie (like me).

```bash
# 1. Registration of user
http --json http://localhost:5000/auth/register email=someuser@gmail.com password=12345678

# 2. Login
http --json http://localhost:5000/auth/login email=someuser@gmail.com password=12345678

# If login action was successful, then you see token that server have sent, for example:
# {
#    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZXMiOlsidXNlciJdLCJpYXQiOjE3NTA0MzEzMTIsImV4cCI6MTc1MDQ1MjkxMn0.V9PgU_6pDjCxXvUNOEWjYAKAGe1o67nUh1JEuDSlw8I"
# }

# 3. User list
http --json http://localhost:5000/auth/user
```

Clear your database after the tests by command
```bash
npm run dbclear
```
