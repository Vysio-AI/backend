# Vysio Backend

## Structure
This is a JSON based api so there are no views. All application code resides inside of the /app directory, and other configuration is found within the root of the repository.

Controllers - These contain functions that process and respond to the request.

Middlewares - These access and/or modify the request/response data on the way to/from the controllers.

Models - This is mostly unnecessary due to Prisma, but for any complex data-related processing we will store the functions within an appropriate file here.

Routes - This folder contains the routing that maps the requested URL to the appropriate controller.

Services - For any code that does not fit neatly as a controller or model. This is where we will store classes/functions for interacting with Kafka and any external APIs.

## Database & Migrations
We use Postgres as our database with Prisma for an ORM. Any schema changes can be made in the schema.prisma file.

### Useful Commands

Create a new migration after changing the schema: ```npx prisma migrate dev --name MIGRATION_NAME```

Open Prisma Studio (GUI) in browser: ```npx prisma studio```

Whenever you make changes to your database that are reflected in the Prisma schema, you need to manually re-generate Prisma Client to update the generated code in the node_modules/.prisma/client directory: ```npx prisma generate```

### Using pgadmin
If you use the docker-compose.yml within this repository to spin up the postgres instance, it will also create an instance of pgadmin. Pgadmin is a gui tool for managing postgres databases that may come in handy for troubleshooting.

pgadmin is accessible at: ```http://localhost:5050```

## Authentication
We use Auth0 for user authentication. This API accepts Bearer tokens in the Authorization header, then validates them with Auth0 in a middleware. After a token has been validated, the API will try to find a user who the token belongs to. If the user already exists, the request will be executed within this context. If the user does not already exist, a new user will be created and the request will then be executed.