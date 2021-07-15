# Welcome to the Parts Unlimited repo

Run `yarn install` in root folder, frontend and backend folders.

Add `backend/.env` file with contents:

```
MONGODB_URI="mongodb://127.0.0.1:27017/wilco-test"
```

Add `frontend/.env` file with contents:

```
PORT=3001
```

To start the app use: `yarn start`, it'll start both the backend and the frontend.

Please find more info about each part in the relevant Readme file ([frontend](frontend/readme.md) and [backend](backend/README.md)).

## Development

When implementing a new feature or fixing a bug, please create a new pull request against `main` from a feature/bug branch and add `@janesmithwilco` as reviewer.
