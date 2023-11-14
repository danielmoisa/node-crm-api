# [Nest CRM API]

This project is a RESTful API built using Nest.js and Prisma to handle users and leads management, crud invoices and auth. It provides a flexible and scalable foundation for a node js backend solution.

## Features

- **Authentication**: Secure endpoints using JWT-based authentication.
- **User Management**: Register, login, and manage user accounts.
- **Invoice Operations**: CRUD operations for managing invoices.

## Technologies Used

- [Nest.js](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)

## Getting Started

 ```bash
$ git clone https://github.com/yourusername/your-repo.git
$ yarn install
 ```
## Setup Postgres Database and create env file
```bash
DATABASE_URL="databaseurl"

JWT_SECRET = 'secret'
JWT_EXPIRES_IN = '10h'
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```


## License

Nest is [MIT licensed](LICENSE).
