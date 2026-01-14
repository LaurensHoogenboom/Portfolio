# Setup
Do the following to setup the project.

- `npm install`
- `npm run db:migrate`

Inspect the package.json for further instructions.

# Environment variables
The required enviroment variables are:

- DB_URL=
- UPLOADS_FOLDER_DEV=
- UPLOADS_FOLDER=

# Docker
## Docker build

```console
docker build -t portfolio .
```

## Docker run
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

# Configure csrf on production!