# Setup

## Packages

Do the following to setup the project.

- `npm install`
- `npm run db:migrate`

Inspect the package.json for further commands.

## Environment variables

The required environment variables are:

- DB_URL=
- UPLOADS_FOLDER=
- BODY_SIZE_LIMIT=
- SMTP_HOST=
- SMTP_PORT=
- SMTP_USER=
- SMTP_PASS=

For the uploads folder the following folder structure is expected:

```markdown
├───cms
└───portfolio
    ├───documents
    └───images
```

# Docker

## Docker build

```console
docker build -t portfolio .
```

While using Docker, an .env file is generated. You don't have to add variables manually.

## Docker run

If running Docker locally, make sure to set the `ORIGIN` in the Docker file to `http://localhost:3000/`. Otherwise form actions won't work due to CSRF protection.

### On MacOs/Linux:

```console
docker run -d -p 3000:3000 \
    --mount type=bind,source="$(pwd)"/database/,target=/app/database/ \
    --mount type=bind,source="$(pwd)"/uploads/,target=/app/uploads/ \
    --rm --name portfolio \
    portfolio
```

### On windows:

```console
docker run -d -p 3000:3000 `
    --mount type=bind,source="${PWD}/database/",target=/app/database/ `
    --mount type=bind,source="${PWD}/uploads/",target=/app/uploads/ `
    --rm --name portfolio `
    portfolio
```

### On Deployment

Make sure you bind mount volumes to target `/app/database/` and `/app/uploads/`.

## Docker Cleanup

Docker images, containers and build cache will take up space after each deployment.

To get an overview: `docker system df`
To cleanup: `docker system prune -a -f`
