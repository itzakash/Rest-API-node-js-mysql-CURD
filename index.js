const express = require("express");
const bodyParse = require("body-parser");
const app = express();
const mysql = require("mysql");

app.use(bodyParse.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "itzakash_node_basic",
});

// check the connection

// connection.connect((er) => {
//   if (er) throw er;
//   console.warn("Success fully connected the database");
// });

// listen the port
app.listen(8080, () => {
  console.warn("Sever running on port 8080");
});

// if want to check the database is conneted or not
// fire the below cmd

// >> nodemmon index.js

// create or insert a record

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

// get the all record
app.get("/api/viewall", (request, response) => {
  let sqlstmt = `select * from users`;
  let query = connection.query(sqlstmt, (err, result) => {
    if (err) throw err;
    response.send(JSON.stringify({ status: 200, error: "", response: result }));
  });
});

// get the single record

app.get("/api/getUser/:id", (request, response) => {
  let sqlstmt = "select * from users where id =" + request.params.id;
  console.warn(sqlstmt);

  connection.query(sqlstmt, (err, result) => {
    if (err) throw err;
    response.send(JSON.stringify({ status: 200, error: "", response: result }));
  });
});

// delete single record

app.get("/api/deleteUser/:id", (request, response) => {
  let sqlstmt = "delete from users where id = " + request.params.id;
  connection.query(sqlstmt, (err, result) => {
    if (err) throw err;
    response.send(JSON.stringify({ status: 200, error: "", response: result }));
  });
});

// update the record
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
        response: "One Record Update successfully",
      })
    );
  });
});
