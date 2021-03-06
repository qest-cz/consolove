# ❤️ Consolove ❤️
For those who love console log. Main purpose of this package is better visualisation of console logs.

*👷 Important notice: It is under heavy development. In this phase of product you need to clone this github project to run consolove client.*
## Restrictions:
- only with typescript
- only for nodejs project
## Main features:
- visualization of console log
- UI for JSON
- automatic tracking of all requests

## Future
- plugin system - for db, queues or custom things
- easy start, developer experience - current state is not use friendly - we need to
- graphs
- compare
- predefined filters
- support of frontend development

## Usage
- add import of consolove into root of the project just  `import 'consolove'`
- start in `frontend` folder `npm run start`


If you need typescript starter pack for node.js development. You are on
right place. Repository contains only must have (for our point of view)
dependencies to build. The repository solves 4 main parts

- **Run in development mode** - we use `ts-node` as a typescript execution environment,
`dot-env` library for setting up environment variables
- **Run tests** there is a predefined way how to run tests with `jest`
- **Build application** - for build is used classic way of `tsc`
- **Run in production mode** - run compiled code

## List of used libraries

- `jest` for testing and code coverage
- `prettier`, `tslint` for code style checking
- `ts-node-dev` for running project in development mode (automatic restart on change)
- `pino-pretty` for nice console output

## Scripts

### Basic  scripts

- `yarn`
install dependencies
- `yarn build`
build application
- `yarn dev`
start development mode
- `yarn test`
run tests
- `yarn eslint:fix`
apply prettier rules for project
- `yarn start`
start compiled application

### Useful for CI/CD

- `yarn test:cover`
 check code coverage in project
- `yarn eslint:check`
 checking code style policies by prettier and eslint

### FAQ

**Where can env variables can be set?**

- For setting of env variables is used [dotenv package](https://www.npmjs.com/package/dotenv), there are .env files in `./config` folder
