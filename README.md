# Real Estate API

## Introduction

The Real Estate API project involved the development of an API for managing real estate services for Kimóveis, a real estate agency. The application allowed the registration of properties and users interested in property acquisition. It also facilitated scheduling and viewing visit times for available properties in the agency's database.

## Delivery Requirements

1. Code was written in TypeScript.
2. Data serialization was implemented using the Zod library.
3. A PostgreSQL database was utilized.
4. TypeORM was used instead of PG and PG-Format.
5. Strict adherence to table/entity names, columns, and specifications was crucial.
6. Attention to key names in the input and output objects of each request was essential.

## Database Structure

Entities and table names:
- User (users)
- Address (addresses)
- Category (categories)
- Real Estate (realEstates)
- Schedule (schedules)

## Endpoints

| Method | Endpoint                    | Responsibility                             | Authentication   |
|--------|-----------------------------|--------------------------------------------|------------------|
| POST   | /users                      | Create a user                               | Any user         |
| GET    | /users                      | List all users                              | Admins           |
| PATCH  | /users/:id                  | Update user information                     | Admins or users  |
| DELETE | /users/:id                  | Soft delete a user                          | Admins           |
| POST   | /login                      | Generate an authentication token            | Any user         |
| POST   | /categories                 | Create a category                           | Admins           |
| GET    | /categories                 | List all categories                         | Any user         |
| GET    | /categories/:id/realEstate  | List real estates in a category            | Any user         |
| POST   | /realEstate                 | Create a real estate                        | Admins           |
| GET    | /realEstate                 | List all real estates                       | Any user         |
| POST   | /schedules                  | Schedule a property visit                   | Users            |
| GET    | /schedules/realEstate/:id   | List scheduled visits for a property       | Admins           |

## Service Requirements

- POST /users: Create a user with name, email, password, and admin status. Prevent duplicate emails. No authentication required.
- GET /users: List all users, excluding password hashes. Accessible by admins.
- PATCH /users/:id: Update user data, excluding id and admin fields. Admins can update any user; non-admins can update their own data.
- DELETE /users/:id: Perform a soft delete on a user. Accessible by admins. Prevent soft delete on an already deleted user.
- POST /login: Generate an authentication token based on email and password. Prevent login for deleted users. No authentication required.
- POST /categories: Create a category, prevent duplicate names. Accessible by admins.
- GET /categories: List all categories. No authentication required.
- GET /categories/:id/realEstate: List real estates in a category. No authentication required.
- POST /realEstate: Create a real estate with value, size, address, and category. Prevent duplicate addresses. Accessible by admins.
- GET /realEstate: List all real estates. No authentication required.
- POST /schedules: Schedule a property visit with date, time, real estate, and user. Prevent conflicts in scheduling. Accessible by users and admins.
- GET /schedules/realEstate/:id: List scheduled visits for a property. Accessible by admins.

## Rubric

- The project met all specified requirements for functionality, database structure, and endpoints.
- Data serialization was implemented using the Zod library.
- A PostgreSQL database was used, and TypeORM replaced PG and PG-Format.
- Strict adherence to table/entity names, columns, and specifications.
- Authentication was implemented correctly, allowing different levels of access for users and admins.
- Testing was performed for each route to ensure proper functionality.
