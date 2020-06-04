# Rest-API-node-js-mysql-CURD


# REST-API in nodejs
## Step 1 
Create a new database "crud" in phpmyadmin

## Step 2
Create a table "users" with fields id(int)(PRIMARY KEY), name(varchar(100)), email(varchar(30)),location(varchar(100))

## Step 3
Create a folder "node-rest-api" 

## Step 4 
Open in vs code or any code editor or in your cmd 

## Step 5 
Open the terminal
Go to create Folder like ("node-rest-api")
```bash
npm init 
npm install --save express mysql body-parser
```

## Step 6 
```bash
npm install -g nodemon
```

## Step 7 
Create a new file "index.js"

## Step 8
Firstly connect with database
```javascript
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

// parse application/json
app.use(bodyParser.json());

//Create Database Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "itzakash_node_basic",
});
```
```javascript
//at the bottom of the code
app.listen(8000, () => {
	console.log("server started on port 8000...");
});

```

```
check the database connection 

connection.connect((er) => {
  if (er) throw er;
  console.warn("Success fully connected the database");
});

```


## Step 9
Write code creating a new record

```javascript
// creat or insert New Record
app.post("/api/create", (request, response) => {
  let data = {
    name: request.body.name,
    email: request.body.email,
    location: request.body.location,
  };
  let sqlstmt = `insert into users SET ? `;
  connection.query(sqlstmt, data, (err, result) => {
    if (err) throw err;
    response.send(
      JSON.stringify({
        status: 200,
        erroor: null,
        response: "One record inserted.." + result.insertId,
      })
    );
  });
});
```

## Step 10
Write code for view all records
```javascript
// Fetch all records
app.get("/api/viewall", (request, response) => {
  let sqlstmt = `select * from users`;
  let query = connection.query(sqlstmt, (err, result) => {
    if (err) throw err;
    response.send(JSON.stringify({ status: 200, error: "", response: result }));
  });
});

```
## Step 11
Write code for view a single record

```javascript
// Fetch single record
app.get("/api/getUser/:id", (request, response) => {
  let sqlstmt = "select * from users where id =" + request.params.id;
  console.warn(sqlstmt);

  connection.query(sqlstmt, (err, result) => {
    if (err) throw err;
    response.send(JSON.stringify({ status: 200, error: "", response: result }));
  });
});
```

## Step 12
Write code for delete a record
```javascript

// delete Single record
app.get("/api/deleteUser/:id", (request, response) => {
  let sqlstmt = "delete from users where id = " + request.params.id;
  connection.query(sqlstmt, (err, result) => {
    if (err) throw err;
    response.send(JSON.stringify({ status: 200, error: "", response: result }));
  });
});

```

## Step 13
Write code for update a record
```javascript
// update Single Record
app.put("/api/updateUser", (request, response) => {
  let sqlstmt =
    "update users set name= '" +
    request.body.name +
    "' ,email = '" +
    request.body.email +
    "' ,location= '" +
    request.body.location +
    "' where id = " +
    request.body.id;
  connection.query(sqlstmt, (err, result) => {
    if (err) throw err;
    response.send(
      JSON.stringify({
        status: 200,
        response: "One Record Updated successfully",
      })
    );
  });
});
```

## Step 14 
Start the server
```bash
nodemon index.js
```
