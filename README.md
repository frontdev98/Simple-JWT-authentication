# JWT-Authentication

The project demonstrates user authentication based with JWT (Json Web Token). 

## Project Stack

- Node v22.16.0
- PostgreSQL 14.18
- Express
- Pg
- Nodemon
- useragent
- express-validator
- dotenv
- httpie
- Postman

## Features

* User registration
* User login

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
DB_HOST="localhost"
DB_PORT=5432
DB_USER="yourUsername"
DB_PASS="yourPassword"
DB_NAME="databaseName"

PORT=5000 # The server will run on 5000 port, you can change

JWT_SECRET=$(openssl rand -base64 32) # Generates 256-bit key every time when server is started
```

4. Run  command to create PostgreSQL database's schema

```bash
npm run init_db # it creates schema "jwt_auth" and table "persons"
```

6. Run the project:

```bash
# This starts the project in development mode
npm run dev
```

## Project test

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
