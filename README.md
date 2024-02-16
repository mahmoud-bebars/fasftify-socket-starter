# fasftify-socket-starter

## Using The Nodejs,Express,Mysql

### the project docs diveded into :-

#### - project idea

#### - project structure

#### - how to use

#### - data Structure

#### - Apis Collection with examples for responses

#### - used techs

---

### 1 - Project Idea ->

- the project explain the best practices to use the Socke.io with a simple Authentication & authorization system with JWT

---

### 2 - the project structure

```
├── LOYAL-SERVER
│ ├── config
│ │ └── config.js
│ │
│ ├── controllers
│ │ ├── AuthController.js
│ │ ├── HomeController.js
│ │ ├── SocketController.js
│ │ └── UserController.js
│ │
│ ├── migrations
│ │ ├── 202401041101101-create-role.js
│ │ └── 202401041101105-create-user.js
│ │
│ ├── models
│ │ ├── index.js
│ │ ├── role.js
│ │ └── user.js
│ │
│ ├── node_modules (not included in the repo ---> will be installed after cloning)
│ │
│ ├── plugins
│ │ ├── is-authenticated.js
│ │ └── socket.js
│ │
│ ├── public
│ │ ├── 404.html
│ │ └── index.html
│ │
│ ├── routes
│ │ ├── Auth.js
│ │ ├── index.js
│ │ ├── main.js
│ │ ├── Socket.js
│ │ └── User.js
│ │
│ ├── seeders
│ │ └── 20240104110101-user-types.js
│ │
│ ├── utils
│ │ └── authenticate.js
│ │
│ ├── .env.example
│ ├── .gitignore
│ ├── package-lock.json (generated when packeges installation)
│ ├── package.json
│ ├── README.md
│ └── server.js

```

---

### 3 - How to use

- Clone the project in your machine
- first you edit the .env file and type your database inforamtion
  ----> should look something like that ->

  ```
  HOST="127.0.0.1"
  PORT="5000"
  NODE_ENV="development"

  REDIS_HOST="127.0.0.1"
  REDIS_PORT="6379"

  DB_TIMEZONE="+02:00"
  APP_TIMEZONE="Africa/Cairo"

  APP_URL="localhost:5000"

  JWT_SECRET=""
  PASS_SECRET=""
  SALT=
  HAMC=

  # Development Enviroment Database Credentials
  DEV_USERNAME="root"
  DEV_PASSWORD=""
  DEV_DATABASE="database_name"
  DEV_DB_HOST="127.0.0.1"
  DEV_DIALECT="mysql"

  ```

- then open the terminal and type command `npm install` to install the required packges for the project
- type again in the terminal comand `npm db:roll` to migrate & seed yoyur database
- type again in the terminal comand `npm dev` to start the server
- start testing apis performance and test every one as you like or edit the code if you wish for better experince

---

### 4 - data Structure

- you will find a full refrence for the data structure in a pdf inside db details folder

| #   | Table Name  |
| --- | :---------: |
| 1   |    users    |
| 2   | users_roles |

---

### 5 - Apis Collection with examples for responses

--> loyal has 4 main branches in the Apis

- Authentication Apis prefix: `/api/auth` -->

= (POST) --> login --> `/Login`

= (POST) --> register --> `/register`

= (GET) --> user Verfiy --> `/verfiy`

- Users APis prefix: `/api/users`
  --> All client request must pass Auth step

= (PUT) --> Edit Profile --> `/profile`

= (PUT) --> Edit Profile --> `/password`

- Socket APis prefix: `/api/socket`

= (POST) --> Send Message --> `/message`

- Home Apis

= (GET) --> Home --> `/`

= (GET) --> Users Types --> `/types/users/`

---

### 6 - used techs

| #   |             Technology             |
| --- | :--------------------------------: |
| 1   | [Node.js](https://nodejs.org/en/l) |
| 2   | [fastfiy.js](https://fastify.dev)  |
| 3   |        [JWT](https://jwt.i)        |
| 4   | [sequelize](https://sequelize.org) |
| 5   |   [socket.io](https://socket.io)   |
| 6   |     [Redis](https://redis.io)      |
