# jwt-auth

# Stack
- Node v22.16.0;
- Express ^5.1.0;
- Pg ^8.16.0;
- Nodemon ^3.1.10;

# Get started
Clone the project and go to its directory:
```bash
git clone https://github.com/frontdev98/jwt-auth.git
cd jwt-auth
```

Create new user and his database (if you don't have those):
```bash
sudo -u postgres psql
```

```sql
CREATE USER userName WITH PASSWORD 'yourPassword' LOGIN;
CREATE DATABASE userName WITH OWNER=userName;
```

Open _"settings.js"_ and input created parameters from previous step, for example:

```javascript
export const databaseParameters = {
    host: 'localhost',
    port: 5432,
    user: 'userName',
    password: 'yourPassword'
};
```

Run the project with next command:
```bash
# This starts the project in development mode
npm run dev
```