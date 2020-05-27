# NC News Backend

Welcome to NC News, a reddit style news aggregator.

Please click here for the hosted version of this RESTful API and a list of all available endpoints, with example responses:

https://jbcnews.herokuapp.com/api

## Getting Started

These instructions will get you a copy of the project on your local machine for development and testing purposes.

### Prerequisites

Node.js needs to be version v13.8.0 or higher.

This project was developed using the following dependencies.

```
express v4.17.1
knex v0.20.13
pg v7.18.2
cors v2.8.5
```

Testing suite was developed using:

```
mocha v7.1.1
chai v4.2.0
chai-sorted 0.2.0
supertest v4.0.2
```

### Installation

After cloning the project install via npm:

```
npm install
```

To run the database:

```
npm run setup-dbs
```

To seed the database with development data:

```
npm run seed
```

To start the server:

```
npm run start
```

### Running the tests

The testing suite has been created using full TDD with the mocha framework and chai assertion library. Supertest was used for making HTTP requests to test the endpoints.

The following command will test the endpoints using supertest, mocha and chai:

```
npm test
```

The following command will test the utility functions:

```
npm run test-utils
```

## Authors

Jasmin Bower - _initial work_ - [Github](https://github.com/JasminBower)
