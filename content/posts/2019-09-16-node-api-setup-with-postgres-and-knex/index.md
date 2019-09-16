---
title: Node API setup with Postgres and Knex
author: Ezekiel Ekunola
date: 2019-09-16
hero: ./images/preview.png
excerpt: In this article, I would be setting up a Node project with Postgres database and Knex query builder.
---

In this article, I would be setting up a Node project with Postgres database and Knex query builder.

### **What is Knex**
Knex.js is a "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use.

To get started, we have to initialize our project to create our `package.json` file.

```
npm init -y
```

### **Database Setup**
I would be using an online database called Elephantsql to set up my database. You can register [here](https://elephantsql.com).

After registering, create a database. An example is shown below.


![](https://thepracticaldev.s3.amazonaws.com/i/5nula8dj0bpw1h3d7wsm.gif)


### **Setup Knex**
Install dependencies needed for the project

```
npm i knex -g
npm i pg express dotenv --save
```

Create a `.env` file in the root of your project and add the database URL. Example below.

```
DB_URL=URL (where URL is the database connection string)
```

On your the terminal, run the command below to initialize knex

```
knex init
``` 

The above command would generate a `knexfile.js` in the root of your project and would look like below.


```js
// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

```

I am going to change the `knexfile.js` configuration file to use `Postgres` and also specify the directory where my migrations and seeds should be saved. Edit the `knexfile.js` file to the code below.

```js
require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  testing: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
};


```
### **DB Config**
Create a `db.js` file in the `data` directory that would hold our knex configuration in the data directory. This would hold the configuration for our environments.


Add the code below to the `db.js` file.

```js
const knex = require('knex');

const knexfile = require('../knexfile');


const env = process.env.NODE_ENV || 'development';
const configOptions = knexfile[env];

module.exports = knex(configOptions);
```

### **Migrations**
Migrations allow for you to define sets of schema changes so upgrading a database is a breeze.

To create/generate a migration file, run the command below.

``` 
knex migrate:make todo 
```
**Note: `todo` in the command above is the migration name.**

The above command would create a migration file in the path specified for migrations. In our case `/data/migrations` 

We can then edit the migration file to include the columns we would be needing in our todo table.

```js
exports.up = knex =>
  knex.schema.createTable("todo", tbl => {
    tbl.increments();
    tbl.text("task", 128).notNullable();
  });

exports.down = knex => knex.schema.dropTableIfExists("todo");
```

To run the migrations, you can run the command below
```
knex migrate:latest
```

**Note: `knex migrate:latest` would run through all our migration files and run the `up` functions which would then create the tables in our database.**

To rollback the migrations, you can run the command below
```
knex migrate:rollback
```
**Note: `knex migrate:rollback` would run through all our migration files and run the `down` functions which would then drop the tables in our database.**

### **Seeds**
Seed files allow you to populate your database with test or seed data independent of your migration files.

To generate seeds, run the command below on your terminal
```
knex seed:make todo
```

This would create a `todo.js` file in your seeds directory. specified for seeds in our `knexfile.js`, which can then be edited to include our test data.
Example of a seed file below.

```js

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todo').del()
    .then(function () {
      // Inserts seed entries
      return knex('todo').insert([
        {id: 1, task: 'Create API'},
        {id: 2, task: 'Watch Money Heist'},
        {id: 3, task: 'Do Dishex'}
      ]);
    });
};

```

To run the seeds files we can run the command below on your terminal
```
knex seed:run 
```
**The run command then gets all seeds files and then seeds them to our database.**


### **Scripts**
You can add scripts to `package.json` file.
```json
 "scripts": {
    "start": "node index",
    "migrate": "knex migrate:latest",
    "unmigrate": "knex migrate:rollback",
    "seed": "knex seed:run "
  }
```
**`start`: This command is to start our application.**

**`migrate`: This command is to add our migrations to our database.**

**`unmigrate`: This command is to rollback/remove all existing migrations from the database.**


In order to query the database, all you need to do is to import in the `db.js` file we created and make the query. An example is shown below.

```js
const db = require("./data/db.js"); // importing the db config

app.get("/todo", async (req, res) => {
  const todos = await db("todo"); // making a query to get all todos
  res.json({ todos });
});
```

# Conclusion
In this article, we have been able to look at setting up a Node API with a Postgres database and Knex query builder.

The source code used in demonstrating can be found [here](https://github.com/Easybuoy/node-api-knex).

Find more information on knex [here](http://knexjs.org)

If you have any questions or feedback, please feel free to reach out on [Twitter](https://twitter.com/easybuoy).

Thanks for reading.