# Simple JWT Authentication

The project demonstrates user authentication based on JWT (Json Web Token) (access token only).
The basis of the project is taken from youtube channel [UlbiTV](https://youtu.be/d_aJdcDq6AY?si=2WZITSSbEsYDRYGu).

## Project Stack
Environment:
- Ubuntu 22.04
- Windows 11 Pro 24H2

Base:
- [Node v22.16.0](https://nodejs.org/en/blog/release/v22.16.0)
- [PostgreSQL 14.18](https://www.postgresql.org/about/news/postgresql-175-169-1513-1418-and-1321-released-3072/)
- [Openssl 3.2.4](https://www.openssl.org/)

Modules:
- [express](https://www.npmjs.com/package/express)
- [express-validator](https://www.npmjs.com/package/express-validator)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [pg](https://www.npmjs.com/package/pg)
- [useragent](https://www.npmjs.com/package/useragent)
- [winston](https://www.npmjs.com/package/winston)

Tools:
- [Postman](https://www.postman.com/)
- [Httpie](https://httpie.io/)


## Get started

1. Clone the project and go to its directory:

```bash
git clone https://github.com/frontdev98/jwt-auth.git
```

```bash
cd jwt-auth
```

2. Install dependencies
```bash
npm i
```

1. Create new user and its database at PostgreSQL, for example:

```bash
sudo -u postgres psql
```

```sql
CREATE USER userName WITH PASSWORD 'yourPassword' LOGIN;
CREATE DATABASE userName WITH OWNER=userName;
```

4. Create file ".env" and add next strings to it:

```bash
DB_HOST="localhost"    # postgresql server's address
DB_PORT=5432           # default port
DB_USER="yourUsername" # your created user from step 2
DB_PASS="yourPassword" # your created password for the user from step 2
DB_NAME="databaseName" # created database from step 2

PORT=5000 # The server will run on 5000 port, you can change

JWT_SECRET=$(openssl rand -base64 32) # Generate 256-bit key every time when server starts

NODE_ENV=dev                          # Change it to "prod" if you don't want to see logs on console
LOG_PATH='server.log'                 # Path to log file
```

5. Initialize database with data from step 3

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
```

Clear your database after the tests by command
```bash
npm run dbclear
```
