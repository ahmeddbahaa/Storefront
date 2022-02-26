# Storefront Backend Project

## Table of Contents

* [Description](#Description)
* [Prerequisites](#Prerequisites)
* [Instructions](#Instructions)
* [Database-schema](#Database-schema)


## Description

This's Storefront Api Project that provides Api Endpoints as Required by the requirements file. this project demonstrates the understanding of key concepts like API, databases, nodejs, express, typescript, TDD, Jasmine and much more !
It features the use of **Typescript**, **Sequelize**, **PostgreSQL**, **Jasmine**, **Winston & Morgan**, **Joi**, and **Eslint**.

## Prerequisites
Your machine must have the following installed on it:
- [Node/NPM](https://nodejs.org/en/download/) (v14 or higher)

## Instructions

### 1. Install Dependencies
After Cloning the project, head inside the project folder and run
```
npm install
```

### 2.  DB Creation and Migrations
```
cp .env.example .env
```
Now, replace .env with your credentials and then run

``` 
npm run migrate:up
```
### 3. Starting the project
Make sure to have Port 3000 available for Express server and port 5423 for PostgreSQL server 
```
npm start
```

### 4. Running the tests
```
npm run test
```

Any by now you should be able to go to `localhost:3000` to test that everything is working as expected.
## Api End points

### 1. Users Endpoints
```
Index Endpoint [JWT Token Required]
GET /users 
```
```
Show Endpoint [JWT Token Required]
GET /users/id
```
```
Create Endpoint [JWT Token Required]
POST /users 
```
```
Login Endpoint
POST /users/login
```
### 2. Products Endpoints
```
Index Endpoint
GET /products 
```
```
Show Endpoint
GET /products/id
```
```
Create Endpoint [JWT Token Required]
POST /products 
```
### 3. Orders Endpoints
```
Index Endpoint 
GET /orders 
```
```
Show Endpoint
GET /orders/id
```
```
Create Endpoint [JWT Token Required]
POST /orders 
```
```
Add Product to Order Endpoint [JWT Token Required]
POST /orders/order_id/products 
```
```
Get Orders For Specific User Endpoint [JWT Token Required]
GET /orders/users/:user_id
```
```
Get Complete Orders For Specific User Endpoint [JWT Token Required]
GET /orders/users/:user_id/complete
```
## Database-schema

```
TABLE "users" (
  "id" SERIAL,
  "firstname" VARCHAR(255) NOT NULL,
  "lastname" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY("id")
);
```
```
TABLE "products" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "price" INTEGER,
    "category_id" INTEGER,
    FOREIGN KEY ("category_id") REFERENCES "categories"("id")
);
```
```
TABLE "orders"(
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER,
    "order_status" status
);
```
```
CREATE TYPE "status" AS ENUM (
    'active','complete'
);
```
```
TABLE "order_products"(
    "id" SERIAL PRIMARY KEY,
    "order_id" INTEGER,
    "product_id" INTEGER,
    "quantity" INTEGER,
    FOREIGN KEY ("order_id") REFERENCES "orders"("id"),
    FOREIGN KEY ("product_id") REFERENCES "products"("id")
);
```
```
TABLE "categories"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);
```