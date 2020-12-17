# website-screenshot-capturer

This is a programming challenge for valiu's got talent hiring program in 48 hours

## Technologies Used

- TypeScript
- Nodejs
- Postgres
- Typeorm

### Getting Started

```bash
npm install
# or
yarn install

npm run build
# or
yarn build


# Normal start: one server
npm start
#or
yarn start


# Deployment Start: Cluster

npm run start:cluster
#or
yarn start:cluster
```

### How?

- Uses puppeteer as core as headless driver driver for screenshoting
- Saves the image in `bytea` type in the database
- Converts back to `Base64` when displaying the image
- Load test has been tested using [k6](www.k6.io) with 1500 virtual user requesting the server in the save time
- Runs clustered pool of server workers makes sure our app is backed up
