# JWT-Authentication

# Stack

- Node v22.16.0
- Express 5.1.0
- Pg 8.16.0
- Nodemon 3.1.10
- useragent 2.3.0
- express-validator 7.2.1
- PostgreSQL 14.18

# Get started

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
```

4. Run  command to init schema and table:

```bash
npm run initdb # it creates schema "jwt_auth" and table "persons"
```

6. Run the project:

```bash
# This starts the project in development mode
npm run dev
```
